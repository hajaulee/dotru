import {Pipe, PipeTransform} from "@angular/core";
import {formatDate} from "@angular/common";
import {dateFormat} from "../constants";

function dateIn0h(date: Date |number): number{
  date = new Date(date);
  return new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`).getTime();
}

@Pipe({name: "relativeDate"})
export class RelativeDatePipe implements PipeTransform {

  transform(value: number | Date | undefined, ...args: any[]): any {
    if (!value){
      return "Unknown";
    }
    const now = dateIn0h(new Date());
    const diff = now - dateIn0h(value);
    const millisecondInDay = 24 * 3600 * 1000;
    if (diff < millisecondInDay) {
      return "TODAY";
    } else if (diff < 2 * millisecondInDay) {
      return "YESTERDAY";
    } else if (diff < 7 * millisecondInDay) {
      return `${Math.floor(diff / millisecondInDay)} DAYS AGO`;
    } else {
      return formatDate(value, dateFormat, 'en-us');
    }
  }

}
