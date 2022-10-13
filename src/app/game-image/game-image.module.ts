import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameImageComponent } from './game-image.component';
import { LazyImgDirective } from '../directives/lazy.directive';

@NgModule({
	declarations: [
		GameImageComponent,
		LazyImgDirective
	],
	imports: [
		CommonModule
	],
	exports: [GameImageComponent]
})
export class GameImageModule {
}
