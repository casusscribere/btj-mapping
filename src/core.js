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

// When the document is ready...
// This is necessary because the button is not available until the document is loaded.
$.when( $.ready ).then(() => {
    // Hide the button by default.
    $("#topButton").hide();

    // Get the button.
    $("#topButton").on("click", () => {
        // When the user clicks on the button, scroll to the top of the document.
        $("html, body").animate({ scrollTop: 0 }, "smooth");
    });

    // When the user scrolls...
    // This is necessary because the button should only be shown when the user scrolls down.
    $(window).on("scroll", () => {

        // Get height of header element
        let headerHeight = $('header').height();

        // When the user scrolls down 20px from the top of the document, show the button.
        if (document.body.scrollTop > headerHeight || document.documentElement.scrollTop > headerHeight) {
            $("#topButton").show();
            $('nav').addClass('sticky');
            $('#content').addClass('menu-padding');
        } else {
            $("#topButton").hide();
            $('nav').removeClass('sticky');
            $('#content').removeClass('menu-padding');
        }
    });
});

// Export $ and L for use in other modules.
export { $, L };
