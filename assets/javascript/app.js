// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA37HgkMz1HEAgQObgB3Vps1XXwDLZDYVA",
    authDomain: "train-scheduler-7a9e1.firebaseapp.com",
    databaseURL: "https://train-scheduler-7a9e1.firebaseio.com",
    projectId: "train-scheduler-7a9e1",
    storageBucket: "",
    messagingSenderId: "892889882380"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  // Initial Values
  var name = "";
  var role = "";
  var startDate = "";
  var monthlyRate = 0;

  // Capture Button Click
  $("#submit").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name").val().trim();
    role = $("#role").val().trim();
    startDate = $("#startDate").val().trim();
    monthlyRate = $("#monthlyRate").val().trim();

    // Code for handling the push
    database.ref().push({
      name: name,
      role: role,
      startDate: startDate,
      monthlyRate: monthlyRate,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });

  // Firebase watcher .on("child_added"
  database.ref().on("child_added", function(childSnapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = childSnapshot.val();

    // Console.loging the last user's data
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);


    // Change the HTML to reflect
    

    $("#employee-table").append("<tr class='well'><td class='member-name'> " +childSnapshot.val().name +
    " </td><td class='member-email'> " + childSnapshot.val().role +
    " </td><td class='member-age'> " + childSnapshot.val().startDate +
    " </td><td class='member-comment'> " + childSnapshot.val().monthlyRate +
    " </td></tr>");

  // Handle the errors

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
