let csvToJson = require("convert-csv-to-json");

csvToJson.generateJsonFileFromCsv('data/tickets.csv', 'data/tickets.json');

csvToJson.generateJsonFileFromCsv('data/customer.csv', 'data/customer.json');

csvToJson.generateJsonFileFromCsv('data/workshops.csv', 'data/workshops.json');
