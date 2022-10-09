const colours = {
    waveform1: "#00ff00",
    waveform2: "#0000ff",
    axes: "#ffffff"
}

function showAxes(ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var xMin = 0;
    
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    
    // X-Axis
    ctx.moveTo(xMin, height/2);
    ctx.lineTo(width, height/2);
    
    // Y-Axis
    ctx.moveTo(width/2, 0);
    ctx.lineTo(width/2, height);
    
    ctx.stroke();
}

function sineWave(omega, x, time, phaseAngle) {

    return Math.sin(-x*omega - time - phaseAngle);
}

function plotFunction(ctx, time, waveNumber) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    
    if (waveNumber == 1) {
        ctx.strokeStyle = colours.waveform1;
        amplitude = document.getElementById("wave1-amplitude").value;
        frequency = document.getElementById("wave1-frequency").value;
        phaseAngle = document.getElementById('wave1-phase').value;
    }
    if (waveNumber == 2){
        ctx.strokeStyle = colours.waveform2;
        amplitude = document.getElementById("wave2-amplitude").value;
        frequency = document.getElementById("wave2-frequency").value;
        phaseAngle = document.getElementById('wave2-phase').value;
    }
    
    
    var y = 0;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
        omega = 2*Math.PI*frequency

        y = amplitude *  sineWave(omega, x-width/2, time*frequency, phaseAngle);

        ctx.lineTo(x, y + (height/2));
    }
    ctx.stroke();
    ctx.save();

}

function drawFrame() {
    var canvas = document.getElementById("canvas");
    document.getElementById("canvas").width = window.innerWidth;
    document.getElementById("canvas").height = window.innerHeight/3;
    var context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    showAxes(context);
    context.save();
    
    wave1_velocity = document.querySelector('input[name="wave1_velocity"]:checked')?.value;
    wave2_velocity = document.querySelector('input[name="wave2_velocity"]:checked')?.value;
    
    if (wave1_velocity == "forward"){
        wave1_time += 3;
    }
    if (wave1_velocity == "reverse"){
        wave1_time -= 3;
    }

    if (wave2_velocity == "forward"){
        wave2_time += 3;
    }
    if (wave2_velocity == "reverse"){
        wave2_time -= 3;
    }

    plotFunction(context, wave1_time, 1);
    plotFunction(context, wave2_time, 2);

    initArgand();

    context.restore();
    


    window.requestAnimationFrame(drawFrame);
}   

function init() {
    window.requestAnimationFrame(drawFrame);
}

var wave1_time = 0;
var wave2_time = 0;