Peter_pan_song= "";
Harry_potter_them_song= "";
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_Peter_pan = "";
song_Harry_Potter = "";

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);

}

function preload(){
    Peter_pan_song = loadSound("music2.mp3")
    Harry_potter_them_song = loadSound("music.mp3");
}

function draw() {
    image(video,0,0,600,530);

     fill("#37ff00");
     stroke("#ff0000");

     song_Peter_pan = Peter_pan_song.isPlaying();
     console.log(song_Peter_pan);

     


    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Harry_potter_them_song.stop();
        if(song_Peter_pan == false){
            Peter_pan_song.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name: Peter Pan Song";
        }

        if(scorerightWrist > 0.2){
            circle(rightWrist_x,rihtWrist_y,20);
            Peter_pan_song.stop();
            if(song_Harry_Potter== false){
                Harry_potter_them_song.play();
            }
            else{
                document.getElementById("song_id").innerHTML = "Song Name:  Harry_potter_them_song";
            }
        }
    }
}

function modelLoaded() {
    console.log("PoseNet Is initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;

        leftWrist_x = results[0].pose.leftWrist_x;
        leftWrist_y = results[0].pose.leftWrist_y;
        console.log("leftWrist_x = " +leftWrist_x+" leftWrist_y = " +leftWrist_y);

        rightWrist_x = results[0].pose.righrWrist_x;
        rightWrist_y = results[0].pose.righrWrist_y;
        console.log("leftWrist_x = " +leftWrist_x+" leftWrist_y = " +leftWrist_y);

    }
}
