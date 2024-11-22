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
	var anchors = content.getElementsByTagName('a');
	
	/*if (content.style.display === "inline") {
		content.style.display = "none";
	} else {
		content.style.display = "inline";
	}*/

	if (style.filter === "blur(6px)") {
		content.style.filter = "none";
		content.style.userSelect = "auto";
		Array.from(anchors).forEach((anchor) => {
			anchor.style.pointerEvents = "auto";
		})
	} else {
		content.style.filter = "blur(6px)";
		content.style.userSelect = "none";
		Array.from(anchors).forEach((anchor) => {
			anchor.style.pointerEvents = "none";
		})
	}
}

