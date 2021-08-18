import { BodyParts } from './bodyParts.enum';
import { Colours } from './colours.enum';

export interface ISpin {
  colour: Colours;
  bodyPart: BodyParts;
}

// TODO: create a SpinRecord class which implements ISpin and adds a new attribute num:number
export class SpinRecord implements ISpin {
  player: string;
  colour: Colours;
  bodyPart: BodyParts;
  num: Number;

  constructor(
    player: string,
    colour: Colours,
    bodypart: BodyParts,
    num: Number
  ) {
    this.player = player;
    this.colour = colour;
    this.bodyPart = bodypart;
    this.num = num;
  }
}
