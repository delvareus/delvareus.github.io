//var text = require("./games.json");
//var obj = JSON.parse(text);
//document.getElementById("results").innerHTML = "HI" + obj; 

function showTable(){
	fetch('games.json')
	  .then(response => response.json())
	  .then(data => createTable(data));
}

function checkAll(elementName){
	boxes = document.getElementsByName(elementName);
	for (let i = 0; i < boxes.length; i++){
		boxes[i].checked = true;
	}
}

function uncheckAll(elementName){
	boxes = document.getElementsByName(elementName);
	for (let i = 0; i < boxes.length; i++){
		boxes[i].checked = false;
	}
}
 
function getCheckedValuesAsInt(elementName){
	var result = [];
	for (let i = 0; i < document.getElementsByName(elementName).length; i++){
		if (document.getElementsByName(elementName)[i].checked == true){
			result.push(+document.getElementsByName(elementName)[i].value)
		}
	}
	return result;
}

function getRadioAnswer(elementName){
	for (let i = 0; i < document.getElementsByName(elementName).length; i++){
		if (document.getElementsByName(elementName)[i].checked == true){
			return document.getElementsByName(elementName)[i].value
		}
	}
}
  
function filterByPlayers(record){
	var desiredPlayers = getCheckedValuesAsInt("players");
	var result = false;
	for (let i = 0; i < desiredPlayers.length; i++){
		if (desiredPlayers[i] >= record.minPlayers && desiredPlayers[i] <= record.maxPlayers){
			result = true;
		}
	}
	return result;
}

function filterByChildren(record){
	return !record.tags.includes("Adults Only");
}

function filterByTime(record){
	var desiredTime = getCheckedValuesAsInt("time");
	var result = false;
	for (let i = 0; i < desiredTime.length; i++){
		if (record.averageMinutesToPlay.includes(desiredTime[i])){
			result = true;
		}
	}
	return result;
}

function filterByType(record){
	var desiredType = getRadioAnswer("type");
	return record.type.includes(desiredType) || record.type.includes("Team");
}

function filterByDifficulty(record){
	var desiredDifficulty = getCheckedValuesAsInt("difficulty");
	var result = false;
	for (let i = 0; i < desiredDifficulty.length; i++){
		if (record.learningCurve.includes(desiredDifficulty[i])){
			result = true;
		}
	}
	return result;
}
  
function createTable(data){
	
	// Filter Data
	
	var games = data.games;
	
	//Apply filters
	let result = games.filter(filterByPlayers);
	
	result = result.filter(filterByTime);

	if (!!getRadioAnswer("kids") == true){
		result = result.filter(filterByChildren);
	}
	
	if (getRadioAnswer("type") != "Either"){
		result = result.filter(filterByType);
	}
	
	result = result.filter(filterByDifficulty);
	
	//Sort the results
	if (getRadioAnswer("sort") == "Name"){
		result.sort((a, b) => (a.name > b.name) ? 1 : -1)
	} else if (getRadioAnswer("sort") == "Difficulty"){
		result.sort((a, b) => (a.learningCurve > b.learningCurve) ? 1 : (a.learningCurve === b.learningCurve) ? ((a.name > b.name) ? 1 : -1) : -1 )
	} else if (getRadioAnswer("sort") == "Time"){
		result.sort((a, b) => (a.averageMinutesToPlay > b.averageMinutesToPlay) ? 1 : (a.averageMinutesToPlay === b.averageMinutesToPlay) ? ((a.name > b.name) ? 1 : -1) : -1 )
	}
	
	// Create Table
	
	var table = "<table border=1 id='resultTable' style='font-family:Arial'>";

	table += `<tr>
				<th>Name & Description</th>
				<th>Players</th>
				<th>Type</th>
				<th>Learning Curve</th>
				<th>Tags</th>
				<th>Max Players with Expansion</th>
				<th>Average Time to Play (in minutes) <div class="tooltip">&#x24D8;<span class="tooltiptext">Multiple times indicate variability in game configuration</span></div></th>
				<th>Expansions</th>
				<th>Notes</th>
			  </tr>`;
			  
	var tr = "";

	for(let i = 0; i < result.length; i++) {
	  tr += "<tr>";
	  tr += `<td style="vertical-align:top;"><span style="font-weight:bold;font-size:16px;">${result[i].name}</span><br><span style="font-size:12px;">${result[i].description}</span></td>`;
	  tr += `<td style="vertical-align:top;text-align:center;font-weight:bold;font-size:18px;font-family:'Arial'"><img src="Players.gif"><br>${result[i].minPlayers}-${result[i].maxPlayers}</td>`;
	  tr += `<td><img src="${result[i].type}.jpg"></td>`;
	  tr += `<td><img src="${result[i].learningCurve}.jpg"</td>`;
	  var tags = result[i].tags.map(x => "<img src='" + x + ".jpg'>");
	  tr += `<td style="vertical-align:top;">${tags.join('<br>')}</td>`;
	  tr += `<td>${result[i].maxPlayersWithExpansion}</td>`;
	  tr += `<td>${result[i].averageMinutesToPlay}</td>`;
	  tr += `<td>${result[i].expansions}</td>`;
	  tr += `<td>${result[i].notes}</td>`;
	  tr += "</tr>"
	}

	table += tr + "</table>"

	document.getElementById("results").innerHTML = table;
}