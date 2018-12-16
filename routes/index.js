var express = require('express');
var router = express.Router();
var path = require('path');
var pages = []; //convert JSON from PDF contains array of element called pages that represent JSON version of FH Kiel class time table
var timetable = []; //stores refined timetable ready to be inserted in DB
let fs = require('fs'), PDFParser = require("pdf2json");
let pdfParser = new PDFParser();
var convertJSON = require('../controllers/refineJson');


/* GET home page. */
router.get('/', function(req, res, next) {

  pdfParser.on("pdfParser_dataReady", function (pdfData) {
    toJSONRefine(pdfData)
  });
  pdfParser.loadPDF("pdfs/schedule.pdf");

});

function toJSONRefine(objdata){
  timetable = convertJSON(objdata);

  try {
    fs.writeFile('pdfs/converted.json', JSON.stringify(timetable), (err) => {
      if (err) throw err;
      console.log('File made');
    });
  }
  catch(err) {
    console.log('File not made');
  }

  // console.log(timetable);

}



module.exports = router;
