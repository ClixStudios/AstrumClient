// window.addEventListener("scroll", preventMotion, false);
// window.addEventListener("touchmove", preventMotion, false);

var timeDeltas = [];
var url = window.location.hostname + ':4321/client'

var socket = io(url);

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var controllers = [];
var texts = [];
var buttons = [];
var images = [];
var VirtualElements = [];

var touches = [];
var touchesObject = {};
var width = window.innerWidth;
var height = window.innerHeight;

var synth = window.speechSynthesis;
var voices = [];

function init() {
    canvas.width = width;
    canvas.height = height;
    // alert('Width: ' + width + ', Height: ' + height);
}

init();