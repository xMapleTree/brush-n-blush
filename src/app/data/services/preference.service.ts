import { computed, effect, Service, signal } from '@angular/core';
import { UserPreference } from '../interfaces/user-preference.interface';
import { UserExperience } from '../interfaces/user-experience.interface';

const DEFAULT_PREFERENCES: UserPreference = {
    experience: 'Beginner',
    implements: ['Bare Hand', 'Hairbrush'],
    isConfigured: false,
    useAiGenerator: false,
    deepSeekApiKey: '',
};

export const STORAGE_KEY = 'bnb_user_preferences';

@Service()
export class PreferenceService {
    private readonly preferencesState = signal<UserPreference>(this.loadFromStorage());
    readonly experience = computed(() => this.preferencesState().experience);
    readonly implements = computed(() => this.preferencesState().implements);
    readonly isConfigured = computed(() => this.preferencesState().isConfigured);
    readonly useAiGenerator = computed(() => this.preferencesState().useAiGenerator);
    readonly deepSeekApiKey = computed(() => this.preferencesState().deepSeekApiKey);

    constructor() {
        effect(() => {
            const state = this.preferencesState();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        });
    }

    setUseAiGenerator(enabled: boolean): void {
        this.preferencesState.update(prev => ({
            ...prev,
            useAiGenerator: enabled,
        }));
    }

    setDeepSeekApiKey(key: string): void {
        this.preferencesState.update(prev => ({
            ...prev,
            deepSeekApiKey: key.trim(),
        }));
    }

    setExperience(experience: UserExperience): void {
        this.preferencesState.update(prev => ({
            ...prev,
            experience,
        }));
    }

    setImplements(implementsList: string[]): void {
        this.preferencesState.update(prev => ({
            ...prev,
            implements: implementsList,
        }));
    }

    savePreferences(experience: UserExperience, implementsList: string[]): void {
        this.preferencesState.update(prev => ({
            ...prev,
            experience,
            implements: implementsList,
            isConfigured: true,
        }));
    }

    resetPreferences(): void {
        this.preferencesState.set(DEFAULT_PREFERENCES);
        localStorage.removeItem(STORAGE_KEY);
    }

    private loadFromStorage(): UserPreference {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return DEFAULT_PREFERENCES;
            }
            return JSON.parse(raw) as UserPreference;
        } catch {
            return DEFAULT_PREFERENCES;
        }
    }
}
