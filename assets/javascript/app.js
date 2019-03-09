$(document).ready(function() {

// ==================== VARIABLES =========================

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

// =============== FUNCTIONS AND LISTENERS =================

  // On-click listener for my #submit button to add a new train
  $("#submit").on("click", function(event) {
    event.preventDefault();

    // Grabbed data points from my add train form
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    trainFrequency = $("#trainFrequency").val().trim();

    // Temporary object for holding this data
    var newTrain = {
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      trainFrequency: trainFrequency,
    }
    
    database.ref().push(newTrain);

    // clear out my inputs on my form after it's submitted
    $("#trainName").val("");
	$("#destination").val("");
	$("#firstTrain").val("");
	$("#trainFrequency").val("");

  });

  // Firebase event that triggers when a new train is submitted from the form
  database.ref().on("child_added", function(childSnapshot) {
    
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().trainFrequency);

    // store data from the childSnapshot into variables
	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().firstTrain;
	var trainFrequency = childSnapshot.val().trainFrequency;

    // Following are my Moment.js time conversions and calculations

    // Gets the current time for my user
    var currentTime = moment();
    
    // First time
	var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");

	// Difference between times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

	// Time apart (remainder)
	var tRemainder = diffTime % trainFrequency;

	// Minutes until train
	var tMinutesTillTrain = trainFrequency - tRemainder;

	// Next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");

    // console.logs to check my time calculations
    console.log(firstTimeConverted);
    console.log(tRemainder);
    console.log("Current Time:" + moment(currentTime).format("HH:mm"));
    console.log("Time Difference: " + diffTime);
    console.log("Minutes Until Next Train: " + tMinutesTillTrain);
	console.log("Arrival Time: " + moment(nextTrain).format("HH:mm"));

    // append my updated values to the #tableData section of my trainTable
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

    // Handle possible errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});
