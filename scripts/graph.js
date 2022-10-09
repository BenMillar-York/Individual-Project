const colours = {
    waveform1: "#238636",
    waveform2: "#38a6ff",
    summation: "#EF633F",
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
    return Math.sin(x*omega - time - (2*Math.PI-phaseAngle));
}

function plotFunction(ctx, time, waveNumber) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.lineWidth = 2;
    
    if (waveNumber == 1) {
        ctx.strokeStyle = colours.waveform1;
        amplitude = document.getElementById("wave1-amplitude").value;
        frequency = document.getElementById("wave1-frequency").value;
        phaseAngle = document.getElementById('wave1-phase').value;
        colour = colours.waveform1;
    }
    if (waveNumber == 2){
        ctx.strokeStyle = colours.waveform2;
        amplitude = document.getElementById("wave2-amplitude").value;
        frequency = document.getElementById("wave2-frequency").value;
        phaseAngle = document.getElementById('wave2-phase').value;
        colour = colours.waveform2;
    }
    
    
    var y = 0;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
        omega = 2*Math.PI*frequency

        y = - amplitude *  sineWave(omega, x-width/2, time*frequency, phaseAngle);

        ctx.lineTo(x, y + (height/2));
    }

    ctx.stroke();
    ctx.save();

}

function plotSummation(ctx, time1, time2) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.lineWidth = 3;
    ctx.strokeStyle = colours.summation;

    isSummationDashed= document.getElementById('summation_dashed').checked;
    if (isSummationDashed) {
        ctx.setLineDash([15, 20]);
    } else {
        ctx.setLineDash([]);
    }
    

    frequency1 = document.getElementById("wave1-frequency").value;
    frequency2 = document.getElementById("wave2-frequency").value;

    amplitude1 = document.getElementById("wave1-amplitude").value;
    amplitude2 = document.getElementById("wave2-amplitude").value;

    phaseAngle1 = document.getElementById('wave1-phase').value;
    phaseAngle2 = document.getElementById('wave2-phase').value;
    
    var y = 0;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
        omega1 = 2*Math.PI*frequency1
        omega2 = 2*Math.PI*frequency2

        wave1 = amplitude1 *  sineWave(omega1, x-width/2, time1*frequency1, phaseAngle1)
        wave2 = amplitude2 *  sineWave(omega2, x-width/2, time2*frequency2, phaseAngle2)

        y = - (wave1 + wave2);

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
    
    wave1_direction = document.querySelector('input[name="wave1_direction"]:checked')?.value;
    wave2_direction = document.querySelector('input[name="wave2_direction"]:checked')?.value;

    let wave1_velocity, wave2_velocity = 3;
    wave1_velocity = parseInt(document.getElementById('wave1-velocity').value);
    wave2_velocity = parseInt(document.getElementById('wave2-velocity').value);
    
    if (wave1_direction == "forward"){
        wave1_time += wave1_velocity;
    }
    if (wave1_direction == "reverse"){
        wave1_time -= wave1_velocity;
    }
    if (wave1_direction == "stationary"){
        wave1_time = 0;
    }

    if (wave2_direction == "forward"){
        wave2_time += wave2_velocity;
    }
    if (wave2_direction == "reverse"){
        wave2_time -= wave2_velocity;
    }
    if (wave2_direction == "stationary"){
        wave2_time = 0;
    }

    plotFunction(context, wave1_time, 1);
    plotFunction(context, wave2_time, 2);

    isSummationEnabled = document.getElementById('summation_enabled').checked;

    if (isSummationEnabled) {
        plotSummation(context, wave1_time, wave2_time);
    }

    context.restore();
    


    window.requestAnimationFrame(drawFrame);
}   

function init() {
    initArgand();
    window.requestAnimationFrame(drawFrame);
}

var wave1_time = 0;
var wave2_time = 0;