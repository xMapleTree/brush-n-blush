import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
    selector: 'app-svg-icon',
    imports: [],
    template: `
        <svg 
        [style.width]="sizeStyle()" 
        [style.height]="sizeStyle()"
        viewBox="0 0 24 24"
        class="svg-icon"
        aria-hidden="true">
        <use [attr.href]="iconPath()"></use>
        </svg>
    `,
    styleUrl: './svg-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
    readonly name = input.required<string>();
    readonly size = input<string | number>(24);

    readonly sizeStyle = computed(() => {
        const s = this.size();
        return typeof s === 'number' ? `${s}px` : s;
    });

    readonly iconPath = computed(() => `assets/svgs/${this.name()}.svg#${this.name()}`);
}