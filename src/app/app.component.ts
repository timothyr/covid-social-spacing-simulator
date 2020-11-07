import { Component, OnInit } from '@angular/core';
import * as game from '../game/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    console.log(game);
  }
  title = 'covid-social-spacing-simulator';

}
