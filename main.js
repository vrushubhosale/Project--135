objects = [];
status = "";
video = "";

function setup(){
    video = createVideo('video.mp4');
    video.hide();
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 480, 380);
    if (status != ""){
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status : Objects DETECTED";
        document.getElementById("number_of_objects").innerHTML = "Number Of Objects = " + objects.length;

        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
    }
    }
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results)
    object = results;
}

function start(){
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "STATUS = DETECTING OBJECTS";
}

function modelLoaded(){
    console.log("Model Loaded !");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}