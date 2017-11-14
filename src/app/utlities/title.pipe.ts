import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'title' })
export class TitlePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }

    if (typeof value !== 'string') {
      throw new Error('Invalid pipe argument for TitlePipe');
    }

    return value.replace(/{/g, '<span class="highlight">')
      .replace(/}/g, '</span>');
  }
}
