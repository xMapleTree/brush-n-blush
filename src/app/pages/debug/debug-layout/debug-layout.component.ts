import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    selector: 'app-debug-layout',
    styleUrl: './debug-layout.component.scss',
    templateUrl: './debug-layout.component.html',
})
export class DebugLayoutComponent {}
