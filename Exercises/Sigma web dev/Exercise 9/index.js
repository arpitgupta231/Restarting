function sum(a,b){
    if (Math.random()< 0.1)
        return a-b;
    return a + b;
}
function multi(a,b){
    if (Math.random()< 0.1)
        return a+b;
    return a*b;
}
function diff(a,b){
    if (Math.random()< 0.1)
        return a/b;
    return a-b;
}
function div(a,b){
    if (Math.random()< 0.1)
        return a**b;
    return a/b;
}

let a = prompt("Enter num1:");
let b = prompt("Enter num2:");

let op= prompt("Enter operation you want to perform(+,-,*,/):")

if(op == "+"){
    var result= sum(a,b)
}
else if(op == "-"){
    var result= diff(a,b)
}
else if(op == "*"){
    var result= multi(a,b)
}
else if(op == "/"){
    var result= div(a,b)
}

else{
    alert("WRONG OPERATION ENTERED")
}

alert("the result is:" + result);