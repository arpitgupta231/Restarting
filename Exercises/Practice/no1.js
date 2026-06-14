// function ily(){
//     return new Promise((resolve,reject)=>{
//         let a = Math.random()
//         setTimeout(() => {
//             if(a<0.5) resolve("Waise, I liked u for a long time too")
//             else reject("SYBAU")
//         }, 3000);
//     })
// }



// let main = async ()=>{
//     try{let propose =await ily()
//     alert(propose)
//     }catch(err){
//         alert("just kidding, i do, ily")
//     }
// }
// main()


// Async Array Mapping: Write an asynchronous function that takes an array of numbers and returns a new array of Promises where each number is multiplied by 2 after a delay of 500 milliseconds.

// function intoTwo(arr) {
//     return arr.map((num)=>{
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(num*2)
//             },500);
//         })
//     })
// }

// async function main() {
//     let arr = [1, 2, 3, 5]
//     let promises= intoTwo(arr)
//     let result = await Promise.all(promises)
//     console.log(result)
// }
// main()

// You are developing a user authentication system, and you need to manage user authentication tokens. Implement a function named setAuthToken that takes an authentication token and sets it in localStorage with an expiration time.

function setAuthToken(token){
    let now = new Date()
    let authToken= {
        token : token,
        expiring_time : now.getTime() + 10000
    }
    localStorage
    localStorage.setItem("Token",JSON.stringify(authToken))
}

setAuthToken("chandini")

let t = localStorage.getItem("Token")
console.log(t)
