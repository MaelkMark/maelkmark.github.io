let remaining = [14, 0, 0, 0];
const ranges = [{min: 0, max: 13}, {min: 0, max: 23}, {min: 0, max: 59}, {min: 0, max: 59}];

tick();
let tickInterval = setInterval(tick, 1000);

function tick() {
	for (let i in remaining) {
		i *= 1;
		const block = document.querySelector(`.countdown-block:nth-child(${i + 1})`);
		Array.from(block.querySelectorAll(".countdown-card-prev")).forEach(item => item.innerHTML = ("00" + remaining[i]).substr(-2));
		Array.from(block.querySelectorAll(".countdown-card-next")).forEach(item => item.innerHTML = ("00" + getNextRemaining().remaining[i]).substr(-2));
	}

	const nextRemaining = getNextRemaining();
	remaining = nextRemaining.remaining;
	const changed = nextRemaining.changed;

	for (let i in remaining) { 
		i *= 1;
		if (changed[i]) {
			const block = document.querySelector(`.countdown-block:nth-child(${i + 1})`);
			[block.querySelector(".countdown-card-flip-backface"), block.querySelector(".countdown-card-flip-face")].forEach(item => {item.classList.remove("animate"); setTimeout(() => item.classList.add("animate"), 50)});
		}
	}
}

function getNextRemaining() {
	let nextRemaining = [...remaining];
	let changed = Array(nextRemaining.length).fill(false);
	for (let i = nextRemaining.length - 1; i >= 0; i--) {
		nextRemaining[i]--;
		changed[i] = true;
		if (nextRemaining[i] >= ranges[i].min) {
			break;
		}
		/* if (i == 0) {
			clearInterval(tickInterval);
			return {remaining: Array(nextRemaining.length).fill(0), changed: Array(nextRemaining.length).fill(false)};
		} */
		nextRemaining[i] = ranges[i].max;
	}
	return {remaining: nextRemaining, changed};
}