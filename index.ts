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

const spinBtn = <HTMLButtonElement>document.getElementById('spin-btn');
spinBtn.addEventListener('click', () => spinBtnHandler(2000, 100));

const statsBtn = <HTMLButtonElement>document.getElementById('statsBtn');
statsBtn.addEventListener('click', () =>
  statsBtnHandler(colourSelector.value, bodyPartSelector.value)
);

//==============================================================================

// time in ms, interval in ms
function spinBtnHandler(time: number, interval: number) {
  // start spinner rotating through colours
  spinnerCycle = setInterval(() => spinSpinners(), interval);
  spinCount++;

  let colornum: number = 0;
  colornum = Math.floor(Math.random() * coloursArray.length);
  selectedColour = coloursArray[colornum];

  let bodypartnum: number = 0;
  bodypartnum = Math.floor(Math.random() * bodyPartsArray.length);
  selectedBodyPart = bodyPartsArray[bodypartnum];

  spinHistoryArray.push(
    new SpinRecord(
      spinCount,
      Colours[selectedColour],
      BodyParts[selectedBodyPart]
    )
  );

  spinBtn.disabled = true;

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
  let newRow = document.createElement('tr');

  let NumRow = document.createElement('td');
  NumRow.innerHTML = spinCount.toString();
  newRow.append(NumRow);

  let ColorRow = document.createElement('td');
  ColorRow.innerHTML = selectedColour;
  newRow.append(ColorRow);

  let BodyPartRow = document.createElement('td');
  BodyPartRow.innerHTML = selectedBodyPart;
  newRow.append(BodyPartRow);

  history.append(newRow);
}

//==============================================================================

function statsBtnHandler(colour, bodyPart) {
  let spincombocount = getAmount(colour, bodyPart);

  let lastspun = getLastSpun(colour, bodyPart);

  stats.innerHTML = '';

  // add the number of spins
  let numofSpins: HTMLElement = document.createElement('div');
  numofSpins.innerHTML = `${colour} ${bodyPart} spun ${spincombocount} times.`;
  stats.appendChild(numofSpins);

  if (lastspun > 0) {
    numofSpins.innerHTML = `${colour} ${bodyPart} last spun at num ${lastspun}`;
  }
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
