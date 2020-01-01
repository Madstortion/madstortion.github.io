var ctx = document.querySelector("canvas").getContext("2d");

window.document.body.children[0].onclick = function(e) {
	var acx = new AudioContext();var osc = acx.createOscillator();
	osc.frequency.value = 440;
	osc.type = "square";
	osc.connect(acx.destination);

	osc.start();
	setTimeout(function() {
		osc.stop();
		osc = null;
		ctx.fillStyle = "rgba(255, 127, 63)";
		ctx.fillRect(ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width / 4, ctx.canvas.height / 4);
	}, 500);
};
