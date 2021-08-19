// Import stylesheets
import './style.css';
import { Colours } from './models/colours.enum';
import { BodyParts, BodyPartsHelper } from './models/bodyParts.enum';
import { SpinRecord } from './models/spin';

//==============================================================================

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

//==============================================================================

const colourDiv = document.getElementById('colourResult');
const colourSelector: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('colourSelect')
);
const bodyPartP = document.getElementById('bodyPartText');
const bodyPartSelector: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('bodyPartSelect')
);
const stats = document.getElementById('statsResults');
const history = document.getElementById('historyTableBody');

//==============================================================================

// sets up an array of strings to represent the colours from the enum
let coloursArray: Array<string> = [];
for (let colour in Colours) {
  if (isNaN(Number(colour))) {
    coloursArray.push(colour);

    let colorselect: HTMLOptionElement = document.createElement('option');
    colorselect.innerHTML = colour;
    colorselect.value = colour.toString();
    colourSelector.add(colorselect);
  }
}

// TODO see above and create an array of strings to store the bodypart strings from the enum, and adds the enums to the stats dropdown

let bodyPartsArray: Array<string> = [];
for (let bodypart in BodyParts) {
  if (isNaN(Number(bodypart))) {
    bodyPartsArray.push(bodypart);

    let bodyselect: HTMLOptionElement = document.createElement('option');
    bodyselect.innerHTML = bodypart;
    bodyselect.value = bodypart.toString();
    bodyPartSelector.add(bodyselect);
  }
}

//==============================================================================

// TODO add eventlistners to buttons
const spinBtn = <HTMLButtonElement>document.getElementById('spin-btn');
spinBtn.addEventListener('click', () => spinBtnHandler(2000, 100));

const statsBtn = <HTMLButtonElement>document.getElementById('statsBtn');
statsBtn.addEventListener('click', () =>
  statsBtnHandler(colourSelector.value, bodyPartSelector.value)
);

//==============================================================================

// TODO handles the spin button click
// time in ms, interval in ms
function spinBtnHandler(time: number, interval: number) {
  // start spinner rotating through colours
  spinnerCycle = setInterval(() => spinSpinners(), interval);
  spinCount++;

  // TODO randomly select colour from array
  let colornum: number = 0;
  colornum = Math.floor(Math.random() * coloursArray.length);
  selectedColour = coloursArray[colornum];

  // TO(DONE)DO randomly select bodyPart from array
  let bodypartnum: number = 0;
  bodypartnum = Math.floor(Math.random() * bodyPartsArray.length);
  selectedBodyPart = bodyPartsArray[bodypartnum];

  // add spin to array
  spinHistoryArray.push(
    new SpinRecord(
      spinCount,
      Colours[selectedColour],
      BodyParts[selectedBodyPart]
    )
  );

  spinBtn.disabled = true;

  // set timer to stop the spinners rotating
  setTimeout(() => stopSpinners(), time);
}

//==============================================================================

// rotates between the colours in Colours.enum.
function spinSpinners() {
  spinnerCounter++;

  colourDiv.style.backgroundColor =
    coloursArray[spinnerCounter % coloursArray.length];

  bodyPartP.innerHTML = bodyPartsArray[spinnerCounter % bodyPartsArray.length];
}

//==============================================================================

// stops spinner after time parameter, time in ms
function stopSpinners() {
  clearInterval(spinnerCycle);
  colourDiv.style.backgroundColor = selectedColour;
  bodyPartP.innerHTML = selectedBodyPart;

  spinBtn.disabled = false;
  addToHistory();
}

//==============================================================================

function addToHistory() {
  let row: HTMLElement = document.createElement('tr');

  let num: HTMLElement = document.createElement('td');
  num.innerHTML = String(spinHistoryArray[spinHistoryArray.length - 1].num);
  row.appendChild(num);

  let colour: HTMLElement = document.createElement('td');
  colour.innerHTML = String(
    Colours[spinHistoryArray[spinHistoryArray.length - 1].colour]
  );
  row.appendChild(colour);

  let bodyPart: HTMLElement = document.createElement('td');
  bodyPart.innerHTML = String(
    BodyParts[spinHistoryArray[spinHistoryArray.length - 1].bodyPart]
  );
  row.appendChild(bodyPart);

  history.appendChild(row);
}

//==============================================================================

function statsBtnHandler(colour, bodyPart) {
  let spincombocount = getAmount(colour, bodyPart);

  let lastspun = getLastSpun(colour, bodyPart);

  stats.innerHTML = '';

  // add the number of spins
  let numofSpins: HTMLElement = document.createElement('div');
  numofSpins.innerHTML = `${colour} ${bodyPart} spun ${spincombocount} times`;
  stats.appendChild(numofSpins);
}

//==============================================================================
function getAmount(colour, bodyPart): number {
  let counter = 0;
  for (let pointer = 0; pointer < spinHistoryArray.length; pointer++) {
    if (BodyParts[spinHistoryArray[pointer].bodyPart] === bodyPart) {
      if (Colours[spinHistoryArray[pointer].colour] === colour) {
        counter++;
      }
    }
  }
  return counter;
}

//==============================================================================
function getLastSpun(colour, bodyPart): number {
  for (let pointer = spinHistoryArray.length; pointer > 0; pointer--) {
    if (BodyParts[spinHistoryArray[pointer - 1].bodyPart] === bodyPart) {
      if (Colours[spinHistoryArray[pointer - 1].colour] === colour) {
        return pointer;
      }
    }
  }

  return 0;
}

//==============================================================================
