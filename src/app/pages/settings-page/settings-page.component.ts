import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { PreferenceService } from '../../data/services/preference.service';
import { TranslationService } from '../../data/services/translation.service';
import { AppLanguage } from '../../data/translations';
import { TranslatePipe } from '../../data/pipes/translate.pipe';

@Component({
    selector: 'app-settings-page',
    imports: [SvgIconComponent, TranslatePipe],
    templateUrl: './settings-page.component.html',
    styleUrl: './settings-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
    private readonly location = inject(Location);
    readonly preferenceService = inject(PreferenceService);
    readonly translationService = inject(TranslationService);

    readonly availableLanguages: Array<{ code: AppLanguage; label: string }> = [
        { code: 'en', label: 'English' },
        { code: 'uk', label: 'Українська' },
        { code: 'ru', label: 'Русский' },
        { code: 'ja', label: '日本語' },
    ];

    goBack(): void {
        this.location.back();
    }

    onToggleAi(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.preferenceService.setUseAiGenerator(target.checked);
    }

    onApiKeyChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.preferenceService.setDeepSeekApiKey(target.value);
    }

    onResetStats(): void {
        const confirmMsg = this.translationService.translate('resetConfirm');
        if (confirm(confirmMsg)) {
            this.preferenceService.resetPreferences();
        }
    }

    onLanguageChange(event: Event): void {
        const target = event.target as HTMLSelectElement;
        this.translationService.setLanguage(target.value as AppLanguage);
    }

    onAuth(): void {
        console.log('Trigger auth flow');
    }
}