import * as randomatic from 'randomatic';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Password } from './model/password.model';

interface GeneratePassword {
  length: number;
  uppercase?: boolean;
  lowercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
  excludeSimilarCharacters?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private _password = new BehaviorSubject<Password>(new Password(''));

  get password(): Observable<Password> {
    return this._password.asObservable();
  }

  generatePassword({
    length,
    uppercase,
    lowercase,
    numbers,
    symbols,
    excludeSimilarCharacters,
  }: GeneratePassword): void {
    let pattern: string;

    if (uppercase) pattern += 'A';
    if (lowercase) pattern += 'a';
    if (numbers) pattern += '0';
    if (symbols) pattern += '!';

    this._password.next(
      new Password(
        randomatic(
          pattern,
          length,
          excludeSimilarCharacters ? { exclude: '0oOiIlL1' } : {},
        ),
      ),
    );
  }
}
