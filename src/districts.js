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

// This is the center of Florida.
const centerOfFlorida = [27.6648, -81.5158];

// Create array of GeoJSON files for the district slices.
const districtGeoJSONFiles = [
    '1845-1873',
    '1873-1903',
    '1903-1913',
    '1913-1933',
    '1933-1943',
    '1943-1953',
    '1953-1963',
    '1963-1973',
    '1973-1983',
    '1983-1993',
    '1993-2003',
    '2003-2013'
];

// Create a map object.
const map = L.map('map', {
  layers: [baseMap],
  scrollWheelZoom: false,
  center: centerOfFlorida,
});

// Set the position and zoom level of the map.
map.setView(centerOfFlorida, 7);

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
	let file = `./districts/${filename}.geojson`;
	
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

/**
 * onEachFeature() is a function that is called once for each feature in the GeoJSON data.
 * 
 * @param {*} GeoJSONFeature 
 * @param {*} LeafletLayer
 */
function onEachFeature(feature, layer) {

    /**
     * resetHighlight() is a function that resets the style of a GeoJSON feature.
     * 
     * @param {Event} e 
     */
	const resetHighlight = (e) => {
        // If the geoJSONGroup object is not null, reset the style of the target layer.
		if(geoJSONGroup !== null) { 
            // Reset the style of the target layer.
			geoJSONGroup.resetStyle(e.target);
		}
	};

    /**
     * highlightFeature() is a function that highlights a GeoJSON feature.
     * 
     * @param {Event} e 
     */
	const highlightFeature = (e) => {
        // Get the target layer.
		let layer = e.target;
	
        // Set the style of the target layer.
		layer.setStyle({
			weight: 5,
			color: '#b31942',
			dashArray: '',
			fillOpacity: 0.7
		});
	
        // Bring the target layer to the front.
        // This is a workaround for IE, Edge, and Opera.
		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}
	}

    // Add event listeners to the layer.
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: (e) => { map.fitBounds(e.target.getBounds()); }
	});
}

// Build the district layers.
districtGeoJSONFiles.forEach(layerBuilder);

// Add the district layers to the map.
L.control.layers(districtSlices, null, {collapsed: false}).addTo(map);

// Add a header to the layer control.
$('<p id="layer-ctrl-header">FL Districts</p>').insertBefore('div.leaflet-control-layers-base');
