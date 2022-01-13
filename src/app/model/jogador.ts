import { CartaDoJogo } from "./cartaDoJogo";
import { CartaInicio } from "./cartaInicio";
import { CartaObjetivo } from "./cartaObjetivo";

export interface Jogador{
    id: string;
    nome: string,
    listaDeCartas: CartaDoJogo[],
    listaDeObjetivos: CartaObjetivo[],
    pontos: number,
    coracaoPeq: number,
    coracaoGra: number,
    bonusCoracaoPeq: number,
    bonusCoracaoGra: number    
}