import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameJackpotComponent } from './game-jackpot.component';

describe('GameJackpotComponent', () => {
	let component: GameJackpotComponent;
	let fixture: ComponentFixture<GameJackpotComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GameJackpotComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(GameJackpotComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
