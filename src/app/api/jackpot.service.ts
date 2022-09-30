import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jackpot } from '../jackpot/jackpot';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class JackpotService {
	private apiRoot = environment.apiRoot;

	constructor(private http: HttpClient) {
	}

	getJackpots(): Observable<Jackpot[]> {
		return this.http.get<Jackpot[]>(`${ this.apiRoot }/jackpots.php`);
	}
}
