//var text = require("./games.json");
//var obj = JSON.parse(text);
//document.getElementById("results").innerHTML = "HI" + obj; 

function showTable(){

console.log(getCheckedValues("players"));

}

function getCheckedValues(elementName){
	
	var result = [];
	
	for (let i = 0; i < document.getElementsByName(elementName).length; i++){
		if (document.getElementsByName(elementName)[i].checked == true){
			result.push(document.getElementsByName(elementName)[i].value)
		}
	}
	
	return result;
}