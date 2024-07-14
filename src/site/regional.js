// Import core dependencies.
import { L } from "./core.js";

// This is the center of old Jonestown.
const center = [28.534953, -81.355200];

// The ID of the map element.
const mapElementId = 'regional-map';

// Create a map object.
let map = L.map(mapElementId, {
  center: center,
  minZoom: 16,
  maxZoom: 18,
  zoom: 16
});

/**
  * An array of image overlay objects.
  * Each object contains the following properties:
  * - id: A unique identifier for the image overlay.
  * - imageUrl: The URL of the image overlay.
  * - errorOverlayUrl: The URL of the error overlay.
  * - altText: The alt text for the image overlay.
  * - upperLeftCorner: The upper left corner of the image overlay.
  * - lowerRightCorner: The lower right corner of the image overlay.
  */
const mapImageOverlays = [
  {
    id: '1926 Jonestown',
    imageUrl: 'maps/regional/1926.png',
    errorOverlayUrl: 'maps/error.png',
    altText: '1926 - Jonestown (Chamber of Commerce Map of Orlando, FL.)',
    upperLeftCorner: [28.539694, -81.363023],
    lowerRightCorner: [28.529886, -81.346668]
  },
  {
    id: '1936 Jonestown',
    imageUrl: 'maps/regional/1936.png',
    errorOverlayUrl: 'maps/error.png',
    altText: '1936 - Jonestown (Chamber of Commerce Map of Orlando, FL.)',
    upperLeftCorner: [28.540023, -81.363768],
    lowerRightCorner: [28.530629, -81.347767]
  }
];

// Create array to hold image overlay objects.
const imageOverlays = [];

/**
 * For each image overlay, we perform four steps:
 * 1. Create the image overlay object.
 * 2. Create the controls.
 * 3. Add the image overlay to the map.
 * 4. Add the image overlay object to the array.
 */
mapImageOverlays.forEach((overlay) => {

  // Create a lat/lng bounds object from the upper left and lower right corners.
  const latLngBounds = L.latLngBounds([overlay.upperLeftCorner, overlay.lowerRightCorner]);

  // Create the image overlay object.
  const imageOverlay = L.imageOverlay(overlay.imageUrl, latLngBounds, {
    opacity: 0.0,
    errorOverlayUrl: overlay.errorOverlayUrl,
    alt: overlay.altText,
    interactive: false
  });

  // Add the image overlay to the map.
  imageOverlay.addTo(map);

  // Add the image overlay object to the array.
  imageOverlays.push({
    id: overlay.id,
    overlay: imageOverlay
  });
});

// Controls exist per overlay.
// Once the image overlay is loaded, create the controls.
const controlsPerOverlay = function (id) {
  
  // Create an extended control class with an overwritten onAdd method.
  // (The onAdd method is called when the control is added to the map.)
  const ExtendedControl = L.Control.extend({
    onAdd: function() {
      const button = L.DomUtil.create('button');
      button.title = 'Layer Opacity Control';
      button.innerHTML = `<span>${id}</span>`;
      L.DomEvent.on(button, 'click', function () {
        // For each image overlay, set the opacity to 0 except for the one matching the current id.
        imageOverlays.forEach((overlay) => {
          overlay.overlay.setOpacity(overlay.id === id ? 1.0 : 0.0);
        });
      });
      // Return the button.
      return button;
    }
  });

  // Create a new instance of the extended control class.
  const ExtendedController = new ExtendedControl();
  // Add the controller to the map.
  ExtendedController.addTo(map);
};

// For each image overlay, create an individual control.
imageOverlays.forEach((overlay) => {
  controlsPerOverlay(overlay.id);
});

// For the last step, set the opacity of the first image overlay to 1.0.
imageOverlays[0].overlay.setOpacity(1.0);
