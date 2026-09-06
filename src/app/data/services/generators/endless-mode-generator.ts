import { Service } from '@angular/core';
import { BaseModeGenerator } from './base-mode-generator';
import { SessionConfig, SessionMood, TaskCard } from '../../interfaces/session.interface';
import { UserExperience } from '../../interfaces/user-experience.interface';
import { CadenceMath } from './cadence-math';

@Service()
export class EndlessModeGenerator extends BaseModeGenerator {
    generate(
        config: SessionConfig,
        experience: UserExperience,
        round: number,
        feedback: number
    ): TaskCard {
        const waveProgress = CadenceMath.endlessWave(round, 4);

        const damping = CadenceMath.feedbackDamping(feedback);

        const targetIntensity = Math.min(5.0, Math.max(1.0, (waveProgress * 2.8) * (damping * 0.9)));
        const implementProfile = this.selectWeightedImplement(config.activeImplements, targetIntensity);

        let effectiveMood: SessionMood = config.mood;
        if (config.mood === 'progressive') {
            effectiveMood = waveProgress < 0.95 ? 'gentle' : 'strict';
        }

        const style = this.pickRandom(this.stylesByMood[effectiveMood]);
        const zone = this.pickRandom(this.zonesByMood[effectiveMood]);

        const base = this.getBaseImpacts(experience);
        const naturalNoise = 0.95 + Math.random() * 0.1;

        const calculated = base * waveProgress * damping * implementProfile.impactRatio * naturalNoise;

        const expCeil = experience === 'Advanced' ? 55 : experience === 'Intermediate' ? 35 : 20;
        const hardCeil = Math.round(expCeil * implementProfile.impactRatio);

        const clamped = Math.min(hardCeil, Math.max(5, calculated));
        const count = Math.max(5, Math.round(clamped / 5) * 5);

        return {
            roundNumber: round,
            implement: implementProfile.name,
            impactCount: count,
            zone,
            style,
        };
    }
}