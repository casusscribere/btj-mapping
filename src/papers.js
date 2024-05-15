// Import core dependencies.
import { $, L } from "./core.js";

/**
 * We establish a set of constants that will be used to create a map object.
 */
const baseMap = L.tileLayer(
	'https://api.mapbox.com/styles/v1/agiroux/ckgjrjbsj09w01aqxz1w7wuqy/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWdpcm91eCIsImEiOiJjajE0ZmxxdjgwMDRxMnFvZGNuYzFyOHFxIn0.7KcKhzGSwCPb10LuCfWZYg', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
	});


function onEachFeature(feature, layer) {
  
    let popupContent = "<p style='text-align:center'><em><span style='font-size: 120%;'>" + feature
        .properties.Newspaper + "</span></em><br>" + feature.properties.Date + ", p. " + feature.properties
        .Page + ", c. " + feature.properties.Column + "<br>" + feature.properties.City + ", " + feature
        .properties.State + "<br><b>" + feature.properties.Title + "</b></p>";

    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
}

// This is the center of the United States.
let center = [45.09388074584755, -100.08388945468975];

// Create a map object.
let map = L.map('map', {
    layers: [baseMap],
    center: center,
    minZoom: 4,
    maxZoom: 12,
    zoom: 4
});

// This is the path to the GeoJSON file.
const file = "papers/index.geojson";

// Load the GeoJSON data from the file.
$.getJSON(file, (data) => {
	// Add the GeoJSON data to the dist object.
	L.geoJSON(data, { onEachFeature: onEachFeature }).addTo(map);
    //console.log(data);

    // Fit the map to the bounds of the GeoJSON data.
    //map.setView([center], 4);
});


