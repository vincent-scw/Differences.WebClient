import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'normalizeTitle' })
export class NormalizeTitlePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }

    if (typeof value !== 'string') {
      throw new Error('Invalid pipe argument for TitlePipe');
    }

    return value.replace(/{/g, '')
      .replace(/}/g, '')
      .replace(/ /g, '_');
  }
}
