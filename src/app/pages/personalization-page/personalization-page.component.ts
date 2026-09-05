import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PreferenceService } from '../../data/services/preference.service';
import { TranslationService } from '../../data/services/translation.service';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { TranslatePipe } from '../../data/pipes/translate.pipe';
import { UserExperience } from '../../data/interfaces/user-experience.interface';

interface ExperienceOption {
    level: UserExperience;
    titleKey: 'expBeginnerTitle' | 'expIntermediateTitle' | 'expAdvancedTitle';
    descKey: 'expBeginnerDesc' | 'expIntermediateDesc' | 'expAdvancedDesc';
}

@Component({
    selector: 'app-personalization-page',
    imports: [SvgIconComponent, TranslatePipe],
    templateUrl: './personalization-page.component.html',
    styleUrl: './personalization-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalizationPageComponent {
    private readonly preferenceService = inject(PreferenceService);
    private readonly translationService = inject(TranslationService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);

    readonly defaultSuggestions: string[] = [
        'Bare Hand',
        'Hairbrush',
        'Wooden Paddle',
        'Leather Paddle',
        'Thin Switch',
        'Thick Switch',
        'Cane',
        'Riding Crop',
        'Ruler',
        'Leather Belt',
        'Flogger',
        'Tawse',
        'Spatula',
    ];

    readonly experienceOptions: ExperienceOption[] = [
        {
            level: 'Beginner',
            titleKey: 'expBeginnerTitle',
            descKey: 'expBeginnerDesc',
        },
        {
            level: 'Intermediate',
            titleKey: 'expIntermediateTitle',
            descKey: 'expIntermediateDesc',
        },
        {
            level: 'Advanced',
            titleKey: 'expAdvancedTitle',
            descKey: 'expAdvancedDesc',
        },
    ];

    readonly selectedExperience = signal<UserExperience>(this.preferenceService.experience());
    readonly selectedImplements = signal<string[]>(this.preferenceService.implements());
    readonly searchQuery = signal<string>('');
    readonly isDropdownOpen = signal<boolean>(false);

    readonly filteredSuggestions = computed(() => {
        const query = this.searchQuery().trim().toLowerCase();
        const current = this.selectedImplements().map(item => item.toLowerCase());

        return this.defaultSuggestions.filter(item => {
            const matchesQuery = !query || item.toLowerCase().includes(query);
            const notSelected = !current.includes(item.toLowerCase());
            return matchesQuery && notSelected;
        });
    });

    readonly canCreateCustom = computed(() => {
        const query = this.searchQuery().trim();
        if (!query) return false;
        const existsInCurrent = this.selectedImplements().some(
            item => item.toLowerCase() === query.toLowerCase()
        );
        const existsInSuggestions = this.defaultSuggestions.some(
            item => item.toLowerCase() === query.toLowerCase()
        );
        return !existsInCurrent && !existsInSuggestions;
    });

    selectExperience(level: UserExperience): void {
        this.selectedExperience.set(level);
    }

    onSearchInput(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.searchQuery.set(target.value);
        this.isDropdownOpen.set(true);
    }

    onInputFocus(): void {
        this.isDropdownOpen.set(true);
    }

    onInputKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            const query = this.searchQuery().trim();
            if (query) this.addImplement(query);
        } else if (event.key === 'Escape') {
            this.isDropdownOpen.set(false);
        }
    }

    addImplement(name: string): void {
        const trimmed = name.trim();
        if (!trimmed) return;

        const exists = this.selectedImplements().some(
            item => item.toLowerCase() === trimmed.toLowerCase()
        );

        if (!exists) {
            this.selectedImplements.update(list => [...list, trimmed]);
        }

        this.searchQuery.set('');
        this.isDropdownOpen.set(false);
    }

    removeImplement(name: string): void {
        this.selectedImplements.update(list => list.filter(item => item !== name));
    }

    goBack(): void {
        this.router.navigate(['/home']);
    }

    saveAndContinue(): void {
        const implementsList = this.selectedImplements().length > 0 
            ? this.selectedImplements() 
            : ['Bare Hand'];

        this.preferenceService.savePreferences(
            this.selectedExperience(),
            implementsList
        );

        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/session';
        this.router.navigateByUrl(returnUrl);
    }
}