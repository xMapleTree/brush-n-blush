export type SessionMode = 'oneshot' | 'rounds' | 'endless';
export type SessionMood = 'gentle' | 'progressive' | 'strict';
export type SessionPhase = 'setup' | 'active' | 'feedback' | 'summary';

export interface SessionConfig {
    mode: SessionMode;
    mood: SessionMood;
    totalRounds: number;
    activeImplements: string[];
}

export interface TaskCard {
    roundNumber: number;
    implement: string;
    impactCount: number;
    zone: string;
    style: string;
}

export interface SessionResult {
    completedRounds: number;
    totalImpacts: number;
    awardedXp: number;
    peakIntensity: number;
}