import { Component, Output, EventEmitter } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent {

    // Define las propiedades para controlar las alertas y mensajes
    showSuccessAlert = false;
    showErrorAlert = false;
    showValidationAlert = false; // Agrega esta línea
    validationMessage = ''; // Agrega esta línea
    successMessage = '';
    errorMessage = '';



  contenedorDB: any = {
    nit:'',
    nombre: '',
    telefono: '',
    correo: '',
    direccion: ''
  };
  cliente: any[] = [];
  
  constructor(  private clienteService: ClienteService, public activeModal: NgbActiveModal) {}

  insertar() {
    if (
      !this.contenedorDB.nit || 
      !this.contenedorDB.nombre || 
      !this.contenedorDB.telefono || 
      !this.contenedorDB.correo || 
      !this.contenedorDB.direccion) {

      return;
    }
    this.clienteService.insert(this.contenedorDB).subscribe(
      () => {
        setTimeout(() => {
          this.activeModal.close('Cliente insertado con éxito');
        }, 2000);
      },
      (error) => {


        console.error('Error al insertar el cliente', error);
      }
    );
  }


  cancelar() {
    this.activeModal.dismiss('cancelar');
  }
}


