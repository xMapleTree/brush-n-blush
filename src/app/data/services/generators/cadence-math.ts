export class CadenceMath {
    static feedbackDamping(feedback: number): number {
        const clampedFb = Math.min(10, Math.max(1, feedback));

        const k = 0.55;
        const mid = 5.5;
        const sigmoid = 1 / (1 + Math.exp(k * (clampedFb - mid)));
        
        return 0.25 + 1.1 * sigmoid;
    }

    static endlessWave(round: number, wavePeriod = 4): number {
        const phase = ((round - 1) % wavePeriod) / wavePeriod;

        const angle = phase * 2 * Math.PI - (Math.PI / 2);
        const rawSin = (Math.sin(angle) + 1) / 2;
        
        const minMultiplier = 0.65;
        const maxMultiplier = 1.25;
        return minMultiplier + rawSin * (maxMultiplier - minMultiplier);
    }

    static roundsProgression(progress: number, power = 1.4): number {
        const clampedP = Math.min(1, Math.max(0, progress));
        const minMultiplier = 0.7;
        const maxMultiplier = 1.35;
        
        const curve = Math.pow(clampedP, power);
        return minMultiplier + curve * (maxMultiplier - minMultiplier);
    }
}