export enum BodyParts {
  LeftHand,
  RightHand,
  LeftFoot,
  RightFoot
}

// helper class used to access the above enum
// usage can be either via the array or
// use the get method eg.  BodyPartsHelper.get("LeftHand")
export class BodyPartsHelper {

  static bodyParts: BodyParts[] = [
    BodyParts.LeftFoot,
    BodyParts.LeftHand,
    BodyParts.RightFoot,
    BodyParts.RightHand
  ];

  constructor() {}

  static get(key: string): BodyParts {
    switch (key) {
      case "LeftHand":
        return BodyParts.LeftHand;
      case "RightHand":
          return BodyParts.RightHand;
      case "LeftFoot":
        return BodyParts.LeftFoot;
      case "RightFoot":
        return BodyParts.RightFoot;
    }
  }
}