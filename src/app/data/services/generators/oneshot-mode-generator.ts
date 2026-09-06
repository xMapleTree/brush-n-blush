import { Service } from '@angular/core';
import { BaseModeGenerator } from './base-mode-generator';
import { SessionConfig, TaskCard } from '../../interfaces/session.interface';
import { UserExperience } from '../../interfaces/user-experience.interface';

@Service()
export class OneshotModeGenerator extends BaseModeGenerator {
    generate(config: SessionConfig, experience: UserExperience): TaskCard {
        const targetIntensity = config.mood === 'gentle' ? 1.5 : config.mood === 'strict' ? 4.5 : 3.0;
        const profile = this.selectWeightedImplement(config.activeImplements, targetIntensity);

        const style = this.pickRandom(this.stylesByMood[config.mood]);
        const zone = this.pickRandom(this.zonesByMood[config.mood]);

        const base = this.getBaseImpacts(experience);
        const moodMultiplier = config.mood === 'gentle' ? 0.8 : config.mood === 'strict' ? 1.3 : 1.0;
        const variance = 0.95 + Math.random() * 0.1;

        const raw = base * moodMultiplier * profile.impactRatio * variance;
        const count = Math.max(5, Math.round(raw / 5) * 5);

        return {
            roundNumber: 1,
            implement: profile.name,
            impactCount: count,
            zone,
            style,
        };
    }
}