window.onload = () => {
	let notes = ["A", "B", "C", "D", "E", "F", "G"]
	let currentNote = getNote()
	let noteElement = document.querySelector(".note")
	let bpm = 70
	let stringElements = document.querySelectorAll(".string")
	noteElement.innerHTML = notes[currentNote]

	let direction = 2
	let directionEnum = {
		DOWN: 0,
		UP: 1,
		STARTING: 2
	}
	let position = 0

	// string change/metronome sound interval
	setInterval(() => {
		stringElements[position].classList.remove("active")

		switch (direction) {
			case directionEnum.DOWN:
				if (position == 5) { // Check if we're at bottom
					direction = directionEnum.UP
				} else if (position == 4) {
					noteElement.innerHTML = notes[getNote()]
					position++
				} else {
					position++
				}
				break;
			case directionEnum.UP:
				if (position == 0) { // Check if we're at top
					direction = directionEnum.DOWN
				} else if (position == 1) {
					noteElement.innerHTML = notes[getNote()]
					position--
				} else {
					position--
				}
				break;
			case directionEnum.STARTING:
				direction = directionEnum.DOWN
				break;
		}

		stringElements[position].classList.add("active")

		play()
	}, (60/bpm) * 1000)

	function getNote() {
		return (Math.floor(Math.random() * (7 - 1 + 1)) + 1) - 1
	}

	function play() {
		var audio = new Audio('./metronome.wav');
		audio.play();
	}
}
