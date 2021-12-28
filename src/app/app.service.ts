import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { WebSocketConnector } from 'src/websocket/websocket-connector';
import { Sala } from './sala';
import { user } from './user';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  items: any[] = [];
  private webSocketConnector: WebSocketConnector | any;

  connect(id:string){
    this.webSocketConnector = new WebSocketConnector(
      'http://localhost:4200',
      '/'+ id,
      this.onMessage.bind(this)
    );
  }

  onMessage(message: any): void {
    this.items.push(message.body);
  }

  start(sala: Sala) {
    this.http.put<Sala>('http://localhost:4200/', sala)
      .subscribe(response => console.log(response));
  }

  disconnect(){
    this.webSocketConnector.disconnect();
    this.router.navigate([""]);
  }

  cadastro(user: user){
    return this.http.post('http://localhost:4200/cadastro', user)
  }

  login(email: any, nome: any){
    return this.http.post('http://localhost:4200/login', {email, nome})
  }

  loginAdm(senha: any){
    return this.http.post('http://localhost:4200/login/adm',senha)
  }

  cancelar(){
    this.router.navigate([""]);
  }

  constructor(private http:HttpClient, private router:Router) { }
}
