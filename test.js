function getNumber(number) {
    return parseInt(number);
};

function addNumbers(numbers) {
    let number = getNumber(0);
    numbers.forEach(num => number = addNumber(getNumber(number), getNumber(num)));
    return number;
};

function addNumber(number1, number2) {
    return getNumber(number1) + getNumber(number2);
};

function random(maximum) {
    return getNumber(Math.random() * maximum);
};

const number = getNumber(1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);
console.log(addNumbers([Math.round(random(number)), Math.round(random(number)), Math.round(random(number)), Math.round(random(number)), Math.round(random(number))]));