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

function trigWave(trigOperator, omega, x, time) {

    if (trigOperator == "sine") {
        return Math.sin(x*omega - time);
    }

    if (trigOperator == "cosine") {
        return Math.cos(x*omega - time);
    }
    
    if (trigOperator == "tangent") {
        return Math.tan(x*omega - time);
    }
}

function plotFunction(ctx, trigOperator, time) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    
    ctx.strokeStyle = colours.waveform;
    
    var x = 4;
    var y = 0;
    var amplitude = document.getElementById("amplitude").value;
    var frequency = document.getElementById("frequency").value;;
    var timeScale = 0.04;
    ctx.beginPath();
    while (x < width) {
        omega = 2*Math.PI*frequency

        y = amplitude *  trigWave(trigOperator, omega, x, time*timeScale);

        ctx.lineTo(x, y + (height/2));
        x++;
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
    
    trigOperator = document.querySelector('input[name="wave_function"]:checked')?.value;

    console.log(trigOperator)
    
    plotFunction(context, trigOperator, time);
    context.restore();
    
    time += 1;
    window.requestAnimationFrame(drawFrame);
}   

function init() {
    window.requestAnimationFrame(drawFrame);
}

var time = 0;