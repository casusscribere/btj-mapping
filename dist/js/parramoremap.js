//Leaflet setup
const baseMap = L.tileLayer(
    'https://api.mapbox.com/styles/v1/agiroux/ckgjrjbsj09w01aqxz1w7wuqy/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWdpcm91eCIsImEiOiJjajE0ZmxxdjgwMDRxMnFvZGNuYzFyOHFxIn0.7KcKhzGSwCPb10LuCfWZYg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: 15,
        maxZoom: 20,
        zoom: 15
});

//const center = [28.537605555555, -81.38484444444];
const center = [28.534, -81.38484444444];

const par_bounds_1 = L.polygon([
    [28.55096, -81.3890],
    [28.55096, -81.3802],
    [28.54200, -81.3802],
    [28.54200, -81.3890]
]).on('mouseover', function(e) {
    e.target.setStyle({
        fillOpacity: 0.8
    });
}).on('mouseout', function(e) {
    e.target.setStyle({
        fillOpacity: 0.55
    });
});

function hoverop(feature, layer){
    layer.on('mouseover', function(e) {
        e.target.setStyle({
            fillOpacity: 0.8
        });
    });
    layer.on('mouseout', function(e) {
        e.target.setStyle({
            fillOpacity: 0.55
        });
    });
};


const map_images = {
    sanborn: {
        url: 'maps/businesses/parramore.jpg',
        topleft: [28.551207033771966, -81.38942773343123],
        botright: [28.52770967372553, -81.37993367576095],
        altText: "Composite Sandborn map of the Parramore neighborhood"
    },
    "coc-24": {
        url: '../images/1924_orlandomap.jpg',
        topleft: [28.551207033771966, -81.38942773343123],
        botright: [28.52770967372553, -81.37993367576095],
        altText: "Composite Sandborn map of the Parramore neighborhood"
    }
};


// Image URL.
const imageUrl = '../images/par_sandborne.jpg';

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
const mapElementId = 'par-map';

//TEMP COORDS CURSOR
L.CursorHandler = L.Handler.extend({

    addHooks: function () {
        this._popup = new L.Popup();
        this._map.on('mouseover', this._open, this);
        this._map.on('mousemove', this._update, this);
        this._map.on('mouseout', this._close, this);
    },

    removeHooks: function () {
        this._map.off('mouseover', this._open, this);
        this._map.off('mousemove', this._update, this);
        this._map.off('mouseout', this._close, this);
    },
    
    _open: function (e) {
        this._update(e);
        this._popup.openOn(this._map);
    },

    _close: function () {
        this._map.closePopup(this._popup);
    },

    _update: function (e) {
        this._popup.setLatLng(e.latlng)
            .setContent(e.latlng.toString());
    }

    
});
L.Map.addInitHook('addHandler', 'cursor', L.CursorHandler);
//END TEMP COORDS CURSOR

// Create a map object.
let map = L.map(mapElementId, {
    layers: [baseMap],
    center: center,
    cursor: true,
    scrollWheelZoom: false,
});

// Add the image overlay to the map.
L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.8,
    //errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true
  }).addTo(map);
  
// Fit the map to the bounds of the image overlay.
map.fitBounds(latLngBounds);
map.setMaxBounds(map.getBounds());


/*
var map = L.map('map',{
    scrollWheelZoom: false
}).setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
*/