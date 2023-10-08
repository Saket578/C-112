console.log("ml5 version : " + ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ect9VItid/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model is loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "First prediction is " + prediction_1;
    speak_data_2 = " second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

Webcam.set({
    height: 300,
    width: 300,
    image_format: 'png',
    png_quality: 90
});

cam = document.getElementById("liveWebcamDisplay");
Webcam.attach(cam);

function checkGesture(){
    Webcam.snap(function(data_uri){
        document.getElementById("capture_container").innerHTML='<img id="pic" style="height:100%; width:100%;" src="'+data_uri+'"/>';
    }); 

    img = document.getElementById("pic");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        out = document.getElementById("output");

        if(results[0].label == "Good"){
            out.innerHTML = "&#128077;";
        }else if(results[0].label == "Bad"){
            out.innerHTML = "&#128078;";
        }else if(results[0].label == "Ok"){
            out.innerHTML = "&#128076;";
        }else if(results[0].label == "Nice"){
            out.innerHTML = "&#128076;";
        }else if(results[0].label == "Yoo"){
            out.innerHTML = "&#129304;";
        }
    }
}