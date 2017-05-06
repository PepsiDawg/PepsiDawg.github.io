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
  sr["Maps"] = [];
  
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
    sr.Maps.push(data[index].Map)
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
  data.datasets[0] = new LineDataset('Wins', won, 'rgba(91, 163, 75, .75)');
  data.datasets[1] = new LineDataset('Draws', draw, 'rgba(252, 239, 58, .75)');
  data.datasets[2] = new LineDataset('Losses', lost, 'rgb(219, 54, 54, .75)');
  
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
    
  var lindGraph = new LineData();
  lindGraph.labels = sr["Maps"];
  
  lindGraph.datasets[0] = new LineDataset('Kendrick', sr.Kendrick, "rgba(85, 129, 142, 1)");
  lindGraph.datasets[1] = new LineDataset('Tim', sr.Tim, "rgba(128, 85, 142, 1)");
  
  var ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, { type: 'line', data: lindGraph });

  myChart.options.scales.xAxes[0].display = false;
}