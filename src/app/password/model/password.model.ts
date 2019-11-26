import * as zxcvbn from 'zxcvbn';
import { Strength } from './strength.model';

export class Password {
  private _value: string;

  private _strength: Strength;

  private _strengthName: string;

  constructor(value: string) {
    this.value = value;
  }

  set value(value: string) {
    this._value = value;
    this.computeStrength();
  }

  get value(): string {
    return this._value;
  }

  get strength(): Strength {
    return this._strength;
  }

  static get strengthNames(): Array<string> {
    const result: Array<string> = [];
    result[Strength.TooGuessable] = 'Very weak';
    result[Strength.VeryGuessable] = 'Weak';
    result[Strength.SomewhatGuessable] = 'Good';
    result[Strength.SafelyUnguessable] = 'Very good';
    result[Strength.VeryUnguessable] = 'Great';
    return result;
  }

  get strengthName(): string {
    this._strengthName = Password.strengthNames[this.strength];
    return this._strengthName;
  }

  private computeStrength(): void {
    this._strength = Strength[Strength[zxcvbn(this.value).score]];
  }

  get score(): number {
    let result: number = 0;

    switch (this.strength) {
      case Strength.TooGuessable:
        result = 20;
        break;
      case Strength.VeryGuessable:
        result = 40;
        break;
      case Strength.SomewhatGuessable:
        result = 60;
        break;
      case Strength.SafelyUnguessable:
        result = 80;
        break;
      case Strength.VeryUnguessable:
        result = 100;
        break;
      default:
        result = 0;
        break;
    }

    return result;
  }
}
