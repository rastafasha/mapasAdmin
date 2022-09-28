import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
//import { RegisterComponent } from './login/register.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistroComponent } from './auth/registro/registro.component';


const appRoutes: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent}
];



export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: false});
