const { Board, Led } = require('johnny-five');
const board = new Board();

board.on('ready', () => {
	// Initialize the RGB LED
	const ledRGB = new Led.RGB({
		pins: {
			red: 6,
			green: 5,
			blue: 3
		}
    });
    const ledGreen = new Led(11);

	// Turn it on and set the initial color
	board.repl.inject({
		// Allow limited on/off control access to the
		// Led instance from the REPL.
		on: function() {
			ledRGB.on();
		},
		off: function() {
            ledRGB.stop();
			ledRGB.off();
		},
		color: function(color) {
			ledRGB.color(color);
		},
		blink: (speed = 100) => {
            ledRGB.blink(speed);
        },
        toggle: () => {
            ledRGB.toggle();
        },
        intensity: (value = 1) => {
            ledRGB.intensity(value);
        },
        fadeIn: (speed = 100) => {
            ledGreen.fadeIn(speed)
        },
        fadeOut: (speed = 100) => {
            ledGreen.fadeOut(speed)
        },
        pulse: () => {
            ledGreen.pulse({
                easing: "linear",
                duration: 3000,
                cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
                keyFrames: [0, 10, 0, 50, 0, 255],
                onstop() {
                  console.log("Animation stopped");
                }
            });
        },
        stopPulse: () => {
            ledGreen.stop();
        }
	});
});
