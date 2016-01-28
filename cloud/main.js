// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function (request, response) {
  response.success("Hello world!");
});

// Check if referral is already registered.
var Referral = Parse.Object.extend("Referral");
Parse.Cloud.beforeSave("Referral", function (request, response) {
  var query = new Parse.Query(Referral);
  query.equalTo("email", request.object.get("email"));
  query.first({
    success: function (object) {
      if (object) {
        response.error("User with email is already registered!");
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
var Member = Parse.Object.extend("Member");
Parse.Cloud.beforeSave("Member", function (request, response) {
  var query = new Parse.Query(Member);
  query.equalTo("email", request.object.get("email"));
  query.first({
    success: function (object) {
      if (object) {
        response.error("User with email is already registered!");
      } else {
        response.success();
      }
    },
    error: function (error) {
      response.error("Could not validate email for member");
    }
  });
});
