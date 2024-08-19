Array.from(document.querySelectorAll(".button")).forEach(
	item =>	{
		item.addEventListener("mousemove", function(e) {
			console.log("mousemove");
			this.style.setProperty("--x", e.offsetX + "px");
			this.style.setProperty("--y", e.offsetY + "px");
		});
	}
);