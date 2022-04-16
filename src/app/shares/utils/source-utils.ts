import {Extension} from "../models/extension";
import {Source} from "../models/source";
import {BaseParser} from "../models/base-parser";
import {httpGetSync} from "./http-utils";


export function groupByKey<Type>(exts: Array<Type>, key: string): Array<Array<Type>> {
    const keyObjectsMap = exts.reduce((_map, it ) => {
      const _it = it as any;
      _map[_it[key]] = _map[_it[key]] || [];
      _map[_it[key]].push(_it);
      return _map;
    }, {} as {[k: string]: Array<Type>});
    return Object.keys(keyObjectsMap).map(k => keyObjectsMap[k]);
}

export function initSourceFromExtension(ext: Extension): Source {
  const Parser = eval("(" + ext.sourceCode + ")");
  const parser: BaseParser = new Parser();
  parser.httpGetSync = httpGetSync;
  return {
    ...ext,
    loadedManga: undefined,
    latestPageIndex: 1,
    searchPageIndex: 1,
    searchQuery: "",
    loadedSearchMangaList: [],
    loadedPopularMangaList: [],
    loadedLatestMangaList: [],
    popularPageIndex: 1,
    parser
  };
}
