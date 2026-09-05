import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { SessionPageComponent } from './pages/session-page/session-page.component';
import { PersonalizationPageComponent } from './pages/personalization-page/personalization-page.component';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomePageComponent },
    { path: "settings", component: SettingsPageComponent },
    { path: "session", component: SessionPageComponent },
    { path: "personalization", component: PersonalizationPageComponent }
];
