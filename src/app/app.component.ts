import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService,
    private translate: TranslateService) {

    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  minimizeApp(){

  }

  toggleSizeApp() {

  }

  closeApp() {
    if (this.electronService.isElectron()) {
      let dialog = this.electronService.remote.dialog;
      let options  = {
        title: "Advertencia",
        buttons: ["Si","Cancelar","NO"],
        message: "Esta por cerrar la apliación?"
       }
      if(!dialog.showMessageBox(options)){
        this.electronService.remote.getCurrentWindow().close();
      }
    }else{
      alert("Cerraste la apliación");
    }
  }
}
