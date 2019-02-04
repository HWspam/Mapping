var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl, function(data) {
    features(data.features);
});

function features(data) {

  var arr=[];

  for (var i = 0; i < data.length; i++) {
    arr.push(
      L.circle([data[i].geometry.coordinates[1],data[i].geometry.coordinates[0]], {
        stroke: false,
        fillOpacity: 0.75,
        color: colors(data[i].properties.mag),
        fillColor: colors(data[i].properties.mag),
        radius: Math.pow(data[i].properties.mag,2)*10000
      }).bindPopup(`${data[i].properties.place}`));
  };

  var layer = L.layerGroup(arr);

  createMap(layer);
}

function colors(size) {
  if (size<=1){
    var color = "#B0F3B0";
  }
  else if (size<=2){
    var color = "#67C024";
  }
  else if (size<=3){
    var color = "#EFE448";
  }
  else if (size<=4){
    var color = "#EFAC48";
  }
  else if (size<=5){
    var color = "#EF8548";
  }
  else {var color = "#CB4747";}
return color;
}

function createMap(earthquake) {

var myMap = L.map("map", {
    center: [36.16, -115.13],
    zoom: 4,
    layers: [earthquake]
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 17,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

}


  
