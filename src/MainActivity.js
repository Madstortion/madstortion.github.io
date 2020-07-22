navigator.mediaDevices.getUserMedia({
	audio: {
		autoGainControl: false,
		echoCancellation: false,
		latency: 0,
		noiseSuppression: false
	}
}).then(function(stream) {
	var ctx = new AudioContext();
	var input = ctx.createMediaStreamSource(stream);
	
	function makeDistCurve(amount, n) {
		var curve = new Float32Array(n);
		var k = amount * 1.0;
		
		for (var i = 0, x; i <= n; i++) {
			x = i * 2 / n - 1;
			curve[i] = Math.tanh(0.5 * k * k * x * Math.PI);
		}
		
		return curve;
	}
	
	var sliders = document.querySelectorAll("input[type=\"range\"]");
	
	var dist = ctx.createWaveShaper();
	dist.curve = makeDistCurve(0.1, 44100);
	
	var bass = ctx.createBiquadFilter();
	bass.frequency.value = 250;
	bass.type = "lowshelf";
	
	var gain_b = ctx.createGain();
	gain_b.gain.value = 1;
	
	var mid = ctx.createBiquadFilter();
	mid.frequency.value = 1100;
	mid.type = "peaking";
	
	var gain_m = ctx.createGain();
	gain_m.gain.value = 1;
	
	var treble = ctx.createBiquadFilter();
	treble.frequency.value = 2500;
	treble.type = "peaking";
	
	var gain_t = ctx.createGain();
	gain_t.gain.value = 1;
	
	var presence = ctx.createBiquadFilter();
	presence.frequency.value = 3200;
	presence.type = "highshelf";
	
	var gain_p = ctx.createGain();
	gain_p.gain.value = 1;
	
	var level = ctx.createGain();
	level.gain.value = 1;
	
	input.connect(dist);
	dist.connect(bass);
	bass.connect(gain_b);
	gain_b.connect(level);
	dist.connect(mid);
	mid.connect(gain_m);
	gain_m.connect(level);
	dist.connect(treble);
	treble.connect(gain_t);
	gain_t.connect(level);
	presence.connect(gain_p);
	gain_p.connect(level);
	level.connect(ctx.destination);
	
	sliders[0].oninput = function(e) {
		dist.curve = makeDistCurve(this.value, 44100);
	};
	
	sliders[1].oninput = function(e) {
		gain_b.gain.value = this.value;
	};
	
	sliders[2].oninput = function(e) {
		gain_m.gain.value = this.value;
	};
	
	sliders[3].oninput = function(e) {
		gain_t.gain.value = this.value;
	};
	
	sliders[4].oninput = function(e) {
		gain_p.gain.value = this.value;
	};
	
	sliders[5].oninput = function(e) {
		level.gain.value = this.value;
	};
});
