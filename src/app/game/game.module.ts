import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { LazyImgDirective } from '../directives/lazy.directive';

@NgModule({
	declarations: [
		GameComponent,
		LazyImgDirective
	],
	imports: [
		CommonModule
	],
	exports: [GameComponent]
})
export class GameModule {
}
