import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import {ApiModule} from './api/api.module';
import {GameModule} from "./game/game.module";
import {gameReducer} from "./store/game/game.reducer";
import {GameEffects} from "./store/game/game.effects";
import {jackpotReducer} from "./store/jackpot/jackpot.reducer";
import {JackpotEffects} from "./store/jackpot/jackpot.effects";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GameModule,
    StoreModule.forRoot({
        game: gameReducer,
        jackpot: jackpotReducer
      },
      {}
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([GameEffects, JackpotEffects]),
    ApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
