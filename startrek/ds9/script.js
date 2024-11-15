window.onload = function() {

	/*document.getElementById('TTDIV').innerHTML = `
		<div id="FepisodeToolTip" class="tooltip" onClick="closeToolTip(this)">"Franchise Episode" tells you the order in which episodes from ANY/ALL Star Trek television shows aired or streamed for the first time. This number excludes movies, TOS's "The Cage", and the "Very Short Treks" web shorts.<br /><span class="xx-small"><center>click to close</center></span></div>
		
	`;*/


	for (const item of document.getElementsByClassName('FepisodeNumberBox')) {
		item.onclick = function(e){
			var tooltip = document.getElementById('FepisodeToolTip');
			var x = e.clientX,
				y = e.clientY;
				tooltip.style.top = (y+20) + 'px';
				tooltip.style.left = (x+20) + 'px';
				tooltip.style.display = 'block';
				tooltip.style.position = 'fixed';
		}
		/*item.onmouseout = function(){
			var tooltip = document.getElementById('FepisodeToolTip');
			tooltip.style.display = 'none';
		}*/
	}

	Array.from(document.getElementsByClassName("ratingNumber")).forEach(rating => {
		
		switch (Array.from(rating.innerHTML)[0]) {
			case "0":
				rating.style.color = '#F8696BBF';
				break;
			case "1":
				if (Array.from(rating.innerHTML)[1] == "0") {
					rating.style.color = '#63BE7BBF';
				} else {
					rating.style.color = '#F98370BF';
				}
				break;
			case "2":
				rating.style.color = '#FA9D75BF';
				break;
			case "3":
				rating.style.color = '#FCB77ABF';
				break;
			case "4":
				rating.style.color = '#FDD17FBF';
				break;
			case "5":
				rating.style.color = '#FFEB84BF';
				break;
			case "6":
				rating.style.color = '#E0E383BF';
				break;
			case "7":
				rating.style.color = '#C1DA81BF';
				break;
			case "8":
				rating.style.color = '#A2D07FBF';
				break;
			case "9":
				rating.style.color = '#83C77DBF';
				break;
		}
		
	});

}

function closeToolTip(caller) {
	caller.style.display = 'none';
}



/* ------------------------- NAVIGATION MENU ------------------------- */

function toggleNav(){
	var button = document.getElementById("leftNavOpenButton");
	var style = getComputedStyle(button);
	if (style.left == "320px") {
		closeNav();
	} else {
		openNav();
	}
}

function openNav() {
  document.getElementById("mainSidenav").style.width = "320px";
  document.getElementById("leftNavOpenButton").style.left = "320px";
}

function closeNav() {
  document.getElementById("mainSidenav").style.width = "0";
  document.getElementById("leftNavOpenButton").style.left = "0px";
}

window.addEventListener('mouseup',function(event){
	var menu = document.getElementById("mainSidenav");
	if(event.target != menu && event.target.parentNode != menu){
            closeNav();
        }
});

/* ------------------------- SCROLL TO TOP BUTTON ------------------------- */

window.onscroll = function scrollFunction() {
  let toTopButton = document.getElementById("toTopButton");
  
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 

/* ------------------------- SPOILERS ------------------------- */

function displaySpoiler(caller) {
	
	var content = caller.parentNode.querySelector('.spoilerContent');
	var style = getComputedStyle(content);
	var anchors = content.getElementsByTagName('a');
	
	/*if (content.style.display === "inline") {
		content.style.display = "none";
	} else {
		content.style.display = "inline";
	}*/

	if (style.filter === "blur(6px)") {
		content.style.filter = "none";
		Array.from(anchors).forEach((anchor) => {
			anchor.style.pointerEvents = "auto";
		})
	} else {
		content.style.filter = "blur(6px)";
		Array.from(anchors).forEach((anchor) => {
			anchor.style.pointerEvents = "none";
		})
	}
}

/* ------------------------- TABLE SORT ------------------------- */

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("EpisodeTable");
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
	var filterrows = document.getElementsByClassName("filterrow");
	var checkedRnFilters = document.querySelectorAll(".rnfiltercheckbox:checked");
	let activeRnFilters = [];
	
	Array.from(checkedRnFilters).forEach((filter) => {
		activeRnFilters.push(filter.value);
	})

	Array.from(filterrows).forEach((filterrow) => {
		
		filterrow.style.display="none";
		
		Array.from(activeRnFilters).forEach((rnfilter) => {
			if ((filterrow.getAttribute('rn')).includes(rnfilter)){
				filterrow.style.display="";
			}
		})
		
		
	})
}

function setTagsFilters() {
	var filterrows = document.getElementsByClassName("filterrow");
	var checkedTagsFilters = document.querySelectorAll(".tagsfiltercheckbox:checked");
	let activeTagsFilters = [];
	
	Array.from(checkedTagsFilters).forEach((filter) => {
		activeTagsFilters.push(filter.value);
	})

	Array.from(filterrows).forEach((filterrow) => {
		
		filterrow.style.display="none";
		
		Array.from(activeTagsFilters).forEach((tagsfilter) => {
			if ((filterrow.getAttribute('tags')).includes(tagsfilter)){
				filterrow.style.display="";
			}
		})
		
		
	})
}

function setFilters(type) {
	
	var filterrows = document.getElementsByClassName("filterrow");

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
					Array.from(filterrows).forEach((filterrow) => {
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
					Array.from(filterrows).forEach((filterrow) => {
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
				Array.from(filterrows).forEach((filterrow) => {
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
		
		Array.from(filterrows).forEach((filterrow) => {
			
			var partmatch = false;
			
			filterrow.style.display="none";
			
			
			Array.from(activeRnFilters).forEach((rnfilter) => {
				if ((filterrow.getAttribute('rn')).includes(rnfilter)){
					if (andor == "and"){
						partmatch = true;
					} else {
						filterrow.style.display="";
					}
				}
			})
			
			if (partmatch || andor == "or"){
				Array.from(activeTagsFilters).forEach((tagsfilter) => {
					if ((filterrow.getAttribute('tags')).includes(tagsfilter)){
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


