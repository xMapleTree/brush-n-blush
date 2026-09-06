import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { SessionMood, SessionConfig, TaskCard } from '../../../data/interfaces/session.interface';
import { UserExperience } from '../../../data/interfaces/user-experience.interface';
import { SessionGeneratorService } from '../../../data/services/session-generator.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CadenceMath } from '../../../data/services/generators/cadence-math';

declare const Chart: any;

@Component({
    imports: [CommonModule, FormsModule],
    selector: 'app-debug-page',
    styleUrl: './debug-page.component.scss',
    templateUrl: './debug-page.component.html',
})
export class DebugPageComponent {
    @ViewChild('curvesCanvas') curvesCanvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('impactsCanvas') impactsCanvas!: ElementRef<HTMLCanvasElement>;

    private readonly generator = inject(SessionGeneratorService);

    mode: 'endless' | 'rounds' | 'oneshot' = 'endless';
    mood: SessionMood = 'progressive';
    experience: UserExperience = 'Advanced';
    totalRounds = 32;

    history: any[] = [];
    totalImpacts = 0;
    avgImpacts = 0;
    maxImpacts = 0;
    implementStats: Record<string, number> = {};

    private curvesChartInstance: any = null;
    private impactsChartInstance: any = null;

    ngAfterViewInit(): void {
        this.loadChartJs().then(() => {
            this.runSimulation();
        });
    }

    ngOnDestroy(): void {
        this.destroyCharts();
    }

    private loadChartJs(): Promise<void> {
        if (typeof Chart !== 'undefined') return Promise.resolve();

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => resolve();
            script.onerror = () => reject();
            document.head.appendChild(script);
        });
    }

    runSimulation(): void {
        const config: SessionConfig = {
            mode: this.mode,
            mood: this.mood,
            totalRounds: this.totalRounds,
            activeImplements: ['Bare Hand', 'Hairbrush', 'Wooden Paddle', 'Leather Belt'],
        };

        this.history = [];
        this.implementStats = {};
        let currentHeat = 4.5;

        const labels: string[] = [];
        const waveMultipliers: number[] = [];
        const feedbackDampings: number[] = [];
        const heatLevels: number[] = [];
        const actualHits: number[] = [];
        const backgroundColors: string[] = [];
        const borderColors: string[] = [];
        const tooltipsMeta: string[] = [];

        for (let r = 1; r <= this.totalRounds; r++) {
            const wave = Math.floor((r - 1) / 4) + 1;
            const wavePos = ((r - 1) % 4) + 1;

            // Расчет составляющих весов
            const waveMult = this.mode === 'endless' ? CadenceMath.endlessWave(r, 4) : CadenceMath.roundsProgression((r - 1) / (this.totalRounds - 1));
            const dampingMult = CadenceMath.feedbackDamping(currentHeat);

            const task: TaskCard = this.generator.generateTask(config, this.experience, r, Math.round(currentHeat));

            // Симуляция отклика кожи
            const isHeavy = !task.implement.toLowerCase().includes('hand') && !task.implement.toLowerCase().includes('brush');
            let heatAfter = currentHeat;

            if (isHeavy) {
                heatAfter = Math.min(10, currentHeat + 1.2 + task.impactCount / 12);
            } else if (task.impactCount >= 30) {
                heatAfter = Math.min(9.5, currentHeat + 1.8);
            } else if (task.impactCount <= 15) {
                heatAfter = Math.max(2.0, currentHeat - 2.2);
            } else {
                heatAfter = Math.max(3.0, Math.min(8.5, currentHeat + (Math.random() > 0.4 ? 0.6 : -0.8)));
            }

            labels.push(`R${r} (W${wave}.${wavePos})`);
            waveMultipliers.push(Number(waveMult.toFixed(2)));
            feedbackDampings.push(Number(dampingMult.toFixed(2)));
            heatLevels.push(Number(currentHeat.toFixed(1)));
            actualHits.push(task.impactCount);

            // Цветовая разметка девайсов
            const color = this.getImplementColor(task.implement);
            backgroundColors.push(color.bg);
            borderColors.push(color.border);
            tooltipsMeta.push(`${task.implement} (${task.style})`);

            this.implementStats[task.implement] = (this.implementStats[task.implement] || 0) + 1;
            this.history.push({ task, heatBefore: currentHeat, heatAfter });
            currentHeat = heatAfter;
        }

        this.totalImpacts = actualHits.reduce((sum, v) => sum + v, 0);
        this.avgImpacts = Math.round(this.totalImpacts / this.totalRounds);
        this.maxImpacts = Math.max(...actualHits, 20);

        this.renderCharts(labels, waveMultipliers, feedbackDampings, heatLevels, actualHits, backgroundColors, borderColors, tooltipsMeta);
    }

    private renderCharts(
        labels: string[],
        waveMultipliers: number[],
        feedbackDampings: number[],
        heatLevels: number[],
        actualHits: number[],
        bgColors: string[],
        borderColors: string[],
        tooltipsMeta: string[]
    ): void {
        this.destroyCharts();

        if (typeof Chart === 'undefined') return;

        // 1. График весов и кривых
        this.curvesChartInstance = new Chart(this.curvesCanvas.nativeElement, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Wave Multiplier (Синусоида/Прогрессия)',
                        data: waveMultipliers,
                        borderColor: '#38bdf8',
                        backgroundColor: '#38bdf81a',
                        borderWidth: 2,
                        tension: 0.3,
                        yAxisID: 'y',
                    },
                    {
                        label: 'Damping Multiplier (Сигмоида фидбека)',
                        data: feedbackDampings,
                        borderColor: '#f43f5e',
                        backgroundColor: '#f43f5e1a',
                        borderWidth: 2,
                        tension: 0.3,
                        yAxisID: 'y',
                    },
                    {
                        label: 'Skin Heat Level (1..10)',
                        data: heatLevels,
                        borderColor: '#fbbf24',
                        borderDash: [4, 4],
                        borderWidth: 1.5,
                        tension: 0.2,
                        yAxisID: 'y1',
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                scales: {
                    x: { grid: { color: '#27272a' }, ticks: { color: '#a1a1aa' } },
                    y: {
                        type: 'linear',
                        position: 'left',
                        min: 0,
                        max: 1.6,
                        grid: { color: '#27272a' },
                        ticks: { color: '#a1a1aa' },
                        title: { display: true, text: 'Множитель (x)', color: '#a1a1aa' },
                    },
                    y1: {
                        type: 'linear',
                        position: 'right',
                        min: 0,
                        max: 10,
                        grid: { drawOnChartArea: false },
                        ticks: { color: '#fbbf24' },
                        title: { display: true, text: 'Нагрев (1-10)', color: '#fbbf24' },
                    },
                },
                plugins: {
                    legend: { labels: { color: '#e4e4e7' } },
                },
            },
        });

        this.impactsChartInstance = new Chart(this.impactsCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Impacts (Удары)',
                        data: actualHits,
                        backgroundColor: bgColors,
                        borderColor: borderColors,
                        borderWidth: 1.5,
                        borderRadius: 4,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { color: '#27272a' }, ticks: { color: '#a1a1aa' } },
                    y: {
                        min: 0,
                        max: Math.max(50, this.maxImpacts + 5),
                        grid: { color: '#27272a' },
                        ticks: { color: '#a1a1aa' },
                        title: { display: true, text: 'Количество ударов', color: '#a1a1aa' },
                    },
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            afterLabel: (ctx: any) => `Девайс: ${tooltipsMeta[ctx.dataIndex]}`,
                        },
                    },
                },
            },
        });
    }

    private getImplementColor(imp: string): { bg: string; border: string } {
        const lower = imp.toLowerCase();
        if (lower.includes('hand')) return { bg: '#10b98188', border: '#10b981' };
        if (lower.includes('brush')) return { bg: '#6366f188', border: '#6366f1' };
        if (lower.includes('paddle')) return { bg: '#f59e0b88', border: '#f59e0b' };
        return { bg: '#ef444488', border: '#ef4444' };
    }

    private destroyCharts(): void {
        if (this.curvesChartInstance) {
            this.curvesChartInstance.destroy();
            this.curvesChartInstance = null;
        }
        if (this.impactsChartInstance) {
            this.impactsChartInstance.destroy();
            this.impactsChartInstance = null;
        }
    }
}
