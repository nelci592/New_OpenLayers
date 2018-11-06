import 'ol/ol.css';
import $ from 'jquery';
import {Map, View} from 'ol';
import {inherits} from 'ol/util.js';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZSource from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import {defaults as defaultControls,Control} from 'ol/control.js';
import {Draw, Modify, Snap} from 'ol/interaction.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import {click, pointerMove, altKeyOnly} from 'ol/events/condition.js';
import Select from 'ol/interaction/Select.js';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';

 var styleGreen = [
        new Style({
          stroke: new Stroke({
            color: 'rgb(96,162,229)',
            width: 2,
            //lineDash: [7]
          }),
          fill: new Fill({
            color: 'rgba(57, 229, 163,0.2)'
          })
        })
      ];
var styleRed = [
        new Style({
          stroke: new Stroke({
            color: 'rgb(96,162,229)',
            width: 2,
            lineDash: [7]
          }),
          fill: new Fill({
            color: 'rgba(229, 57, 114,0.4)'
          })
        })
      ];
var styleBlue = [
        new Style({
          stroke: new Stroke({
            color: 'rgb(96,162,229)',
            width: 2,
            lineDash: [3]
          }),
          fill: new Fill({
            color: 'rgba(51, 167, 221,0.2)'
          })
        })
      ];

      var styleOrange = [
              new Style({
                stroke: new Stroke({
                  color: 'rgb(96,162,229)',
                  width: 2,
                  lineDash: [3]
                }),
                fill: new Fill({
                  color: 'rgba(247, 164, 0,0.3)'
                })
              })
            ];




            var styleYellow = [
                    new Style({
                      stroke: new Stroke({
                        color: 'rgb(96,162,229)',
                        width: 2,
                        lineDash: [3]
                      }),
                      fill: new Fill({
                        color: 'rgba(255,255,0, 0.2)'
                      })
                    })
                  ];

var styleClick = [
        new Style({
          stroke: new Stroke({
            color: 'rgb(96,162,229)',
            width: 2,
            lineDash: [7]
          }),
          fill: new Fill({
            color: 'rgba(51, 167, 221,0.2)'
          })
        })
      ];



window.app = {};
var app = window.app;
var draw,snap; // variable holds drawed polygon
var drawType;
var drawSwitch = false;
var markSwitch = false;
var select = null; //for selecting polygon
var selectSingleClick = new Select();
var lastDrawnFeature = null;



function changeInteraction()  {
        if (select !== null) {
          map.removeInteraction(select);
        }

        select = selectSingleClick;

        if (select !== null) {
          map.addInteraction(select);
          select.on('select', function(e) {
              Expend("StyleContent");

              /*var selected = e.selected;
              var deselected = e.deselected;
              var oldStyle[] = e.selected.forEach(function)
              selected.forEach(function(feature){
                  feature.setStyle(styleClick);
              });
              deselected.forEach(function(feature){
                  feature.setStyle(oldStyle||null);
              });*/
          });
        }
      };


// ---- Here to add the Mark and draw buttons
app.DrawPolygonControl = function(opt_options){
    var options = opt_options || {};

    var buttonPolygon = document.createElement('button');
    var buttonMark = document.createElement('button');
    buttonPolygon.innerHTML = 'DR';
    buttonMark.innerHTML = 'MK';

    var this_ = this;
    var handleDrawPolygon = function(){
        map.removeInteraction(select);
        select = null;
        //way to draw polygon
        drawType = "Polygon";
        if (drawSwitch){
            map.removeInteraction(draw);
            drawSwitch = false;
        }else{
            map.removeInteraction(draw);
            drawSwitch = true;
            markSwitch = false;
            addInteraction();
        }
    };

    buttonPolygon.addEventListener('click', handleDrawPolygon, false);
    buttonPolygon.addEventListener('touchstart', handleDrawPolygon, false);

    var this_ = this;
    var handleDrawMark = function(){
        //way to draw polygon
        drawType = "Point";
        if (markSwitch){
            map.removeInteraction(draw);
            markSwitch = false;
        }else{
            map.removeInteraction(draw);
            markSwitch = true;
            drawSwitch = false;
            addInteraction();
        }
    };

    buttonMark.addEventListener('click', handleDrawMark, false);
    buttonMark.addEventListener('touchstart', handleDrawMark, false);

    var element = document.createElement('div');
    element.className = 'draw-button ol-unselectable ol-control';
    element.appendChild(buttonPolygon);
    element.appendChild(buttonMark);


    Control.call(this,{
        element:element,
        target:options.target
    });
};
inherits(app.DrawPolygonControl,Control);

//Draw Save button
app.SaveControl = function(opt_options){
    var options = opt_options || {};

    var buttonSave = document.createElement('button');
    var buttonEdit = document.createElement('button');
    buttonEdit.innerHTML = 'ED';
    buttonSave.innerHTML = 'SA';


    var this_ = this;
    var handleSave = function(){
        //way to draw polygon
        alert("saved!");

    };
    var handleEdit = function(){
        //way to draw polygon
        //alert("saved!");
        changeInteraction();
    };

    buttonSave.addEventListener('click', handleSave, false);
    buttonSave.addEventListener('touchstart', handleSave, false);
    buttonEdit.addEventListener('click', handleEdit, false);
    buttonEdit.addEventListener('touchstart', handleEdit, false);

    var element = document.createElement('div');
    element.className = 'save-button ol-unselectable ol-control';
    element.appendChild(buttonEdit);
    element.appendChild(buttonSave);


    Control.call(this,{
        element:element,
        target:options.target
    });
};
inherits(app.SaveControl,Control);

//Add layer for draw
var source = new VectorSource({wrapX: false});
var vector = new VectorLayer({
        source: source
      });


//Add the map
const map = new Map({
    controls: defaultControls({
        attributionOptions: {
            collapsible: false
          }
    }).extend([
        new app.DrawPolygonControl(),
        new app.SaveControl()
    ]),
    target: 'map',//which div to put
    layers: [
        new TileLayer({
            source: new OSM()
        }),//This is the map layer
        vector
    ],
    view: new View({
      center:fromLonLat([5.115859,52.100649]),
        zoom: 9
  })
});


//Function for drawpolygon

function addInteraction() {
        var value = drawType;
        if (value !== 'None') {
          draw = new Draw({
            source: source,
            type: drawType
          });
//will show the form and customized

            draw.on('drawend',function(e){
                //alert("detailed form shows");
                Expend("StyleContent");
                lastDrawnFeature = e.feature;
                changeInteraction();
                map.removeInteraction(draw);

            })
            //alert("detailed form shows");
            map.addInteraction(draw);
        }
      }


function UnExpend(){
    document.getElementById('sidetab').style.width = '0px';
};

function ChangeSelectFeatureColor(colorStyle){
    select.getFeatures().forEach(function(feature){
        feature.setStyle(colorStyle);
    });
}
//Add listner for change color
$("#CGreen").on('click', function(){
    ChangeSelectFeatureColor(styleGreen)});
$("#CRed").on('click', function(){
    ChangeSelectFeatureColor(styleRed)});
$("#CBlue").on('click', function(){
    ChangeSelectFeatureColor(styleBlue)});
$("#COrange").on('click', function(){
    ChangeSelectFeatureColor(styleOrange)});
$("#CYellow").on('click', function(){
    ChangeSelectFeatureColor(styleYellow)});

//----- Useful actions
document.onkeydown = function(event){
    if(event.keyCode == 27){
        map.removeInteraction(draw);
        drawSwitch = false;

    }
}

var confirm = document.getElementById('confirm');


function expandFirstForm() {
  Expend("FirstFormContent");
}

$(document).ready(function(){
    $("#formButton").click(function(){
        $("#form1").toggle();
    });
});

$('ul.nav li.dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});
