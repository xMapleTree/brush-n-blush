import { SessionMood } from '../../interfaces/session.interface';
import { UserExperience } from '../../interfaces/user-experience.interface';
import { TranslationDict } from '../../translations';

export interface ImplementProfile {
    name: string;
    impactRatio: number;
    intensityWeight: number;
}

export abstract class BaseModeGenerator {
    protected readonly implementProfiles: Record<string, ImplementProfile> = {
        'bare hand': { name: 'Bare Hand', impactRatio: 1.0, intensityWeight: 1.0 },
        'hairbrush': { name: 'Hairbrush', impactRatio: 0.75, intensityWeight: 2.2 },
        'spatula': { name: 'Spatula', impactRatio: 0.75, intensityWeight: 2.0 },
        'flogger': { name: 'Flogger', impactRatio: 0.8, intensityWeight: 1.8 },
        'wooden paddle': { name: 'Wooden Paddle', impactRatio: 0.55, intensityWeight: 3.5 },
        'leather paddle': { name: 'Leather Paddle', impactRatio: 0.58, intensityWeight: 3.2 },
        'leather belt': { name: 'Leather Belt', impactRatio: 0.52, intensityWeight: 3.8 },
        'tawse': { name: 'Tawse', impactRatio: 0.48, intensityWeight: 4.0 },
        'riding crop': { name: 'Riding Crop', impactRatio: 0.38, intensityWeight: 4.6 },
        'cane': { name: 'Cane', impactRatio: 0.35, intensityWeight: 5.0 },
        'thin switch': { name: 'Thin Switch', impactRatio: 0.36, intensityWeight: 4.8 },
        'thick switch': { name: 'Thick Switch', impactRatio: 0.34, intensityWeight: 5.0 },
        'ruler': { name: 'Ruler', impactRatio: 0.4, intensityWeight: 4.4 },
    };

    protected readonly stylesByMood: Record<SessionMood, Array<keyof TranslationDict>> = {
        gentle: ['styleLightTaps', 'styleSoftWarming', 'styleSlowContact', 'styleCalmPace'],
        progressive: ['styleIncreasingForce', 'styleAlternatingFirm', 'styleBuildingTempo', 'styleRisingWave'],
        strict: ['styleSharpCadence', 'styleHeavyImpacts', 'styleRapidIntervals', 'styleUnyieldingTempo', 'styleSolidStrikes'],
    };

    protected readonly zonesByMood: Record<SessionMood, Array<keyof TranslationDict>> = {
        gentle: ['zoneFullSurface', 'zoneAlternatingSides', 'zoneWideSweeps'],
        progressive: ['zoneBottomToTop', 'zoneAlternatingFocus', 'zoneCenterOutward', 'zoneEvenDistribution'],
        strict: ['zoneCenterFocus', 'zoneSitBoneLine', 'zoneUpperCrest', 'zoneStrictRows'],
    };

    protected getProfile(name: string): ImplementProfile {
        const key = name.toLowerCase().trim();
        return this.implementProfiles[key] ?? {
            name,
            impactRatio: 0.65,
            intensityWeight: 2.5,
        };
    }

    protected selectWeightedImplement(activeList: string[], targetIntensity: number): ImplementProfile {
        if (activeList.length === 1) return this.getProfile(activeList[0]);

        const profiles = activeList.map(name => this.getProfile(name));
        
        const weights = profiles.map(p => {
            const diff = p.intensityWeight - targetIntensity;
            return Math.exp(-0.5 * Math.pow(diff / 0.9, 2));
        });

        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        let random = Math.random() * totalWeight;

        for (let i = 0; i < profiles.length; i++) {
            if (random < weights[i]) {
                return profiles[i];
            }
            random -= weights[i];
        }

        return profiles[0];
    }

    protected getBaseImpacts(exp: UserExperience): number {
        switch (exp) {
            case 'Beginner': return 15;
            case 'Intermediate': return 25;
            case 'Advanced': return 40;
            default: return 15;
        }
    }

    protected pickRandom<T>(items: T[]): T {
        return items[Math.floor(Math.random() * items.length)];
    }
}