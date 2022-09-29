import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from '../game/game';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiRoot = environment.apiRoot;

  constructor(private http: HttpClient) {
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiRoot}/games.php`);
  }
}
