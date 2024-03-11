song = " "
scoreRightWrist = 0
scoreLeftWrist =  0
rightWristX = 0
rightWristY = 0
leftWristX = 0
leftWristY = 0
velocidade = 1
function preload(){
    song = loadSound("music.mp3")
}
function tocar(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function setup(){
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
    }
    function draw(){
        image(video,0,0,600,500)
        fill("#FF000")
        stroke("#FF000")
        if(scoreLeftWrist > 0.1){
            circle(leftWristX, leftWristY, 20)
            numero = Number(leftWristY)
            ajustado = floor(numero)
            volume = ajustado / 500
            volumeMostrar = volume * 10
            document.getElementById("Volume").innerHTML = "Volume = " + volumeMostrar
            song.setVolume(volume)
        }
        if(scoreRightWrist > 0.1){
            circle(rightWristX, rightWristY, 20)
            if(rightWristY > 0 && rightWristY <= 100){
                document.getElementById("speed").innerHTML = "Velocidade = 0.5x"
                velocidade = 0.5
            }else if(rightWristY > 100 && rightWristY <= 200){
                document.getElementById("speed").innerHTML = "Velocidade = 1.0x"
                velocidade = 1
            }else if(rightWristY > 200 && rightWristY <= 300){
                document.getElementById("speed").innerHTML = "Velocidade = 1.5x"
                velocidade = 1.5
            }else if(rightWristY > 300 && rightWristY <= 400){
                document.getElementById("speed").innerHTML = "Velocidade = 2.0x"
                velocidade = 2.0
            }else if(rightWristY > 400 && rightWristY <= 500){
                document.getElementById("speed").innerHTML = "Velocidade = 2.5x"
                velocidade = 2.5
            }
            song.rate(velocidade)
        }
    }
    function modelLoaded(){
        console.log("modeloCarregado")
    }
    function gotPoses(results){
        if(results.length > 0){
        console.log(results)
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("leftWristX = " + leftWristX, "leftWristY = " + leftWristY)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("rightWristX = " + rightWristX, "rightWristY = " + rightWristY)
        scoreLeftWrist = results[0].pose.keypoints[9].score
        scoreRightWrist = results[0].pose.keypoints[10].score
        }
    }