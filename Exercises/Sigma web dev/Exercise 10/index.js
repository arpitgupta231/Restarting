function Adjectives(){
    let rand=Math.random();
    if(rand <= 0.33) return "Crazy";
    else if(rand <= 0.66) return "Amazing";
    else return "Fire"
}
function Shop(){
    let rand=Math.random();
    if(rand <= 0.33) return "Engine";
    else if(rand <= 0.66) return "Foods";
    else return "Garments"
}
function another_word(){
    let rand=Math.random();
    if(rand <= 0.33) return "Bros";
    else if(rand <= 0.66) return "Ltd.";
    else return "Hub"
}

console.log(`${Adjectives()} ${Shop()} ${another_word()}`)