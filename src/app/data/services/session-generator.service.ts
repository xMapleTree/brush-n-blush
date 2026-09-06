import { inject, Service } from "@angular/core";
import { EndlessModeGenerator } from "./generators/endless-mode-generator";
import { OneshotModeGenerator } from "./generators/oneshot-mode-generator";
import { RoundsModeGenerator } from "./generators/rounds-mode-generator";
import { SessionConfig, TaskCard } from "../interfaces/session.interface";
import { UserExperience } from "../interfaces/user-experience.interface";

@Service()
export class SessionGeneratorService {
    private readonly oneshotGen = inject(OneshotModeGenerator);
    private readonly roundsGen = inject(RoundsModeGenerator);
    private readonly endlessGen = inject(EndlessModeGenerator);

    generateTask(
        config: SessionConfig,
        experience: UserExperience,
        currentRound: number,
        lastIntensityFeedback: number = 5
    ): TaskCard {
        switch (config.mode) {
            case 'oneshot':
                return this.oneshotGen.generate(config, experience);
            case 'rounds':
                return this.roundsGen.generate(config, experience, currentRound, lastIntensityFeedback);
            case 'endless':
                return this.endlessGen.generate(config, experience, currentRound, lastIntensityFeedback);
            default:
                return this.roundsGen.generate(config, experience, currentRound, lastIntensityFeedback);
        }
    }
}