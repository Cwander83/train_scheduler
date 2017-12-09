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
    var firstTrainTime = moment($("#firsttraintime-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();
    //console.log(name);
    //console.log(destination);
    //console.log(firstTrainTime);
    //console.log(frequency);

    var newTrain = {
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency

    };

    database.ref().push(newTrain);

    //$("#traintable").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + firstTrainTime + "</td><td>" + frequency + "</td></tr>")

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#firsttraintime-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function (SnapShot) {

    var cs = SnapShot.val();
    //vars for the info coming from firebase to the table
    var nameFire = (cs.name);
    var destFire = (cs.destination);
    var firstFire = (cs.firstTrainTime);
    var frequencyFire = (cs.frequency);

    // var with the current date and time
    var current = moment();
    console.log("current: " + current);

    var timeNow = moment(current).format("HH:mm");
    console.log("timenow: " + timeNow);

    TimeConverted = moment(firstFire, "HH:mm").subtract(1, "years");
    console.log("time converted: " + TimeConverted);

    diffTime = moment().diff(moment(TimeConverted), "minutes");
    console.log("diff in time: " + diffTime);

    var tRemainder = diffTime % frequencyFire;

    var minToTrain = frequencyFire - tRemainder;
    console.log("minutes til train: " + minToTrain);

    nextTrain = moment().add(minToTrain, "minutes");
    console.log("nexttrain: " + nextTrain);
    nextTrainformat = moment(nextTrain).format("mm");
    console.log("nexttrainformat: "+nextTrainformat);




    $("#traintable").append("<tr><td>" + nameFire + "</td><td>" + destFire + "</td><td>" + firstFire + "</td><td>" + frequencyFire + "</td><td>" + nextTrainformat + "</td></tr>")

})