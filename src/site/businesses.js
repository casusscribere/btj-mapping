// Import core dependencies.
import { $, L, baseMap } from "./core.js";

// This is the center of the Parramore.
const center = [28.537605555555, -81.38484444444];

// Image URL.
const imageUrl = 'maps/businesses/parramore.jpg';
// Error overlay URL.
const errorOverlayUrl = 'maps/error.png';
// Alt text for the image.
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

// Create an group object to store GeoJSON objects.
let geoJSONGroup;

// Create an object to store the processed district slices.
let districtSlices = {};

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

// The ID of the map element.
const mapElementId = 'businesses-map';

// Create a map object.
let map = L.map(mapElementId, {
  layers: [baseMap],
  center: center,
  minZoom: 16,
  maxZoom: 22,
  zoom: 20
});

/**
* For each feature in the GeoJSON data, we create a popup that displays the name and address.
* @param {Object} Leaflet Feature
* @param {Object} Leaflet Layer
*/
function onEachFeature(feature, layer) {
  
  // Create a popup content string.
  let popupContent =`<p class="popup">
    <em>${feature
    .properties.name}</em>
    <br>Address: ${feature
    .properties.street}</p>`;

  // If the feature has a popupContent property, add it to the popup content string.
  if (feature.properties && feature.properties.popupContent) {
    popupContent += feature.properties.popupContent;
  }

  // Bind the popup to the layer.
  layer.bindPopup(popupContent);
}

// Add the image overlay to the map.
L.imageOverlay(imageUrl, latLngBounds, {
  opacity: 0.8,
  errorOverlayUrl: errorOverlayUrl,
  alt: altText,
  interactive: true
}).addTo(map);

// Fit the map to the bounds of the image overlay.
map.fitBounds(latLngBounds);

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

// Build the district layers.
districtGeoJSONFiles.forEach((filename) => {
// Load the GeoJSON data from the file.
  geoJSONGroup = geoLoader(filename);
  // Create a layer group object.
  let layer = L.layerGroup([geoJSONGroup]);
  // Add the layer to the districtSlices object based on the filename.
  districtSlices[filename] = layer;
});

// Add the district layers to the map.
L.control.layers(districtSlices, null, {collapsed: false}).addTo(map);

// Add a header to the layer control.
$('<p id="layer-ctrl-header">Representative Businesses Per Time Period</p>').insertBefore('div.leaflet-control-layers-base');
