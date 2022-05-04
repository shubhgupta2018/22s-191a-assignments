// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>Please list any and all resources that have been useful for you in learning about or accessing PrEP. If possible, please include their address.-- ${title}</h2> <h3> In as much detail as you are comfortable with, please describe how each of the resources you listed above have helped you in learning about or accessing PrEP.-- ${message}</h3>`)
    return message
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSe3tKw51PzIC6dhUv5W8DEqg77o-usnZuTLBdgddFiD9rm3edq-Qa0pqJyOlSxnVtWEmR0YT--5Vmy/pub?gid=210560818&single=true&output=csv"

function loadData(url){
    Papa.parse(dataUrl, {
        header: true,
        download: true,
        complete: results => console.log(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data.lat,data.lng,data["Please list any and all resources that have been useful for you in learning about or accessing PrEP. If possible, please include their address."],data["In as much detail as you are comfortable with, please describe how each of the resources you listed above have helped you in learning about or accessing PrEP."])
    })
}
// this is our function call to get the data
loadData(dataUrl)