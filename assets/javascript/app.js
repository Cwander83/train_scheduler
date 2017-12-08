//========firebase startup
console.log("conectedtoJS");
var config = {
    apiKey: "AIzaSyDYjXKopvYZolIlNad3rX2jCBSbCYx_k8o",
    authDomain: "train-scheduler-d49cb.firebaseapp.com",
    databaseURL: "https://train-scheduler-d49cb.firebaseio.com",
    projectId: "train-scheduler-d49cb",
    storageBucket: "train-scheduler-d49cb.appspot.com",
    messagingSenderId: "48676926096"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function (event) {
    event.preventDefault();
    var name = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = $("#firsttraintime-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    console.log(name);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

var newTrain = {
    name: name,
    destination: destination,
    firsttraintime: firstTrainTime,
    frequency: frequency

};

database.ref().push(newTrain);

$("#traintable").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+firstTrainTime+"</td><td>"+frequency+"</td></tr>")

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#firsttraintime-input").val("");
    $("#frequency-input").val("");

  });