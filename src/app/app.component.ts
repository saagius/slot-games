import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './store/app.state';
import {Game} from './game/game';
import {selectVisibleGames} from './store/game/game.selectors';
import {loadGames} from './store/game/game.actions';
import {loadJackpots} from './store/jackpot/jackpot.actions';

@Component({
  selector: 'app-root',
  template: `
    <app-category></app-category>
    <div class="games">
      <div class="games-wrapper">
        <app-game
          *ngFor="let game of $selectedGames | async; trackBy: trackById"
          [game]="game"
          class="game-wrapper"
        ></app-game>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  $selectedGames = this.store.select(selectVisibleGames);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadGames());
    this.store.dispatch(loadJackpots());
  }

  trackById(index: number, item: Game): string {
    return item.id;
  }
}
