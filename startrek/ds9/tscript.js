﻿



function csvToNestedArray(csvString) {
  const rows = csvString.split('\n'); // Split into rows
  const nestedArray = rows.map(row => row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)); // Split each row into an array
  return nestedArray;
}



function createTable(array) {
    var content = "";
	
	content += `<tr>
					<th style="width:80px" onclick="sortTable(0)">Episode</th>
					<th style="width:auto" onclick="sortTable(1)">Title</th>
					<th style="width:150px" onclick="sortTable(2)">Tags</th>
					<th style="width:250px" onclick="sortTable(3)">Recommendation</th>
					<th style="width:80px" onclick="sortTable(4)">Rating</th>
				</tr>`
	
	array.slice(1).forEach(function(row) {
        content += '<tr class="filterrow">';
        row.forEach(function(cell) {
			
			// Set cell class
			var cellClass = "";
			if (cell.match(/[0-9]\.[0-9]/)){
				cellClass = "ratingNumber";
			}
			
			// Replace flag icons
			cell = cell.replace("R⚑",'<span style="color:red">⚑</span>');
			cell = cell.replace("P⚑",'<span style="color:yellow">⚑</span>');
			
            content += '<td class="' + cellClass + '">' + cell + "</td>" ;
        });
        content += "</tr>";
    });
    document.getElementById("episodeTable").innerHTML = content;
}

/* ------------------------- TABLE SORT ------------------------- */

function sortTable(n) {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("episodeTable");
	switching = true;
	// Set the sorting direction to ascending:
	dir = "asc";
	/* Make a loop that will continue until
	no switching has been done: */
	while (switching) {
		// Start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		/* Loop through all table rows (except the
		first, which contains table headers): */
		for (i = 1; i < (rows.length - 1); i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
			one from current row and one from the next: */
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			/* Check if the two rows should switch place,
			based on the direction, asc or desc: */
			//console.log(x.innerHTML.match(/[0.9]\.[0-9]/));
			var isNumber = x.innerHTML.match(/[0-9]\.[0-9]/);
			if (!!isNumber){
				if (dir == "asc") {
					if (Number(x.innerHTML) > Number(y.innerHTML)) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (Number(x.innerHTML) < Number(y.innerHTML)) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
			  
			} else {
				if (dir == "asc") {
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
			  
			}
		}
		if (shouldSwitch) {
			/* If a switch has been marked, make the switch
			and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			// Each time a switch is done, increase this count by 1:
			switchcount ++;
		} else {
			/* If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}

/* ------------------------- FILTERS ------------------------- */

function setRnFilters() {
	const filterrows = Array.from(document.getElementsByClassName("filterrow"));
	var checkedRnFilters = document.querySelectorAll(".rnfiltercheckbox:checked");
	let activeRnFilters = [];
	
	Array.from(checkedRnFilters).forEach((filter) => {
		activeRnFilters.push(filter.value);
	})

	filterrows.forEach((filterrow) => {
		
		filterrow.style.display="none";
		var checkCell = filterrow.getElementsByTagName("td")[3];
	
		Array.from(activeRnFilters).forEach((rnfilter) => {
			if ((checkCell.innerHTML).includes(rnfilter)){
				filterrow.style.display="";
			}
		})
		
		
	})
}

function setTagsFilters() {
	const filterrows = Array.from(document.getElementsByClassName("filterrow"));
	var checkedTagsFilters = document.querySelectorAll(".tagsfiltercheckbox:checked");
	let activeTagsFilters = [];
	
	Array.from(checkedTagsFilters).forEach((filter) => {
		activeTagsFilters.push(filter.value);
	})

	filterrows.forEach((filterrow) => {
		
		filterrow.style.display="none";
		var checkCell = filterrow.getElementsByTagName("td")[2];
		
		Array.from(activeTagsFilters).forEach((tagsfilter) => {
			if ((checkCell.innerHTML).includes(tagsfilter)){
				filterrow.style.display="";
			}
		})
		
		
	})
}

function setFilters(type) {
	
	const filterrows = Array.from(document.getElementsByClassName("filterrow"));

	if (type.endsWith("all")) {
		
		if (type == "rnall") {
			var rnallfilter = document.getElementById("rnfilterall");
			var rnfilters = document.getElementsByClassName("rnfiltercheckbox");
			
			if (!rnallfilter.checked) {
				rnallfilter.checked = true;
			}
			else
			{
				Array.from(rnfilters).forEach((filter) => {
					filter.checked = false;
				})
				
				if (tagsfilterall.checked) {
					filterrows.forEach((filterrow) => {
						filterrow.style.display = "";
					})
					return;
				}
				else
				{
					setTagsFilters();
					return;
				}
			}
		}
		
		if (type == "tagsall") {
			var tagsallfilter = document.getElementById("tagsfilterall");
			var tagsfilters = document.getElementsByClassName("tagsfiltercheckbox");
			
			if (!tagsallfilter.checked) {
				tagsallfilter.checked = true;
			}
			else
			{
				Array.from(tagsfilters).forEach((filter) => {
					filter.checked = false;
				})
				
				if (rnfilterall.checked) {
					filterrows.forEach((filterrow) => {
						filterrow.style.display = "";
					})
					return;
				}
				else
				{
					setRnFilters();
					return;
				}
			}
		}
	}
	else
	{
		var rnallfilter = document.getElementById("rnfilterall");
		var tagsallfilter = document.getElementById("tagsfilterall");
		

		if (type=="rn") {
			rnallfilter.checked = false;
			
			if (tagsallfilter.checked) {
				setRnFilters();
				return;
			}
		}
		if (type=="tags") {
			tagsallfilter.checked = false;
			
			if (rnallfilter.checked) {
				setTagsFilters();
				return;
			}
		}
		if (type=="andor") {
			if (rnallfilter.checked && tagsallfilter.checked) {
				filterrows.forEach((filterrow) => {
					filterrow.style.display = "";
				})				
				return;
			}
			if (rnallfilter.checked && !tagsallfilter.checked) {
				setTagsFilters();
				return;
			}
			if (!rnallfilter.checked && tagsallfilter.checked) {
				setRnFilters();
				return;
			}
		}
		
		var checkedRnFilters = document.querySelectorAll(".rnfiltercheckbox:checked");
		let activeRnFilters = [];
		var checkedTagsFilters = document.querySelectorAll(".tagsfiltercheckbox:checked");
		let activeTagsFilters = [];
		var andorradio = document.querySelector(".andorradio:checked");
		var andor = andorradio.value;
	
		Array.from(checkedRnFilters).forEach((filter) => {
			activeRnFilters.push(filter.value);
		})
		
		Array.from(checkedTagsFilters).forEach((filter) => {
			activeTagsFilters.push(filter.value);
		})	
		
		filterrows.forEach((filterrow) => {
			
			var partmatch = false;
			
			filterrow.style.display="none";
			
			
			Array.from(activeRnFilters).forEach((rnfilter) => {
				if ((filterrow.innerHTML).includes(rnfilter)){
					if (andor == "and"){
						partmatch = true;
					} else {
						filterrow.style.display="";
					}
				}
			})
			
			if (partmatch || andor == "or"){
				var checkCell = filterrow.getElementsByTagName("td")[2];
				Array.from(activeTagsFilters).forEach((tagsfilter) => {
					if ((checkCell.innerHTML).includes(tagsfilter)){
						filterrow.style.display="";
					}
				})
			}
			
		
		})
	}
	
}


function resetFilters() {
	
	var filterallcheckboxes = document.querySelectorAll("#rnfilterall,#tagsfilterall");
	var filtercheckboxes = document.querySelectorAll(".rnfiltercheckbox,.tagsfiltercheckbox");
					
	Array.from(filterallcheckboxes).forEach((checkbox) => {
		checkbox.checked = true;
	})
	
	Array.from(filtercheckboxes).forEach((checkbox) => {
		checkbox.checked = false;
	})
	
	var andordefault = document.getElementById("andordefault");
	andordefault.checked = true;
	
	setFilters("andor");
}




window.onload = function() {
	
	
	
	var csvString =    `Episode,Title,Tags,Recommendation,Rating
						1x01/02,Emissary,,🕶 ‼ Must Watch/Bare Minimum,7.2
						1x03,Past Prologue,,🕶 Must Watch,4.9
						1x04,A Man Alone,,✔ Recommended,4.4
						1x05,Babel,,,2.0
						1x06,Captive Pursuit,,,4.6
						1x07,Q-Less,Q,♦ Optional,4.1
						1x08,Dax,⚖️,✔ Recommended,5.1
						1x09,The Passenger,,,2.2
						1x10,Move Along Home,,,2.0
						1x11,The Nagus,,✔ Recommended,5.1
						1x12,Vortex,,,4.8
						1x13,Battle Lines,,♦ Optional,4.3
						1x14,The Storyteller,,✖ Notably Bad,1.5
						1x15,Progress,,,5.3
						1x16,If Wishes Were Horses,,,2.9
						1x17,The Forsaken,,✔ Recommended,4.5
						1x18,Dramatis Personae,,,4.9
						1x19,Duet,♥️,🕶 Must Watch,9.4
						1x20,In the Hands of the Prophets,,🕶 ‼ Must Watch/Bare Minimum,5.4
						2x01,The Homecoming,,✔ Recommended,5.4
						2x02,The Circle,,✔ Recommended,5.4
						2x03,The Siege,,✔ Recommended,6.3
						2x04,Invasive Procedures,,,3.8
						2x05,Cardassians,,,4.5
						2x06,Melora,,,4.5
						2x07,Rules of Acquisition,,,4.8
						2x08,Necessary Evil,♥️,✔+ Highly Recommended,7.7
						2x09,Second Sight,,,3.9
						2x10,Sanctuary,,,4.3
						2x11,Rivals,,,1.7
						2x12,The Alternate,,,4.7
						2x13,Armageddon Game,,,6.9
						2x14,Whispers,,,7.7
						2x15,Paradise,,,3.6
						2x16,Shadowplay,,,5.0
						2x17,Playing God,,,2.9
						2x18,Profit and Loss,,,5.8
						2x19,Blood Oath,,♦ Optional,6.7
						2x20/21,The Maquis (Parts I and II),,🕶 Must Watch,7.1
						2x22,The Wire,,✔+ Highly Recommended,6.2
						2x23,Crossover,♊,✔ Recommended,6.7
						2x24,The Collaborator,,🕶 Must Watch,3.8
						2x25,Tribunal,,,5.7
						2x26,The Jem'Hadar,,🕶 Must Watch,7.2
						3x01/02,The Search (Parts I and II),,🕶 ‼ Must Watch/Bare Minimum,7.8
						3x03,The House of Quark,,♦ Optional,6.9
						3x04,Equilibrium,,✔ Recommended,5.2
						3x05,Second Skin,,✔ Recommended,5.9
						3x06,The Abandoned,,,3.9
						3x07,Civil Defense,♥️,✔ Recommended,7.2
						3x08,Meridian,,,1.9
						3x09,Defiant,,🕶 Must Watch,7.2
						3x10,Fascination,🎭♥️,,3.3
						3x11/12,Past Tense (Parts I and II),🕖🌎,✔+ Highly Recommended,6.4
						3x13,Life Support,,♦ Optional,3.2
						3x14,Heart of Stone,,♦ Optional,5.2
						3x15,Destiny,♥️,✔ Recommended,6.4
						3x16,Prophet Motive,,,3.3
						3x17,Visionary,🕖,,6.6
						3x18,Distant Voices,,,3.1
						3x19,Through the Looking Glass,♊,✔ Recommended,6.4
						3x20,Improbable Cause,,🕶 Must Watch,9.0
						3x21,The Die is Cast,,🕶 Must Watch,9.2
						3x22,Explorers,,,5.2
						3x23,Family Business,,,5.2
						3x24,Shakaar,,🕶 Must Watch,4.3
						3x25,Facets,,✔ Recommended,4.4
						3x26,The Adversary,,🕶 Must Watch,7.5
						4x01/02,The Way of the Warrior,🥈,🕶 ‼ Must Watch/Bare Minimum,9.6
						4x03,The Visitor,,✔+ Highly Recommended,8.6
						4x04,Hippocratic Oath,,✔ Recommended,5.3
						4x05,Indiscretion,,🕶 Must Watch,6.7
						4x06,Rejoined,,✔ Recommended,5.1
						4x07,Starship Down,,✔ Recommended,7.4
						4x08,Little Green Men,🕖🌎,♦ Optional,6.0
						4x09,The Sword of Kahless,,,4.8
						4x10,Our Man Bashir,🎭🟨♥️,♦ Optional,6.8
						4x11,Homefront,🌎,🕶 Must Watch,9.1
						4x12,Paradise Lost,🌎,🕶 Must Watch,9.1
						4x13,Crossfire,,✔ Recommended,4.6
						4x14,Return to Grace,,✔ Recommended,6.9
						4x15,Sons of Mogh,,,4.7
						4x16,Bar Association,,,4.2
						4x17,Accession,,✔ Recommended,3.6
						4x18,Rules of Engagement,⚖️,,6.5
						4x19,Hard Time,,,5.4
						4x20,Shattered Mirror,♊,✔ Recommended,6.5
						4x21,The Muse,,,1.1
						4x22,For the Cause,,🕶 Must Watch,7.4
						4x23,To The Death,,,6.2
						4x24,The Quickening,♥️,,5.1
						4x25,Body Parts,,✔ Recommended,4.2
						4x26,Broken Link,,🕶 Must Watch,6.6
						5x01,Apocalypse Rising,,✔ Recommended,6.2
						5x02,The Ship,,,6.1
						5x03,Looking for par'Mach in All the Wrong Places,,♦ Optional,4.9
						5x04,Nor the Battle to the Strong,,,6.6
						5x05,The Assignment,,,5.3
						5x06,Trials and Tribble-ations,🕖🎖,🕶 Must Watch,10.0
						5x07,Let He Who Is Without Sin…,,✖ Notably Bad,1.4
						5x08,Things Past,,✔ Recommended,5.7
						5x09,The Ascent,,,4.9
						5x10,Rapture,,✔ Recommended,6.0
						5x11,The Darkness and the Light,,✔ Recommended,3.4
						5x12,The Begotten ,,✔ Recommended,5.6
						5x13,For the Uniform,,🕶 Must Watch,7.1
						5x14,In Purgatory's Shadow,,🕶 Must Watch,8.9
						5x15,By Inferno's Light,,🕶 Must Watch,8.9
						5x16,Doctor Bashir，I Presume,,✔ Recommended,5.1
						5x17,A Simple Investigation,,,5.0
						5x18,Business as Usual,,,5.2
						5x19,Ties of Blood and Water,,✔ Recommended,6.4
						5x20,Ferengi Love Songs,,✔ Recommended,3.5
						5x21,Soldiers of the Empire,,,5.9
						5x22,Children of Time,🕖,,6.4
						5x23,Blaze of Glory,,🕶 Must Watch,6.8
						5x24,Empok Nor,😱,,6.0
						5x25,In the Cards, ,,4.8
						5x26,Call to Arms,,🕶 ‼ Must Watch/Bare Minimum,8.8
						6x01,A Time to Stand,,🕶 Must Watch,6.6
						6x02,Rocks and Shoals,,✔ Recommended,7.5
						6x03,Sons and Daughters,,✔ Recommended,3.8
						6x04,Behind the Lines,,🕶 Must Watch,6.9
						6x05,Favor the Bold,,🕶 Must Watch,7.7
						6x06,Sacrifice of Angels,,🕶 ‼ Must Watch/Bare Minimum,9.2
						6x07,You Are Cordially Invited,♥️,♦ Optional,6.6
						6x08,Resurrection,♊,✔ Recommended,3.6
						6x09,Statistical Probabilities,,✔ Recommended,5.9
						6x10,The Magnificent Ferengi,,,6.2
						6x11,Waltz,,🕶 Must Watch,6.1
						6x12,Who Mourns for Morn?,,,5.4
						6x13,Far Beyond the Stars,🌌🏅,🕶 Must Watch,9.0
						6x14,One Little Ship,,,4.8
						6x15,Honor Among Thieves,,,4.1
						6x16,Change of Heart,,,3.5
						6x17,Wrongs Darker Than Death or Night,🕖,,5.0
						6x18,Inquisition,31♥️,🕶 Must Watch,7.3
						6x19,In the Pale Moonlight,🥇,🕶 ‼ Must Watch/Bare Minimum,9.6
						6x20,His Way,,♦ Optional,4.4
						6x21,The Reckoning,,✔ Recommended,4.3
						6x22,Valiant,,,4.0
						6x23,Profit and Lace,R⚑,✖ Notably Bad,0.3
						6x24,Time's Orphan,🕖,,4.9
						6x25,The Sound of Her Voice,,✔ Recommended,6.4
						6x26,Tears of the Prophets,,🕶 ‼ Must Watch/Bare Minimum,6.4
						7x01,Image in the Sand,🌎,🕶 Must Watch,6.1
						7x02,Shadows and Symbols,,🕶 ‼ Must Watch/Bare Minimum,6.4
						7x03,Afterimage,,,4.7
						7x04,Take Me Out to the Holosuite,🎭,,4.1
						7x05,Chrysalis,,,3.7
						7x06,Treachery，Faith and the Great River,,✔ Recommended,6.4
						7x07,Once More Unto the Breach,,♦ Optional,5.9
						7x08,The Siege of AR-558,,🕶 Must Watch,7.5
						7x09,Covenant,,✔ Recommended,4.6
						7x10,It's Only a Paper Moon,,✔+ Highly Recommended,7.4
						7x11,Prodigal Daughter,P⚑,,2.8
						7x12,The Emperor's New Cloak,♊,♦ Optional,3.7
						7x13,Field of Fire,,,5.1
						7x14,Chimera,,,3.8
						7x15,Badda-Bing，Badda-Bang,🎭🟨♥️,♦ Optional,6.4
						7x16,Inter Arma Enim Silent Leges,31♥️,🕶 Must Watch,7.6
						7x17,Penumbra,,🕶 Must Watch,5.1
						7x18,'Til Death Do Us Part,,🕶 Must Watch,5.7
						7x19,Strange Bedfellows,,🕶 Must Watch,6.4
						7x20,The Changing Face of Evil,,🕶 ‼ Must Watch/Bare Minimum,7.8
						7x21,When It Rains…,,🕶 ‼ Must Watch/Bare Minimum,7.1
						7x22,Tacking Into the Wind,,🕶 Must Watch,7.8
						7x23,Extreme Measures,31,🕶 Must Watch,5.6
						7x24,The Dogs of War,,🕶 Must Watch,8.4
						7x25/26,What You Leave Behind,,🕶 ‼ Must Watch/Bare Minimum,9.4`;
	
	var array = csvToNestedArray(csvString);
	
	createTable(array);
	
	Array.from(document.getElementsByClassName("ratingNumber")).forEach(rating => {
		
		rating.style.color = 'black';
		
		switch (Array.from(rating.innerHTML)[0]) {
			case "0":
				rating.style.backgroundColor = '#F8696BBF';
				break;
			case "1":
				if (Array.from(rating.innerHTML)[1] == "0") {
					rating.style.backgroundColor = '#63BE7BBF';
				} else {
					rating.style.backgroundColor = '#F98370BF';
				}
				break;
			case "2":
				rating.style.backgroundColor = '#FA9D75BF';
				break;
			case "3":
				rating.style.backgroundColor = '#FCB77ABF';
				break;
			case "4":
				rating.style.backgroundColor = '#FDD17FBF';
				break;
			case "5":
				rating.style.backgroundColor = '#FFEB84BF';
				break;
			case "6":
				rating.style.backgroundColor = '#E0E383BF';
				break;
			case "7":
				rating.style.backgroundColor = '#C1DA81BF';
				break;
			case "8":
				rating.style.backgroundColor = '#A2D07FBF';
				break;
			case "9":
				rating.style.backgroundColor = '#83C77DBF';
				break;
		}
		
	});
	
}