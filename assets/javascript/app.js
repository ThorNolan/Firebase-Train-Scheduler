$(document).ready(function() {

// ==================== GLOBALS ===========================

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA37HgkMz1HEAgQObgB3Vps1XXwDLZDYVA",
    authDomain: "train-scheduler-7a9e1.firebaseapp.com",
    databaseURL: "https://train-scheduler-7a9e1.firebaseio.com",
    projectId: "train-scheduler-7a9e1",
    storageBucket: "train-scheduler-7a9e1.appspot.com",
    messagingSenderId: "892889882380"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

// ======================= FUNCTIONS ====================

  // On-click listener for my #submit button to add a new train
  $("#submit").on("click", function(event) {
    event.preventDefault();

    // Grabbed data points from my add train form
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    trainFrequency = $("#trainFrequency").val().trim();

    // Temporary object for holding data from my 
    var newTrain = {
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      trainFrequency: trainFrequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    }
    // Code for handling the push
    database.ref().push(newTrain);

    // clear out my inputs on my form after it's submitted
    $("#trainName").val("");
	$("#destination").val("");
	$("#firstTrain").val("");
	$("#trainFrequency").val("");

  });

  // Firebase event that triggers when a new train is submitted from the form
  database.ref().on("child_added", function(childSnapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = childSnapshot.val();

    // Console.loging the last user's data
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().trainFrequency);


    // Change the HTML to reflect
    

    $("#train-table").append("<tr class='well'><td class='member-name'> " +childSnapshot.val().name +
    " </td><td class='member-email'> " + childSnapshot.val().role +
    " </td><td class='member-age'> " + childSnapshot.val().startDate +
    " </td><td class='member-comment'> " + childSnapshot.val().monthlyRate +
    " </td></tr>");

  // Handle the errors

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});
