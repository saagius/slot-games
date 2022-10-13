import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameComponent } from './game.component';
import { GameJackpotModule } from '../game-jackpot/game-jackpot.module';
import { GameRibbonModule } from '../game-ribbon/game-ribbon.module';
import { GameImageModule } from '../game-image/game-image.module';

@NgModule({
	declarations: [
		GameComponent
	],
	imports: [
		CommonModule,
		GameJackpotModule,
		GameRibbonModule,
		GameImageModule
	],
	exports: [GameComponent]
})
export class GameModule {
}
