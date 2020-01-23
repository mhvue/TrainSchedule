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


// need to store the intital data from firebase database (the ref() and push () )
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
  console.log(childSnapshot.val());

  //variable to hold our child info 
  var trainName = childSnapshot.val().train;
  var destination =childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var frequency= childSnapshot.val().frequency;
 
  console.log(trainName, destination, firstTrainTime, frequency);

//moment.js here
//make the firstTraintime here per moment.js syntax 
// var trainUnix= moment().unix(firstTrainTime);
// console.log(trainUnix);

var currentTime= moment().format("HH:mm");
console.log(currentTime);
//calculate the arrival data, departure data, frequency 




//display on HTML using jquery by creating rows 

});

  // error handler 


