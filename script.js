const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const toggle = document.getElementById("toggle");
const calculator = document.querySelector(".calculator");

let ANS = 0; // store last answer

// ===== CALCULATE FUNCTION =====
function calculate() {
    try {
        let expression = display.value;

        // replace ANS with last answer
        expression = expression.replace(/ANS/g, ANS);

        // convert % to /100
        expression = expression.replace(/%/g, "/100");

        const result = Function("return " + expression)();

        display.value = result;
        ANS = result;
        display.classList.remove("error");
    } catch {
        display.value = "Error";
        display.classList.add("error");
    }
}

// ===== CLEAR ERROR =====
function clearError() {
    if (display.value === "Error") {
        display.value = "";
        display.classList.remove("error");
    }
}

// ===== BUTTON CLICKS =====
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.innerText;
        clearError();

        if (value === "AC") {
            display.value = "";
        }
        else if (value === "⌫") {
            display.value = display.value.slice(0, -1);
        }
        else if (value === "=") {
            calculate();
        }
        else if (value === "ANS") {
            display.value += "ANS";
        }
        else if (btn.id !== "toggle") {
            display.value += value;
        }
    });
});

// ===== THEME TOGGLE =====
toggle.addEventListener("click", () => {
    calculator.classList.toggle("light");
    toggle.innerText = calculator.classList.contains("light") ? "🌞" : "🌙";
});

// ===== KEYBOARD INPUT =====
document.addEventListener("keydown", (event) => {
    const key = event.key;
    clearError();

    if ("0123456789+-*/.%".includes(key)) {
        display.value += key;
    }
    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }
    else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }
    else if (key === "Escape") {
        display.value = "";
    }
    else if (key.toLowerCase() === "a") {
        display.value += "ANS";
    }
});

