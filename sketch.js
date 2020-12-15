 function setup() {
	createCanvas(windowWidth, windowHeight);
	setupAudio();
}

function draw() {
	updateAudio();
	background(0);
	fill(255);
	ellipse(mouseX, mouseY, amp);
	for(let i = 0; i < fft.length; i++) {
		let freq = fft[i];
		let x = map(i, 0, fft.length, 0, width);
		let w = width / fft.length;
		rect(x, height, w, -freq);
	}
}
let mic, fftRaw, fft = [],
	waveform = [],
	amp = 0.0,
	ampStereo = {
		l: 0.0,
		r: 0.0
	},
	numBins = 512,
	bands = 12;
function setupAudio() {
	userStartAudio();
	mic = new p5.AudioIn();
	mic.start();
	fftRaw = new p5.FFT(0.75, numBins);
	fftRaw.setInput(mic);
}
function updateAudio() {
	fftRaw.analyze();
	amp = mic.getLevel() * 1000; 
	ampStereo.l = mic.amplitude.getLevel(0) * 500; 
	ampStereo.r = mic.amplitude.getLevel(1) * 500; 
	waveform = fftRaw.waveform(); 
	fft = fftRaw.logAverages(fftRaw.getOctaveBands(bands)); 
}