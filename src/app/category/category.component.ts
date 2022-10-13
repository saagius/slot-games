import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from '../store/app.state';
import { selectCategories, selectSelectedCategory } from '../store/category/category.selectors';

@Component({
	selector: 'app-category',
	template: `
        <div class="categories">
            <ul class="categories-menu">
                <li class="category" [class.selected]="categoryIsSelected(category)"
                    *ngFor="let category of $categories | async">
                    <a [routerLink]="['/games', category]" routerLinkActive="active">{{category}}</a>
                </li>
            </ul>

	        <div class="mobile-categories-menu">
	            <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Game categories">
	                <mat-icon>more_vert</mat-icon>
	            </button>
	            <mat-menu #menu="matMenu">
	                <button mat-menu-item class="category" [class.selected]="categoryIsSelected(category)"
	                        *ngFor="let category of $categories | async">
	                    <a [routerLink]="['/games', category]" routerLinkActive="active">{{category}}</a>
	                </button>
	            </mat-menu>
            </div>
        </div>
	`,
	styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
	$categories = this.store.select(selectCategories);
	selectedCategory?: string;

	constructor(private store: Store<AppState>) {
	}

	ngOnInit(): void {
		this.store
			.pipe(
				map(state => selectSelectedCategory(state))
			)
			.subscribe((selectedCategory: string) => {
				this.selectedCategory = selectedCategory;
			});
	}

	categoryIsSelected(category: string): boolean {
		return this.selectedCategory === category;
	}
}
