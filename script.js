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

// keyboard input
toggle.addEventListener("click", () => {
    calculator.classList.toggle("light");
    toggle.innerText = calculator.classList.contains("light") ? "🌞" : "🌙";
});

document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Numbers & operators
    if (
        (key >= "0" && key <= "9") ||
        key === "+" || key === "-" ||
        key === "*" || key === "/" ||
        key === "."
    ) {
        display.value += key;
    }

    // Enter = calculate
    else if (key === "Enter") {
        event.preventDefault();
        try {
            display.value = eval(display.value);
        } catch {
            display.value = "Error";
        }
    }

    // Backspace = delete
    else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }

    // Escape = clear
    else if (key === "Escape") {
        display.value = "";
    }
});
