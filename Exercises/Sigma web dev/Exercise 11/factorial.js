function factorial(n){
    let fact = 1;
    if (n === 0) {
        return 1
    }
    else if (n === 1) {
        return 1
    }
    else {
        for (let i = n; i >= 1; i--) {
            fact = fact * i;
        }
        return fact
    }
}
let n = prompt("Enter the no.")
let result= factorial(n);

alert(`Factorial of ${n} is ${result}`)

