var Output = [];

var acx = new AudioContext();

function addDist() {
	var dist = acx.createWaveShaper();
	dist.curve = function(a) {
		var k = typeof a === "Number" ? a : 50;
		var n_samples = 44100;
		var curve = new Float32Array(n_samples);
		var deg = Math.PI / 180;
		var x;
		
		for (var i = 0; i < n_samples; ++i) {
			x = i * 2 / n_samples - 1;
			curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Mat.abs(x));
		}
		
		return curve;
	};
}

function addSource() {
	var elem = document.querySelector("audio");
	var selem = acx.createMediaElementSource(elem);
	
	Output.push(selem);
}

function attach() {
	for (var i = 0; i < Output.length - 1; i++) {
		Output[i].connect(Output[++i]);
	}
	
	Output[Output.length].connect(acx.destination);
}
