import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent, pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(routes);
