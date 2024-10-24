import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent, pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(routes);
