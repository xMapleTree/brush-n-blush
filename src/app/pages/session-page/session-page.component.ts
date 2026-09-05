import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { PreferenceService } from '../../data/services/preference.service';
import { SessionGeneratorService } from '../../data/services/session-generator.service';
import { SessionPhase, SessionMode, SessionMood, TaskCard, SessionConfig } from '../../data/interfaces/session.interface';
import { DeepSeekService } from '../../data/services/deepseek.service';
import { TranslatePipe } from '../../data/pipes/translate.pipe';
import { TranslationDict } from '../../data/translations';
import { TranslationService } from '../../data/services/translation.service';

@Component({
    selector: 'app-session-page',
    imports: [SvgIconComponent, TranslatePipe],
    templateUrl: './session-page.component.html',
    styleUrl: './session-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionPageComponent {
    private readonly preferenceService = inject(PreferenceService);
    private readonly sessionGenerator = inject(SessionGeneratorService);
    private readonly deepSeekService = inject(DeepSeekService);
    private readonly router = inject(Router);
    private readonly translationService = inject(TranslationService);

    readonly phase = signal<SessionPhase>('setup');

    readonly selectedMode = signal<SessionMode>('rounds');
    readonly selectedRoundsCount = signal<number>(5);
    readonly selectedMood = signal<SessionMood>('progressive');
    readonly availableImplements = signal<string[]>(this.preferenceService.implements());
    readonly selectedImplements = signal<string[]>([...this.preferenceService.implements()]);

    readonly currentRound = signal<number>(1);
    readonly currentTask = signal<TaskCard | null>(null);
    readonly totalImpactsCount = signal<number>(0);
    readonly lastIntensityRating = signal<number>(5);
    readonly peakIntensity = signal<number>(5);

    readonly intensityLabels: Record<number, string> = {
        1: 'Mild Warmup',
        2: 'Gentle Taps',
        3: 'Noticeable Sting',
        4: 'Warm & Rosy',
        5: 'Solid Impact',
        6: 'Stinging Heat',
        7: 'Deep Flush',
        8: 'Intense Sensation',
        9: 'High Threshold',
        10: 'Peak Boundary',
    };

    readonly currentIntensityLabel = computed(() => {
        const rating = this.lastIntensityRating();
        const key = `int${rating}` as keyof TranslationDict;
        return this.translationService.translate(key);
    });

    readonly totalPlannedRounds = computed(() => {
        const mode = this.selectedMode();
        if (mode === 'oneshot') return 1;
        if (mode === 'rounds') return this.selectedRoundsCount();
        return Infinity;
    });

    readonly awardedXp = computed(() => {
        const impacts = this.totalImpactsCount();
        const rounds = this.currentRound();
        return Math.round(impacts * 4 + rounds * 25);
    });

    selectMode(mode: SessionMode): void {
        this.selectedMode.set(mode);
    }

    setRoundsCount(count: number): void {
        this.selectedRoundsCount.set(count);
    }

    selectMood(mood: SessionMood): void {
        this.selectedMood.set(mood);
    }

    toggleImplement(item: string): void {
        this.selectedImplements.update(current => {
            if (current.includes(item)) {
                return current.length > 1 ? current.filter(i => i !== item) : current;
            }
            return [...current, item];
        });
    }

    isImplementActive(item: string): boolean {
        return this.selectedImplements().includes(item);
    }

    startSession(): void {
        this.phase.set('active');
        this.currentRound.set(1);
        this.totalImpactsCount.set(0);
        this.generateNextTask();
    }

    readonly isActionLocked = signal<boolean>(false);
    completeTask(): void {
      if (this.isActionLocked()) {
          return;
      }

      this.lockActionCooldown();

      const task = this.currentTask();
      if (task) {
          this.totalImpactsCount.update(c => c + task.impactCount);
      }

      const isLastRound = this.currentRound() >= this.totalPlannedRounds();
      if (isLastRound) {
          this.finishSession();
          return;
      }

      const shouldCheckin = this.currentRound() % 2 === 0;
      if (shouldCheckin) {
          this.phase.set('feedback');
      } else {
          this.advanceRound();
      }
    }

    submitFeedback(rating: number): void {
        this.lastIntensityRating.set(rating);
        if (rating > this.peakIntensity()) {
            this.peakIntensity.set(rating);
        }
        this.phase.set('active');
        this.advanceRound();
    }

    skipTask(): void {
      if (this.isActionLocked()) {
          return;
      }

      this.lockActionCooldown();
      this.generateNextTask();
    }

    finishSession(): void {
        this.phase.set('summary');
    }

    exitToHome(): void {
        this.router.navigate(['/home']);
    }

    private advanceRound(): void {
        this.currentRound.update(r => r + 1);
        this.generateNextTask();
    }

    private async generateNextTask(): Promise<void> {
        const config: SessionConfig = {
            mode: this.selectedMode(),
            mood: this.selectedMood(),
            totalRounds: this.totalPlannedRounds(),
            activeImplements: this.selectedImplements(),
        };
    
        const aiTask = await this.deepSeekService.generateAiTask(
            config,
            this.preferenceService.experience(),
            this.currentRound(),
            this.lastIntensityRating()
        );
    
        if (aiTask) {
            this.currentTask.set(aiTask);
        } else {
            const fallbackTask = this.sessionGenerator.generateTask(
                config,
                this.preferenceService.experience(),
                this.currentRound(),
                this.lastIntensityRating()
            );
            this.currentTask.set(fallbackTask);
        }
    }

    private lockActionCooldown(durationMs: number = 1000): void {
      this.isActionLocked.set(true);
      setTimeout(() => {
          this.isActionLocked.set(false);
      }, durationMs);
    }
}