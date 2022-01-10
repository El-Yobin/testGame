import {Component, Injector} from '@angular/core';
import {LocatorService} from "./components/game/services/locator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private injector: Injector) {
    LocatorService.injector = injector;
  }
}
