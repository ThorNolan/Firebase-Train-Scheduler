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

	  var trainName = childSnapshot.val().trainName;
	  var trainDest = childSnapshot.val().destination;
	  var firstTrain = childSnapshot.val().firstTrain;
	  var trainFreq = childSnapshot.val().trainFrequency;


	   // Declare variable
  		var trainFreq;

    // Time is to be entered on the entry form
        var firstTime = 0;
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	    console.log(firstTimeConverted);

    // this variable keeps track of the current time utilizing the Moment.js library 
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // this gets me the difference between the durrent time
    var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDifference);

    // Time apart (remainder)
    var tRemainder = timeDifference % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    // append my updated values to the #tableData section of my trainTable
    $("#trainTable > tbody").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().trainFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td></tr>" + tminutesTillTrain + "</td></tr>");

    // Handle possible errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});
