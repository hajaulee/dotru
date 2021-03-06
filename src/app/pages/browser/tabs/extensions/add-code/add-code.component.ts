import {Component, Inject, OnInit} from '@angular/core';
import {COMPONENT_DATA} from "../../../../../app.component";
import {ScreenTransmission} from "../../../../../shares/injectable/screen-transmission";
import {Extension} from "../../../../../shares/models/extension";
import {
  loadAllExtensions,
  loadFromCodeExtensions,
  saveFromCodeExtensions
} from "../../../../../shares/storages/extensions";
import hljs from 'highlight.js';
import {CodeJarContainer} from "ngx-codejar";

export interface AddCodeComponentDate {
  code: string;
}

@Component({
  selector: 'app-add-code',
  templateUrl: './add-code.component.html',
  styleUrls: ['./add-code.component.scss']
})
export class AddCodeComponent implements OnInit {

  code: string = "";

  constructor(
    @Inject(COMPONENT_DATA)
    public componentData: AddCodeComponentDate,
    private screenTransmission: ScreenTransmission) {
  }

  ngOnInit(): void {
    this.code = this.componentData.code;
  }

  highlightMethod(editor: CodeJarContainer) {
    if (editor.textContent !== null && editor.textContent !== undefined) {
      editor.innerHTML = hljs.highlight(editor.textContent, {
        language: 'javascript'
      }).value;
    }
  }

  loadCode(): boolean {
    try {
      const Func = eval("(" + this.code + ")");
      const parser = new Func();
      const extToSave: Extension = {
        fromCode: true,
        name: parser.name,
        lang: parser.lang,
        thumbnail: parser.thumbnail,
        version: parser.version,
        sourceCode: this.code
      };
      let fromCodeExts: Extension[] = loadFromCodeExtensions();
      const otherExts = loadAllExtensions().filter(ext => !ext.fromCode);
      if (otherExts.every(savedExt => savedExt.name !== extToSave.name)) {
        fromCodeExts = fromCodeExts.filter(ext => ext.name !== extToSave.name);
        fromCodeExts.push(extToSave);
        saveFromCodeExtensions(fromCodeExts);
        alert("Load code successful");
        return true;
      } else {
        alert("Same name extension already installed.");
      }
    } catch (e) {
      alert("Load code fail\n" + e);
      console.log(e);
    }
    return false;
  }

  loadAndExit() {
    if (this.loadCode()) {
      this.back()
    }
  }

  back() {
    this.screenTransmission.back();
  }

}
