import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRibbonComponent } from './game-ribbon.component';

describe('GameRibbonComponent', () => {
	let component: GameRibbonComponent;
	let fixture: ComponentFixture<GameRibbonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GameRibbonComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(GameRibbonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
