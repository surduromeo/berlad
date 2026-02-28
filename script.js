// Template by http://github.com/jackdougherty/leaflet-map/
// See Leaflet tutorial links in README.md

// set up the map center and zoom level
var map = L.map('map', {
  center: [
46.2263,27.6667], // [41.5, -72.7] for Connecticut; [41.76, -72.67] for Hartford county or city
  zoom: 14, // zoom 9 for Connecticut; 10 for Hartford county, 12 for Hartford city
  zoomControl: false // add later to reposition
});



// optional : customize link to view source code; add your own GitHub repository
map.attributionControl
.setPrefix(' Created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');


// REMOVE AFTER MAP CONSTRUCTION: optional Zoom Label (also in index.html)


// Reposition zoom control other than default topleft
L.control.zoom({position: "topright"}).addTo(map);


// optional: add legend to toggle any baselayers and/or overlays
// global variable with (null, null) allows indiv layers to be added inside functions below

var controlLayers1 = L.control.layers( null, null, {
  position: "bottomright", // suggested: bottomright for CT (in Long Island Sound); topleft for Hartford region
  collapsed: false // false = open by default
}).addTo(map);

var controlLayers = L.control.layers( null, null, {
  position: "bottomright", // suggested: bottomright for CT (in Long Island Sound); topleft for Hartford region
  collapsed: false // false = open by default
}).addTo(map);

/* BASELAYERS */
// use common baselayers below, delete, or add more with plain JavaScript from http://leaflet-extras.github.io/leaflet-providers/preview/
// .addTo(map); -- suffix displays baselayer by default
// controlLayers.addBaseLayer (variableName, 'label'); -- adds baselayer and label to legend; omit if only one baselayer with no toggle desired

var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18, // limitation of source
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
controlLayers.addBaseLayer(OpenStreetMap, 'Barlad.');

var bd1960 = new L.tileLayer.wms(" http://mapwarper.net/maps/tile/37261/{z}/{x}/{y}.png", {
  layers: 'Barlad Online',
  version: '1.1.0',
  transparent: true,
  attribution:'Map 1960-1967</a>'
})
controlLayers.addBaseLayer(bd1960, 'Barlad 1960');





var bd1900 = new L.tileLayer.wms("http://mapwarper.net/maps/tile/37305/{z}/{x}/{y}.png", {
  layers: 'Barlad Online',
  version: '1.1.0',
  transparent: true,
  attribution:'map 1900-1906 <a href="http://www.b-o.ro/">Barlad Online</a>'
}).addTo(map);
controlLayers.addBaseLayer(bd1900, 'Barlad 1900');


/* POINT OVERLAYS */
// ways to load point map data from different sources: coordinates in the code, GeoJSON in local directory, remote GeoJSON and JSON


// Flickr photo overlay from remote JSON API feed, such as all Flickr public photos OR only from your account
// Obtain and insert your own flickr API key
// https://www.flickr.com/services/apps/create/
// Use Flickr API explorer to obtain correct endpoint
// https://www.flickr.com/services/api/explore/?method=flickr.photos.search
// Example shows photos.search of georeferenced images using keyword tags
// https://www.flickr.com/services/api/explore/flickr.photos.search

// Define flickrURL endpoint with API explorer: insert your key, and tags= or text= to filter results
var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c7a425bea6a3c79092460130ee52f358&user_id=118910875%40N05&tags=old&per_page=200&extras=geo%2Curl_t%2Curl_s%2Curl_m%2Curl_c%2Ctitle&format=json&nojsoncallback=1";


// Define the flickr popup display
// ** TO DO: Rewrite link to view original source photo directly on Flickr
// ** POSSIBLY include this code directly in the functions below for easier sequencing by novices
var popupHTML = function(photo){
  var result = "";
      result = '<strong>'+photo.title+'</strong><br>';
      result += '<a href="'+photo.url_c+'" target="_blank">';
      result += '<img src="'+photo.url_s+'"></a>';      
	//was url_t; want url_s; can change to url_m if desired, but frame needs work
      result += '<small>click image to enlarge in new tab</small>';
      return result;
	   
	    
}

// Load photos from flickr JSON feed (insert your flickrURL above), display with clickable blue markers
$.getJSON(flickrURL, function (data) {
  // Create new layerGroup for the markers, with option to append ".addTo(map);" to display by default
  var layerGroup = new L.LayerGroup().addTo(map);
  // Add layerGroup to your layer control and insert your label to appear in legend
  controlLayers1.addOverlay(layerGroup, 'Foto"1900"'); // Insert your own legend label
  // Start a loop to insert flickr photo data into photoContent
  for (var i = 0; i < data.photos.photo.length; i++) {
    var photoContent = data.photos.photo[i];
    var marker = new L.marker([photoContent.latitude, photoContent.longitude],{icon: myIcon});
    marker.bindPopup(popupHTML(photoContent));
    // Add the marker to the layerGroup
   	 marker.addTo(layerGroup);
  }
});

var myIcon = L.icon({
    iconUrl: 'ap.png',
    iconSize: [38, 45],
    iconAnchor: [22, 44],
    popupAnchor: [-3, -76],
});


// Define flickrURL endpoint with API explorer: insert your key, and tags= or text= to filter results
var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c7a425bea6a3c79092460130ee52f358&user_id=118910875%40N05&tags=new&per_page=200&extras=geo%2Curl_t%2Curl_s%2Curl_m%2Curl_c%2Ctitle&format=json&nojsoncallback=1";

// Define the flickr popup display
// ** TO DO: Rewrite link to view original source photo directly on Flickr
// ** POSSIBLY include this code directly in the functions below for easier sequencing by novices

// Load photos from flickr JSON feed (insert your flickrURL above), display with clickable blue markers
$.getJSON(flickrURL, function (data) {
  // Create new layerGroup for the markers, with option to append ".addTo(map);" to display by default
  var layerGroup = new L.LayerGroup();
  // Add layerGroup to your layer control and insert your label to appear in legend
   controlLayers1.addOverlay(layerGroup, 'Foto"1960"');   // Insert your own legend label
  // Start a loop to insert flickr photo data into photoContent
  for (var i = 0; i < data.photos.photo.length; i++) {
    var photoContent = data.photos.photo[i];
    var marker = new L.marker([photoContent.latitude, photoContent.longitude],{icon: myIcon1});
    marker.bindPopup(popupHTML(photoContent));
    // Add the marker to the layerGroup
   	 marker.addTo(layerGroup);
  }
});

var myIcon1 = L.icon({
    iconUrl: 'ap1.png',
    iconSize: [38, 45],
    iconAnchor: [22, 44],
    popupAnchor: [-3, -76],
});


new L.Control.BootstrapModal({
  modalId: 'modal_about',
  tooltip: "Informatii",
  position: "topright",
  glyph: 'fas fa-info'
}).addTo(map);



function laOnClickPePoza(poza) {
  if (!informatiiPoza[poza]) {
    alert('nu am text pt. ' + poza);
  }

  $('#modal-detalii-poza .modal-title').html(informatiiPoza[poza].titlu);
  $('#modal-detalii-poza .modal-body').html(informatiiPoza[poza].descriere);

  $('#modal-detalii-poza').modal('show'); 
}
