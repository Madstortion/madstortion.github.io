var acx = new AudioContext();
var ctx = document.querySelector("canvas").getContext("2d");

var osc = acx.createOscillator();
osc.frequency.value = 440;
osc.type = "square";
osc.connect(ctx.destination);

osc.start();
setTimeout(function() {
	osc.stop();
	osc = null;
	ctx.fillRect(canvas.width / 2, canvas.height / 2, canvas.width / 4, canvas.height / 4);
}, 500);
