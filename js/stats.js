function init() {
  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1u5fSZ3VYJoOrvDQmkdyDT0v4mKQ5ZLePCtMKjztrZ-k/pubhtml',
                   callback: parseData,
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init);

var matches = [];
function parseData(data, tabletop) {
  var sr = [];
  sr["Kendrick"] = [];
  sr["Tim"] = [];
  
  for(var index = 0; index < data.length; index++) {
    
    if(!matches[data[index].Map]) {
      matches[data[index].Map] = {};
      matches[data[index].Map].name = data[index].Map;
      matches[data[index].Map]["Won"] = 0;
      matches[data[index].Map]["Lost"] = 0;
      matches[data[index].Map]["Draw"] = 0;
    }
    matches[data[index].Map][data[index].Outcome]++;
    
    sr.Kendrick.push(data[index].Kendrick);
    sr.Tim.push(data[index].Tim);
  }
  plotSR(sr);
  
  var names = [];
  var won = [];
  var draw = [];
  var lost = [];
  for(var map in matches) {
    names.push(map);
    won.push(matches[map].Won);
    draw.push(matches[map].Draw);
    lost.push(matches[map].Lost);
  }
  console.log(names, won, draw, lost);
  plotWinDrawLost(names, won, draw, lost);
}

function plotWinDrawLost(names, won, draw, lost) {
  var data = new LineData();
  
  data.labels = names;
  data.datasets[0] = new LineDataset('Wins', won, 'rgba(0, 255, 0, .6)');
  data.datasets[1] = new LineDataset('Draws', draw, 'rgba(255, 255, 0, .6)');
  data.datasets[2] = new LineDataset('Losts', lost, 'rgba(255, 0, 0, .6)');
  
  var ctx = document.getElementById('winlost').getContext('2d');
  var myChart = new Chart(ctx, 
                          { type: 'horizontalBar',
                            data: data,
                            options: {
                              scales: {
                                xAxes: [{
                                  stacked: true
                                }],
                                yAxes: [{
                                  stacked: true
                                }]     
                              }
                            }
                          });
}

function plotSR(sr) {
  var myChart;
  
  var labelsArr = [];
  var size = sr.Kendrick.length;
  while(size--) { labelsArr.push("SR"); }
  
    
  var lindGraph = new LineData();
  lindGraph.labels = labelsArr;
  
  lindGraph.datasets[0] = new LineDataset('Kendrick', sr.Kendrick, "rgba(153,255,51,0.6)");
  lindGraph.datasets[1] = new LineDataset('Tim', sr.Tim, "rgba(255,153,0,0.6)");
  
  var ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, { type: 'line', data: lindGraph });

  myChart.options.scales.xAxes[0].display = false;
}