// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function (request, response) {
  response.success("Hello world!");
});

// Check if referral is already registered.
var Referral = Parse.Object.extend("Referral");
Parse.Cloud.beforeSave("Referral", function (request, response) {
  var query1 = new Parse.Query(Referral);
  query1.equalTo("email", request.object.get("email"));
  var query2 = new Parse.Query(Referral);
  query2.equalTo("phone", request.object.get("phone"));
  var query = new Parse.Query.or(query1, query2);

  query.first({
    success: function (object) {
      if (object.id != request.object.id) {
        response.error("User with email/phone is already registered!");
      } else {
        response.success();
      }
    },
    error: function (error) {
      response.error("Could not validate email for referral");
    }
  });
});

// Check if member is already registered.
Parse.Cloud.beforeSave(Parse.User, function (request, response) {
  var query1 = new Parse.Query(Parse.User);
  query1.equalTo("email", request.object.get("email"));
  var query2 = new Parse.Query(Parse.User);
  query2.equalTo("phone", request.object.get("phone"));
  var query = Parse.Query.or(query1, query2);

  query.first({
    success: function (object) {
      if (object.id != request.object.id) {
        response.error("User with email/phone is already registered!");
      } else {
        response.success();
      }
    },
    error: function (error) {
      response.error("Could not validate email for member");
    }
  });
});
