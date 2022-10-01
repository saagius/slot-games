import { Component } from '@angular/core';

@Component({
	selector: 'app-header',
	template: `
        <div class="header">
	        <div class="logo">
            	<img src="../assets/logo.png" alt="White Casino" />
            </div>
	        <div class="title">White Casino</div>
        </div>
        <app-search></app-search>
	`,
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {}
