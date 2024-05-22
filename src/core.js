/**
 * This file is the entry point for the application.
 * It imports the necessary dependencies and sets them up.
 * 
 * CSS imports act as side effects, so they are imported here.
 */

// Import Leaflet as L.
import * as L from "leaflet";

// Import jQuery
import $ from "jquery";

// Import Leaflet CSS.
import 'leaflet/dist/leaflet.css';

// Import Bootstrap CSS.
import "bootstrap/dist/css/bootstrap.min.css";

// Import local CSS.
import "./index.css";

// Import marker images (to be processed by Webpack).
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Override the default icon URLs.
delete L.Icon.Default.prototype._getIconUrl;

// Set the default icon URLs.
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

// Export $ and L for use in other modules.
export { $, L };
