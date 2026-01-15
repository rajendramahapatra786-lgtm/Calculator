const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const toggle = document.getElementById("toggle");
const calculator = document.querySelector(".calculator");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.innerText;

        if (value === "AC") {
            display.value = "";
        }
        else if (value === "⌫") {
            display.value = display.value.slice(0, -1);
        }
        else if (value === "=") {
            try {
                display.value = eval(display.value);
            } catch {
                display.value = "Error";
            }
        }
        else if (btn.id !== "toggle") {
            display.value += value;
        }
    });
});

toggle.addEventListener("click", () => {
    calculator.classList.toggle("light");
    toggle.innerText = calculator.classList.contains("light") ? "🌞" : "🌙";
});
