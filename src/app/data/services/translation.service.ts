import { computed, effect, Service, signal } from '@angular/core';
import { AppLanguage, TranslationDict, TRANSLATIONS } from '../translations';

const LANG_STORAGE_KEY = 'bnb_app_lang';

@Service()
export class TranslationService {
    private readonly currentLangSignal = signal<AppLanguage>(this.getInitialLanguage());

    readonly currentLang = computed(() => this.currentLangSignal());
    readonly t = computed(() => TRANSLATIONS[this.currentLangSignal()]);

    constructor() {
        effect(() => {
            localStorage.setItem(LANG_STORAGE_KEY, this.currentLangSignal());
        });
    }

    setLanguage(lang: AppLanguage): void {
        this.currentLangSignal.set(lang);
    }

    translate(key: keyof TranslationDict): string {
        return this.t()[key] ?? key;
    }

    private getInitialLanguage(): AppLanguage {
        const saved = localStorage.getItem(LANG_STORAGE_KEY) as AppLanguage;
        if (saved && TRANSLATIONS[saved]) {
            return saved;
        }

        const navLang = navigator.language.slice(0, 2).toLowerCase();
        if (navLang === 'uk' || navLang === 'ru' || navLang === 'ja') {
            return navLang as AppLanguage;
        }
        return 'en';
    }
}
