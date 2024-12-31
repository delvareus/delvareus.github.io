/* -------------------------------------------------- GLOBAL VARIABLES -------------------------------------------------- */

var G_sortcol = 0;
var G_sortdir = "asc";


/* -------------------------------------------------- CREATE THE TABLE -------------------------------------------------- */

function csvToNestedArray(csvString) {
  // Split into rows
  const rows = csvString.split('\n');
  // Split each row into an array. This regex splits using a comma delimiter, but ignores commas that are within quotation marks.
  // Yet for some reason I've now forgotten, I changed the commas in quotes to another similar character
  const nestedArray = rows.map(row => row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)); 
  return nestedArray;
}

function createTable(array) {
    
	// ----------------- ADD CONTENT -----------------
	var columns = 5;
	var content = "";
	
	array.slice(1).forEach(function(row) {
        content += '<tr class="filterrow">';
		
		for (var i = 0; i < columns; i++) {
			
			//Set cell contents
			var cell = row[i];
			
			//Set cell class
			switch (i) {
				case 0:
					cellClass = "list_episodeNumber";
					break;
				case 1:
					cellClass = "list_episodeTitle";
					break;
				case 2:
					cellClass = "list_episodeTags";
					// Replace flag icons
					cell = cell.replace("R⚑",'<span style="color:red">⚑</span>');
					cell = cell.replace("P⚑",'<span style="color:yellow">⚑</span>');
					// Replace pips
					cell = cell.replace("A🟡",'<img alt="admiral insignia" src="images/admiral.png" width="29" />');
					cell = cell.replace("V🟡",'<img alt="vice admiral insignia" src="images/vice_admiral.png" width="26" />');
					break;
				case 3:
					cellClass = "list_episodeRecommendation";
					// Stylize notably bad entries
					cell = cell.replace("✖ Notably Bad",'<span class="NotablyBad">✖ Notably Bad</span>');
					break;
				case 4:
					cellClass = "list_episodeRating";
					break;
			}
			
            content += '<td class="' + cellClass + '">' + cell + "</td>" ;
		}
			
        content += "</tr>";
    });
    document.getElementById("episodeTable").innerHTML += content;
	
	// ----------------- ADD LINKS -----------------
	
	var epNumCells = Array.from(document.getElementsByClassName("list_episodeNumber"));
	
	epNumCells.forEach((cell) => {
		var cellContents = Array.from(cell.innerHTML);
		var season = cellContents[0];
		var episode = "" + cellContents[2] + cellContents[3];
		var link = "ds9-s" + season + ".html#e" + episode;
		
		var titleCell = cell.parentElement.querySelectorAll("td")[1];
		cellContents = titleCell.innerHTML;
		titleCell.innerHTML = '<a href="' + link + '">' + cellContents + '</a>';
		
	});
	
}

/* ------------------------------------------------------------ TABLE SORT ------------------------------------------------------------ */

function sortTable(n) {
	
	sortArrowOff = document.getElementById(G_sortcol + G_sortdir);
	sortArrowOff.style.color = "#555";
	
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	var sorttype = document.querySelector('input[name="sorttype"]:checked').value;
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
		first two, which contains table headers): */
		for (i = 2; i < (rows.length - 1); i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
			one from current row and one from the next: */
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			/* Check if the two rows should switch place,
			based on the direction, asc or desc: */
			
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
				
				if (x.innerHTML.startsWith("<a")) {
					x = x.querySelectorAll("a")[0];
					y = y.querySelectorAll("a")[0];
				}
				
				x = x.innerHTML.toLowerCase().replace(/^(')/, '');
				y = y.innerHTML.toLowerCase().replace(/^(')/, '');
				
				if (sorttype == "title"){
					x = x.replace(/^('|a\s|an\s|the\s)/, '')
					y = y.replace(/^('|a\s|an\s|the\s)/, '')
				}


				if (dir == "asc") {
					if (x > y) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (x < y) {
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
	
	G_sortcol = n;
	G_sortdir = dir;
	
	removeSeasonSeparator();
	
	if (G_sortcol == 0) {
		addSeasonSeparator();
	}
	
	sortArrowOn = document.getElementById(G_sortcol + G_sortdir);
	sortArrowOn.style.color = "white";

}

/* ------------------------------------------------------------ TABLE FILTERS ------------------------------------------------------------ */

function toggleFilterBox(id) {
	var box = document.getElementById(id);

	if (box.style.display != "block") {
		box.style.display = "block";
	} else {
		box.style.display = "none";
	}
}

window.addEventListener('mouseup',function(event){
	var filterBox = document.getElementById("tagFilter");
	if(event.target != filterBox && event.target.parentNode != filterBox && event.target.parentNode.parentNode != filterBox && event.target.parentNode != filterBox.parentNode){
        filterBox.style.display = "none";
    }
});

window.addEventListener('mouseup',function(event){
	var filterBox = document.getElementById("recommendationFilter");
	if(event.target != filterBox && event.target.parentNode != filterBox && event.target.parentNode.parentNode != filterBox && event.target.parentNode != filterBox.parentNode){
        filterBox.style.display = "none";
    }
});

function updateFilterCount() {
	
	const filterrows = Array.from(document.getElementsByClassName("filterrow"));
	var displayedRows = 0;

	filterrows.forEach((filterrow) => {
		if (filterrow.style.display != "none") {
			displayedRows += 1;
			if (filterrow.querySelector(".list_episodeNumber").innerHTML.match("&")){
				displayedRows += 1;
			}
		}
	});
	
	document.getElementById("filterTotal").innerHTML = displayedRows;
}

function setRnFilters() {
	const filterrows = Array.from(document.getElementsByClassName("filterrow"));
	var checkedRnFilters = document.querySelectorAll(".rnfiltercheckbox:checked");
	let activeRnFilters = [];
	var activeIcons = "";
	
	Array.from(checkedRnFilters).forEach((filter) => {
		activeRnFilters.push(filter.value);
		activeIcons += filter.parentElement.querySelector("span.icon").innerHTML;
	})
	
	document.getElementById("recommendationFilterTextbox").value = activeIcons;

	filterrows.forEach((filterrow) => {
		
		filterrow.style.display="none";
		var checkCell = filterrow.getElementsByTagName("td")[3];
	
		Array.from(activeRnFilters).forEach((rnfilter) => {
			if ((checkCell.innerHTML).includes(rnfilter)){
				filterrow.style.display="";
			}
		})
		
	})
	
	updateFilterCount();
	
	removeSeasonSeparator();
	
	if (G_sortcol == 0) {
		addSeasonSeparator();
	}
}

function setTagsFilters() {
	const filterrows = Array.from(document.getElementsByClassName("filterrow"));
	var checkedTagsFilters = document.querySelectorAll(".tagsfiltercheckbox:checked");
	let activeTagsFilters = [];
	var activeIcons = "";
	
	Array.from(checkedTagsFilters).forEach((filter) => {
		const filterItem = filter.value.split('|');
		filterItem.forEach((item) => {
			activeTagsFilters.push(item);
		});
		activeIcons += filter.parentElement.querySelector("span.icon").innerHTML;
	});

	document.getElementById("tagFilterTextbox").value = activeIcons;

	filterrows.forEach((filterrow) => {
		
		filterrow.style.display="none";
		var checkCell = filterrow.getElementsByTagName("td")[2];
		
		Array.from(activeTagsFilters).forEach((tagsfilter) => {
			
			if ((checkCell.innerHTML).includes(tagsfilter)){
				filterrow.style.display="";
			}
			
			/*Array.from(checkCell.innerHTML).forEach((tag) => {
				Array.from(tagsfilter).forEach((filter) => {
					if (tag == filter){
						filterrow.style.display="";
					}
				});
			});*/
			
		});
		
		
	});
	
	updateFilterCount();
	
	removeSeasonSeparator();
	
	if (G_sortcol == 0) {
		addSeasonSeparator();
	}
	
}

function setFilters(type) {
	
	const filterrows = Array.from(document.getElementsByClassName("filterrow"));

	if (type.endsWith("all")) { // "All Tags" or "All Recommendations" was checked or unchecked
		
		if (type == "rnall") { // "All Recommendations" was checked or unchecked
			var rnallfilter = document.getElementById("rnfilterall");
			var rnfilters = document.getElementsByClassName("rnfiltercheckbox");
			
			if (!rnallfilter.checked) { // "All Recommendations" was unchecked: re-check it
				rnallfilter.checked = true;
				return;
			}
			else // "All Recommendations" was checked
			{
				// Uncheck all other Recommendation selections
				Array.from(rnfilters).forEach((filter) => {
					filter.checked = false;
				})
				
				// Clear the filter textbox
				document.getElementById("recommendationFilterTextbox").value = "";
				
				toggleFilterBox('recommendationFilter');
				
				if (tagsfilterall.checked) { // If "All Tags" is also selected, show all rows
					filterrows.forEach((filterrow) => {
						filterrow.style.display = "";
					})
					updateFilterCount();
					removeSeasonSeparator();
					if (G_sortcol == 0) {
						addSeasonSeparator();
					}
					return;
				}
				else // Else if "All Tags" is not selected, filter by Tags
				{
					setTagsFilters();
					return;
				}
			}
		}
		
		if (type == "tagsall") { // "All Tags" was checked or unchecked
			var tagsallfilter = document.getElementById("tagsfilterall");
			var tagsfilters = document.getElementsByClassName("tagsfiltercheckbox");
			
			if (!tagsallfilter.checked) { // "All Tags" was unchecked: re-check it
				tagsallfilter.checked = true;
				return;
			}
			else // "All Tags" was checked
			{
				// Uncheck all other Tags selections
				Array.from(tagsfilters).forEach((filter) => {
					filter.checked = false;
				})
				
				// Clear the filter textbox
				document.getElementById("tagFilterTextbox").value = "";
				
				toggleFilterBox('tagFilter');
				
				if (rnfilterall.checked) { // If "All Recommendations" is also selected, show all rows
					filterrows.forEach((filterrow) => {
						filterrow.style.display = "";
					})
					updateFilterCount();
					removeSeasonSeparator();
					if (G_sortcol == 0) {
						addSeasonSeparator();
					}
					return;
				}
				else // Else if "All Recommendations" is not selected, filter by Tags
				{
					setRnFilters();
					return;
				}
			}
		}
	}
	else // A selection was made that WASN'T of of the "All" options
	{
		var rnallfilter = document.getElementById("rnfilterall");
		var tagsallfilter = document.getElementById("tagsfilterall");
		

		if (type=="rn") { // A recommendation filter was checked or unchecked
			rnallfilter.checked = false;
			
			if (tagsallfilter.checked) { // All Tags is checked: just filter by Recommendation
				setRnFilters();
				return;
			}
		}
		if (type=="tags") { // A tags filter was checked or unchecked
			tagsallfilter.checked = false;
			
			if (rnallfilter.checked) { // All Recommendations is checked: just filter by Tags
				setTagsFilters();
				return;
			}
		}
		if (type=="andor") { // The and/or selector was changed
			if (rnallfilter.checked && tagsallfilter.checked) { // Both Tags and Recommendations are set to "All": Show all rows
				filterrows.forEach((filterrow) => {
					filterrow.style.display = "";
				})
				updateFilterCount();
				removeSeasonSeparator();
				if (G_sortcol == 0) {
					addSeasonSeparator();
				}				
				return;
			}
			if (rnallfilter.checked && !tagsallfilter.checked) { // Recommendations is set to "All": filter by Tags
				setTagsFilters();
				return;
			}
			if (!rnallfilter.checked && tagsallfilter.checked) { // Tags is set to "All": filter by Recommendation
				setRnFilters();
				return;
			}
		}
		
	// ********** A SELECTION WAS MADE THAT REQUIRES FILTERING BY BOTH FILTERS **********
		
		var checkedRnFilters = document.querySelectorAll(".rnfiltercheckbox:checked");
		let activeRnFilters = [];
		var activeRnIcons = "";
		var checkedTagsFilters = document.querySelectorAll(".tagsfiltercheckbox:checked");
		let activeTagsFilters = [];
		var activeTagsIcons = "";
		var andorradio = document.querySelector(".andorradio:checked");
		var andor = andorradio.value;
	
		Array.from(checkedRnFilters).forEach((filter) => {
			activeRnFilters.push(filter.value);
			activeRnIcons += filter.parentElement.querySelector("span.icon").innerHTML;
		});

		document.getElementById("recommendationFilterTextbox").value = activeRnIcons;
		
		
		Array.from(checkedTagsFilters).forEach((filter) => {
			activeTagsFilters.push(filter.value);
			activeTagsIcons += filter.parentElement.querySelector("span.icon").innerHTML;
		});
		
		document.getElementById("tagFilterTextbox").value = activeTagsIcons;
		
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
	updateFilterCount();
	removeSeasonSeparator();
	
	if (G_sortcol == 0) {
		addSeasonSeparator();
	}
	
}


function resetFilters() {
	
	var filterallcheckboxes = document.querySelectorAll("#rnfilterall,#tagsfilterall");
	var filtercheckboxes = document.querySelectorAll(".rnfiltercheckbox,.tagsfiltercheckbox");
	
	document.getElementById("recommendationFilterTextbox").value = "";
	document.getElementById("tagFilterTextbox").value = "";
	
	Array.from(filterallcheckboxes).forEach((checkbox) => {
		checkbox.checked = true;
	})
	
	Array.from(filtercheckboxes).forEach((checkbox) => {
		checkbox.checked = false;
	})
	
	var andordefault = document.getElementById("andordefault");
	andordefault.checked = true;
	
	setFilters("andor");
	updateFilterCount();
	removeSeasonSeparator();
	
	if (G_sortcol == 0) {
		addSeasonSeparator();
	}
}

/* ------------------------------------------------------------ SEASON SEPARATOR ------------------------------------------------------------ */

function addSeasonSeparator() {
	
	table = document.getElementById("episodeTable");
	rows = table.rows;
	
	/* Loop through all table rows (except the
		first and second, which contains filters and table headers): */
	for (i = 2; i < (rows.length - 1); i++) {
		
		rowstyle = getComputedStyle(rows[i]);
		if (rowstyle.display == "none") {continue;};	
		x = rows[i].getElementsByTagName("TD")[0];
		
		for (j = i + 1; j < (rows.length - 1); j++) {
			
			y = rows[j].getElementsByTagName("TD")[0];
			rowstyle = getComputedStyle(rows[j]);
			if (rowstyle.display != "none") {break;};
			
		}
		
		if (Array.from(x.innerHTML)[0] != Array.from(y.innerHTML)[0]) {
			var rcells = y.parentElement.querySelectorAll("td");
			Array.from(rcells).forEach((rcell) => {
				rcell.style.borderTop="thick double #C0C0C0";
			});
		}	
	}
}

function removeSeasonSeparator() {
	var allCells = document.getElementById("episodeTable").querySelectorAll("td");
	Array.from(allCells).forEach((cell) => {
		cell.style.borderTop="";
	});
}

/* ------------------------------------------------------------------------------------------------------------
   -------------------------------------------------- ONLOAD --------------------------------------------------
   ------------------------------------------------------------------------------------------------------------ */

window.onload = function() {
	
var csvString = `Episode,Title,Tags,Recommendation,Rating
1x01/02 [FL],Emissary,,🕶 ‼ Must Watch/Bare Minimum,7.2
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
2x20 & 21,The Maquis (Parts I and II),,🕶 Must Watch,7.1
2x22,The Wire,,✔+ Highly Recommended,6.2
2x23,Crossover,♊,✔ Recommended,6.7
2x24,The Collaborator,,🕶 Must Watch,3.8
2x25,Tribunal,,,5.7
2x26,The Jem'Hadar,,🕶 Must Watch,7.2
3x01 & 02,The Search (Parts I and II),V🟡,🕶 ‼ Must Watch/Bare Minimum,7.8
3x03,The House of Quark,,♦ Optional,6.9
3x04,Equilibrium,,✔ Recommended,5.2
3x05,Second Skin,,✔ Recommended,5.9
3x06,The Abandoned,,,3.9
3x07,Civil Defense,♥️,✔ Recommended,7.2
3x08,Meridian,,,1.9
3x09,Defiant,,🕶 Must Watch,7.2
3x10,Fascination,🎭♥️,,3.3
3x11 & 12,Past Tense (Parts I and II),🕖🌎,✔+ Highly Recommended,6.4
3x13,Life Support,,♦ Optional,3.2
3x14,Heart of Stone,,♦ Optional,5.2
3x15,Destiny,♥️,✔ Recommended,6.4
3x16,Prophet Motive,,,3.3
3x17,Visionary,🕖,,6.6
3x18,Distant Voices,😱,,3.1
3x19,Through the Looking Glass,♊,✔ Recommended,6.4
3x20,Improbable Cause,A🟡,🕶 Must Watch,9.0
3x21,The Die is Cast,A🟡,🕶 Must Watch,9.2
3x22,Explorers,,,5.2
3x23,Family Business,,,5.2
3x24,Shakaar,,🕶 Must Watch,4.3
3x25,Facets,,✔ Recommended,4.4
3x26,The Adversary,,🕶 Must Watch,7.5
4x01/02 [FL],The Way of the Warrior,V🟡🥈,🕶 ‼ Must Watch/Bare Minimum,9.6
4x03,The Visitor,,✔+ Highly Recommended,8.6
4x04,Hippocratic Oath,,,5.3
4x05,Indiscretion,,🕶 Must Watch,6.7
4x06,Rejoined,,,5.1
4x07,Starship Down,,,7.4
4x08,Little Green Men,🕖🌎,♦ Optional,6.0
4x09,The Sword of Kahless,,,4.8
4x10,Our Man Bashir,🎭🟨♥️,♦ Optional,6.8
4x11,Homefront,A🟡🌎,🕶 Must Watch,9.1
4x12,Paradise Lost,A🟡🌎,🕶 Must Watch,9.1
4x13,Crossfire,,✔ Recommended,4.6
4x14,Return to Grace,,✔ Recommended,6.9
4x15,Sons of Mogh,,♦ Optional,4.7
4x16,Bar Association,,,4.2
4x17,Accession,,,3.6
4x18,Rules of Engagement,⚖️,,6.5
4x19,Hard Time,,,5.4
4x20,Shattered Mirror,♊,✔ Recommended,6.5
4x21,The Muse,,,1.1
4x22,For the Cause,V🟡,🕶 Must Watch,7.4
4x23,To The Death,,,6.2
4x24,The Quickening,♥️,,5.1
4x25,Body Parts,,✔ Recommended,4.2
4x26,Broken Link,,🕶 Must Watch,6.6
5x01,Apocalypse Rising,,✔ Recommended,6.2
5x02,The Ship,,,6.1
5x03,Looking for par'Mach in All the Wrong Places,,♦ Optional,4.9
5x04,Nor the Battle to the Strong,,,6.6
5x05,The Assignment,,,5.3
5x06,Trials and Tribble-ations,V🟡🕖🏅,🕶 Must Watch,10.0
5x07,Let He Who Is Without Sin…,,✖ Notably Bad,1.4
5x08,Things Past,,,5.7
5x09,The Ascent,,,4.4
5x10,Rapture,,✔ Recommended,6.0
5x11,The Darkness and the Light,,,3.4
5x12,The Begotten ,,✔ Recommended,5.6
5x13,For the Uniform,,🕶 Must Watch,7.1
5x14,In Purgatory's Shadow,A🟡,🕶 Must Watch,8.9
5x15,By Inferno's Light,A🟡,🕶 Must Watch,8.9
5x16,Doctor Bashir，I Presume,,✔ Recommended,5.1
5x17,A Simple Investigation,,,5.0
5x18,Business as Usual,,,5.2
5x19,Ties of Blood and Water,,♦ Optional,6.4
5x20,Ferengi Love Songs,,,3.5
5x21,Soldiers of the Empire,,,5.9
5x22,Children of Time,🕖,,6.4
5x23,Blaze of Glory,,🕶 Must Watch,6.8
5x24,Empok Nor,😱,,6.0
5x25,In the Cards, ,,4.8
5x26,Call to Arms,V🟡,🕶 ‼ Must Watch/Bare Minimum,8.8
6x01,A Time to Stand,,🕶 Must Watch,6.6
6x02,Rocks and Shoals,,✔ Recommended,7.5
6x03,Sons and Daughters,,✔ Recommended,3.8
6x04,Behind the Lines,V🟡,🕶 Must Watch,6.9
6x05,Favor the Bold,,🕶 Must Watch,7.7
6x06,Sacrifice of Angels,A🟡🥉,🕶 ‼ Must Watch/Bare Minimum,9.2
6x07,You Are Cordially Invited,♥️,♦ Optional,6.6
6x08,Resurrection,♊,♦ Optional,3.6
6x09,Statistical Probabilities,,✔ Recommended,5.9
6x10,The Magnificent Ferengi,,,6.2
6x11,Waltz,V🟡,🕶 Must Watch,6.1
6x12,Who Mourns for Morn?,,,5.4
6x13,Far Beyond the Stars,🏅,🕶 Must Watch,9.0
6x14,One Little Ship,,,4.8
6x15,Honor Among Thieves,,,4.1
6x16,Change of Heart,,,3.5
6x17,Wrongs Darker Than Death or Night,🕖,,5.0
6x18,Inquisition,31♥️,🕶 Must Watch,7.3
6x19,In the Pale Moonlight,A🟡🥇,🕶 ‼ Must Watch/Bare Minimum,9.6
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
7x08,The Siege of AR-558,V🟡,🕶 Must Watch,7.5
7x09,Covenant,,✔ Recommended,4.6
7x10,It's Only a Paper Moon,,✔+ Highly Recommended,7.4
7x11,Prodigal Daughter,P⚑,,2.8
7x12,The Emperor's New Cloak,♊,♦ Optional,3.7
7x13,Field of Fire,,,5.1
7x14,Chimera,,,3.8
7x15,Badda-Bing，Badda-Bang,🎭🟨♥️,♦ Optional,6.4
7x16,Inter Arma Enim Silent Leges,V🟡31♥️,🕶 Must Watch,7.6
7x17,Penumbra,,🕶 Must Watch,5.1
7x18,'Til Death Do Us Part,,🕶 Must Watch,5.7
7x19,Strange Bedfellows,,🕶 Must Watch,6.4
7x20,The Changing Face of Evil,,🕶 ‼ Must Watch/Bare Minimum,7.8
7x21,When It Rains…,,🕶 ‼ Must Watch/Bare Minimum,7.1
7x22,Tacking Into the Wind,,🕶 Must Watch,7.8
7x23,Extreme Measures,31,🕶 Must Watch,5.6
7x24,The Dogs of War,A🟡,🕶 Must Watch,8.4
7x25/26 [FL],What You Leave Behind,A🟡,🕶 ‼ Must Watch/Bare Minimum,9.4`;
	
	var array = csvToNestedArray(csvString);
	
	createTable(array);
	
	// Add episode rating colors
	Array.from(document.getElementsByClassName("list_episodeRating")).forEach(rating => {
		
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
	
	sortArrowOn = document.getElementById(G_sortcol + G_sortdir);
	sortArrowOn.style.color = "white";
	
	addSeasonSeparator();
}