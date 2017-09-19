import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

/**
 * Provides signin method to signin & signup components.
 */
export class Signin {
    model: any = {};

    errorMessages: any[] = [];

    constructor(
        protected router: Router,
        protected authenticationService: AuthenticationService) { }

    protected onSigninSucceed() {

    }

    signin(): void {
        this.authenticationService.signin(this.model.username, this.model.password)
            .subscribe(
            () => {
                // Optional strategy for refresh token through a scheduler.
                this.authenticationService.scheduleRefresh();

                // Gets user's data.
                this.authenticationService.getUserInfo().subscribe(
                    (userInfo: any) => {
                        this.authenticationService.changeUser(userInfo);

                        // Gets the redirect URL from authentication service.
                        // If no redirect has been set, uses the default.
                        const redirect: string = this.authenticationService.redirectUrl;
                        if (redirect != null) {
                            // Redirects the user.
                            this.router.navigate([redirect]);
                        }
                    });

                this.onSigninSucceed();
            },
            (error: any) => {
                // Checks for error in response (error from the Token endpoint).
                if (error.body !== '') {
                    const body: any = error.json();

                    switch (body.error) {
                        case 'invalid_grant':
                            this.errorMessages.push({ description: '账号或者密码不符合。' });
                            break;
                        default:
                            this.errorMessages.push({ description: '未预料的错误，请重试。' });
                    }
                } else {
                    const errMsg = (error.message) ? error.message :
                        error.status ? `${error.status} - ${error.statusText}` : '服务器错误';
                    console.log(errMsg);
                    this.errorMessages.push({ description: '服务器错误，请重试。' });
                }
            });
    }

    clearMessages(): void {
        this.errorMessages = [];
    }

}
