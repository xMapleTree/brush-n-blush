import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionConfig, SessionMood, TaskCard } from '../../../data/interfaces/session.interface';
import { UserExperience } from '../../../data/interfaces/user-experience.interface';
import { SessionGeneratorService } from '../../../data/services/session-generator.service';

declare const Chart: any;

interface MoodPoint {
    hits: number;
    implement: string;
    style: string;
}

@Component({
    selector: 'app-mood-comparison',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './mood-comparison.component.html',
    styleUrl: './mood-comparison.component.scss',
})
export class MoodComparisonComponent implements AfterViewInit, OnDestroy {
    @ViewChild('comparisonCanvas') comparisonCanvas!: ElementRef<HTMLCanvasElement>;

    private readonly generator = inject(SessionGeneratorService);

    mode: 'endless' | 'rounds' = 'endless';
    experience: UserExperience = 'Advanced';
    totalRounds = 24;

    gentleTotal = 0;
    progressiveTotal = 0;
    strictTotal = 0;

    private chartInstance: any = null;

    ngAfterViewInit(): void {
        this.loadChartJs().then(() => this.runComparison());
    }

    ngOnDestroy(): void {
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }
    }

    private lastExportData: Array<{
        round: number;
        wave: string;
        heatBefore: number;
        heatAfter: number;
        gentleHits: number;
        gentleImp: string;
        gentleStyle: string;
        progHits: number;
        progImp: string;
        progStyle: string;
        strictHits: number;
        strictImp: string;
        strictStyle: string;
    }> = [];

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

    runComparison(): void {
        const implementsList = ['Bare Hand', 'Hairbrush', 'Wooden Paddle', 'Leather Belt'];
        const labels: string[] = [];
        
        const gentlePoints: MoodPoint[] = [];
        const progressivePoints: MoodPoint[] = [];
        const strictPoints: MoodPoint[] = [];
        this.lastExportData = [];
    
        let heat = 4.5;
    
        for (let r = 1; r <= this.totalRounds; r++) {
            const waveNum = Math.floor((r - 1) / 4) + 1;
            const wavePos = ((r - 1) % 4) + 1;
            const waveStr = `W${waveNum}.${wavePos}`;
            labels.push(`R${r} (${waveStr})`);
    
            const getTask = (mood: SessionMood): TaskCard => {
                const config: SessionConfig = {
                    mode: this.mode,
                    mood,
                    totalRounds: this.totalRounds,
                    activeImplements: implementsList,
                };
                return this.generator.generateTask(config, this.experience, r, Math.round(heat));
            };
    
            const gTask = getTask('gentle');
            const pTask = getTask('progressive');
            const sTask = getTask('strict');
    
            gentlePoints.push({ hits: gTask.impactCount, implement: gTask.implement, style: gTask.style });
            progressivePoints.push({ hits: pTask.impactCount, implement: pTask.implement, style: pTask.style });
            strictPoints.push({ hits: sTask.impactCount, implement: sTask.implement, style: sTask.style });
    
            // Реакция на прогрессивный режим
            const heatBefore = Number(heat.toFixed(1));
            if (pTask.impactCount >= 30) heat = Math.min(9.5, heat + 1.8);
            else if (pTask.impactCount <= 15) heat = Math.max(2.0, heat - 2.2);
            else heat = Math.max(3.0, Math.min(8.5, heat + (Math.random() > 0.4 ? 0.6 : -0.8)));
            const heatAfter = Number(heat.toFixed(1));
    
            this.lastExportData.push({
                round: r,
                wave: waveStr,
                heatBefore,
                heatAfter,
                gentleHits: gTask.impactCount,
                gentleImp: gTask.implement,
                gentleStyle: gTask.style,
                progHits: pTask.impactCount,
                progImp: pTask.implement,
                progStyle: pTask.style,
                strictHits: sTask.impactCount,
                strictImp: sTask.implement,
                strictStyle: sTask.style,
            });
        }
    
        this.gentleTotal = gentlePoints.reduce((a, b) => a + b.hits, 0);
        this.progressiveTotal = progressivePoints.reduce((a, b) => a + b.hits, 0);
        this.strictTotal = strictPoints.reduce((a, b) => a + b.hits, 0);
    
        this.renderChart(labels, gentlePoints, progressivePoints, strictPoints);
    }

    exportToCsv(): void {
        if (!this.lastExportData || this.lastExportData.length === 0) return;
    
        const headers = [
            'Round',
            'Wave',
            'HeatBefore',
            'HeatAfter',
            'Gentle_Hits',
            'Gentle_Implement',
            'Gentle_Style',
            'Progressive_Hits',
            'Progressive_Implement',
            'Progressive_Style',
            'Strict_Hits',
            'Strict_Implement',
            'Strict_Style',
        ];
    
        const rows = this.lastExportData.map(row => [
            row.round,
            `"${row.wave}"`,
            row.heatBefore,
            row.heatAfter,
            row.gentleHits,
            `"${row.gentleImp}"`,
            `"${row.gentleStyle}"`,
            row.progHits,
            `"${row.progImp}"`,
            `"${row.progStyle}"`,
            row.strictHits,
            `"${row.strictImp}"`,
            `"${row.strictStyle}"`,
        ].join(','));
    
        const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `mood-comparison-${this.mode}-${this.experience.toLowerCase()}-${this.totalRounds}r.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    private renderChart(
        labels: string[],
        gentle: MoodPoint[],
        progressive: MoodPoint[],
        strict: MoodPoint[]
    ): void {
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }
        if (typeof Chart === 'undefined') return;

        const getPointColors = (points: MoodPoint[]) => points.map(p => this.getImplementColor(p.implement));

        this.chartInstance = new Chart(this.comparisonCanvas.nativeElement, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Gentle',
                        data: gentle.map(p => p.hits),
                        borderColor: '#10b981',
                        backgroundColor: '#10b98115',
                        pointBackgroundColor: getPointColors(gentle),
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 1.5,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        borderWidth: 2,
                        tension: 0.25,
                    },
                    {
                        label: 'Progressive',
                        data: progressive.map(p => p.hits),
                        borderColor: '#38bdf8',
                        backgroundColor: '#38bdf815',
                        pointBackgroundColor: getPointColors(progressive),
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 1.5,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        borderWidth: 2.5,
                        tension: 0.25,
                    },
                    {
                        label: 'Strict',
                        data: strict.map(p => p.hits),
                        borderColor: '#f43f5e',
                        backgroundColor: '#f43f5e15',
                        pointBackgroundColor: getPointColors(strict),
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 1.5,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        borderWidth: 2,
                        tension: 0.25,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#a1a1aa' },
                    },
                    y: {
                        min: 0,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#f4f4f5' },
                        title: { display: true, text: 'Количество ударов (Hits)', color: '#a1a1aa' },
                    },
                },
                plugins: {
                    legend: {
                        labels: { color: '#e4e4e7', font: { size: 12 } },
                    },
                    tooltip: {
                        backgroundColor: '#18181b',
                        titleColor: '#f43f5e',
                        bodyColor: '#ffffff',
                        borderColor: '#3f3f46',
                        borderWidth: 1,
                        padding: 10,
                        callbacks: {
                            label: (context: any) => {
                                const idx = context.dataIndex;
                                const dsIdx = context.datasetIndex;
                                const pt = dsIdx === 0 ? gentle[idx] : dsIdx === 1 ? progressive[idx] : strict[idx];
                                return ` ${context.dataset.label}: ${pt.hits} hits [${pt.implement}]`;
                            },
                        },
                    },
                },
            },
        });
    }

    private getImplementColor(imp: string): string {
        const lower = imp.toLowerCase();
        if (lower.includes('hand')) return '#10b981';
        if (lower.includes('brush')) return '#818cf8';
        if (lower.includes('paddle')) return '#fbbf24';
        return '#f43f5e';
    }
}