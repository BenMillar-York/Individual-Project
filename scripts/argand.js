const amplitude_scaling_factor = 200

function drawArgandPoint(ctx, amplitude, argument, colour) {
    // Takes in a polar coordinate and draws the point on the argand chart, ctx

    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.beginPath();
    ctx.strokeStyle = colour;
    ctx.fillStyle = colour;
    ctx.lineWidth = 3;

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
    ctx.arc(width/2, height/2, 20, 0, -argument, true);
    ctx.stroke();
    
    
    ctx.save();

}

function onArgandClick(event) {
    var rect = event.target.getBoundingClientRect();

    let phaseSlider, amplitudeSlider = null

    if (event.target.id == "wave1-argand"){
        phaseSlider = document.getElementById("wave1-phase");
        amplitudeSlider = document.getElementById("wave1-amplitude")
        colour = colours.waveform1;
    }
    if (event.target.id == "wave2-argand"){
        phaseSlider = document.getElementById("wave2-phase");
        amplitudeSlider = document.getElementById("wave2-amplitude")
        colour = colours.waveform2;
    }


    var ctx = event.target.getContext("2d");

    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.clearRect(0, 0, width, height);
    drawArgand(ctx);

    mouseX = event.clientX;
    mouseY = event.clientY;

    ctx.beginPath();
    ctx.strokeStyle = colour;
    ctx.lineWidth = 3;


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

    drawArgandPoint(ctx, amplitude, phaseAngle, colour)

    amplitudeSlider.value = amplitude * amplitude_scaling_factor
    phaseSlider.value = phaseAngle
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
    ctx.arc(width/2, height/2, 130, 0, 2*Math.PI, true);
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
    var argand2 = document.getElementById("wave2-argand");
    var ctx1 = argand1.getContext("2d");
    var ctx2 = argand2.getContext("2d");
    drawArgand(ctx1);
    drawArgand(ctx2);
    updateArgand1Point();
    updateArgand2Point();
    

    argand1.addEventListener('mousedown', onArgandClick, false);
    argand2.addEventListener('mousedown', onArgandClick, false);
}

function updateArgand1Point() {
    var argand = document.getElementById("wave1-argand");
    var ctx = argand.getContext("2d");
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.clearRect(0, 0, width, height);
    drawArgand(ctx);

    amplitude = document.getElementById('wave1-amplitude').value/amplitude_scaling_factor;
    phase = document.getElementById('wave1-phase').value;

    drawArgandPoint(ctx, amplitude, phase, colours.waveform1);
}

function updateArgand2Point() {
    var argand = document.getElementById("wave2-argand");
    var ctx = argand.getContext("2d");
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.clearRect(0, 0, width, height);
    drawArgand(ctx);

    amplitude = document.getElementById('wave2-amplitude').value/amplitude_scaling_factor;
    phase = document.getElementById('wave2-phase').value;

    drawArgandPoint(ctx, amplitude, phase, colours.waveform2);
}