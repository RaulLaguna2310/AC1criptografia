import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nome: string = ""
  email: string = ""
  menssagem: string = ""
  secretKey: string = ""
  encryptedNome: string = ""
  encryptedEmail: string = ""
  encryptedMenssagem: string = ""


  constructor(public router : Router) {}

  abrirTela(){
    this.router.navigateByUrl
    (`/tela-descript/${this.encryptedNome}/${this.encryptedEmail}/${this.encryptedMenssagem}`);
  }

  encrypt(){
    if(this.nome && this.email && this.menssagem && this.secretKey){
      const nomeCrypt = CryptoJS.AES.encrypt(this.nome, this.secretKey).toString();
      const emailCrypt = CryptoJS.AES.encrypt(this.email, this.secretKey).toString();
      const menssagemCrypt = CryptoJS.AES.encrypt(this.menssagem, this.secretKey).toString();
      this.encryptedNome = this.urlSafeEncode(nomeCrypt);
      this.encryptedEmail = this.urlSafeEncode(emailCrypt);
      this.encryptedMenssagem = this.urlSafeEncode(menssagemCrypt)
    }
  }

  private urlSafeEncode(value: string): string {
    return value.replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '.');
  }

}
