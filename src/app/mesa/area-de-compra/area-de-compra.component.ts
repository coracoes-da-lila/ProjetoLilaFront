import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaoJogadorComponent } from '../mao-jogador/mao-jogador.component';
import { Baralho } from '../../model/baralho';
import { CartaDoJogo } from '../../model/cartaDoJogo';
import { CartaObjetivo } from '../../model/cartaObjetivo';
import { Jogador } from '../../model/jogador';
import { Sala } from '../../model/sala';
import { AreaDeCompraService } from '../../service/area-de-compra.service';
import { MesaJogoService } from '../../service/mesa-jogo.service';
@Component({
  selector: 'app-area-de-compra',
  templateUrl: './area-de-compra.component.html',
  styleUrls: ['./area-de-compra.component.scss'],
})
export class AreaDeCompraComponent implements OnInit {
  private hash = '';
  public sala: Sala = {} as Sala;
  public baralho: Baralho = {} as Baralho;
  public listaCartas: Array<CartaDoJogo> = [];
  public listaCartasObjetivo: Array<CartaObjetivo> = [];
  public listaCartasDisponiveis: Array<CartaDoJogo> = [];
  public listaCartasDisponiveisObjetivo: Array<CartaObjetivo> = [];
  public listaCartasMao: Array<CartaDoJogo> = [];
  public listaCartasMaoObjetivo: Array<CartaObjetivo> = [];
  public coracoes: Array<any> = [];
  public jogador: Jogador = {} as Jogador;
  public bonus = false;

  constructor(
    private mesaJogoService: MesaJogoService,
    private maoJogador: MaoJogadorComponent,
    private route: ActivatedRoute,
    private areaCompraService: AreaDeCompraService
  ) {}

  ngOnInit() {
    this.hash = String(this.route.snapshot.paramMap.get('hash'));
    this.mesaJogoService.getemitSalaObservable().subscribe((sala) => {
      this.sala = sala;
      this.listaCartasDisponiveis = sala.baralho.cartasDoJogo;
      this.listaCartasDisponiveisObjetivo = sala.baralho.cartasObjetivo;
      this.jogador = this.mesaJogoService.getJogadorAtualNaMesa();
      this.bonus = this.podeJogar();
    });
  }

  public comprarCarta(indice: number): void {
    this.sala.dado = 0;
    if (this.jogador.status == 'JOGANDO'){
    if(this.listaCartasDisponiveis[indice].bonus){
      this.jogador?.cartasDoJogo.push(this.listaCartasDisponiveis[indice]);
      this.listaCartasDisponiveis.splice(indice, 1);
      this.areaCompraService.emitirCartaJogo.emit(this.jogador?.cartasDoJogo);
    }else{
      this.jogador?.cartasDoJogo.push(this.listaCartasDisponiveis[indice]);
      this.listaCartasDisponiveis.splice(indice, 1);
      this.areaCompraService.emitirCartaJogo.emit(this.jogador?.cartasDoJogo);
      this.mesaJogoService
        .comprarCartas(this.sala)
        .subscribe((sala) => (this.sala = sala));

    }
  }
  }

  public comprarCoracaoP() {
    if(this.jogador.status == 'JOGANDO'){
      this.sala.dado = 0;
      this.mesaJogoService
      .comprarCoracaoP(this.sala)
      .subscribe((sala) => (this.sala = sala));
    }

  }

  public comprarCoracaoG() {
    if(this.jogador.status == 'JOGANDO'){
      this.sala.dado = 0;
      this.mesaJogoService
      .comprarCoracaoG(this.sala)
      .subscribe((sala) => (this.sala = sala));
    }
  }



  public podeComprar({
    valorCorPequeno,
    valorCorGrande,
  }: Partial<CartaDoJogo>): boolean {
    let coracaoP = 0;
    let coracaoG = 0;
    this.mesaJogoService.getemitJogadorObservable().subscribe((jogador) => {
      coracaoP = this.jogador.coracaoPeq + this.jogador.bonusCoracaoPeq;
      coracaoG = this.jogador.coracaoGra + this.jogador.bonusCoracaoGra;
    });
    return valorCorPequeno! <= coracaoP && valorCorGrande! <= coracaoG;
  }

  public verificaBonus() {
    if (this.jogador?.cartasDoJogo.length > 0) {
      let ultimaCarta = (this.jogador?.cartasDoJogo.length - 1) as number;
      if (this.jogador?.cartasDoJogo[ultimaCarta].bonus) {
        return true;
      }
    }
    return false;
  }

  public podeJogar() {
    if (this.jogador.status == 'JOGANDO') {
      return true;
    }
    return false;
  }

  public bloquearCompraCoracaoPequeno(){
    if (this.jogador.status == 'JOGANDO' && this.verificarCoracoesQualquerTamanho() && this.desabilitarCoracoesPeq()) {
      return false;
    }
    return true;
  }
  public bloquearCompraCoracaoGrande(){
    if (this.jogador.status == 'JOGANDO' && this.verificarCoracoesQualquerTamanho()  && this.verificarCoracoesGra()) {
      return false;
    }
    return true;
  }

  public verificarCoracoesQualquerTamanho(): Boolean {
    if (
      this.jogador.coracaoGra +
        this.jogador.coracaoPeq +
        this.jogador.bonusCoracaoGra +
        this.jogador.bonusCoracaoPeq < 5){
      return true;
    }
    return false;
  }
  public desabilitarCoracoesPeq(): Boolean {
    return this.jogador.coracaoPeq + this.jogador.coracaoGra < 4;
  }

  public verificarCoracoesGra(): Boolean {
    return this.jogador.coracaoGra + this.jogador.coracaoPeq < 5;
  }
}
