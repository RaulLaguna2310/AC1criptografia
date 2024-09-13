import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js'

@Component({
  selector: 'app-tela-descript',
  templateUrl: './tela-descript.page.html',
  styleUrls: ['./tela-descript.page.scss'],
})
export class TelaDescriptPage implements OnInit {

  encryptedNome:any;
  encryptedEmail:any;
  encryptedMenssagem:any;
  secretKey: string = ""
  
  descryptedNome: string = "";
  descryptedEmail: string = "";
  descryptedMenssagem: string = "";

  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params =>{
      this.encryptedNome = this.urlSafeDecode(params['encryptedNome']);
      this.encryptedEmail = this.urlSafeDecode(params['encryptedEmail']);
      this.encryptedMenssagem = this.urlSafeDecode(params['encryptedMenssagem'])
    });
  }

  private urlSafeDecode(value: string): string {
    return value.replace(/_/g, '/').replace(/-/g, '+').replace(/\./g, '=');
  }

  descrypt(){
    if(this.encryptedNome && this.encryptedEmail && this.encryptedMenssagem && this.secretKey){
      const bytesNome = CryptoJS.AES.decrypt(this.encryptedNome, this.secretKey);
      const nomeDesc = bytesNome.toString(CryptoJS.enc.Utf8);
      this.descryptedNome = nomeDesc;

      const bytesEmail = CryptoJS.AES.decrypt(this.encryptedEmail, this.secretKey);
      const emailDesc = bytesEmail.toString(CryptoJS.enc.Utf8);
      this.descryptedEmail = emailDesc;

      const bytesMenssagem = CryptoJS.AES.decrypt(this.encryptedMenssagem, this.secretKey);
      const menssagemDesc = bytesMenssagem.toString(CryptoJS.enc.Utf8);
      this.descryptedMenssagem = menssagemDesc
    }
  }
}
