import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslationDict } from '../translations';
import { TranslationService } from '../services/translation.service';

@Pipe({
    name: 'translate',
    pure: false
})
export class TranslatePipe implements PipeTransform {
    private readonly translationService = inject(TranslationService);

    private readonly implementMap: Record<string, keyof TranslationDict> = {
        'Bare Hand': 'impBareHand',
        'Hairbrush': 'impHairbrush',
        'Wooden Paddle': 'impWoodenPaddle',
        'Leather Paddle': 'impLeatherPaddle',
        'Thin Switch': 'impThinSwitch',
        'Thick Switch': 'impThickSwitch',
        'Cane': 'impCane',
        'Riding Crop': 'impRidingCrop',
        'Ruler': 'impRuler',
        'Leather Belt': 'impLeatherBelt',
        'Flogger': 'impFlogger',
        'Tawse': 'impTawse',
        'Spatula': 'impSpatula',
    };

    transform(value: string): string {
        if (!value) return '';

        if (this.implementMap[value]) {
            return this.translationService.translate(this.implementMap[value]);
        }

        const translation = this.translationService.translate(value as keyof TranslationDict);
        if (translation !== value) {
            return translation;
        }

        return value;
    }
}
