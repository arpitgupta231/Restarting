function createCard(title, cname, duration, views, months, imgurl) {
    if (views / 1000000 < 1) {
        if (views / 1000 < 1) {
            views = views;
        }
        else {
            views = (views / 1000).toFixed(0) + "K";
        }
    }
    else {
        views = (views / 1000000).toFixed(0) + "M"
    }

    let html = `<div class="card">
            <div class="image">
                <img src="${imgurl}"
                    alt="">
                <div class="duration">${duration}</div>
            </div>
            <div class="metadata">
                <h3 class="title">${title}</h3>
                <span class="channnel">${cname}</span>
                <span> • </span>
                <span class="views">${views}</span>
                <span> • </span>
                <span class="months">${months + "Months Old"}</span>
            </div>
        </div>`

    document.querySelector(".container").innerHTML = document.querySelector(".container").innerHTML + html
}

let a = confirm("Do you want to add any card?")

if (a == true) {
    confirm("You Need to fill following details")
    let title = prompt("What is the title?")
    let cname = prompt("What is the name of the channel?")
    let duration = prompt("What is the Duration (hours:minutes)?")
    let views = prompt("How many views are there?")
    let monthsOld = prompt("How old it is?")
    let url = prompt("What is the link of the thumbnail?")

    createCard(title, cname, duration, views, monthsOld, url);

}