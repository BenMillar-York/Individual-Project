const amplitude_scaling_factor = 200

function drawArgandPoints(ctx) {

    wave1Phase = document.getElementById("wave1-phase").value;
    wave1Amplitude = document.getElementById("wave1-amplitude").value / amplitude_scaling_factor;

    wave2Phase = document.getElementById("wave2-phase").value;
    wave2Amplitude = document.getElementById("wave2-amplitude").value  / amplitude_scaling_factor;


    drawArgandPoint(ctx, wave1Amplitude, wave1Phase, colours.waveform1);
    drawArgandPoint(ctx, wave2Amplitude, wave2Phase, colours.waveform2);
}

function drawArgandPoint(ctx, amplitude, argument, colour) {
    // Takes in a polar coordinate and draws the point on the argand chart, ctx

    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.beginPath();
    ctx.strokeStyle = colour;
    ctx.fillStyle = colour;
    ctx.lineWidth = 2;

    // x = r cos(theta)
    x = amplitude * Math.cos(argument);

    // y = r sin(theta)
    y = amplitude * Math.sin(argument);

    // Point
    ctx.arc(width/2+x*width, height/2-y*height, 5, 0, 2 * Math.PI);

    // Dashed lines
    ctx.setLineDash([10, 10]);
    ctx.moveTo(width/2+x*width, height/2-y*height);
    ctx.lineTo(width/2+x*width, height/2);

    ctx.moveTo(width/2+x*width, height/2-y*height);
    ctx.lineTo(width/2, height/2);

    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([]);

    // Angle arc
    if (colour == colours.waveform1) {
        ctx.arc(width/2, height/2, 30, 0, -argument, true);
    } else {
        ctx.arc(width/2, height/2, 20, 0, -argument, true);
    }
    
    ctx.stroke();
    
    
    ctx.save();

}

function onArgandClick(event) {
    var rect = event.target.getBoundingClientRect();

    let phaseSlider, amplitudeSlider = null


    phaseSlider = document.getElementById("wave1-phase");
    amplitudeSlider = document.getElementById("wave1-amplitude");

    if (event.shiftKey){
        phaseSlider = document.getElementById("wave2-phase");
        amplitudeSlider = document.getElementById("wave2-amplitude")
    }


    var ctx = event.target.getContext("2d");

    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.clearRect(0, 0, width, height);
    drawArgand(ctx);

    mouseX = event.clientX;
    mouseY = event.clientY;


    relativeMouseX = (mouseX - rect.left) / ( rect.right - rect.left) - 0.5
    relativeMouseY = (mouseY - rect.bottom) / ( rect.top - rect.bottom) - 0.5

    if (relativeMouseX>0) {
        if (relativeMouseY>0) {
            arcAngle = Math.atan(-relativeMouseY/relativeMouseX);
            phaseAngle = Math.atan(relativeMouseY/relativeMouseX);
        } else {
            arcAngle = Math.atan(-relativeMouseY/relativeMouseX)
            phaseSlider.value = Math.atan(-relativeMouseY/relativeMouseX);
            phaseAngle = Math.atan(relativeMouseY/relativeMouseX)+2*Math.PI
        }

    }
    if (relativeMouseX<0) {
        arcAngle = Math.atan(-relativeMouseY/relativeMouseX)-Math.PI;
        phaseAngle = Math.atan(relativeMouseY/relativeMouseX)+Math.PI;
    }

    amplitude = Math.hypot(relativeMouseX, relativeMouseY)

    amplitudeSlider.value = amplitude * amplitude_scaling_factor
    phaseSlider.value = phaseAngle

    drawArgandPoints(ctx);
}

function drawArgand(ctx) {
    ctx.beginPath();

    ctx.strokeStyle = "rgb(128,128,128)";

    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    ctx.setLineDash([]);

    // X-Axis
    ctx.moveTo(0, height/2);
    ctx.lineTo(width, height/2);
    
    // Y-Axis
    ctx.moveTo(width/2, 0);
    ctx.lineTo(width/2, height);

    ctx.stroke();
    ctx.save();

    ctx.beginPath();

    // Dotted circle
    ctx.arc(width/2, height/2, (width-40)/2, 0, 2*Math.PI, true);
    ctx.setLineDash([10, 10]);
    ctx.stroke();
    ctx.save();

    ctx.beginPath();

    // Text
    ctx.fillStyle = "white";
    ctx.font = "20px Segoe UI";
    ctx.fillText("j", width/2-10, 15);
    ctx.fillText("- j", width/2-22, height-6);
    ctx.fillText("1", width-15, height/2-5);
    ctx.fillText("-1", 0, height/2-5);

    ctx.lineWidth = 1;
    ctx.stroke();


}


function initArgand() {
    var argand1 = document.getElementById("wave1-argand");
    var ctx1 = argand1.getContext("2d");
    drawArgand(ctx1);
    updateArgandPoint();
    

    argand1.addEventListener('mousedown', onArgandClick, false);
}

function updateArgandPoint() {
    var argand = document.getElementById("wave1-argand");
    var ctx = argand.getContext("2d");
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.clearRect(0, 0, width, height);
    drawArgand(ctx);

    amplitude = document.getElementById('wave1-amplitude').value/amplitude_scaling_factor;
    phase = document.getElementById('wave1-phase').value;

    drawArgandPoints(ctx);
}