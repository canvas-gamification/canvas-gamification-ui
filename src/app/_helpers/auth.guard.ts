import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router'

import {AuthenticationService} from '@app/_services/api/authentication'
import {User} from '@app/_models'
import {SurveyService} from "@app/accounts/_services/survey.service"

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private surveyService: SurveyService
    ) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser: User = this.authenticationService.currentUserValue
        if (currentUser) {
            return true
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/accounts/login'], {queryParams: {returnUrl: state.url}}).then()
        return false
    }
}
