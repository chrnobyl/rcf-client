var mapObj
var markers = []
var infoWindows = []

$(document).ready(function(){
  setFormSubmitAction()
  ComplaintCategories.getGroupedComplaints()
})

function setFormSubmitAction(){
  $('form#zip-code').on('submit', function(event){
    event.preventDefault()
    const zip = $('input[name = zip]').val()
    const category = $('select[name = complaint-category]').val()
    const url = `http://localhost:3000/api/v1/complaints/search?zip_code=${zip}&complaint_type=${category}`

    $.ajax({
      url: url,
      success: function(data){
          updateMarkers(data)
      }
    })
  })
}

function initMap() {
  var nyc = {lat: 40.7255944265592, lng: -73.9446377360189}
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: nyc
  })
  mapObj = map
}

function makeNewMarker(complaint){
  const latLng = new google.maps.LatLng(complaint.latitude, complaint.longitude)
  var infoWindow = new google.maps.InfoWindow({
      content: `<strong>${complaint.description}</strong><br/> ${complaint.date}<br/> (${complaint.latitude}, ${complaint.longitude})`
    })
    infoWindows.push(infoWindow)
  var marker = new google.maps.Marker({
    position: latLng,
    map: mapObj
  })

  marker.addListener('click', function() {
    closeAllInfoWindows()
    infoWindow.open(map, marker);
  })
  markers.push(marker)
}

function resetMapArea(){
  var latlngbounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    latlngbounds.extend(markers[i].position);
  }
  mapObj.fitBounds(latlngbounds);
}

function updateMarkers(data) {
  clearAllMarkers()
  data.map(function(complaint){
    if (complaint.latitude !== null && complaint.longitude !== null){
      makeNewMarker(complaint)
    }
  })
  resetMapArea()
}

function clearAllMarkers(){
  markers.forEach(function(marker){
    marker.setMap(null)
  })
  markers = []
}

function closeAllInfoWindows(){
  infoWindows.forEach(function(infoWindow){
    infoWindow.close()
  })
}
