import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as game from '../game/init';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild("gamec", { read: ElementRef, static: true }) game: ElementRef; // gets #target1

  ngAfterViewInit(): void {
    // console.log(this.game.nativeElement);
    game.initGame(null);
  }

  title = 'covid-social-spacing-simulator';

}
