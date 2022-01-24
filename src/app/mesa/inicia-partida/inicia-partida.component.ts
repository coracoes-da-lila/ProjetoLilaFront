import { Component, OnInit } from '@angular/core';
import { Jogador } from 'src/app/model/jogador';
import { Sala } from 'src/app/model/sala';
import { IniciaPartidaService } from 'src/app/service/inicia-partida.service';
import { MesaJogoService } from 'src/app/service/mesa-jogo.service';

@Component({
  selector: 'app-inicia-partida',
  templateUrl: './inicia-partida.component.html',
  styleUrls: ['./inicia-partida.component.scss'],
})
export class IniciaPartidaComponent implements OnInit {
  jogadores: number = 0;
  desabilitaBtn = true;
  sala: Sala;
  jogadorPrincipal: Jogador;
  hash = '';

  constructor(
    private iniciaPartidaService: IniciaPartidaService,
    private mesaJogoService: MesaJogoService
  ) {
    this.sala = {} as Sala;
    this.jogadorPrincipal = {} as Jogador;
  }

  verificaQuantidadeJogadores(hash: string) {
    this.iniciaPartidaService
      .getQuantidadeJogadores(hash)
      .subscribe((jogadores) => {
        this.jogadores = jogadores;
        if (this.jogadores >= 2) {
          this.desabilitaBtn = false;
        }
      });
  }

  enviaStatus(): void {
    //this.sala.status==jogando;
    this.iniciaPartidaService.iniciaPartida(this.sala);
  }

  ngOnInit(): void {
    
    this.mesaJogoService.getemitSalaObservable().subscribe((sala) => {
      this.sala = sala;
      this.hash = this.sala.hash;
      this.verificaQuantidadeJogadores(this.hash);
    });
    //TODO testar sem o mock
    // this.mesaJogoService.getemitJogadorObservable().subscribe(jogador => this.jogadorPrincipal = jogador);
    this.jogadorPrincipal = {
      nome: 'Lila',
      bonusCoracaoGra: 0,
      bonusCoracaoPeq: 0,
      coracaoGra: 0,
      coracaoPeq: 2,
      isHost: true,
      listaDeCartas: [],
      listaDeObjetivos: [],
      pontos: 0,
    };
  }
}
