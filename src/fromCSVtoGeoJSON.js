// Import readFileSync from fs module.
import { readFileSync } from "fs";

// Import writeFileSync from fs module.
import { writeFileSync } from "fs";

// Import CSV-parser module.
import { parse } from "csv-parse";

// Read the CSV data from the file.
const csv = readFileSync("data/2020.csv", "utf8");

function generateGeoJSON(csvData) {

    // Create an array to store GeoJSON features.
    let features = [];

    // Iterate over the CSV data.
    csvData.forEach(function(row) {

        console.log(row);

        // Create an object to store the GeoJSON properties.
        let props = {
            name: row[0],
            street: row[1],
            year: row[2]
        };

        // Split the lat/long into an array.
        const position = row[3].split(",");

        // Save latitude.
        const lat = parseFloat(position[0]);

        // Save longitude.
        const long = parseFloat(position[1]);

        // Create a GeoJSON feature object.
        let feature = {
            type: "Feature",
            properties: props,
            geometry: {
                type: "Point",
                coordinates: [lat, long]
            }
        };

        // Add the feature to the features array.
        features.push(feature); 
    });

    // Return the features array.
    return features;
}

// Parse the CSV data.
parse(csv, {encoding: "utf8"}, function(err, output) {
    // Generate GeoJSON data from the CSV data.
    const features = generateGeoJSON(output);

    // Create a GeoJSON object.
    let geojson = {
        type: "FeatureCollection",
        features: features
    };

    // Convert the GeoJSON object to a string.
    let geojsonString = JSON.stringify(geojson, null, 4);

    // Log the GeoJSON string to the console.
    writeFileSync("data/2020.geojson", geojsonString);

});
