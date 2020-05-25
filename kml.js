var tj = require('@mapbox/togeojson'),
    fs = require('fs'),
    // node doesn't have xml parsing or a dom. use xmldom
    DOMParser = require('xmldom').DOMParser;

var input = document.getElementById("myFile");
var output = document.getElementById("output");


input.addEventListener("change", function () {
    if (this.files && this.files[0]) {

        var myFile = this.files[0];
        var reader = new FileReader();
        
        reader.addEventListener('load', function (e) {
            console.log(e.target.result);
            var parser = new DOMParser();
            var kml = parser.parseFromString(e.target.result, "text/xml");
            console.log(kml);
            var converted = tj['kml'](kml.childNodes[2]);
            console.log(converted);
            // output.textContent = JSON.stringify(converted, null, 4);

            var resultado = document.createElement('a');

            resultado.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(converted, null, 4));
            resultado.target = '_blank';
            resultado.download = `${myFile.name.slice(0, -4)}.geojson`;
            resultado.click();
        } );

        reader.readAsBinaryString(myFile);
    }
});
