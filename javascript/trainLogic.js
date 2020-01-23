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
    console.log("cilck");

    //use jquery to get the value (.val()) info from form on html
    var trainName = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainName = $("#firstTrain-input").val().trim();
    var frequency= $("#freq-input").val().trim();

    console.log(trainName,destination,firstTrainName,frequency);

    var trainForm= {
      train: trainName,
      destination: destination,
      firstTrainName: firstTrainName,
      frequency: frequency

      database.ref().push( 
        trainForm
        );
};

// need to store the intital data from firebase database (the ref() and push () )
database.ref().push( 
trainForm
);
  });

  
   
  //clear form after push
  //firebase wacther (snapshot) and snapshot.val()
  //moment.js here
  //display on HTML using jquery 
  // error handler 


