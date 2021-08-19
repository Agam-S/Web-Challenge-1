import { BodyParts } from './bodyParts.enum';
import { Colours } from './colours.enum';

export interface ISpin {
  colour: Colours;
  bodyPart: BodyParts;
}

export class SpinRecord implements ISpin {
  num: Number;
  colour: Colours;
  bodyPart: BodyParts;

  constructor(num: Number, colour: Colours, bodypart: BodyParts) {
    this.num = num;
    this.colour = colour;
    this.bodyPart = bodypart;
  }
}
