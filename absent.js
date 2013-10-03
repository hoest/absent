Employees = new Meteor.Collection("employees");

if (Meteor.isClient) {
  Template.absent.employees = function () {
    return Employees.find({}, {sort: {score: -1, name: 1}});
  };

  Template.absent.isPresent = function (id) {
    var employee = Employees.find({ "_id": id });
    console.log(employee);
    return !employee.absent;
  };

  Template.absent.events({
    'click input.checkbox': function (event) {
      var checkbox = event.currentTarget;
      Employees.update(this._id, {
        $set: {
          "absent": !checkbox.checked
        }
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Employees.remove({});
    if (Employees.find().count() === 0) {
      var names = ["Ad van Pinxteren",
                   "Wiebe Cnossen",
                   "Jelle de Jong",
                   "Henny Palmen"];
      for (var i = 0; i < names.length; i++) {
        Employees.insert({
          "name": names[i],
          "absent": true
        });
      }
    }
  });
}
