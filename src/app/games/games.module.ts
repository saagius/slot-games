import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { GameModule } from '../game/game.module';

@NgModule({
	declarations: [GamesComponent],
	imports: [
		CommonModule,
		GameModule
	],
	exports: [GamesComponent]
})
export class GamesModule {
}
