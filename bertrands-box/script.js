var boxA = 0;
var boxB = 0;
var boxC = 0;
var zerozero = 0;
var zeroone = 0;
var onezero = 0;
var oneone = 0;
var error = 0;

var box = null;

function doIt(numberOfPicks) {
	
	for (var i = 1; i<=numberOfPicks; i++) {

		var selection = Math.floor(Math.random() * 3);

		switch (selection){
			case 0:
				box = [0,0];
				boxA += 1;
				document.getElementById("boxA").innerHTML=boxA;
				break;
			case 1:
				box = [0,1];
				boxB += 1;
				document.getElementById("boxB").innerHTML=boxB;
				break;
			case 2:
				box = [1,1];
				boxC += 1;
				document.getElementById("boxC").innerHTML=boxC;
				break;
		}
		document.getElementById("boxApc").innerHTML=Math.round(boxA/(boxA+boxB+boxC)*10000)/100 + "%";
		document.getElementById("boxBpc").innerHTML=Math.round(boxB/(boxA+boxB+boxC)*10000)/100 + "%";
		document.getElementById("boxCpc").innerHTML=Math.round(boxC/(boxA+boxB+boxC)*10000)/100 + "%";
		
				
		var pick = Math.floor(Math.random() * 2);

		var pickResult = box[pick];
		var secondPickResult = box[+ !pick];

		if (pickResult === 0) {
			if (secondPickResult === 0) {
				zerozero += 1;
				document.getElementById("zz").innerHTML=zerozero;
				document.getElementById("zzpc").innerHTML=Math.round(zerozero/(zerozero+zeroone)*10000)/100 + "%";
				document.getElementById("zopc").innerHTML=Math.round(zeroone/(zerozero+zeroone)*10000)/100 + "%";
			}
			else if (secondPickResult == 1) {
				zeroone += 1;
				document.getElementById("zo").innerHTML=zeroone;
				document.getElementById("zopc").innerHTML=Math.round(zeroone/(zerozero+zeroone)*10000)/100 + "%";
				document.getElementById("zzpc").innerHTML=Math.round(zerozero/(zerozero+zeroone)*10000)/100 + "%";
			}
			else {
				error += 1;
				document.getElementById("error").innerHTML=error;
			}
		}
		else if (pickResult == 1) {
			if (secondPickResult == 0) {
				onezero += 1;
				document.getElementById("oz").innerHTML=onezero;
				document.getElementById("oopc").innerHTML=Math.round(oneone/(onezero+oneone)*10000)/100 + "%";
				document.getElementById("ozpc").innerHTML=Math.round(onezero/(onezero+oneone)*10000)/100 + "%";
			}
			else if (secondPickResult == 1) {
				oneone += 1;
				document.getElementById("oo").innerHTML=oneone;
				document.getElementById("oopc").innerHTML=Math.round(oneone/(onezero+oneone)*10000)/100 + "%";
				document.getElementById("ozpc").innerHTML=Math.round(onezero/(onezero+oneone)*10000)/100 + "%";
			}
			else {
				error += 1;
				document.getElementById("error").innerHTML=error;
			}
		}
		else {
			error += 1;
			document.getElementById("error").innerHTML=error;
		}
	}
}