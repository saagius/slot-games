import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
	declarations: [CategoryComponent],
	imports: [
		CommonModule,
		RouterModule,
		MatIconModule,
		MatMenuModule
	],
	exports: [CategoryComponent]
})
export class CategoryModule {
}
