
  
              function setpopup(feature, layer) {
  
                  var popupContent = "<p style='text-align:center'><em><span style='font-size: 120%;'>" + feature
                      .properties.Newspaper + "</span></em><br>" + feature.properties.Date + ", p. " + feature.properties
                      .Page + ", c. " + feature.properties.Column + "<br>" + feature.properties.City + ", " + feature
                      .properties.State + "<br><b>" + feature.properties.Title + "</b></p>";
  
                  if (feature.properties && feature.properties.popupContent) {
                      popupContent += feature.properties.popupContent;
                  }
                  layer.bindPopup(popupContent);
              }
              var center = [45.09388074584755, -100.08388945468975];
  
              // base layer is mapbox topo
              var baseMap = L.tileLayer(
                  'https://api.mapbox.com/styles/v1/agiroux/ckgjrjbsj09w01aqxz1w7wuqy/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWdpcm91eCIsImEiOiJjajE0ZmxxdjgwMDRxMnFvZGNuYzFyOHFxIn0.7KcKhzGSwCPb10LuCfWZYg', {
                      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                  });
  
              var map = L.map('leafletmap', {
                  layers: [baseMap],
                  center: center,
                  minZoom: 4,
                  maxZoom: 12,
                  zoom: 4
              });
  
              var paperLayer = L.geoJSON(papers, {
                  onEachFeature: setpopup
              }).addTo(map);
  
              // set view and zoom
              map.setView([45.09388074584755, -100.08388945468975], 4); 
   
    
  //TODO: minify, replace w/ modular embed/redesign, and rebuild VRVS usage
  function leaflet_districts() {
     
          //"center" of Florida: 27.6648° N, 81.5158° W
          var map = L.map('leafletmap').setView([27.6648, -81.5158], 6);
          var geojson;
          L.tileLayer(
                    'https://api.mapbox.com/styles/v1/agiroux/ckgjrjbsj09w01aqxz1w7wuqy/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWdpcm91eCIsImEiOiJjajE0ZmxxdjgwMDRxMnFvZGNuYzFyOHFxIn0.7KcKhzGSwCPb10LuCfWZYg', {
                        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          }).addTo(map);
  
          var districtSlices = {};
  
          function geoLoader(filename) {
              var file = '<?php echo get_template_directory_uri(); ?>/library/geojson/' + String(filename) + '.geojson';
              var dist = L.geoJSON(null, {
                  onEachFeature: onEachFeature
              });
              $.getJSON(file, function(data) {
                  dist.addData(data);
              });
              return dist;
          }
  
          function layerBuilder(filename){
              geojson = geoLoader(filename);
              var layer = L.layerGroup([geojson]);
              districtSlices[filename] = layer;
          }
  
          function zoomToFeature(e) {
              map.fitBounds(e.target.getBounds());
          }
  
          function onEachFeature(feature, layer) {
              layer.on({
              mouseover: highlightFeature,
              mouseout: resetHighlight,
              click: zoomToFeature
              });
          }
  
          function highlightFeature(e) {
              var layer = e.target;
  
              layer.setStyle({
                  weight: 5,
                  color: '#b31942',
                  dashArray: '',
                  fillOpacity: 0.7
              });
  
              if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                  layer.bringToFront();
              }
          }
  
          function resetHighlight(e) {
              if(geojson !== null) geojson.resetStyle(e.target);
          }
  
          //configure custom controls
          /*var info = L.control();
  
          info.onAdd = function (map) {
              this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
              this.update();
              return this._div;
          };
  
          // method that we will use to update the control based on feature properties passed
          info.update = function (props) {
              this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
                  '<b>' + props.statename + '</b><br />' + props.district + ' people / mi<sup>2</sup>'
                  : 'Hover over a state');
          };
  
          info.addTo(map);*/
          
          /*
          layerBuilder('29_to_36');
          layerBuilder('40_to_42');
          layerBuilder('43_to_43');
          layerBuilder('44_to_47');
          layerBuilder('48_to_57');
          layerBuilder('58_to_62');
          layerBuilder('63_to_63');
          layerBuilder('64_to_68');
          layerBuilder('69_to_72');
          layerBuilder('73_to_74');
          layerBuilder('75_to_77');
          layerBuilder('78_to_78');
          layerBuilder('79_to_82');
          layerBuilder('83_to_87');
          layerBuilder('88_to_89');
          layerBuilder('90_to_90');
          layerBuilder('91_to_92');
          layerBuilder('93_to_97');
          layerBuilder('98_to_102');
          layerBuilder('103_to_104');
          layerBuilder('105_to_107');
          layerBuilder('108_to_112');
          */
          layerBuilder('1845-1873');
          layerBuilder('1873-1903');
          layerBuilder('1903-1913');
          layerBuilder('1913-1933');
          layerBuilder('1933-1943');
          layerBuilder('1943-1953');
          layerBuilder('1953-1963');
          layerBuilder('1963-1973');
          layerBuilder('1973-1983');
          layerBuilder('1983-1993');
          layerBuilder('1993-2003');
          layerBuilder('2003-2013');
          L.control.layers(districtSlices,null,{collapsed:false}).addTo(map);
          $('<p id="layer-ctrl-header">FL Districts</p>').insertBefore('div.leaflet-control-layers-base');
  
}