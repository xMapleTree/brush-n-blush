import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SessionConfig, TaskCard } from '../interfaces/session.interface';
import { UserExperience } from '../interfaces/user-experience.interface';

interface DeepSeekResponse {
    choices: Array<{
        message: {
            content: string;
        };
    }>;
}

@Service()
export class DeepSeekService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'https://api.deepseek.com/chat/completions';
    
    private readonly apiKey = 'YOUR_DEEPSEEK_API_KEY';

    async generateAiTask(
        config: SessionConfig,
        experience: UserExperience,
        currentRound: number,
        feedback: number
    ): Promise<TaskCard | null> {
        const systemPrompt = `
            You are an impact session assistant for a guided mobile app.
            Generate a single task card strictly as valid JSON without markdown code blocks.
            Structure:
            {
            "implement": string (must be chosen only from available list),
            "impactCount": number (must be a multiple of 5),
            "zone": string (short physical placement),
            "style": string (tempo, cadence, or dynamic style)
            }
        `;

        const userPrompt = `
            Context:
            - User Experience: ${experience}
            - Session Mood: ${config.mood}
            - Current Round: ${currentRound} of ${config.totalRounds}
            - Last Intensity Feedback (1-10 scale): ${feedback}
            - Available Implements: ${config.activeImplements.join(', ')}

            Generate the next task.
        `;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
        });

        const body = {
            model: 'deepseek-chat',
            messages: [
                { role: 'system', content: systemPrompt.trim() },
                { role: 'user', content: userPrompt.trim() },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7,
            max_tokens: 150,
        };

        try {
            const res = await firstValueFrom(
                this.http.post<DeepSeekResponse>(this.apiUrl, body, { headers })
            );
            const parsed = JSON.parse(res.choices[0].message.content);

            return {
                roundNumber: currentRound,
                implement: parsed.implement,
                impactCount: parsed.impactCount,
                zone: parsed.zone,
                style: parsed.style,
            };
        } catch {
            return null;
        }
    }
}
