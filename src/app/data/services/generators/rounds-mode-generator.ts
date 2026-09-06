import { Service } from '@angular/core';
import { BaseModeGenerator } from './base-mode-generator';
import { SessionConfig, TaskCard, SessionMood } from '../../interfaces/session.interface';
import { UserExperience } from '../../interfaces/user-experience.interface';
import { CadenceMath } from './cadence-math';

@Service()
export class RoundsModeGenerator extends BaseModeGenerator {
    generate(
        config: SessionConfig,
        experience: UserExperience,
        round: number,
        feedback: number
    ): TaskCard {
        const total = config.totalRounds;
        const progress = total > 1 ? (round - 1) / (total - 1) : 0.5;

        const progressionFactor = CadenceMath.roundsProgression(progress, 1.4);

        const damping = CadenceMath.feedbackDamping(feedback);

        const targetIntensity = Math.min(5.0, Math.max(1.0, (1.0 + progress * 3.5) * (damping * 0.9)));
        const profile = this.selectWeightedImplement(config.activeImplements, targetIntensity);

        let effectiveMood: SessionMood = config.mood;
        if (config.mood === 'progressive') {
            effectiveMood = progress < 0.3 ? 'gentle' : progress > 0.7 ? 'strict' : 'progressive';
        }

        const style = this.pickRandom(this.stylesByMood[effectiveMood]);
        const zone = this.pickRandom(this.zonesByMood[effectiveMood]);

        const base = this.getBaseImpacts(experience);
        const variance = 0.95 + Math.random() * 0.1;
        const raw = base * progressionFactor * damping * profile.impactRatio * variance;

        const expCeil = experience === 'Advanced' ? 55 : experience === 'Intermediate' ? 35 : 20;
        const hardCeil = Math.round(expCeil * profile.impactRatio);

        const clamped = Math.min(hardCeil, Math.max(5, raw));
        const count = Math.max(5, Math.round(clamped / 5) * 5);

        return {
            roundNumber: round,
            implement: profile.name,
            impactCount: count,
            zone,
            style,
        };
    }
}