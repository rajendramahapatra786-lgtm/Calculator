const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const toggle = document.getElementById("toggle");
const calculator = document.querySelector(".calculator");
const historyPanel = document.getElementById("historyPanel");
const historyToggle = document.getElementById("historyToggle");
const closeHistory = document.getElementById("closeHistory");

let ANS = 0;

/* HISTORY TOGGLE */
historyToggle.addEventListener("click", () => {
    historyPanel.classList.toggle("active");
});

closeHistory.addEventListener("click", () => {
    historyPanel.classList.remove("active");
});

/* ADD HISTORY */
function addToHistory(expression, result) {
    const item = document.createElement("div");
    item.classList.add("history-item");
    item.innerText = `${expression} = ${result}`;

    item.addEventListener("click", () => {
        display.value = result;
        historyPanel.classList.remove("active");
    });

    historyPanel.prepend(item);

    if (historyPanel.children.length > 10) {
        historyPanel.removeChild(historyPanel.lastChild);
    }
}

/* CALCULATE */
function calculate() {
    try {
        if (!display.value.trim()) return;

        let expression = display.value;
        expression = expression.replace(/ANS/g, ANS);
        expression = expression.replace(/(\d+)%/g, "($1/100)");

        if (!/^[0-9+\-*/.%() ]+$/.test(expression)) {
            throw new Error();
        }

        const result = Function("return " + expression)();

        addToHistory(display.value, result);

        display.value = result;
        ANS = result;
    } catch {
        display.value = "Error";
    }
}

/* VALIDATION */
function canAddValue(value) {
    const lastChar = display.value.slice(-1);

    if ("+-*/".includes(lastChar) && "+-*/".includes(value)) {
        return false;
    }

    if (value === ".") {
        const parts = display.value.split(/[\+\-\*\/]/);
        const lastNumber = parts[parts.length - 1];
        if (lastNumber.includes(".")) return false;
    }

    return true;
}

/* BUTTON CLICK */
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.innerText;
        flashButton(value);

        if (value === "AC") display.value = "";
        else if (value === "⌫") display.value = display.value.slice(0, -1);
        else if (value === "=") calculate();
        else if (value === "ANS") display.value += "ANS";
        else {
            if (!canAddValue(value)) return;
            display.value += value;
        }
    });
});

/* DARK MODE */
toggle.addEventListener("click", () => {
    calculator.classList.toggle("light");
    toggle.innerText = calculator.classList.contains("light") ? "🌞" : "🌙";
});

/* KEYBOARD */
document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Flash normal keys
    if ("0123456789+-*/.%".includes(key)) {
        if (!canAddValue(key)) return;

        display.value += key;
        flashButton(key);
    }

    else if (key === "Enter") {
        event.preventDefault();
        calculate();
        flashButton("=");   // 🔥 here
    }

    else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
        flashButton("⌫");  // 🔥 here
    }

    else if (key === "Escape") {
        display.value = "";
        flashButton("AC"); // 🔥 here
    }
});

function flashButton(value) {
    const btns = document.querySelectorAll(".buttons button");

    btns.forEach(btn => {
        if (btn.innerText === value) {
            btn.classList.add("active");

            setTimeout(() => {
                btn.classList.remove("active");
            }, 120);
        }
    });
}