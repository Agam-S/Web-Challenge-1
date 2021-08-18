// Import stylesheets
import './style.css';
import { Colours } from './models/colours.enum';
import { BodyParts, BodyPartsHelper } from './models/bodyParts.enum';
import { SpinRecord } from './models/spin';

// used to make the spinner spin
let spinnerCounter = 0;



// container for the spinner 
let spinnerCycle;

// used to keep track of how many spins have been requested
let spinCount = 0;

// used to keep track of the results of the spin
let selectedColour: string;
let selectedBodyPart: string;

// use to store the results of spins
let spinHistoryArray: Array<SpinRecord> = [];



const colourDiv = document.getElementById('colourResult');

// sets up an array of strings to represent the colours from the enum
let coloursArray: Array<string> = [];
for (let colour in Colours) {
  if (isNaN(Number(colour))) {
    coloursArray.push(colour);
  }
}

const bodyPartP = document.getElementById('bodyPartText');

// TODO see above and create an array of strings to store the bodypart strings from the enum
let bodyPartsArray: Array<string> = [];



// TODO add eventlistners to buttons
const spinBtn = <HTMLButtonElement> document.getElementById('spin-btn');
spinBtn.addEventListener('click', () => spinBtnHandler(2000, 100)); 

// TODO handles the spin button click
// time in ms, interval in ms
function spinBtnHandler(time: number, interval: number) {
  
  // start spinner rotating through colours
  spinnerCycle = setInterval(() => spinSpinners(), interval);

  // TODO randomly select colour from array
  let colourIndex: number = 0;
  selectedColour = coloursArray[colourIndex];

  // TODO randomly select bodyPart from array
  let bodyPartIndex: number = 0;
  selectedBodyPart = bodyPartsArray[bodyPartIndex];


  spinBtn.disabled = true;
  
  // set timer to stop the spinners rotating
  setTimeout(() => stopSpinners(), time);
}

// rotates between the colours in Colours.enum.  
function spinSpinners() {
  spinnerCounter++;

  colourDiv.style.backgroundColor = coloursArray[spinnerCounter%coloursArray.length];

  bodyPartP.innerHTML = bodyPartsArray[spinnerCounter%bodyPartsArray.length];
}

// stops spinner after time parameter, time in ms
function stopSpinners() {
  clearInterval(spinnerCycle)
  // TODO set colourDiv and bodyPartP to the randomly spun results


  spinBtn.disabled = false;
  addToHistory();
}


// TODO add the newly spun result to the history table
function addToHistory() {
  
}

function statsBtnHandler() {
  // TODO set the statsResults div innerHTML to the amount and last spun number that the user has chosen
  // eg. Red LeftHand spun 10 times
  //     Red LeftHand last spun at num 23
}

// TODO returns the amount of times the combination of selected of colour and body part have been spun
function getAmount(colour, bodyPart): number {
  return 0;
}

// TODO return the last num which the combination of selected of colour and body part have been spun
function getLastSpun(colour, bodyPart): number {
  return 0;
}