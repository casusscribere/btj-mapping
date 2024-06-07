// Import core dependencies.
import { $, L } from "./core.js";

var map = L.map('map').setView([37.8, -96], 100);

const baseMap = L.tileLayer(
	'https://api.mapbox.com/styles/v1/agiroux/ckgjrjbsj09w01aqxz1w7wuqy/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWdpcm91eCIsImEiOiJjajE0ZmxxdjgwMDRxMnFvZGNuYzFyOHFxIn0.7KcKhzGSwCPb10LuCfWZYg', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
	}).addTo(map);

var imageUrl = 'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg';
var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
var altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
var latLngBounds = L.latLngBounds([[40.799311, -74.118464], [40.68202047785919, -74.33]]);

var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.8,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true
}).addTo(map);

L.rectangle(latLngBounds).addTo(map);
map.fitBounds(latLngBounds);
