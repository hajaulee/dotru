import {formatDate} from "@angular/common";
import {dateFormat} from "../constants";

export function groupObjectByDate(objList: any[], keyFunc: (obj: any) => number | undefined): any[][] {
  const sortedList = objList.sort((a, b) => (keyFunc(a) ?? 0) - (keyFunc(b) ?? 0)).reverse();
  const byDateDic: { [k: string]: any[] } = sortedList.reduce((dic, obj) => {
    const date = formatDate(keyFunc(obj) ?? new Date(), dateFormat, 'en-us');
    dic[date] = dic[date] ?? [];
    dic[date].push(obj);
    return dic;
  }, {} as any);

  return Object.keys(byDateDic)
    .map(date => byDateDic[date])
    .sort((a, b) => (keyFunc(a[0]) ?? 0) - (keyFunc(b[0]) ?? 0))
    .reverse();
}
