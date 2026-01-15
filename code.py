def add(a, b):
    return a + b


def subtract(a, b):
    return a - b


def multiply(a, b):
    return a * b


def divide(a, b):
    if b == 0:
        return "Error: Cannot divide by zero"
    return a / b


def calculate(a, operator, b):
    if operator == "+":
        return add(a, b)
    elif operator == "-":
        return subtract(a, b)
    elif operator == "*":
        return multiply(a, b)
    elif operator == "/":
        return divide(a, b)
    else:
        return "Invalid operator"


def calculator():
    print("Operators: +  -  *  /")
    while True:
        a = float(input("\nEnter first number: "))
        operator = input("Enter operator (+ - * /): ")
        b = float(input("Enter second number: "))

        result = calculate(a, operator, b)
        print("Result:", result)

        choice = input("\nDo you want to continue? (y/n): ")
        if choice.lower() != "y":
            print("Calculator closed.")
            break


# Run calculator
calculator()
