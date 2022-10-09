function onArgandClick(event) {
    var rect = event.target.getBoundingClientRect();

    var ctx = event.target.getContext("2d");

    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.clearRect(0, 0, width, height);
    drawArgand(ctx);

    mouseX = event.clientX;
    mouseY = event.clientY;

    ctx.beginPath();
    ctx.strokeStyle = "green";


    relativeMouseX = (mouseX - rect.left) / ( rect.right - rect.left) - 0.5
    relativeMouseY = (mouseY - rect.bottom) / ( rect.top - rect.bottom) - 0.5


    ctx.arc(width/2+relativeMouseX*width, height/2-relativeMouseY*height, 5, 0, 2 * Math.PI);

    ctx.fillStyle = 'green';

    ctx.setLineDash([10, 10]);
    ctx.moveTo(width/2+relativeMouseX*width, height/2-relativeMouseY*height);
    ctx.lineTo(width/2+relativeMouseX*width, height/2);

    ctx.moveTo(width/2+relativeMouseX*width, height/2-relativeMouseY*height);
    ctx.lineTo(width/2, height/2);


    ctx.fill();
    ctx.stroke();
    ctx.save();

    ctx.beginPath();

    ctx.setLineDash([]);
    ctx.moveTo(width/2, height/2);
    if (relativeMouseX>0) {
        if (relativeMouseY>0) {
            ctx.arc(width/2, height/2, 20, 0, Math.atan(-relativeMouseY/relativeMouseX), true);
            phaseAngle = Math.atan(relativeMouseY/relativeMouseX)
        } else {
            ctx.arc(width/2, height/2, 20, 0, Math.atan(-relativeMouseY/relativeMouseX), true);
            document.getElementById("phase").value = Math.atan(-relativeMouseY/relativeMouseX);
            phaseAngle = Math.atan(relativeMouseY/relativeMouseX)+2*Math.PI
        }

    }
    if (relativeMouseX<0) {
        ctx.arc(width/2, height/2, 20, 0, Math.atan(-relativeMouseY/relativeMouseX)-Math.PI, true);
        document.getElementById("phase").value = Math.atan(-relativeMouseY/relativeMouseX)-Math.PI;
        phaseAngle = Math.atan(relativeMouseY/relativeMouseX)+Math.PI
    }

    document.getElementById("phase").value = phaseAngle;
    
    ctx.stroke();
    ctx.save();

    document.getElementById("amplitude").value = Math.hypot(relativeMouseX, relativeMouseY) * 80
}

function drawArgand(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";

    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    // X-Axis
    ctx.moveTo(0, height/2);
    ctx.lineTo(width, height/2);
    
    // Y-Axis
    ctx.moveTo(width/2, 0);
    ctx.lineTo(width/2, height);

    // Text
    ctx.fillStyle = "white";
    ctx.font = "20px Helvetica";
    ctx.fillText("j", width/2-10, 15);
    ctx.fillText("- j", width/2-22, height-6);
    ctx.fillText("1", width-15, height/2-5);
    ctx.fillText("-1", 0, height/2-5);

    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.save();
}


function initArgand() {
    var argand = document.getElementById("argand");
    var ctx = argand.getContext("2d");
    drawArgand(ctx);

    argand.addEventListener('mousedown', onArgandClick, false);

}