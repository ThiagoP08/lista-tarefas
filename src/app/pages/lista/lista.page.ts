import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Tarefa } from 'src/app/model/tarefa.model';


@Component({
  selector: 'app-lista',
  templateUrl: 'lista.page.html',
  styleUrls: ['lista.page.scss'],
})
export class ListaPage {
  tarefas: Tarefa[] = [

  ];

  constructor(private alertController: AlertController) { }

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
          handler: () => {console.log('Criação de tarefa cancelada');},
        },
        {
          text: 'Adicionar',
          handler: (form) => {
            let obj = {descricao: form.task, status: false};
            this.tarefas.push(obj);
          }
        }
      ]
    });
  
    await alert.present();
  }

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
          cssClass: 'secondary',
        },
        {
          text: 'Salvar',
          handler: (data) => {
            tarefa.descricao = data.newName;
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  

  async comfirmarDelete(tarefa: Tarefa) {
    const alert = await this.alertController.create({
      header: 'Excluir Tarefa',
      message: `Tem certeza de que deseja excluir a tarefa "${tarefa.descricao}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Excluir',
          handler: () => {
            const index = this.tarefas.indexOf(tarefa);
            if (index !== -1) {
              this.tarefas.splice(index, 1);
            }
          },
        },
      ],
    });
  
    await alert.present();
  }
  
}