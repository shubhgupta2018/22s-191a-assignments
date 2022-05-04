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
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2> Describe what they looked like: -- ${title}</h2> <h3> What about them made you believe they were fruity? -- ${message}</h3>`)
    return message
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmc3kR3gIJ5Mnm_4y3v00tZnGrAgUf1vbLZMx2DexawmGZwRdNObJYdlENj3hEiVQZ6xGNxTOUAura/pub?output=csv"

function loadData(url){
    Papa.parse(dataUrl, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results) //for debugging: this can help us see if the results are what we want
    results.data.forEach(data => {
        console.log(data) // for debugging: are we seeing each data correctly?
        addMarker(data.lat,data.lng,data['Describe what they looked like:'],data['What about them made you believe they were fruity?'])
    })
}

// this is our function call to get the data
loadData(dataUrl)