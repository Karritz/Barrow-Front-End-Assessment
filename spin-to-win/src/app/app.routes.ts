import { Routes } from '@angular/router';
import { SpinningWheelGameComponent } from '../componets/spinning-wheel-game/spinning-wheel-game.component';
import { ResultsComponent } from '../componets/results/results.component';
import { WelcomeComponent } from '../componets/welcome/welcome.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
    },
    {
        path: 'game', component: SpinningWheelGameComponent
    },
    {
        path: 'result', component: ResultsComponent
    },
    {
        path: 'welcome', component: WelcomeComponent
    },
    {
        path: '**' , component: WelcomeComponent
    }
];
