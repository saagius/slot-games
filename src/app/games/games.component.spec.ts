import { TestBed } from '@angular/core/testing';
import { GamesComponent } from './games.component';

describe('GamesComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				GamesComponent
			]
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(GamesComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
