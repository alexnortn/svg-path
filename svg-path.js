/*
Alex Norton | 2016
Adobe Illustrator SVG -> Cubic Bezier Path

args | node, <this>, File.svg

Based off of Cubic Bezier from DrawScript | Jamie Jefferson
http://codepen.io/jamiejefferson/pen/ff30ccf7f3a8b69989142d664325f3b9?editors=1011

*/

var svg_paths = [];

// print process.argv
process.argv.forEach(function (val, index, array) {
	if (index > 1) {
		svg_paths.push(val); // Add svg file to our process list
		console.log("Added: " + val + " for processing");
	}
});


function process_svg() {

	if (svg_paths.length == 0) {
		console.log ("Please supply svg :)");
		return;
	}

	for (var k = 0; k < svg_paths.length; k++) {
		//points exported from DrawScript : Bezier Points Array (anchor, control, control, anchor)
		var data = svg_paths[k],
		    dataLength = data.length,
		    points = [], //holds our series of x/y values for anchors and control points,
		    pointsString = data.toString();

		// convert cubic data to GSAP bezier
		for (var i = 0; i < dataLength; i++) {
			var seg = data[i];
			if (seg[0] === "M") { // move (starts the path)
				var point = {};
				point.x = seg[1];
				point.y = seg[2];
				points.push(point);
			} 
			else { // seg[0] === "C" (Snap.path.toCubic should return only curves after first point)
				for (var j = 1; j < 6; j+=2) {
					var point = {};
					point.x = seg[j];
					point.y = seg[j+1];
					points.push(point);
				}
			}
		}

		// console.log(points);
		console.log(dataLength);

	}
}

process_svg();