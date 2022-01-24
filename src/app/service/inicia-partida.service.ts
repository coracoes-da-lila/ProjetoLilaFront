import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sala } from '../model/sala';



@Injectable({
  providedIn: 'root'
})
export class IniciaPartidaService {
 
  constructor(private http:HttpClient) { }

  getQuantidadeJogadores(hash : string): Observable<number>{
    return this.http.get<number>(
      `${environment.API_URL}sala/numeroJogadores/`+
      hash
    );
    
  }

  iniciaPartida(sala: Sala): Observable<Sala> {
    return this.http.post<Sala>(
      `${environment.API_URL}jogada/iniciarPartida`,
      sala
    );
  }
  

  
}
