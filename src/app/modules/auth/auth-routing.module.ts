import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TwoStepsComponent } from './pages/two-steps/two-steps.component';
import { VerifyPassComponent } from './pages/verify-pass/verify-pass.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: SignInComponent, data: { returnUrl: window.location.pathname } },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'verify-login', component: NewPasswordComponent },
      { path: 'two-steps', component: TwoStepsComponent },
      { path: 'verify-password', component: VerifyPassComponent },

      { path: '**', redirectTo: 'sign-in', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
