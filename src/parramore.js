// Import core dependencies.
import { $, L } from "./core.js";

// Center of Parramore, FL.
//  28°32'17.92"N
//  81°23'20.45"W
// In decimal degrees:
// 28.538518431125024, -81.38901390459614
// Center of Parramore, FL.

// Map is offset.
//  28°32'15.38"N
//  81°23'5.44"W
// In decimal degrees:
// 28.537605555555556, -81.38484444444444

const centerOfParramore = [28.537605555555556, -81.38484444444444];

// Create a map object centered on Parramore, FL.
var map = L.map('map').setView(centerOfParramore, 20);

// Add a tile layer from Mapbox.
const baseMap = L.tileLayer(
	'https://api.mapbox.com/styles/v1/agiroux/ckgjrjbsj09w01aqxz1w7wuqy/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWdpcm91eCIsImEiOiJjajE0ZmxxdjgwMDRxMnFvZGNuYzFyOHFxIn0.7KcKhzGSwCPb10LuCfWZYg', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
	}).addTo(map);

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
const imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.8,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true
}).addTo(map);

L.rectangle(latLngBounds).addTo(map);
map.fitBounds(latLngBounds);

