import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import { AuthenticationService } from '../../services/authentication.service';
import { Signin } from '../signin';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent extends Signin {
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]);

    constructor(
        public dialogRef: MdDialogRef<SigninComponent>,
        protected router: Router,
        protected authenticationService: AuthenticationService) {
        super(router, authenticationService);
    }

    onSigninSucceed(): void {
        this.dialogRef.close();
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
