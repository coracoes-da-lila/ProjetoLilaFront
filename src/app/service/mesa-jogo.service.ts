import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Jogador } from '../model/jogador';
import { Sala } from '../model/sala';
@Injectable({
  providedIn: 'root',
})
export class MesaJogoService {
  private emitSala$ = new BehaviorSubject<Sala>({} as Sala);
  private emitJogador$ = new BehaviorSubject<Jogador>({} as Jogador);

  constructor() {}

  getemitSalaObservable(): Observable<Sala> {
    return this.emitSala$.asObservable();
  }

  getemitSalaSubject() {
    return this.emitSala$;
  }

  getemitJogadorObservable(): Observable<Jogador> {
    return this.emitJogador$.asObservable();
  }

  getemitJogadorSubject() {
    return this.emitJogador$;
  }
}
