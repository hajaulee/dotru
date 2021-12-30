import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'maxLength'})
export class MaxLengthPipe implements PipeTransform {
  transform(value: string, maxLength: number = 32): string {
    if (value.length > maxLength){
      return value.slice(0, maxLength).trim() + "...";
    }
    return value;
  }
}
