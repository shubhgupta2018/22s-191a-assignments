// declare variables

// JavaScript const variable declaration
let zoomLevel = 12;
const mapCenter = [34.078390,-118.166810];

const map = L.map('the_map').setView(mapCenter, zoomLevel);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); // (2)!

//JavaScript let variable declaration to create a marker

///let marker = L.marker([34.078390, -118.166810]).addTo(map) // (3)!
       /// .bindPopup('Stomping Ground LA is where I have many fond dance memories from summer 2021! Sorah Yang usually reserves this space for Voyage/Vessel, and many contemporary teams practice here as well.')
       /// .openPopup('Stomping Ground LA');

///let marker2 = L.marker([34.027901, -118.040108]).addTo(map) // (3)!
     ///   .bindPopup('Snowglobe Perspective hosts many large choreographers for arguably affordable prices. This studio, although somewhat out of the way compared to other dance studios, is also known to show dancers their videos after classes.')
   ///     .openPopup('Snowglobe Perspective');

///let marker3 = L.marker([34.069229, -118.307854]).addTo(map) // (3)!
     ///   .bindPopup('Rüts Dance Studio is a newer dance studio and has supported many newer choreographers and dance teachers hoping to make a name for themselves. Rüts is slightly smaller than other studios but also has a more friendly vibe.')
      ///  .openPopup('Rüts Dance Studio');

function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2>`)
    return message
    };

addMarker(34.078390, -118.166810, 'Stomping Ground LA', 'Stomping Ground LA is where I have many fond dance memories from summer 2021! Sorah Yang usually reserves this space for Voyage/Vessel, and many contemporary teams practice here as well.')
addMarker(34.027901, -118.040108, 'Snowglobe Perspective', 'Snowglobe Perspective hosts many large choreographers for arguably affordable prices. This studio, although somewhat out of the way compared to other dance studios, is also known to show dancers their videos after classes.')
addMarker(34.069229, -118.307854, 'Rüts Dance Studio', 'Rüts Dance Studio is a newer dance studio and has supported many newer choreographers and dance teachers hoping to make a name for themselves. Rüts is slightly smaller than other studios but also has a more friendly vibe.')
