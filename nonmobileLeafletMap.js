Qualtrics.SurveyEngine.addOnload(function()
{
  var head= document.getElementsByTagName('head')[0];
	
  var scriptA = document.createElement("script");
  scriptA.type = "text/javascript";
  scriptA.src = "https://maps.googleapis.com/maps/api/js?key= [YOUR KEY]&v=3.exp&sensor=false&callback=loadedGoogleMapsAPI";
  document.body.appendChild(scriptA);
	
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://unpkg.com/leaflet@1.0.3/dist/leaflet.js";
  document.body.appendChild(script);
  
  var script3 = document.createElement("script");
  script3.type = "text/javascript";
  script3.src = "https://unpkg.com/esri-leaflet@2.0.7";
  document.body.appendChild(script3);
	
  var css2 = document.createElement("css");
  css2.type = 'text/css';
  css2.src ="https://unpkg.com/esri-leaflet-geocoder@2.2.4/dist/esri-leaflet-geocoder.css";
  document.body.appendChild(css2);
	
  var script2 = document.createElement("script");
  script2.type = "text/javascript";
  script2.src = "https://unpkg.com/leaflet.vectorgrid@latest/dist/Leaflet.VectorGrid.bundled.js";
  document.body.appendChild(script2);

	
  var canvas;
  var map;
  var wrapper;
  var mapdiv;
  var textdiv;
  var geocodeService;
  var nextButton =document.getElementById("NextButton");

	
  mapStuff=function(){
  var street ="${e://Field/street}";
  var crossStreet ="${e://Field/crossStreet}";
  var city ="${e://Field/city}";
  var zip ="${e://Field/zip}";
  var state = "${e://Field/state}";
  geoCodeString(street+", "+crossStreet+", "+city+", "+zip);
};
	

	
	
	geoCodeString = function( string ) {
      geocoder = new google.maps.Geocoder();
	  geocoder.geocode( { 'address': string }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
		var latlong=results[0].geometry.location;
		var lat = results[0].geometry.location.lat();
		var long = results[0].geometry.location.lng();
		var zoom = 16;
		showMap(lat, long, zoom);
      	} 
		else {
		var lat = 36.7783;
		var long = -119.4179;
	    var zoom = 6;
	    showMap(lat, long, zoom);
		}

    
	  });
	  };
	
	
var question = this;
var lattext = $(question.getChoiceContainer()).down('.InputText', 0);
var longtext = $(question.getChoiceContainer()).down('.InputText', 1);
  

	
showMap =function(lat, long, zoom){

  if (mapdiv==null) {
	
	
  var coords = [lat,long];
	  
  textdiv = document.createElement("div");
  textdiv.id='textdiv';
  textdiv.setAttribute('style', 'position: relative; font-size: 13px; font-family: Arial; color: #404040; text-align:center; margin:auto; top: 0px');
  textdiv.innerHTML="Click on the map or drag the pin to adjust your location."; 
  document.body.insertBefore(textdiv, document.body.firstChild);
	
  mapdiv = document.createElement("div");
  mapdiv.id='mapdiv';
  mapdiv.setAttribute('style', 'position: relative; text-align:center; left:0; top:0px; width: 50%; height:50%; margin: auto;');
  document.body.insertBefore(mapdiv, document.body.firstChild);
	
  map = L.map('mapdiv',
		{
	center: coords,
    zoom: zoom });
	
	
	L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri'
	}).addTo(map);

	
   	var marker = null;
	
	marker = L.marker(coords, {draggable: true}).addTo(map);
		
	marker.on('dragend', function (e) {
		updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
	});
	map.on('click', function (e) {
		marker.setLatLng(e.latlng);
		updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
	});

	
	function updateLatLng(lat,lng) {
		lattext.value = marker.getLatLng().lat.toFixed(6);
		longtext.value = marker.getLatLng().lng.toFixed(6);
		map.panTo([lat,lng]);
	};

};
}
	

});
