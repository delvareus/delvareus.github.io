

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
  var sidenavExists = document.getElementById("mainSidenav")
	if (!!sidenavExists){
		document.getElementById("mainSidenav").style.width = "0";
		document.getElementById("leftNavOpenButton").style.left = "0px";
	}
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

	if (style.filter === "blur(6px)") {
		content.style.filter = "none";
		content.style.userSelect = "auto";
		content.style.pointerEvents = "auto";
	} else {
		content.style.filter = "blur(6px)";
		content.style.userSelect = "none";
		content.style.pointerEvents = "none";
	}
}

/* ------------------------------------------------------------------------------------------------------------
   -------------------------------------------------- ONLOAD --------------------------------------------------
   ------------------------------------------------------------------------------------------------------------ */

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

	Array.from(document.getElementsByClassName("ScoreBox")).forEach(box => {
		
		var score = box.querySelector(".xx-large").innerHTML;

		switch (Array.from(score)[0]) {
			case "0":
				box.style.backgroundColor = '#F8696BBF';
				break;
			case "1":
				if (Array.from(score)[1] == "0") {
					box.style.backgroundColor = '#63BE7BBF';
				} else {
					box.style.backgroundColor = '#F98370BF';
				}
				break;
			case "2":
				box.style.backgroundColor = '#FA9D75BF';
				break;
			case "3":
				box.style.backgroundColor = '#FCB77ABF';
				break;
			case "4":
				box.style.backgroundColor = '#FDD17FBF';
				break;
			case "5":
				box.style.backgroundColor = '#FFEB84BF';
				break;
			case "6":
				box.style.backgroundColor = '#E0E383BF';
				break;
			case "7":
				box.style.backgroundColor = '#C1DA81BF';
				break;
			case "8":
				box.style.backgroundColor = '#A2D07FBF';
				break;
			case "9":
				box.style.backgroundColor = '#83C77DBF';
				break;
		}
		
	});

}