const colours = {
    waveform: "#00ff00",
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

function sineWave(wave_velocity, omega, x, time) {

    let phaseAngle = document.getElementById('phase').value;

    return Math.sin(-x*omega - time - phaseAngle);
}

function plotFunction(ctx, time) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    
    ctx.strokeStyle = colours.waveform;
    
    var y = 0;
    var amplitude = document.getElementById("amplitude").value;
    var frequency = document.getElementById("frequency").value;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
        omega = 2*Math.PI*frequency

        y = amplitude *  sineWave(wave_velocity, omega, x-width/2, time*frequency);

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
    
    wave_velocity = document.querySelector('input[name="wave_velocity"]:checked')?.value;
    
    if (wave_velocity == "forward"){
        time += 3;
    }
    if (wave_velocity == "reverse"){
        time -= 3;
    }

    plotFunction(context, time);

    initArgand();

    context.restore();
    


    window.requestAnimationFrame(drawFrame);
}   

function init() {
    window.requestAnimationFrame(drawFrame);
}

var time = 0;