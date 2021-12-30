import {Pipe, PipeTransform} from "@angular/core";
import {getLangName} from "../utils/lang-utils";


@Pipe({name: 'langName'})
export class LangNamePipe implements PipeTransform {
  transform(value: string): string {
    return getLangName(value);
  }
}
