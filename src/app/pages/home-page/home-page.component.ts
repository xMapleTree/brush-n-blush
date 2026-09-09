import { Component, inject, signal } from '@angular/core';
import { SvgIconComponent } from "../../common-ui/svg-icon/svg-icon.component";
import { BriefStats } from '../../data/interfaces/brief-stats.interface';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PreferenceService } from '../../data/services/preference.service';
import { TranslatePipe } from '../../data/pipes/translate.pipe';

@Component({
    imports: [SvgIconComponent, DecimalPipe, RouterLink, TranslatePipe],
    selector: 'app-home-page',
    styleUrl: './home-page.component.scss',
    templateUrl: './home-page.component.html',
})
export class HomePageComponent {
    private readonly preferenceService = inject(PreferenceService);
    private readonly router = inject(Router);

    onSoloSession(): void {
        if (this.preferenceService.isConfigured()) {
            this.router.navigate(['/session']);
        } else {
            this.router.navigate(['/personalization'], {
                queryParams: { returnUrl: '/session' },
            });
        }
    }

    onPersonalization(): void {
        this.router.navigate(['/personalization'], {
            queryParams: { returnUrl: '/home' }
        });
    }

    protected readonly authorized = false;
    protected readonly userStats = signal<BriefStats>({
        sessionCount: 18,
        impactCount: 815,
        lastPlay: "Yesterday",
        rank: "Cheeky Enthusiast",
        lvl: 4,
        current_xp: 1300,
        required_xp: 2000
    });
}
