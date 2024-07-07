// Import readFileSync, writeFileSync, and readdirSync from the fs module.
import { readFileSync, writeFileSync, readdirSync } from "fs";

// Import consola from consola module.
import { consola } from "consola";

// Import CSV-parser module.
import { parse } from "csv-parse";

// Save the path to the data directory.
const dataDir = `${import.meta.dirname}/../data`;

// Read all files in the data directory and filter out only CSV files.
const files = readdirSync(dataDir).filter(file => file.endsWith(".csv"));

// Iterate over files array.
files.forEach(function(file) {

    // Create filename.
    const filename = `${dataDir}/${file}`

    // Create future csv contents.
    let csv = "";

    try {
        // Log the file name to the console.
        consola.info(`Processing ${file}`);

        // Read the file contents.
        csv = readFileSync(filename, "utf8");
    } catch(err) {
        // Log the error to the console.
        consola.error(`ERROR: Unable to read file: ${err}`);
    }
    
    // Try to parse the CSV data.
    try {
        // Parse the CSV data.
        parse(csv, {encoding: "utf8"}, function(err, output) {
            // Generate GeoJSON data from the CSV data.
            const features = generateGeoJSON(output);

            // Build GeoJSON string.
            const geojson = buildGeoJSON(features);

            // Write GeoJSON data to a file.
            writeGeoJSON(filename, geojson);
        });
    } catch(err) {
        // Log the error to the console.
        consola.error(`ERROR: Unable to parse CSV: ${err}`);
    }
});

/**
 * Build a GeoJSON string from an array of features.
 * @param {Array} features
 * @returns {string} 
 */
function buildGeoJSON(features) {
     // Create a GeoJSON object.
     let geojson = {
        type: "FeatureCollection",
        features: features
    };

    // Convert the GeoJSON object to a string.
    return JSON.stringify(geojson, null, 4);
}

/**
 * Write GeoJSON data to a file.
 * @param {string} file
 * @param {string} geojsonString
 * @returns {void}
 */
function writeGeoJSON(file, geojsonString) {
    // Remove the .csv extension from the file name.
    file = file.replace(".csv", "");

    // Try to write the GeoJSON data to a file.
    try {
        // Log the GeoJSON string to the console.
        writeFileSync(`${file}.geojson`, geojsonString);
    } catch(err) {
        // Log the error to the console.
        consola.error(`ERROR: Unable to write GeoJSON: ${err}`);
    }
}

/**
 * Generate GeoJSON data from CSV data.
 * @param {string} csvData 
 * @returns {Array<Object>}
 */
function generateGeoJSON(csvData) {

    // Create an array to store GeoJSON features.
    let features = [];

    // Iterate over the CSV data.
    csvData.forEach(function(row) {
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
