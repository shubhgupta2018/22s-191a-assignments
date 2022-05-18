// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':11}

let theySlay = L.featureGroup();
let noSlay = L.featureGroup();

let layers = {
    'enby' : theySlay,
    'not enby' : noSlay
}

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmc3kR3gIJ5Mnm_4y3v00tZnGrAgUf1vbLZMx2DexawmGZwRdNObJYdlENj3hEiVQZ6xGNxTOUAura/pub?output=csv"


// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map)


// add layer control box
L.control.layers(null,layers).addTo(map)

//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//}).addTo(map);

// create a function to add markers
function addMarker(data){
    if(data['Describe what they looked like:'].includes('she/they') || data['What about them made you believe they were fruity?'].includes('/they')) {
        //the goal of this condition is to identify gay spottings of he/theys and she/theys 
        circleOptions.fillColor = "red"
        theySlay.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h1>ENBY ALERT! SLAY</h1> <h2>Describe what they looked like:</h2>  <p>${data['Describe what they looked like:']}</p> <h3>What about them made you believe they were fruity? </h3> <p> ${data['What about them made you believe they were fruity?']}</p>`))
        createButtons(data.lat,data.lng,data['Location Where You Last Saw a Gay Person:'])
    }
    else{
        circleOptions.fillColor = 'blue'
        noSlay.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h1>Naurrr it's a cis ;-; </h1> <h2>Describe what they looked like:</h2>  <p>${data['Describe what they looked like:']}</p> <h3>What about them made you believe they were fruity? </h3> <p> ${data['What about them made you believe they were fruity?']}</p>`))
        createButtons(data.lat,data.lng,data['Location Where You Last Saw a Gay Person:'])
    }
    return data
}

// create function to add buttons

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

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
        addMarker(data)
    })
    theySlay.addTo(map)
    noSlay.addTo(map)
    let allLayers = L.featureGroup([theySlay, noSlay]);
    map.fitBounds(allLayers.getBounds());
}

// this is our function call to get the data
loadData(dataUrl)