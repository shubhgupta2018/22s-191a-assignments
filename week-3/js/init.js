// declare the map and add markers

let zoomLevel = 12;
const mapCenter = [34.078390,-118.166810];

const map = L.map('the_map').setView(mapCenter, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

addMarker(34.078390, -118.166810, 'Stomping Ground LA', 'Stomping Ground LA is where I have many fond dance memories from summer 2021! Sorah Yang usually reserves this space for Voyage/Vessel, and many contemporary teams practice here as well.')
addMarker(34.027901, -118.040108, 'Snowglobe Perspective', 'Snowglobe Perspective hosts many large choreographers for arguably affordable prices. This studio, although somewhat out of the way compared to other dance studios, is also known to show dancers their videos after classes.')
addMarker(34.069229, -118.307854, 'Rüts Dance Studio', 'Rüts Dance Studio is a newer dance studio and has supported many newer choreographers and dance teachers hoping to make a name for themselves. Rüts is slightly smaller than other studios but also has a more friendly vibe.')

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <p>${message}</p>`)
    createButtons(lat,lng,title);
    return message
}

// create function to add buttons

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); 
    })
    document.getElementById("contents").appendChild(newButton);
}