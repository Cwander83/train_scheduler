//========firebase startup
//console.log("conectedtoJS");
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
    //console.log(name);
    //console.log(destination);
    //console.log(firstTrainTime);
    //console.log(frequency);

    var newTrain = {
        name: name,
        destination: destination,
        firsttraintime: firstTrainTime,
        frequency: frequency

    };

    database.ref().push(newTrain);

    $("#traintable").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + firstTrainTime + "</td><td>" + frequency + "</td></tr>")

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#firsttraintime-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function (childSnapShot, prevChildKey) {

    var cs = childSnapShot.val();

    //console.log(childSnapShot.val());

    var nameFire = (cs.name);
    var destFire = (cs.role);
    var firstFire = (cs.date);
    var frequencyFire = (cs.rate);

    //var epmStartPretty = moment.unix(dateFire).format("MM/DD/YYYY")
    //console.log(epmStartPretty);

    $("#employeeList").append("<tr><td>" + nameFire + "</td><td>" + destFire + "</td><td>" + firstFire + "</td><td>" + frequencyFire + "</td></tr>")

})