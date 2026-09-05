import { Service } from '@angular/core';
import { SessionConfig, SessionMood, TaskCard } from '../interfaces/session.interface';
import { UserExperience } from '../interfaces/user-experience.interface';
import { TranslationDict } from '../translations';

@Service()
export class SessionGeneratorService {
    private readonly stylesByMood: Record<SessionMood, Array<keyof TranslationDict>> = {
        gentle: ['styleLightTaps', 'styleSoftWarming', 'styleSlowContact', 'styleCalmPace'],
        progressive: ['styleIncreasingForce', 'styleAlternatingFirm', 'styleBuildingTempo', 'styleRisingWave'],
        strict: ['styleSharpCadence', 'styleHeavyImpacts', 'styleRapidIntervals', 'styleUnyieldingTempo', 'styleSolidStrikes'],
    };

    private readonly zonesByMood: Record<SessionMood, Array<keyof TranslationDict>> = {
        gentle: ['zoneFullSurface', 'zoneAlternatingSides', 'zoneWideSweeps'],
        progressive: ['zoneBottomToTop', 'zoneAlternatingFocus', 'zoneCenterOutward', 'zoneEvenDistribution'],
        strict: ['zoneCenterFocus', 'zoneSitBoneLine', 'zoneUpperCrest', 'zoneStrictRows'],
    };

    generateTask(
        config: SessionConfig,
        experience: UserExperience,
        currentRound: number,
        lastIntensityFeedback: number = 5
    ): TaskCard {
        const effectiveMood = this.resolveEffectiveMood(config.mood, currentRound, config.totalRounds);
        
        const implement = this.pickRandom(config.activeImplements);
        const styleKey = this.pickRandom(this.stylesByMood[effectiveMood]);
        const zoneKey = this.pickRandom(this.zonesByMood[effectiveMood]);

        const baseImpacts = this.getBaseImpacts(experience);
        const moodMultiplier = this.getMoodMultiplier(config.mood, currentRound, config.totalRounds);
        const feedbackMultiplier = this.getFeedbackMultiplier(lastIntensityFeedback);
        const implementMultiplier = this.getImplementMultiplier(implement);
        
        const randomVariance = 0.8 + Math.random() * 0.4;
        const rawImpacts = baseImpacts * moodMultiplier * feedbackMultiplier * implementMultiplier * randomVariance;
        const roundedToFive = Math.max(5, Math.round(rawImpacts / 5) * 5);

        return {
            roundNumber: currentRound,
            implement,
            impactCount: roundedToFive,
            zone: zoneKey,
            style: styleKey,
        };
    }

    private resolveEffectiveMood(mood: SessionMood, round: number, total: number): SessionMood {
        if (mood !== 'progressive') {
            return mood;
        }

        const progress = total > 1 ? (round - 1) / total : 0.5;
        if (progress < 0.3) {
            return 'gentle';
        }
        if (progress > 0.7) {
            return 'strict';
        }
        return 'progressive';
    }

    private pickRandom<T>(items: T[]): T {
        const index = Math.floor(Math.random() * items.length);
        return items[index];
    }

    private getBaseImpacts(exp: UserExperience): number {
        switch (exp) {
            case 'Beginner':
                return 15;
            case 'Intermediate':
                return 25;
            case 'Advanced':
                return 40;
            default:
                return 15;
        }
    }

    private getMoodMultiplier(mood: SessionMood, round: number, total: number): number {
        if (mood === 'gentle') return 0.75;
        if (mood === 'strict') return 1.35;
        if (mood === 'progressive') {
            const progress = total > 1 ? (round - 1) / total : 0.5;
            return 0.7 + progress * 0.75;
        }
        return 1.0;
    }

    private getFeedbackMultiplier(feedback: number): number {
        if (feedback <= 3) return 1.25;
        if (feedback >= 8) return 0.75;
        return 1.0;
    }

    private getImplementMultiplier(implement: string): number {
        const lower = implement.toLowerCase();
        
        if (lower.includes('cane') || lower.includes('switch') || lower.includes('crop') || lower.includes('ruler')) {
            return 0.7;
        }
        if (lower.includes('hand') || lower.includes('brush')) {
            return 1.2;
        }
        return 1.0;
    }
}