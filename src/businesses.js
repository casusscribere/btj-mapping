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
  
    let popupContent =`<p class='popup'><em>${feature
        .properties.name}</em><br>Address: ${feature
            .properties.street}<br>Year: ${feature
                .properties.year}</p>`;

    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
}

// This is the center of the Parramore.
const center = [28.537605555555556, -81.38484444444444];

// Create a map object.
let map = L.map('map', {
    layers: [baseMap],
    center: center,
    minZoom: 16,
    maxZoom: 22,
    zoom: 20
});

const imageUrl = 'maps/parramore.jpg';
const errorOverlayUrl = 'maps/error.png';
const altText = 'Composite image of Parramore, FL.';

// Upper left corner of the image.
//   28°33'3.58"N
//  81°23'21.93"W
// In decimal degrees:
// 28.551207033771966, -81.38942773343123
const upperLeftCorner = [28.551207033771966, -81.38942773343123];

// Lower right corner of the image.
//   28°31'39.11"N
//   81°22'47.80"W
// In decimal degrees:
//   28.52770967372553, -81.37993367576095
const lowerRightCorner = [28.52770967372553, -81.37993367576095];

// Create a lat/lng bounds object from the upper left and lower right corners.
const latLngBounds = L.latLngBounds([upperLeftCorner, lowerRightCorner]);

// Add the image overlay to the map.
L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.8,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true
}).addTo(map);

L.rectangle(latLngBounds).addTo(map);
map.fitBounds(latLngBounds);

// Create array to hold GeoJSON filenames.
const districtGeoJSONFiles = [
    "1910-1929",
    "1930-1939",
    "1940-1949",
    "1950-1959",
    "1960-1969",
    "1970-1979",
    "1980-1989",
    "1990-1999",
    "2015-2022"
];

// Create an group object to store GeoJSON objects.
let geoJSONGroup;

// Create an object to store the processed district slices.
let districtSlices = {};

/**
 * geoLoader() is a function that loads GeoJSON data from a file.
 * Uses jQuery's $.getJSON() method to load the GeoJSON data.
 * 
 * @function geoLoader
 * @param {string} filename 
 * @returns GeoJSONLayer
 */
function geoLoader(filename) {
	// Assemble the path to the GeoJSON file.
	let file = `./geojson/${filename}.geojson`;
	
	// Create a GeoJSON object.
	// The onEachFeature option is a function that will be called once for each feature in the GeoJSON data.
	let dist = L.geoJSON(null, {
		// Call the onEachFeature function.
		onEachFeature: onEachFeature
	});
	
	// Load the GeoJSON data from the file.
	$.getJSON(file, function(data) {
		// Add the GeoJSON data to the dist object.
		dist.addData(data);
	});
	
	// Return the dist object.
	return dist;
}

/**
 * layerBuilder() is a function that builds a Leaflet layer from GeoJSON data.
 * 
 * @function layerBuilder
 * @param {string} filename 
 */
function layerBuilder(filename){
    // Load the GeoJSON data from the file.
	geoJSONGroup = geoLoader(filename);
    // Create a layer group object.
	let layer = L.layerGroup([geoJSONGroup]);
    // Add the layer to the districtSlices object based on the filename.
	districtSlices[filename] = layer;
}

// Build the district layers.
districtGeoJSONFiles.forEach(layerBuilder);

// Add the district layers to the map.
L.control.layers(districtSlices, null, {collapsed: false}).addTo(map);

// Add a header to the layer control.
$('<p id="layer-ctrl-header">Businesses Per Time Period</p>').insertBefore('div.leaflet-control-layers-base');
