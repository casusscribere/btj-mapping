// Import readFileSync from fs module.
import { readFileSync } from "fs";

// Import writeFileSync from fs module.
import { writeFileSync } from "fs";

// Import CSV-parser module.
import { parse } from "csv-parse";

// Create array to hold CSV filenames.
const files = [
    "1910",
    "1915",
    "1930",
    "1940",
    "1950",
    "1960",
    "1970",
    "1980",
    "1990",
    "2020"
];

// Iterate over files array.
files.forEach(function(file) {
    // Read the CSV data from the file.
    const csv = readFileSync(`data/${file}.csv`, "utf8");

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
        writeFileSync(`data/${file}.geojson`, geojsonString);
    });
});

function generateGeoJSON(csvData) {

    // Create an array to store GeoJSON features.
    let features = [];

    // Iterate over the CSV data.
    csvData.forEach(function(row) {

        console.log(row);

        // Split the lat/long into an array.
        const position = row[3].split(",");

        // Save latitude.
        const lat = parseFloat(position[0]);

        // Save longitude.
        const long = parseFloat(position[1]);

        // Create an object to store the GeoJSON properties.
        let props = {
            name: row[0],
            street: row[1],
            year: row[2],
            latitude: lat,
            longitude: long
        };

        // Create a GeoJSON feature object.
        let feature = {
            type: "Feature",
            properties: props,
            geometry: {
                type: "Point",
                coordinates: [long, lat]
            }
        };

        // Add the feature to the features array.
        features.push(feature); 
    });

    // Return the features array.
    return features;
}

