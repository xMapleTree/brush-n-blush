import { UserExperience } from "./user-experience.interface";

export interface UserPreference {
    experience: UserExperience;
    implements: string[];
    isConfigured: boolean;
    useAiGenerator: boolean;
    deepSeekApiKey: string;
}