import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);
  hide = signal(true);
  formCompleted = signal(false);
  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateEmailErrorMessage();
        this.updateFormCompleted();
      });

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updatePasswordErrorMessage();
        this.updateFormCompleted();
      });
  }

  updateEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.emailErrorMessage.set('Ingresa un email.');
    } else if (this.email.hasError('email')) {
      this.emailErrorMessage.set('Not a valid email');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.passwordErrorMessage.set('Ingresa una contraseña.');
    } else {
      this.passwordErrorMessage.set('');
    }
  }

  updateFormCompleted() {
    const isEmailValid = this.email.valid;
    const isPasswordValid = this.password.valid;
    this.formCompleted.set(isEmailValid && isPasswordValid);
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login(form: NgForm) {
    this.updateEmailErrorMessage();
    this.updatePasswordErrorMessage();
    this.updateFormCompleted();

    if (this.formCompleted()) {
      alert('Ha presionado el botón aceptar.');

      this.email.reset();
      this.password.reset();
      this.formCompleted.set(false);
      form.resetForm();
    }
  }

  cancel(form: NgForm) {
    this.email.reset();
    this.password.reset();
    this.emailErrorMessage.set('');
    this.passwordErrorMessage.set('');
    this.formCompleted.set(false);
    form.resetForm();
  }
}
