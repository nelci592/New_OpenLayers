var latlon = [52.226317, 5.313376];
var this_map;
var antwoord;

var cluster = getUrlVars()['jaarplan'];

//

haal_data_op(1);

////initialize the map
this_map = L.map('this_map');
this_map.createPane('wms');
this_map.getPane('wms').style.zIndex = 650;
this_map.getPane('wms').style.pointerEvents = 'none';

this_map.setView( latlon , 8);

//Base layer, should probably change to Open Topo at a certain stage
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxNativeZoom: 19,
    maxZoom: 24,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(this_map);

// WMS layers
var lagen = {

    voorspelmodel: L.tileLayer.wms('https://bam.projectxplor.nl/geoserver/BAM/wms?', {
        layers: 'BAM:bam_voorspelmodel_04072018',
        format: 'image/png',
        transparent: true,
        maxZoom: 24,
        zIndex: 9,
        pane: 'wms',
    }),

    kunstwerk: L.WMS.overlay('https://bam.projectxplor.nl/geoserver/BAM/wms?', {
        layers: 'BAM:kunstwerk2',
        format: 'image/png',
        transparent: true,
        maxZoom: 24,
        zIndex: 11,
    }),

    wissels: L.WMS.overlay('https://bam.projectxplor.nl/geoserver/BAM/wms?', {
        layers: 'BAM:wissels1904',
        format: 'image/png',
        transparent: true,
        maxZoom: 24,
        zIndex: 10,
    }),

    overwegen: L.WMS.overlay('https://bam.projectxplor.nl/geoserver/BAM/wms?', {
        layers: 'BAM:overwegen',
        format: 'image/png',
        transparent: true,
        maxZoom: 24,
        zIndex: 11,
    }),

  

    spooras: L.WMS.overlay('https://bam.projectxplor.nl/geoserver/BAM/wms?', {
        layers: 'BAM:spoornaam_1905',
        format: 'image/png',
        transparent: true,
        maxZoom: 24,
        zIndex: 9,
    }),

    kilometrering: L.tileLayer.wms('https://bam.projectxplor.nl/geoserver/BAM/wms?', {
        layers: 'BAM:kilometrering',
        format: 'image/png',
        transparent: true,
        maxZoom: 24,
        zIndex: 11,
        pane: 'wms'
    }),

    /*zkl: L.WMS.overlay('https://bam.projectxplor.nl/geoserver/BAM/wms?', {
        layers: 'BAM:bam_veiligheid_zkl_2017',
        format: 'image/png',
        transparent: true,
        maxZoom: 24,
        zIndex: 11,
    }),*/

    luchtfoto: L.tileLayer.wms('https://bam.projectxplor.nl/geoserver/BAM/wms?', {
        layers: 'BAM:ProRail2016',
        format: 'image/png',
        transparent: true,
        maxZoom: 24,
        /*maxNativeZoom: 18,*/
        zIndex: 1,
    }),

}

//Initialize the StyleEditor
var styleEditor = L.control.styleEditor({
    position: "topleft",
    strings: {
      cancel: 'Done',
      cancelTitle: 'Stop styling elements',
      tooltip: 'Click on the element you want to style',
      tooltipNext: 'Choose another element you want to style'
      }
});
this_map.addControl(styleEditor);


var drawnItems = new L.FeatureGroup();
this_map.addLayer(drawnItems);
drawnItems.bringToBack();


var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        remove: true
    },
    draw: {
        polyline: false,
        circlemarker: false,
        circle: false,
        rectangle: false,
        polygon: {
            allowIntersection: false, // polygons cannot intersect thenselves
            drawError: {
                color: 'red', // color the shape will turn when intersects
                message: '<strong>Let op: Een polygoon mag zichzelf niet overlappen.' // message that will show when intersect
            },
        },
        marker: {
            icon: styleEditor.getDefaultIcon()
        }
    }
});
this_map.addControl(drawControl);


this_map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;

    //antwoord = prompt("geef omschrijving", "omschrijving");

    var melding = "Omschrijving";

    $.colorbox({ opacity: 0.4, overlayClose: false, closeButton: false, html: "<h3>Informatie over dit object</h3><table><tr class=groen><td>Geef omschrijving:</td><td><input id=omschrijving size=50 type=text placholder='omschrijving'></input></td></tr><tr class=groen><td>Uiterste herstel datum:</td><td><input id=hersteldatum input type=date placholder='hersteldatum'></input></td></tr><tr class=groen><td>VSM-nummer:</td><td><input id=vsmnummer type=text placholder='vsmnummer'></input></td></tr><tr class=groen><td>Middelinzet:</td><td><select id=middelinzet><option value=''>--Selecteer--</option><option value='Krol met Windhoff'>Krol met Windhoff</option><option value='Minima'>Minima</option><option value='Plassermatic'>Plassermatic</option><option value='Shimlifts'>Shimlifts</option><option value='Stopmachine 204/205'>Stopmachine 204/205</option></select></tr><tr class=groen><td>WO-nummer:</td><td><input id=wonummer type=text placholder='wonummer'></input></td></tr><tr class=oranje><td>Inzet-nummer:</td><td><input id=inzetnummer type=text placholder='inzetnummer'></input></td></tr><tr  class=oranje><td>HWO-nummer:</td><td><input id=hwonummer type=text placholder='hwonummer'></input></td></tr><tr class=oranje><td>Startdatum:</td><td><input id=startdatum input type=date placholder='startdatum'></input></td></tr><tr  class=oranje><td>Starttijd:</td><td><input id=starttijd type=time placholder='starttijd'></input></td></tr><tr class=oranje><td>Einddatum:</td><td><input id=einddatum input type=date placholder='einddatum'></input></td></tr><tr  class=oranje><td>Eindtijd:</td><td><input id=eindtijd type=time placholder='eindtijd'></input></td></tr><tr class=oranje><td>Weeknummer:</td><td><input id=weeknummer type=text placholder='weeknummer'></input></td></tr></table><br/><center> <button id=kenmerken_verstuur type='button'>OK</button>", width: "50%", bottom: 10 });


    $("#kenmerken_verstuur").bind('click', function (e) {

    var antwoord = $("#omschrijving").val() + "--" + $("#hersteldatum").val() + "--" + $("#laagnaam").val() + "--" + $("#wonummer").val() + "--" + $("#inzetnummer").val() ;
    layer.kenmerken = { "omschrijving": $("#omschrijving").val(), "hersteldatum": $("#hersteldatum").val(), "vsmnummer": $("#vsmnummer").val(), "middelinzet": $("#middelinzet").val(), "wonummer": $("#wonummer").val(), "inzetnummer": $("#inzetnummer").val(), "hwonummer": $("#hwonummer").val(), "startdatum": $("#startdatum").val(), "starttijd": $("#starttijd").val(), "einddatum": $("#einddatum").val(), "eindtijd": $("#eindtijd").val(), "weeknummer": $("#weeknummer").val(),"type": 1 };

   // console.log( layer);

    $.colorbox.close(); });


     drawnItems.addLayer(layer);
    //var json = drawnItems.toGeoJSON(); {
    // console.log(json);


});
// log naar console bij aanpassing van polygon
this_map.on('draw:edited', function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
        console.log(drawnItemsToJSON(drawnItems));
    });
});
// log naar console bij aanpassing van styling
this_map.on('styleeditor:changed', function (element) {
    console.log(drawnItemsToJSON(drawnItems));
});



this_map.on('draw:editstart ', function (e) {


      opslaan.state('OpslaanNietMogelijk');

     });

this_map.on('draw:editstop ', function (e) {


      opslaan.state('Opslaan');

     });

this_map.on('draw:deletestart ', function (e) {


      opslaan.state('OpslaanNietMogelijk');

     });

this_map.on('draw:deletestop ', function (e) {


      opslaan.state('Opslaan');

     });

this_map.on('draw:drawstart ', function (e) {


      opslaan.state('OpslaanNietMogelijk');

     });

this_map.on('draw:drawstop ', function (e) {


      opslaan.state('Opslaan');

     });

this_map.on('styleeditor:visible ', function (e) {


      opslaan.state('OpslaanNietMogelijk');

     });

this_map.on('styleeditor:hidden', function (e) {


      opslaan.state('Opslaan');

     });


L.control.scale({
    options: {
        position: 'bottomleft',
        maxWidth: 100,
        metric: true,
        imperial: false,
        updateWhenIdle: false
    }
}).addTo(this_map);

//Zoom button
this_map.zoomControl.setPosition('bottomleft');

//var pulsingIcon = L.icon.pulse({iconSize:[20,20],color:'orangered'});
//var marker = L.marker([50,15],{icon: pulsingIcon}).addTo(this_map);


//L.Icon.Default = pulsingIcon;

//Geolocation
/*lc = L.control.locate({
    flyTo: true,
    //markerClass: L.marker([,],{icon: pulsingIcon}),

    markerClass: L.marker,
    icon: 'fas fa-crosshairs',
    strings: {
        title: "Laat zien waar ik ben!",
        metersUnit: "meter",
        popup: "U bevindt zich binnen {distance} {unit} van dit punt."
    }
}).addTo(this_map);*/


// Save button for drawnItems layer
opslaan = L.easyButton({
    states: [{
        icon: 'fa-save',
        stateName: 'Opslaan',
        title: 'Sla uw bewerkingen op.',
        onClick: function (btn, map) {

            $.ajax({
                url: 'services/tasks.php',
                method: 'POST',
                data: {
                    task: drawnItemsToJSON(drawnItems),
                    cluster: cluster
                },
                dataType: 'html',
		    error: function (data) {
			alert( "error" + data );
		    },

                success: function (data) {

                   // opnieuw laag ophalen

                   alert( data );


			 drawnItems.clearLayers();

			 haal_data_op(0);

                 }
            });

        }
    },

    {
    icon: 'fas fa-exclamation-triangle',
    stateName: 'OpslaanNietMogelijk',
    onClick: function(control) {

        alert( "U bent nog in Mutatie mode. Deze moet eerst worden afgesloten");


    },
       title: 'Opslaan nog niet mogelijk'
     }



    ]

}).addTo(this_map);

// Layer switch for drawnItems layer
var toggle = L.easyButton({
  states: [{
    stateName: 'Verwijder-mutatielaag',
    icon: 'fas fa-user-times',
    title: 'Verberg mutatielaag',
    onClick: function(control) {
      this_map.removeLayer(drawnItems);
      control.state('Toon-markers');
    }
  }, {
    icon: 'fas fa-user-edit',
    stateName: 'Toon-markers',
    onClick: function(control) {
      this_map.addLayer(drawnItems);
      control.state('Verwijder-mutatielaag');
    },
    title: 'Toon mutatielaag'
  }]
});
toggle.addTo(this_map);


// Code to combine spatial data and styling data to a string
function drawnItemsToJSON(ilayer) {

    var dOut = '';
    var dOut1 = '';
    var dOut2 = '';
    var ditems = ilayer.getLayers();
    dOut = '{"type":"FeatureCollection","features":[';
    for (iIndex = 0; iIndex < ditems.length; ++iIndex) {
        if (ditems[iIndex] instanceof L.Point || ditems[iIndex] instanceof L.Marker) {
            dOut1 = dOut1 + ',{"type":"Feature","properties":{';
            if ('icon' in ditems[iIndex].options) {
                if ('options' in ditems[iIndex].options.icon) {
                    dOut1 = dOut1 + '"markerOptions":{';
                    dOut2 = '';
                    if ('iconSize' in ditems[iIndex].options.icon.options) {
                        dOut2 = dOut2 + ',"iconSize":[' + ditems[iIndex].options.icon.options.iconSize[0] + ',' + ditems[iIndex].options.icon.options.iconSize[1] + ']'
                    };
                    if ('iconUrl' in ditems[iIndex].options.icon.options) {
                        dOut2 = dOut2 + ',"iconUrl":"' + ditems[iIndex].options.icon.options.iconUrl + '"'
                    };

                    dOut1 = dOut1 + dOut2.substring(1) + '}';
                };
            };

		console.log( ditems[iIndex] );

		if( ditems[iIndex].feature )
		{
		  var kenmerken = ditems[iIndex].feature.properties;
		  var this_kvid = ditems[iIndex].feature.properties.kvid;
 		}
		else
		{
		 var kenmerken = ditems[iIndex].kenmerken;
		 var this_kvid = 0;
		}

		  dOut1 = dOut1 +  ',"omschrijving":"'+ kenmerken.omschrijving + '","hersteldatum":"'+ kenmerken.hersteldatum + '","vsmnummer":"'+ kenmerken.vsmnummer + '","middelinzet":"'+ kenmerken.middelinzet + '","wonummer":"'+ kenmerken.wonummer + '","inzetnummer":"'+ kenmerken.inzetnummer + '","hwonummer":"'+ kenmerken.hwonummer + '","weeknummer":"'+ kenmerken.weeknummer + '","startdatum":"'+ kenmerken.startdatum + '","starttijd":"'+ kenmerken.starttijd + '","einddatum":"'+ kenmerken.einddatum + '","eindtijd":"'+ kenmerken.eindtijd + '","kvid":' + this_kvid;



            dOut1 = dOut1 + '},"geometry":{"type":"Point","coordinates":[' +
                ditems[iIndex]._latlng.lng +
                ',' + ditems[iIndex]._latlng.lat +
                ']},"style":{';
            dOut2 = '';
            if ('stroke' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.stroke !== null) {
                    dOut2 = dOut2 + ',"stroke":' + ditems[iIndex].options.stroke
                }
            };
            if ('color' in ditems[iIndex].options) {
                if (ditems[iIndex].options.color !== null) {
                    dOut2 = dOut2 + ',"color":"' + ditems[iIndex].options.color + '"'
                }
            };
            if ('weight' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.weight !== null) {
                    dOut2 = dOut2 + ',"weight":' + ditems[iIndex].options.weight
                }
            };
            if ('opacity' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.opacity !== null) {
                    dOut2 = dOut2 + ',"opacity":' + ditems[iIndex].options.opacity
                }
            };
            if ('fill' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.fill !== null) {
                    dOut2 = dOut2 + ',"fill":' + ditems[iIndex].options.fill
                }
            };
            if ('fillColor' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.fillColor !== null) {
                    dOut2 = dOut2 + ',"fillColor":"' + ditems[iIndex].options.fillColor + '"'
                }
            };
            if ('fillOpacity' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.fillOpacity !== null) {
                    dOut2 = dOut2 + ',"fillOpacity":' + ditems[iIndex].options.fillOpacity
                }
            };
            if ('fillRule' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.fillRule !== null) {
                    dOut2 = dOut2 + ',"fillRule":"' + ditems[iIndex].options.fillRule + '"'
                }
            };
            if ('dashArray' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.dashArray !== null) {
                    dOut2 = dOut2 + ',"dashArray":"' + ditems[iIndex].options.dashArray + '"'
                }
            };
            if ('lineCap' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.lineCap !== null) {
                    dOut2 = dOut2 + ',"lineCap":"' + ditems[iIndex].options.lineCap + '"'
                }
            };
            if ('lineJoin' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.lineJoin !== null) {
                    dOut2 = dOut2 + ',"lineJoin":"' + ditems[iIndex].options.lineJoin + '"'
                }
            };
            if ('clickable' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.clickable !== null) {
                    dOut2 = dOut2 + ',"clickable":' + ditems[iIndex].options.clickable
                }
            };
            if ('pointerEvents' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.pointerEvents !== null) {
                    dOut2 = dOut2 + ',"pointerEvents":"' + ditems[iIndex].options.pointerEvents + '"'
                }
            };
            if ('className' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.className !== null) {
                    dOut2 = dOut2 + ',"className":"' + ditems[iIndex].options.className + '"'
                }
            };

            if (dOut2.length > 1) {
                dOut1 = dOut1 + dOut2.substring(1) + '}';
            };
            dOut2 = '';
            dOut1 = dOut1 + '}';
        } else if (ditems[iIndex] instanceof L.Polygon) {

            dOut1 = dOut1 + ',{"type":"Feature","properties":{';

		if( ditems[iIndex].feature )
		{
		  var kenmerken = ditems[iIndex].feature.properties;
		  var this_kvid = ditems[iIndex].feature.properties.kvid;
 		}
		else
		{
		 var kenmerken = ditems[iIndex].kenmerken;
		 var this_kvid = 0;
		}

		  dOut1 = dOut1 +  '"omschrijving":"'+ kenmerken.omschrijving + '","hersteldatum":"'+ kenmerken.hersteldatum + '","vsmnummer":"'+ kenmerken.vsmnummer + '","middelinzet":"'+ kenmerken.middelinzet + '","wonummer":"'+ kenmerken.wonummer + '","inzetnummer":"'+ kenmerken.inzetnummer + '","hwonummer":"'+ kenmerken.hwonummer + '","weeknummer":"'+ kenmerken.weeknummer + '","startdatum":"'+ kenmerken.startdatum + '","starttijd":"'+ kenmerken.starttijd + '","einddatum":"'+ kenmerken.einddatum + '","eindtijd":"'+ kenmerken.eindtijd + '","kvid":' + this_kvid;


            dOut1 = dOut1 + '},"geometry":{"type":"Polygon","coordinates":[[';
            dOut2 = '';
            for (ll = 0; ll < ditems[iIndex]._latlngs[0].length; ll++) {
                dOut2 = dOut2 + ',[' + ditems[iIndex]._latlngs[0][ll].lng + ',' + ditems[iIndex]._latlngs[0][ll].lat + ']';
            };
            dOut2 = dOut2 + ',[' + ditems[iIndex]._latlngs[0][0].lng + ',' + ditems[iIndex]._latlngs[0][0].lat + ']';
            dOut1 = dOut1 + dOut2.substring(1) + ']]},"style":{';
            dOut2 = '';
            if ('stroke' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.stroke !== null) {
                    dOut2 = dOut2 + ',"stroke":' + ditems[iIndex].options.stroke
                }
            };
            if ('color' in ditems[iIndex].options) {
                if (ditems[iIndex].options.color !== null) {
                    dOut2 = dOut2 + ',"color":"' + ditems[iIndex].options.color + '"'
                }
            };
            if ('weight' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.weight !== null) {
                    dOut2 = dOut2 + ',"weight":' + ditems[iIndex].options.weight
                }
            };
            if ('opacity' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.opacity !== null) {
                    dOut2 = dOut2 + ',"opacity":' + ditems[iIndex].options.opacity
                }
            };
            if ('fill' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.fill !== null) {
                    dOut2 = dOut2 + ',"fill":' + ditems[iIndex].options.fill
                }
            };
            if ('fillColor' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.fillColor !== null) {
                    dOut2 = dOut2 + ',"fillColor":"' + ditems[iIndex].options.fillColor + '"'
                }
            };
            if ('fillOpacity' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.fillOpacity !== null) {
                    dOut2 = dOut2 + ',"fillOpacity":' + ditems[iIndex].options.fillOpacity
                }
            };
            if ('fillRule' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.fillRule !== null) {
                    dOut2 = dOut2 + ',"fillRule":"' + ditems[iIndex].options.fillRule + '"'
                }
            };
            if ('dashArray' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.dashArray !== null) {
                    dOut2 = dOut2 + ',"dashArray":"' + ditems[iIndex].options.dashArray + '"'
                }
            };
            if ('lineCap' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.lineCap !== null) {
                    dOut2 = dOut2 + ',"lineCap":"' + ditems[iIndex].options.lineCap + '"'
                }
            };
            if ('lineJoin' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.lineJoin !== null) {
                    dOut2 = dOut2 + ',"lineJoin":"' + ditems[iIndex].options.lineJoin + '"'
                }
            };
            if ('clickable' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.clickable !== null) {
                    dOut2 = dOut2 + ',"clickable":' + ditems[iIndex].options.clickable
                }
            };
            if ('pointerEvents' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.pointerEvents !== null) {
                    dOut2 = dOut2 + ',"pointerEvents":"' + ditems[iIndex].options.pointerEvents + '"'
                }
            };
            if ('className' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.className !== null) {
                    dOut2 = dOut2 + ',"className":"' + ditems[iIndex].options.className + '"'
                }
            };
            if ('icon' in ditems[iIndex].options) {
                if ('options' in ditems[iIndex].options.icon) {
                    if ('iconSize' in ditems[iIndex].options.icon.options) {
                        dOut2 = dOut2 + ',"iconSize":[' + ditems[iIndex].options.icon.options.iconSize[0] + ',' + ditems[iIndex].options.icon.options.iconSize[1] + ']"'
                    };
                    if ('iconurl' in ditems[iIndex].options.icon.options) {
                        dOut2 = dOut2 + ',"iconUrl":"' + ditems[iIndex].options.icon.options.iconUrl + '"'
                    };
                };
            };
            if (dOut2.length > 1) {
                dOut1 = dOut1 + dOut2.substring(1) + '}';
            };
            dOut2 = '';
            dOut1 = dOut1 + '}';
        } else if (ditems[iIndex] instanceof L.Polyline) {
            dOut1 = dOut1 + ',{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[['
            dOut2 = '';
            for (ll = 0; ll < ditems[iIndex]._latlngs[0].length; ll++) {
                dOut2 = dOut2 + ',[' + ditems[iIndex]._latlngs[0][ll].lng + ',' + ditems[iIndex]._latlngs[0][ll].lat + ']';
            };
            dOut1 = dOut1 + dOut2.substring(1) + ']]},"style":{';
            dOut2 = '';
            if ('stroke' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.stroke !== null) {
                    dOut2 = dOut2 + ',"stroke":' + ditems[iIndex].options.stroke
                }
            };
            if ('color' in ditems[iIndex].options) {
                if (ditems[iIndex].options.color !== null) {
                    dOut2 = dOut2 + ',"color":"' + ditems[iIndex].options.color + '"'
                }
            };
            if ('weight' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.weight !== null) {
                    dOut2 = dOut2 + ',"weight":' + ditems[iIndex].options.weight
                }
            };
            if ('opacity' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.opacity !== null) {
                    dOut2 = dOut2 + ',"opacity":' + ditems[iIndex].options.opacity
                }
            };
            if ('fill' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.fill !== null) {
                    dOut2 = dOut2 + ',"fill":' + ditems[iIndex].options.fill
                }
            };
            if ('fillColor' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.fillColor !== null) {
                    dOut2 = dOut2 + ',"fillColor":"' + ditems[iIndex].options.fillColor + '"'
                }
            };
            if ('fillOpacity' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.fillOpacity !== null) {
                    dOut2 = dOut2 + ',"fillOpacity":' + ditems[iIndex].options.fillOpacity
                }
            };
            if ('fillRule' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.fillRule !== null) {
                    dOut2 = dOut2 + ',"fillRule":"' + ditems[iIndex].options.fillRule + '"'
                }
            };
            if ('dashArray' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.dashArray !== null) {
                    dOut2 = dOut2 + ',"dashArray":"' + ditems[iIndex].options.dashArray + '"'
                }
            };
            if ('lineCap' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.lineCap !== null) {
                    dOut2 = dOut2 + ',"lineCap":"' + ditems[iIndex].options.lineCap + '"'
                }
            };
            if ('lineJoin' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.lineJoin !== null) {
                    dOut2 = dOut2 + ',"lineJoin":"' + ditems[iIndex].options.lineJoin + '"'
                }
            };
            if ('clickable' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.clickable !== null) {
                    dOut2 = dOut2 + ',"clickable":' + ditems[iIndex].options.clickable
                }
            };
            if ('pointerEvents' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.pointerEvents !== null) {
                    dOut2 = dOut2 + ',"pointerEvents":"' + ditems[iIndex].options.pointerEvents + '"'
                }
            };
            if ('className' in ditems[iIndex].options) {
                if (!ditems[iIndex].options.className !== null) {
                    dOut2 = dOut2 + ',"className":"' + ditems[iIndex].options.className + '"'
                }
            };
            if ('icon' in ditems[iIndex].options) {
                if ('options' in ditems[iIndex].options.icon) {
                    if ('iconSize' in ditems[iIndex].options.icon.options) {
                        dOut2 = dOut2 + ',"iconSize":[' + ditems[iIndex].options.icon.options.iconSize[0] + ',' + ditems[iIndex].options.icon.options.iconSize[1] + ']"'
                    };
                    if ('iconurl' in ditems[iIndex].options.icon.options) {
                        dOut2 = dOut2 + ',"iconUrl":"' + ditems[iIndex].options.icon.options.iconUrl + '"'
                    };
                };
            };
            if (dOut2.length > 1) {
                dOut1 = dOut1 + dOut2.substring(1) + '}';
            };
            dOut2 = '';
            dOut1 = dOut1 + '}';
        };
    };
    //console.log(dOut + dOut1.substring(1) + ']}');
    return dOut + dOut1.substring(1) + ']}';
};


function haal_data_op( zoomoplaag )
{
   var url_string = "https://safety.projectxplor.nl/geoserver/Safety/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Safety:v_tasks&maxFeatures=5000&outputFormat=application/json&cql_filter=cluster=" + cluster;

   // make wfs request and add the layer in the drawItems
   var geojson = $.ajax({
    type: "GET",
    dataType: "json",
    url: url_string,
    success: function (response) {


        //drawnItems.addLayer(L.geoJson(response));


        var selectedFeature = null;

        var geojsonlayer = L.geoJson(response, {
            onEachFeature: function (feature, layer) {




                drawnItems.addLayer(layer);


                layer.on('click', function (e) {
                    if (selectedFeature) {
                        selectedFeature.editing.disable();

                    }
                    selectedFeature = e.target;
                    //e.target.editing.enable();
                });
                //layer.options.color = layer.feature.properties.color;


		        if (layer instanceof L.Polygon) {

			     layer.setStyle({
				 color: layer.feature.properties.color
			     });
			     layer.setStyle({
			     	 fillColor: layer.feature.properties.fillcolor
			     });
			     layer.setStyle({
				 stroke: layer.feature.properties.stroke
			     });
			     layer.setStyle({
				 dashArray: layer.feature.properties.dasharray
			     });

                             layer.setStyle({
				 weight: layer.feature.properties.weight
			     });

                             layer.setStyle({
				 fillOpacity: layer.feature.properties.opacity
			     })

			     //Popup voor vlakken
			     layer.bindPopup(  "<b>Inzet nummer: "+ feature.properties.inzetnummer + "</b><br/>Omschr.: " + feature.properties.omschrijving + "<br/>Hersteldatum: " + feature.properties.hersteldatum + "<br/>Object ID: " + feature.properties.kvid + "<hr/><center><button id=kenmerken_wijzig  onclick=wijzig_kenmerk("+ feature.properties.kvid + ");  type='button'>Wijzig kenmerken</button></center>");

			  }

			 if (layer instanceof L.Point || layer instanceof L.Marker)
			 {

			    var this_iconsize_tekst = feature.properties.iconsize;

			    if( this_iconsize_tekst == "" )
			    {
			      this_iconsize_tekst = "20,50";
			    }

			    var this_icon_array = this_iconsize_tekst.split( "," );

			    var this_iconsize = [this_icon_array[0], this_icon_array[1]];

			    var this_iconanchor = [this_iconsize[0] / 2, this_iconsize[1] / 2];
			    var this_offset = [0, -this_iconsize[1] /2 ];

                            var this_popupanchor = [0, -this_iconsize[1] / 2];

			     var newIcon = L.icon({
			                 iconUrl: layer.feature.properties.iconurl,
			                 //shadowUrl: 'leaf-shadow.png',
	                                iconSize:    this_iconsize,
			                // shadowSize:   [50, 64],
			                iconAnchor:   this_iconanchor,
			                // shadowAnchor: [4, 62],
			                 popupAnchor: this_popupanchor
                              });


                            layer.setIcon(newIcon);



			    layer.bindTooltip(  "<b>Inzet #:</b> "+ feature.properties.inzetnummer  , { offset: this_offset, direction: 'top', opacity: 0.9, permanent: true, sticky: false, closeButton: false}).openTooltip();
			    //Popup voor Punten
	                    layer.bindPopup(  "<b>Middelinzet: "+ feature.properties.middelinzet + "</b><br/>Omschrijving: " + feature.properties.omschrijving + "<br/>Hersteldatum: " + feature.properties.hersteldatum + "<br/>VSM #: " + feature.properties.vsmnummer + "<br/>WO #: " + feature.properties.wonummer + "<br/>Inzet nummer: " + feature.properties.inzetnummer + "<br/>HWO nummer: " + feature.properties.hwonummer  + "<br/>Object ID: " + feature.properties.kvid + "<br/>Weeknummer: " + feature.properties.weeknummer + "<br/>Startdatum: " + feature.properties.startdatum + "<br/>Starttijd: " + feature.properties.starttijd + "<br/>Einddatum: " + feature.properties.einddatum + "<br/>Eindtijd: " + feature.properties.eindtijd +  "<hr/><center><button id=kenmerken_wijzig onclick=wijzig_kenmerk("+ feature.properties.kvid + "); type='button'>Wijzig kenmerken</button></center>");


			}


            }

        });


        if( zoomoplaag == 1 )
        {

          if(  drawnItems.getLayers().length > 0 )
          {
            var bounds = drawnItems.getBounds();
	    this_map.fitBounds(bounds);
	  }
	}
    }

});


}

function wijzig_kenmerk( kvid )
{

      var ditems = drawnItems.getLayers();
      for (iIndex = 0; iIndex < ditems.length; ++iIndex)
      {

         if( ditems[iIndex].feature.properties.kvid == kvid )
         {

            var selected1="";
            var selected2="";
            var selected3="";
            var selected4="";
            var selected5="";

            if( ditems[iIndex].feature.properties.middelinzet == "Krol met Windhoff" )
            {
               selected1 = "SELECTED";
            }
            if( ditems[iIndex].feature.properties.middelinzet == "Minima" )
            {
               selected2 = "SELECTED";
            }
            if( ditems[iIndex].feature.properties.middelinzet == "Plassermatic" )
            {
               selected3 = "SELECTED";
            }
            if( ditems[iIndex].feature.properties.middelinzet == "Shimlifts" )
            {
               selected4 = "SELECTED";
            }
            if( ditems[iIndex].feature.properties.middelinzet == "Stopmachine 204/205" )
            {
               selected5 = "SELECTED";
            }

            $.colorbox({ opacity: 0.4, overlayClose: false, closeButton: false, html: "<h3>Informatie over dit object: "+ kvid + "</h3><table><tr class=groen><td>Geef omschrijving:</td><td><input id=omschrijving value='"+  ditems[iIndex].feature.properties.omschrijving  + "' size=50 type=text placholder='omschrijving'></input></td></tr><tr class=groen><td>Uiterste herstel datum:</td><td><input id=hersteldatum value='"+  ditems[iIndex].feature.properties.hersteldatum  + "'  type=date placholder='hersteldatum'></input></td></tr><tr class=groen><td>VSM-nummer:</td><td><input value='"+  ditems[iIndex].feature.properties.vsmnummer  + "'  id=vsmnummer type=text placholder='vsmnummer'></input></td></tr><tr class=groen><td>Middelinzet:</td><td><select id=middelinzet><option value=''>--Selecteer--</option><option " + selected1 + " value='Krol met Windhoff'>Krol met Windhoff</option><option " + selected2 + " value='Minima'>Minima</option><option " + selected3 + " value='Plassermatic'>Plassermatic</option><option " + selected4 + " value='Shimlifts'>Shimlifts</option><option " + selected5 + "  value='Stopmachine 204/205'>Stopmachine 204/205</option></select></tr><tr class=groen><td>WO-nummer:</td><td><input value='"+  ditems[iIndex].feature.properties.wonummer  + "' id=wonummer type=text placholder='wonummer'></input></td></tr><tr class=oranje><td>Inzet-nummer:</td><td><input value='"+  ditems[iIndex].feature.properties.inzetnummer  + "' id=inzetnummer type=text placholder='inzetnummer'></input></td></tr><tr  class=oranje><td>HWO-nummer:</td><td><input id=hwonummer value='"+  ditems[iIndex].feature.properties.hwonummer  + "' type=text placholder='hwonummer'></input></td></tr><tr class=oranje><td>Startdatum:</td><td><input id=startdatum value='"+  ditems[iIndex].feature.properties.startdatum  + "'  type=date placholder='startdatum'></input></td></tr><tr  class=oranje><td>Starttijd:</td><td><input id=starttijd value='"+  ditems[iIndex].feature.properties.starttijd  + "'  type=time placholder='starttijd'></input></td></tr><tr class=oranje><td>Einddatum:</td><td><input id=einddatum value='"+  ditems[iIndex].feature.properties.einddatum  + "'  type=date placholder='einddatum'></input></td></tr><tr  class=oranje><td>Eindtijd:</td><td><input id=eindtijd value='"+  ditems[iIndex].feature.properties.eindtijd  + "'  type=time placholder='eindtijd'></input></td></tr><tr class=oranje><td>Weeknummer:</td><td><input id=weeknummer value='"+  ditems[iIndex].feature.properties.weeknummer  + "'  type=text placholder='weeknummer'></input></td></tr></table><br/><center> <button id=kenmerken_verstuur type='button'>OK</button>", width: "50%", bottom: 10 });


            // $.colorbox({ opacity: 0.4, overlayClose: false, html: "<h3>Informatie over dit object: "+ kvid + "</h3><table><tr class=groen><td>Geef omschrijving:</td><td><input id=omschrijving value='"+  ditems[iIndex].feature.properties.omschrijving  + "' type=text placholder='omschrijving'></input></td></tr><tr class=groen><td>Hersteldatum:</td><td><input value='"+  ditems[iIndex].feature.properties.hersteldatum  + "' id=hersteldatum type=date placholder='hersteldatum'></input></td></tr><tr><td>Middelinzet:</td><td><input value='"+  ditems[iIndex].feature.properties.middelinzet  + "' id=laagnaam type=text placholder='middelinzet'></input></td></tr><tr><td>Inzet #:</td><td><input value='"+  ditems[iIndex].feature.properties.inzetnummer  + "' id=inzetnummer type=text placholder='inzetnummer'></input></td></tr><tr><td>WO #:</td><td><input id=wonummer type=text placholder='wonummer'></input></td></tr><tr><td>Starttijd:</td><td><input id=starttijd type=time placholder='starttijd'></input></td></tr><tr><td>Eindtijd:</td><td><input id=eindtijd type=time placholder='eindtijd'></input></td></tr></table><br/><center> <button id=kenmerken_verstuur type='button'>OK</button>", width: "50%", bottom: 10 });

         }

      }


    $("#kenmerken_verstuur").bind('click', function (e) {

      var ditems = drawnItems.getLayers();
      for (iIndex = 0; iIndex < ditems.length; ++iIndex)
      {

         if( ditems[iIndex].feature.properties.kvid == kvid )
         {


	     ditems[iIndex].feature.properties.omschrijving = $("#omschrijving").val();
	     ditems[iIndex].feature.properties.hersteldatum = $("#hersteldatum").val();
	     ditems[iIndex].feature.properties.middelinzet = $("#middelinzet").val();
	     ditems[iIndex].feature.properties.wonummer = $("#wonummer").val();
	     ditems[iIndex].feature.properties.inzetnummer = $("#inzetnummer").val();
	     ditems[iIndex].feature.properties.vsmnummer = $("#vsmnummer").val();
	     ditems[iIndex].feature.properties.hwonummer = $("#hwonummer").val();
	     ditems[iIndex].feature.properties.weeknummer = $("#weeknummer").val();
	     ditems[iIndex].feature.properties.startdatum = $("#startdatum").val();
	     ditems[iIndex].feature.properties.einddatum = $("#einddatum").val();
	     ditems[iIndex].feature.properties.starttijd = $("#starttijd").val();
	     ditems[iIndex].feature.properties.eindtijd = $("#eindtijd").val();

      var feature = ditems[iIndex].feature;

      ditems[iIndex].bindPopup(  "<b>Middelinzet: "+ feature.properties.middelinzet + "</b><br/>Omschrijving: " + feature.properties.omschrijving + "<br/>Hersteldatum: " + feature.properties.hersteldatum + "<br/>VSM #: " + feature.properties.vsmnummer + "<br/>WO #: " + feature.properties.wonummer + "<br/>Inzet nummer: " + feature.properties.inzetnummer + "<br/>HWO nummer: " + feature.properties.hwonummer  + "<br/>Object ID: " + feature.properties.kvid + "<br/>Weeknummer: " + feature.properties.weeknummer + "<br/>Startdatum: " + feature.properties.startdatum + "<br/>Starttijd: " + feature.properties.starttijd + "<br/>Einddatum: " + feature.properties.einddatum + "<br/>Eindtijd: " + feature.properties.eindtijd +  "<hr/><center><button id=kenmerken_wijzig onclick=wijzig_kenmerk("+ feature.properties.kvid + "); type='button'>Wijzig kenmerken</button></center>").openPopup();;

	    //  ditems[iIndex].bindPopup(  "<b>PUNT: "+ ditems[iIndex].feature.properties.kvid + "</b><br/>Omschr.: " + ditems[iIndex].feature.properties.omschrijving + "<br/>Hersteldatum: " + feature.properties.hersteldatum + "<br/>WO #: " + feature.properties.wonummer + "<br/>Middelinzet: " + ditems[iIndex].feature.properties.middelinzet + "<br/>Inzet nummer: " + ditems[iIndex].feature.properties.inzetnummer + "<hr/><center><i>Let op: uw wijzigingen zijn nog niet opgeslagen!<br/><button id=kenmerken_wijzig onclick=wijzig_kenmerk("+ ditems[iIndex].feature.properties.kvid + "); type='button'>Wijzig kenmerken</button></center>").openPopup();

	     $.colorbox.close();

         }
      }

   });

 }
