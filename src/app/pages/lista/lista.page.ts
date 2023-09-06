import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Tarefa } from 'src/app/model/tarefa.model';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-lista',
  templateUrl: 'lista.page.html',
  styleUrls: ['lista.page.scss'],
})
export class ListaPage {
  tarefas: Tarefa[] = [

  ];

  constructor(private alertController: AlertController, private toastController: ToastController) {

    this.carregarDados();
  }
  carregarDados() {
    const dados = localStorage.getItem('TarefasDB');

    if (dados) {
      this.tarefas = JSON.parse(dados);
    }
  }

  async criarNovaTarefa() {
    const alert = await this.alertController.create({
      header: 'Nova Tarefa',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Nome da Tarefa',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Criação de tarefa cancelada');
          },
        },
        {
          text: 'Adicionar',
          handler: (form) => {
            this.atualizarDados(form);
            
          },
        },
      ],
    });
  
    await alert.present();
  }

  atualizarDados(form: any){
    const descricao = form.task.trim();
    if (descricao !== '') {
      let obj = { id: this.getId(this.tarefas), descricao: descricao, status: false };
      this.tarefas.push(obj);
      console.log('id' + obj.id);
      this.mostrarNotificacao('Tarefa foi adicionada com sucesso');
    } else {
      this.mostrarNotificacao('A descrição da tarefa não pode estar vazia');
    }

    localStorage.setItem('TarefasDB', JSON.stringify(this.tarefas));
  }
  

  // async criarNovaTarefa() {
  //   const alert = await this.alertController.create({
  //     header: 'Nova Tarefa',
  //     inputs: [
  //       {
  //         name: 'task',
  //         type: 'text',
  //         placeholder: 'Nome da Tarefa',
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         handler: () => { console.log('Criação de tarefa cancelada'); },
  //       },
  //       {
  //         text: 'Adicionar',
  //         handler: (form) => {

  //           const id = this.tarefas.length + 1;
  //           const descricao = form.task.trim();
  
  //           if (descricao !== '') {
  //             const obj = { id, descricao, status: false };
  //             this.tarefas.push(obj);
              
              
  
  //             console.log('ID: ' + obj.id);
  //           } else {
              
  //             console.log('A descrição da tarefa não pode estar vazia');
  //             this.mostrarNotificacao('Adicione um nome para a tarefa ;D')
  //           }
  //         },
  //       },
  //     ],
  //   });
  
  //   await alert.present();
  // }
  

  async editarItem(tarefa: Tarefa) {
    const alert = await this.alertController.create({
      header: 'Editar Tarefa',
      inputs: [
        {
          name: 'newName',
          type: 'text',
          placeholder: 'Novo Nome',
          value: tarefa.descricao,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: (data) => {
            tarefa.descricao = data.newName;
            localStorage.setItem('TarefasDB', JSON.stringify(this.tarefas));
          },
        },
      ],
    });
  
    await alert.present();
  }
  

  async apagarItem(tarefa: Tarefa) {
    const alert = await this.alertController.create({
      header: 'Excluir Tarefa',
      message: `Tem certeza de que deseja excluir a tarefa "${tarefa.descricao}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          handler: () => {
            const excluir = this.tarefas.indexOf(tarefa);
            if (excluir !== -1) {
              this.tarefas.splice(excluir, 1);
              this.mostrarNotificacao('Tarefa excluída com sucesso');
              localStorage.removeItem('TarefasDB');
            }
          },
        },
      ],
    });
  
    await alert.present();
  }
  

  
  

  // async apagarItem(tarefa: Tarefa) {
  //   const alert = await this.alertController.create({
  //     header: 'Excluir Tarefa',
  //     message: `Tem certeza de que deseja excluir a tarefa "${tarefa.descricao}"?`,
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //       },
  //       {
  //         text: 'Excluir',
  //         handler: () => {
  //           const excluir = this.tarefas.indexOf(tarefa);
  //           if (excluir !== -1) {
  //             this.tarefas.splice(excluir, 1);
  //           }
  //         },
  //       },
  //     ],
  //   });
  
  //   await alert.present();
  // }

  // apagarItem(id: number){
  //   let index = this.tarefas.findIndex((tarefa) => {tarefa.id == id});

  //   this.tarefas.splice(index, 1)
  // }

  async mostrarNotificacao(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000, 
      position: 'bottom',
    });
  
    toast.present();
  }
  
  check(tarefa: Tarefa) {
    tarefa.status = !tarefa.status;
  }

  getId(dados: Tarefa[]): number {
    let tamanho:number = (dados.length) + 1;

    return tamanho;
  }
  
}