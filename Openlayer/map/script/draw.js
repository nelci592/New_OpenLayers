const markerSource = new Vector();

var markerStyle = new Style({
  image: new Icon(/** @type {olx.style.IconOptions} */ ({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    opacity: 0.75,
    src: 'https://openlayers.org/en/v4.6.4/examples/data/icon.png'
  }))
});


function addMarker(lon, lat) {
  console.log('lon:', lon);
  console.log('lat:', lat);

  var iconFeatures = [];

  var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326',
      'EPSG:3857')),
    name: 'Null Island',
    population: 4000,
    rainfall: 500
  });

  markerSource.addFeature(iconFeature);
}

map.on('singleclick',function(event){
  var lonLat = ol.proj.toLonLat(event.coordinate);
  addMarker(lonLat[0], lonLat[1]);
});
