var particles = [];

// color: Math.random() > .5 ? "#000000" : Math.random() > .5 ? "#FF0000" : "#FFFF00"

// Returns a number representing a quarter of the current viewport width (in pixels),
//  rounded down to the nearest integer. Manipulating this number to be higher will
//  will increase the number of dots in the animation.
var dots = Math.floor(window.innerWidth/25);

// Populates 'particles' array with objects containing 
for( var i = 0; i < dots; i++ ) {
  particles.push( {
    x: Math.random()*window.innerWidth,
    y: Math.random()*window.innerHeight,
    vx: 0,
    vy: -1*Math.random()-Math.random()-0.05,
    history: [],
    size: 2,
    color: "#F9B379"
  } );
}

var mouse = { x: 0, y: 0 };

var canvas = document.getElementById('canvasElement');

var points = [],
  width = canvas.width,
  height = canvas.height,
  intsy;

var MAX_DIST_2 = 100*100;
var circRadius = 4;//pix

if (canvas && canvas.getContext) {
  var context = canvas.getContext('2d');
  Initialize();
}

function Initialize() {
  canvas.addEventListener('mousemove', MouseMove, false);
  window.addEventListener('resize', ResizeCanvas, false);
  setInterval( TimeUpdate, 20 );
  context.beginPath();
  ResizeCanvas();
}

function TimeUpdate(e) {

  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  var point, i, j, ptCons = new Array(points.length);

  for(i = 0; i < particles.length; i++)
  {
    ptCons[i] = new Array(particles.length);

    for(j = 0; j < particles.length; j++)
    {
      ptCons[i][j] = 0;
    }
  }

  for( var i = 0; i < particles.length; i++ ) {

    particles[i].x += particles[i].vx;
    particles[i].y += particles[i].vy;

    if( particles[i].x > window.innerWidth ) {
      particles[i].vx = -1-Math.random();
    }
    else if ( particles[i].x < 0 ) {
      particles[i].vx = 1+Math.random();
    }
    else {
      particles[i].vx *= 1 + (Math.random()*0.005);
    }

    if( particles[i].y > window.innerHeight ) {
      particles[i].vy = -1-Math.random();
    }
    else if ( particles[i].y < 0 ) {
      particles[i].y = window.innerHeight;
      particles[i].vy = 1;
    }
    else {
      particles[i].vy *= 1;
    }

    context.strokeStyle = particles[i].color;
    context.beginPath();

    var min_dist_2 = MAX_DIST_2;

    particles.forEach(function(pt, j){
      var dist_2 = (Math.pow(pt.x - particles[i].x, 2) + Math.pow(pt.y - particles[i].y, 2));

      if(dist_2 < min_dist_2 && pt != particles[i])
        min_dist_2 = dist_2;

      if(pt == particles[i] || dist_2 > MAX_DIST_2 || ptCons[i][j])
        return;

      context.moveTo(particles[i].x, particles[i].y);
      var dirx = particles[i].x > pt.x ? particles[i].x : pt.x;
      var diry = particles[i].y < pt.y ? particles[i].y : pt.y;
      context.quadraticCurveTo(dirx, diry, pt.x, pt.y);
      context.strokeStyle = 'rgba(249,179,121,' + (1 - dist_2 / MAX_DIST_2) +' )'
      ptCons[i][j] = 1;
      ptCons[j][i] = 1;
    });
    context.stroke();

    var distanceFactor = DistanceBetween( mouse, particles[i] );
    distanceFactor = Math.max( Math.min( 15 - ( distanceFactor / 10 ), 10 ), 1 );

    context.fillStyle = particles[i].color;
    context.beginPath();
    context.arc(particles[i].x,particles[i].y,particles[i].size*distanceFactor,0,Math.PI*2,true);
    context.closePath();
    context.fill();

  }
}

function MouseMove(e) {
  mouse.x = e.layerX;
  mouse.y = e.layerY;
}

function Draw( x, y ) {
  context.strokeStyle = '#ff0000';
  context.lineWidth = 4;
  context.lineTo(x, y);
  context.stroke();
}

function ResizeCanvas(e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function DistanceBetween(p1,p2) {
  var dx = p2.x-p1.x;
  var dy = p2.y-p1.y;
  return Math.sqrt(dx*dx + dy*dy);
}

zingchart.THEME="classic";
var myConfig = {
    "background-color": "#454754",
    "graphset": [
        {
            "type": "mixed",
            "width": "70%",
            "background-color": "#454754",
            "title": {
                "y": "10px",
                "text-align": "left",
                "background-color": "none",
                "text": "Delta Ride Analytics",
                "font-weight": "normal",
                "font-family": "Arial",
                "font-color": "#ffffff",
                "font-size": "18px",
                "height": "40px",
                "padding-left": "20px"
            },
            "plotarea": {
                "margin": "75px 75px 5px 67px"
            },
            "scale-x": {
                "values": [
                    "Trip 1",
                    "Trip 2",
                    "Trip 3",
                    "Trip 4",
                    "Trip 5",
                    "Trip 6",
                    "Trip 7",
                    "Trip 8",
                    "Trip 9",
                    "Trip 10",
                    "Trip 11",
                    "Trip 12"
                ],
                "flat": false,
                "line-color": "#55717c",
                "offset-y": "4px",
                "guide": {
                    "visible": false
                },
                "label": {
                    "font-size": "11px",
                    "font-family": "Arial",
                    "font-color": "#ffffff",
                    "font-weight": "normal"
                },
                "item": {
                    "tooltip": {
                        "text": "%months"
                    },
                    "font-size": "10px",
                    "font-family": "Arial",
                    "font-color": "#c0c0c0"
                },
                "tick": {
                    "visible": false
                }
            },
            "scale-y": {
                "line-color": "none",
                "values": "0:1000:200",
                "multiplier": true,
                "label": {
                    "text": "Calories Burnt",
                    "font-size": "11px",
                    "font-family": "Arial",
                    "font-color": "#ffffff",
                    "font-weight": "normal"
                },
                "item": {
                    "font-size": "10px",
                    "font-family": "Arial",
                    "font-color": "#c0c0c0"
                },
                "guide": {
                    "line-style": "solid",
                    "line-color": "#5e606c",
                    "alpha": 1
                },
                "tick": {
                    "visible": false
                }
            },
            "scale-y-2": {
                "line-color": "none",
                "values": "0:500:100",
                "multiplier": true,
                "label": {
                    "text": "Average Speed",
                    "offset-x": "5px",
                    "font-size": "11px",
                    "font-family": "Arial",
                    "font-color": "#ffffff",
                    "font-weight": "normal"
                },
                "item": {
                    "font-size": "10px",
                    "font-family": "Arial",
                    "font-color": "#c0c0c0"
                },
                "guide": {
                    "visible": false
                },
                "tick": {
                    "visible": false
                }
            },
            "plot": {},
            "series": [
                {
                    "values": [
                        4800,
                        3100,
                        6200,
                        4050,
                        4455,
                        2950,
                        4600,
                        7005,
                        3950,
                        4580,
                        2900,
                        1500
                    ],
                    "type": "bar",
                    "background-color": "#6597a2",
                    "hover-state": {
                        "visible": 0
                    },
                    "tooltip": {
                        "background-color": "#2f6672",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    },
                    "animation": {
                        "delay": 0,
                        "effect": 4,
                        "speed": "1000",
                        "method": "0",
                        "sequence": "0"
                    }
                },
                {
                    "values": [
                        110,
                        58,
                        104,
                        357,
                        294,
                        367,
                        285,
                        340,
                        397,
                        425,
                        254,
                        187
                    ],
                    "type": "line",
                    "line-color": "#96feff",
                    "line-width": 2,
                    "marker": {
                        "background-color": "#a3bcb8",
                        "border-width": 2,
                        "shadow": 0,
                        "border-color": "#88f5fa"
                    },
                    "tooltip": {
                        "background-color": "#54ced4",
                        "font-color": "#454754",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    },
                    "animation": {
                        "delay": 500,
                        "effect": 5,
                        "speed": "1800",
                        "method": "0",
                        "sequence": "1"
                    },
                    "scales": "scale-x,scale-y-2"
                }
            ]
        },
        {

            "type": "pie",
            "text": "Distance per Trip",
            "width": "34%",
            "x": "66%",
            "background-color": "#454754",
            "title": {
                "background-color": "none",
                "font-weight": "normal",
                "font-family": "Arial",
                "font-color": "#ffffff",
                "height": "40px"
            },
            "plotarea": {
                "margin": "60px 10px 0px 0px"
            },
            "plot": {
                "value-box": {
                    "visible": false
                },
                "animation": {
                    "delay": 0,
                    "effect": 2,
                    "speed": "300",
                    "method": "0",
                    "sequence": "1"
                }
            },
            "series": [
                {
                    "text": "Product 1",
                    "values": [
                        15
                    ],
                    "background-color": "#57dce5",
                    "border-color": "#454754",
                    "border-width": "1px",
                    "shadow": 0,
                    "tooltip": {
                        "background-color": "#54ced4",
                        "font-color": "#454754",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                },
                {
                    "text": "Product 2",
                    "values": [
                        18
                    ],
                    "background-color": "#9688f7",
                    "border-color": "#454754",
                    "border-width": "1px",
                    "shadow": 0,
                    "tooltip": {
                        "background-color": "#796bdd",
                        "font-color": "#ffffff",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                },
                {
                    "text": "Product 3",
                    "values": [
                        20
                    ],
                    "background-color": "#b659b4",
                    "border-color": "#454754",
                    "border-width": "1px",
                    "shadow": 0,
                    "tooltip": {
                        "background-color": "#a03f9c",
                        "font-color": "#ffffff",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                },
                {
                    "text": "Product 4",
                    "values": [
                        16
                    ],
                    "background-color": "#3bbcfc",
                    "border-color": "#454754",
                    "border-width": "1px",
                    "shadow": 0,
                    "tooltip": {
                        "background-color": "#1b9ede",
                        "font-color": "#ffffff",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                },
                {
                    "text": "Product 5",
                    "values": [
                        21
                    ],
                    "background-color": "#6597a2",
                    "border-color": "#454754",
                    "border-width": "1px",
                    "shadow": 0,
                    "tooltip": {
                        "background-color": "#2f6672",
                        "font-color": "#ffffff",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                }
            ]
        },
        {
            "type": "bar",
            "width": "100%",
            "background-color": "#454754",
            "border-bottom": "8px solid #565867",
            "plot": {
                "bar-space": "10px",
                "animation": {
                    "delay": 0,
                    "effect": 4,
                    "speed": "1000",
                    "method": "0",
                    "sequence": "0"
                }
            },
            "plotarea": {
                "margin": "45px 30px 40px 65px"
            },
            "scale-x": {
                "values": [
                    "Trip 1",
                    "Trip 2",
                    "Trip 3",
                    "Trip 4",
                    "Trip 5",
                    "Trip 6",
                    "Trip 7",
                    "Trip 8",
                    "Trip 9",
                    "Trip 10",
                    "Trip 11",
                    "Trip 12"
                ],
                "line-color": "#55717c",
                "offset-y": "4px",
                "tick": {
                    "size": "5px",
                    "line-color": "#55717c",
                    "line-width": "1px",
                    "visible": false
                },
                "guide": {
                    "visible": false
                },
                "item": {
                    "font-size": "10px",
                    "font-family": "Arial",
                    "font-color": "#c0c0c0"
                }
            },
            "scale-y": {
                "line-color": "none",
                "values": "0:5000:1000",
                "multiplier": true,
                "guide": {
                    "line-style": "solid",
                    "line-color": "#5e606c",
                    "alpha": 1
                },
                "tick": {
                    "visible": false
                },
                "label": {
                    "text": "Greenhouse Gases Saved Per Trip",
                    "offset-x": "-5px",
                    "font-size": "11px",
                    "font-family": "Arial",
                    "font-color": "#ffffff",
                    "font-weight": "normal"
                },
                "item": {
                    "padding-left": "2px",
                    "font-size": "10px",
                    "font-family": "Arial",
                    "font-color": "#c0c0c0"
                }
            },
            "series": [
                {
                    "values": [
                        3100,
                        3950,
                        2430,
                        3600,
                        3800,
                        4550,
                        2850,
                        3800,
                        2100,
                        1700,
                        2400,
                        1750
                    ],
                    "background-color": "#57dde8",
                    "tooltip": {
                        "background-color": "#54ced4",
                        "font-color": "#454754",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                },
                {
                    "values": [
                        1150,
                        3675,
                        700,
                        4450,
                        1150,
                        2845,
                        4290,
                        2675,
                        1305,
                        3260,
                        1250,
                        1430
                    ],
                    "background-color": "#978af6",
                    "tooltip": {
                        "background-color": "#796bdd",
                        "font-color": "#ffffff",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                },
                {
                    "values": [
                        2150,
                        2955,
                        1450,
                        1650,
                        2845,
                        3560,
                        2155,
                        1875,
                        1160,
                        750,
                        1475,
                        1600
                    ],
                    "background-color": "#b857b4",
                    "tooltip": {
                        "background-color": "#a03f9c",
                        "font-color": "#ffffff",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                }
            ]
        }
    ]
};

zingchart.render({ 
  id : 'myChart', 
  data : myConfig, 
  height: 500, 
  width: 725 
});