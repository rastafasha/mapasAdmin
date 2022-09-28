import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaisComponent } from './forms/pais/pais.component';
import { PaisesComponent } from './manage/paises/paises.component';
import { PrensaEditComponent } from './prensa/prensa-edit/prensa-edit.component';
import { PrensaIndexComponent } from './prensa/prensa-index/prensa-index.component';
import { SliderEditComponent } from './slider/slider-edit/slider-edit.component';
import { SliderIndexComponent } from './slider/slider-index/slider-index.component';
import { VideoIndexComponent } from './videos/video-index/video-index.component';
import { VideoEditComponent } from './videos/video-edit/video-edit.component';
const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ AuthGuard],
        children: [
            {
                path: 'admin',
                component: DashboardComponent,
                canActivate: [ AuthGuard],
                data: { titulo: 'Dashboard', }
            },
            { path: 'paises',canActivate: [AuthGuard], component: PaisesComponent},
            { path: 'pais/create',canActivate: [AuthGuard], component: PaisComponent},
            { path: 'pais/edit/:id',canActivate: [AuthGuard], component: PaisComponent},

            { path: 'prensa',canActivate: [AuthGuard], component: PrensaIndexComponent},
            { path: 'prensa/create',canActivate: [AuthGuard], component: PrensaEditComponent},
            { path: 'prensa/edit/:id',canActivate: [AuthGuard], component: PrensaEditComponent},

            { path: 'slider',canActivate: [AuthGuard], component: SliderIndexComponent},
            { path: 'slider/create',canActivate: [AuthGuard], component: SliderEditComponent},
            { path: 'slider/edit/:id',canActivate: [AuthGuard], component: SliderEditComponent},

            { path: 'video',canActivate: [AuthGuard], component: VideoIndexComponent},
            { path: 'video/create',canActivate: [AuthGuard], component: VideoEditComponent},
            { path: 'video/edit/:id',canActivate: [AuthGuard], component: VideoEditComponent},

            { path: '', redirectTo: '/admin', pathMatch: 'full'},
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
