var LCD = require('jsupm_i2clcd');
var myLcd = new LCD.Jhd1313m1(0, 0x3E, 0x62);
myLcd.setCursor(0, 0);
myLcd.write('Online...');
console.log('Starting...');

var signalR = require('signalr-client');
var client = new signalR.client(
    "http://infodisplay.azurewebsites.net/signalr/hubs", ['infoHub']
);

client.on('infoHub', 'incomingMessage',
    function (message) {
        myLcd.setCursor(0, 0);
        myLcd.write("                ");

        myLcd.setCursor(0, 0);
        myLcd.write(message);

        console.log("revc => " + message);
    });

var mraa = require("mraa");
var rotarySensor = new mraa.Aio(0);
var lastRotaryValue = 0;

function readRotaryValue() {
    var rotaryValue = rotarySensor.read();

    if (rotaryValue != lastRotaryValue) {
        lastRotaryValue = rotaryValue;
        client.invoke('infoHub', 'pushColor', rotaryValue);

        if (rotaryValue < 1000) {
            myLcd.setColor(255, 255, 255);
        } else if (rotaryValue > 1000 && rotaryValue < 2000) {
            myLcd.setColor(255, 0, 0);
        } else if (rotaryValue > 2000 && rotaryValue < 3000) {
            myLcd.setColor(124, 252, 0);
        } else if (rotaryValue > 3000) {
            myLcd.setColor(0, 191, 255);
        }

        console.log("Rotary Value: " + rotaryValue);
    }
};

setInterval(readRotaryValue, 1000);
