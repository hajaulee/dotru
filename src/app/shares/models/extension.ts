import {ExtensionInfo} from "./extension-info";

export interface Extension extends ExtensionInfo{
  fromCode: boolean,
  sourceCode: string,
}
