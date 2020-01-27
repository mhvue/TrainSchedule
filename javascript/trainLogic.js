//need to intitalize our firebase 
var firebaseConfig = {
    apiKey: "AIzaSyCeFSrGsOkzW0UQ4NXdmbdeU02G6q69DUI",
    authDomain: "trainschedule-67dd5.firebaseapp.com",
    databaseURL: "https://trainschedule-67dd5.firebaseio.com",
    projectId: "trainschedule-67dd5",
    storageBucket: "trainschedule-67dd5.appspot.com",
    messagingSenderId: "718561336921",
    appId: "1:718561336921:web:e73c6c9854b2e6632fdb48"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //var to hold our database 
  var database = firebase.database();

  //on click from submit button 
  $("#addTrain-btn").on("click", function() {
    event.preventDefault();
    // console.log("cilck");

    //use jquery to get the value (.val()) info from form on html
    var trainName = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = $("#firstTrain-input").val().trim();
    var frequency= $("#freq-input").val().trim();

    console.log(trainName,destination,firstTrainTime,frequency);

    var trainForm= {
      train: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
};

// need to store the intital data from firebase database 
database.ref().push( trainForm);

//clear form after push
$("#trainName-input").val(" ");
$("#destination-input").val(" ");
$("#firstTrain-input").val(" ");
$("#freq-input").val(" ");

}); //closure for click function 

  //firebase watcher(snapshot) and snapshot.val() to add a train
  // (which is a child so needed childSnpshot) into our Current Train Schedule 
database.ref().on("child_added", function(childSnapshot) {
  
  //variable to hold our child info 
  var trainName = childSnapshot.val().train;
  var destination =childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var frequency= childSnapshot.val().frequency;
  console.log(trainName, destination, firstTrainTime, frequency);

var firstTrainTime=0;
//moment.js here
//make the firstTraintime  (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

var currentTime= moment().format("HH:mm"); 
console.log("current time:" + currentTime);

// //difference in times 
var differenceTime= moment().diff(moment(firstTimeConverted), "minutes");
console.log("diff time:" + differenceTime);

// Time apart (remainder)
var tRemainder = differenceTime % frequency;
console.log(tRemainder);

 // Minute Until Train
 var minTilTrain = frequency - tRemainder;
 console.log("min til train: " + minTilTrain);

//calculate the arrival data
 var arrivalTime= moment().add(minTilTrain, "minutes");
 var arrivalData= moment(arrivalTime).format("hh:mm A");
console.log(arrivalTime);
console.log(arrivalData);

//calculate minutes away
var minAway= moment(arrivalTime).diff(moment(), "minutes");
console.log("Min away: " + minAway);

//creating the buttons to give user options to remove train info 
var removeBtn = $("<button>");
removeBtn.attr("data-train", trainName);
removeBtn.addClass("deleteTrain");
removeBtn.text("X");
  


//display on HTML using jquery by creating rows 
var trainRow= $("<tr>").attr("id", "trainInfo").append(
// $("<td>").text(trainName).prepend(removeBtn), commented this out due to unable to add remove button to work
$("<td>").text(trainName),
$("<td>").text(destination),
$("<td>").text(frequency), 
$("<td>").text(arrivalData), 
$("<td>").text(minAway)
);


// Attempting to add remove btn...this is the  clicked function but unable to get td to remove 
// $(document.body).unbind().on("click", ".deleteTrain", function() {
//   console.log("click");
//   var testingBtn = $(this).attr("data-train");
//   console.log(testingBtn);
//   $(".trainInfo" + testingBtn).remove();
// });

//append to table  of Curren Train Schedule
$("#trainSchedule-table").append(trainRow);
},function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});




