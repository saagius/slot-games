import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { selectCategories, selectSelectedCategory } from '../store/category/category.selectors';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-category',
	template: `
        <div class="categories">
            <ul>
                <li class="category" [class.selected]="categoryIsSelected(category)"
                    *ngFor="let category of $categories | async">
                    <a [routerLink]="['/games', category]" routerLinkActive="active">{{category}}</a>
                </li>
            </ul>
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
