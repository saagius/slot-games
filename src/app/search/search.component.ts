import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { setSearch } from '../store/search/search.actions';

@Component({
	selector: 'app-search',
	template: `
        <div class="search">
            <div class="search-wrapper">
                <input
                        type="text"
                        class="form-control"
                        id="searchQuery"
                        (input)="onSearchQueryInput($event)"
                        placeholder="Search for Game"
                />
            </div>
        </div>
	`,
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	private readonly searchSubject = new Subject<string | undefined>();

	constructor(private store: Store<AppState>) {
	}

	public ngOnInit(): void {
		this.searchSubject
			.pipe(
				debounceTime(500),
				distinctUntilChanged(),
				map((search) => {
					this.store.dispatch(setSearch({
						search: search || ''
					}));
				})
			)
			.subscribe(() => {
			});
	}

	public onSearchQueryInput(event: Event): void {
		const searchQuery = (event.target as HTMLInputElement).value;
		this.searchSubject.next(searchQuery?.trim());
	}
}
