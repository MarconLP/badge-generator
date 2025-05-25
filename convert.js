let csvToJson = require('convert-csv-to-json');

let fileInputName = 'data/tickets.csv'; 
let fileOutputName = 'data/tickets.json';

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
