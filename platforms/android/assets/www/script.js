// JavaScript Document

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

document.addEventListener("DOMContentLoaded", function(){
	
	var
	  homePic = document.getElementById("homepic");
	  locationPic = document.getElementById("locationpic");
	  contactsPic = document.getElementById("contactspic");
	  homePage = document.getElementById("home");
	  locationPage = document.getElementById("location");
	  contactsPage = document.getElementById("contacts");
	  loadedMap = false;
	  
	homePic.addEventListener("click", function() {
		locationPage.className = "inactive";
		contactsPage.className = "inactive";
		homePage.className = "active";
	});
	
	locationPic.addEventListener("click", function() {
		locationPage.className = "active";
		contactsPage.className = "inactive";
		homePage.className = "inactive";
		
		if( navigator.geolocation ){
			var params = {enableHighAccuracy: false, timeout:3600, maximumAge:60000};
			navigator.geolocation.getCurrentPosition( reportPosition, gpsError, params );
		}else{
			alert("Sorry, but your browser does not support location based awesomeness.")
		}
		
		function reportPosition( position ){
			if(loadedMap)
			  return;
			var output = document.querySelector("#output");
			var img = document.createElement("img");
			img.src= "https://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + 				"&zoom=14&size=400x400&markers=color:red%7C" + position.coords.latitude + "," + position.coords.longitude;
			output.appendChild(img);
			output.innerHTML += "<br>Latitude: " + position.coords.latitude + "&deg;<br/>"
			+ "Longitude: " + position.coords.longitude + "&deg;<br/>"
			+ "Accuracy: " + position.coords.accuracy + "m<br/>"
			+ "Altitude: " + position.coords.altitude + " m<br/>"
			+ "Heading: " + position.coords.heading + " &deg;<br/>"
			+ "Speed: " + position.coords.speed + " m/s<br/>"
			+ "Timestamp: " + position.timestamp;
			loadedMap = true;
		}
		
		function gpsError( error ){
			var errors = {
				1: 'Permission denied',
				2: 'Position unavailable',
				3: 'Request timeout'
			};
			alert("Error: " + errors[error.code]);
		}
	});


	document.addEventListener("deviceready", function(){
		contactsPic.addEventListener("click", function() {
			locationPage.className = "inactive";
			contactsPage.className = "active";
			homePage.className = "inactive";

			var options = new ContactFindOptions();
			options.filter = "";  //leaving this empty will find return all contacts
			options.multiple = true;  //return multiple results
			var filter = ["displayName", "nickname", "phoneNumbers"];    //an array of fields to compare against the options.filter 
			var output = document.querySelector("#contactoutput");
			navigator.contacts.find(filter, successFunc, errFunc, options);

			function successFunc( matches ){
				var rnd = Math.floor((Math.random() * (matches.length - 1))); 
				var c_Name = matches[rnd].displayName;
				var c_Nick = matches[rnd].nickname;
				var c_Numbers = matches[rnd].phoneNumbers;

				output.innerHTML = "";

				output.innerHTML += "<br><p>Display Name:<br>" + c_Name + "<br><br>Nick Name:<br>" + c_Nick + "<br><br>Phone Numbers:";

				for (var c = 0; c < c_Numbers.length; c++) {
					output.innerHTML +=  c_Numbers[c].value + "<br>";
				};

				output.innerHTML += "</p>";
			}

		    function errFunc( error ) {
		        alert("Error: " + error.code);
		  	}
		 });
	});
});