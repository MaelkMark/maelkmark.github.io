document.querySelector(".clear-all").addEventListener("click", function() {
	Array.from(document.querySelectorAll(".formInput")).forEach(item => item.value = "");
	Array.from(document.querySelectorAll(".formRadio")).forEach(item => item.checked = false);
});

Array.from(document.querySelectorAll(".numberInput")).forEach(
	item => {
		item.addEventListener("input", () => {
			item.value = formatNum(item.value);
		});
	}
);

Array.from(document.querySelectorAll(".input .unit")).forEach(
	item => {
		item.addEventListener("click", () => {
			item.parentElement.querySelector("& .formInput").focus();
		});
	}
);

function calculate() {
	let incomplete = false;

	Array.from(document.querySelectorAll(".formInput")).forEach(
		item => {
			const inputEmpty = item.value.length > 0;
			incomplete = incomplete || item.value.length == 0;
			item.parentElement.parentElement.setAttribute("error", inputEmpty ? "0" : "1");
		}
	);
	Array.from(document.querySelectorAll(".optionContainer")).forEach(
		item => {
			const filled = Boolean(item.querySelector("input[type='radio']:checked"));
			incomplete = incomplete || !filled;
			item.setAttribute("error", filled ? "0" : "1");
		}
	);
	
	if (incomplete) {
		document.querySelector(".results").setAttribute("results", "empty");
		return;
	}

	const mortgageAmount = parseNum(document.querySelector(".mortgage-amount-input").value);
	const mortgageTerm = parseNum(document.querySelector(".mortgage-term-input").value);
	const interestRate = parseNum(document.querySelector(".interest-rate-input").value);
	const mortgageType = document.querySelector(".mortgage-type input[type='radio']:checked").value;

	/* const monthlyInterestPayments = amount * (rate / 100) / 12;
	const avgMonthly = amount / (term * 12);
	const calc2 = amount / 3 * (rate / 100) / 12 + avgMonthly; */

	const monthlyInterestRate = interestRate / 12 / 100;
	const totalPayments = mortgageTerm * 12;

	let monthlyPayment, totalRepay;

	if (mortgageType === 'repayment') {
		const numerator = mortgageAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments);
		const denominator = Math.pow(1 + monthlyInterestRate, totalPayments) - 1;
		monthlyPayment = numerator / denominator;
		totalRepay = monthlyPayment * totalPayments;
	} else if (mortgageType === 'interest-only') {
		monthlyPayment = mortgageAmount * monthlyInterestRate;
		totalRepay = monthlyPayment * totalPayments + mortgageAmount;
	}

	monthlyPayment = formatNum(monthlyPayment, true);
	totalRepay = formatNum(totalRepay, true);

	document.querySelector(".resultMonthly").innerHTML = "£" + monthlyPayment;
	document.querySelector(".resultTotal").innerHTML = "£" + totalRepay;
	document.querySelector(".results").setAttribute("results", "completed");
}

function formatNum(num, round) {
	if (round) {
		num = Math.round(num * 100) / 100;
	}
	const numStr = num.toString().replace(/[^0-9.]/g, "").split(".");
	const decimals = numStr[0];
	const fractions = numStr.length >= 2 ? "." + numStr[1] : "";
	const formattedDecimals = [...decimals].map((item, index, array) => (array.length - index - 1) % 3 == 0 && index != array.length - 1 ? item + "," : item).join("");
	return formattedDecimals + (fractions || "");
}

function parseNum(num) {
	return num.replace(/\,/g, "") * 1;
}