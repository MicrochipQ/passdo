import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClipboardService } from 'ngx-clipboard';
import { Password } from './model/password.model';
import { PasswordService } from './password.service';

interface Checkboxes {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeSimilarCharacters: boolean;
}

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.styl'],
})
export class PasswordComponent implements OnInit, OnDestroy {
  password: Password;

  passwordSubscription: Subscription;

  length: number = 8;

  lengthMin: number = 4;

  lengthMax: number = 256;

  checkboxes: Checkboxes;

  constructor(
    private _passwordService: PasswordService,
    private _clipboardService: ClipboardService,
  ) {
    this.checkboxes = {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      excludeSimilarCharacters: false,
    };
  }

  ngOnInit(): void {
    this.passwordSubscription = this._passwordService.password.subscribe(
      (password: Password) => {
        this.password = password;
      },
    );

    this.onGenerate();
  }

  ngOnDestroy(): void {
    this.passwordSubscription.unsubscribe();
  }

  onGenerate(): void {
    const { length, checkboxes } = this;
    const {
      uppercase,
      lowercase,
      numbers,
      symbols,
      excludeSimilarCharacters,
    } = checkboxes;

    this._passwordService.generatePassword({
      length,
      uppercase,
      lowercase,
      numbers,
      symbols,
      excludeSimilarCharacters,
    });
  }

  onPasswordCopy(): void {
    this._clipboardService.copyFromContent(this.password.value);
  }
}
