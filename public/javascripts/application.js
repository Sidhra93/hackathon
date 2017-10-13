var map;
var zoomLevel = 17;
var centerMarker;

function initMap() {
  initAutoComplete();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoomLevel,
    center: {lat: -37.815031, lng: 144.967005},
    styles: styles['hide']
  });
  centerMarker = new google.maps.Marker({
    map: map,
    position: {lat: -37.815031, lng: 144.967005}
  });
  var markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      position: location,
      icon: "https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png"
    });
  });

  var markerCluster = new MarkerClusterer(map, markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

}

  var locations = [];
  carSpots.forEach(function(carspot){
    var latitude = carspot.lat
    var longitude = carspot.lon
    locations.push({lat: parseFloat(latitude), lng: parseFloat(longitude)});
  });

  var styles = {
    hide: [
      {
        featureType: 'poi.business',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{visibility: 'off'}]
      }
    ]
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  function showPosition(position) {
    map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
    map.setZoom(zoomLevel);

    centerMarker = new google.maps.Marker({
      map: map,
      position: {lat: position.coords.latitude, lng: position.coords.longitude}
    });
  }

  function initAutoComplete(){
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-37.785314, 145.033092),
      new google.maps.LatLng(-37.862693, 144.881693));

      var input = document.getElementById('search');
      var options = {
        bounds: defaultBounds,
        types: ['address'],
        // types: ['(cities)'],
        componentRestrictions: {country: "au"}
      };

      autocomplete = new google.maps.places.Autocomplete(input, options);

      autocomplete.addListener('place_changed', function(){
        var place = autocomplete.getPlace();
        map.setCenter(place.geometry.location);
        map.setZoom(zoomLevel);

        centerMarker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      });
}
