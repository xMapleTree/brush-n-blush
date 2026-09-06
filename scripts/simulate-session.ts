import { SessionConfig } from '../src/app/data/interfaces/session.interface';
import { UserExperience } from '../src/app/data/interfaces/user-experience.interface';
import { EndlessModeGenerator } from '../src/app/data/services/generators/endless-mode-generator';
import { OneshotModeGenerator } from '../src/app/data/services/generators/oneshot-mode-generator';
import { RoundsModeGenerator } from '../src/app/data/services/generators/rounds-mode-generator';

const oneshotGen = new OneshotModeGenerator();
const roundsGen = new RoundsModeGenerator();
const endlessGen = new EndlessModeGenerator();

function simulateEndless100(): void {
    const experience: UserExperience = 'Advanced';
    const config: SessionConfig = {
        mode: 'endless',
        mood: 'progressive',
        totalRounds: 100,
        activeImplements: ['Bare Hand', 'Hairbrush', 'Wooden Paddle', 'Leather Belt'],
    };

    console.log(`\n========================================================================================`);
    console.log(`ENDLESS SIMULATION: 100 ROUNDS (Continuous Model) | Mood: ${config.mood} | Exp: ${experience}`);
    console.log(`========================================================================================`);

    let currentSkinHeat = 4.0;
    const history: Array<{
        round: number;
        wave: number;
        wavePos: number;
        count: number;
        implement: string;
        heatBefore: number;
        heatAfter: number;
    }> = [];

    for (let r = 1; r <= 100; r++) {
        const wave = Math.floor((r - 1) / 4) + 1;
        const wavePos = ((r - 1) % 4) + 1;

        const task = endlessGen.generate(config, experience, r, Math.round(currentSkinHeat));

        const isHeavy = !task.implement.toLowerCase().includes('hand') && !task.implement.toLowerCase().includes('brush');
        let heatAfter = currentSkinHeat;

        if (isHeavy) {
            heatAfter = Math.min(10, currentSkinHeat + 1.2 + (task.impactCount / 12));
        } else if (task.impactCount >= 30) {
            heatAfter = Math.min(9.5, currentSkinHeat + 1.8);
        } else if (task.impactCount <= 15) {
            heatAfter = Math.max(2.0, currentSkinHeat - 2.2);
        } else {
            heatAfter = Math.max(3.0, Math.min(8.5, currentSkinHeat + (Math.random() > 0.4 ? 0.6 : -0.8)));
        }

        history.push({
            round: r,
            wave,
            wavePos,
            count: task.impactCount,
            implement: task.implement,
            heatBefore: Number(currentSkinHeat.toFixed(1)),
            heatAfter: Number(heatAfter.toFixed(1)),
        });

        currentSkinHeat = heatAfter;
    }

    const maxVal = Math.max(...history.map(h => h.count), 45);

    history.forEach(h => {
        const barLen = Math.round((h.count / maxVal) * 22);
        const bar = '█'.repeat(barLen) + '░'.repeat(Math.max(0, 22 - barLen));
        const rStr = String(h.round).padStart(3, ' ');
        const waveStr = `W${String(h.wave).padStart(2, ' ')}.${h.wavePos}`;
        const cntStr = `${h.count} hits`.padStart(7, ' ');
        const heatStr = `Heat:${h.heatBefore} -> ${h.heatAfter}`.padEnd(17, ' ');
        const impStr = `[${h.implement}]`.padEnd(16, ' ');

        const isEndOfWave = h.wavePos === 4;
        console.log(`R${rStr} (${waveStr}) | ${cntStr} | ${heatStr} | ${impStr} | ${bar}`);
        if (isEndOfWave) {
            console.log(`   -------------------------------------------------------------------------------------`);
        }
    });

    const total = history.reduce((sum, h) => sum + h.count, 0);
    const avg = Math.round(total / 100);

    const implementStats: Record<string, number> = {};
    history.forEach(h => {
        implementStats[h.implement] = (implementStats[h.implement] || 0) + 1;
    });

    console.log(`\n=== 100 ROUNDS SUMMARY ===`);
    console.log(`Total Impacts: ${total} | Average per Round: ${avg}`);
    console.log(`Implement distribution:`, implementStats);
    console.log(`========================================================================================\n`);
}

simulateEndless100();