import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthBodega } from 'src/app/services/auth.bodega';

@Component({
  selector: 'app-crear-bodega',
  templateUrl: './crear-bodega.component.html',
  styleUrls: ['./crear-bodega.component.css']
})
export class CrearBodegaComponent {
  // Define las propiedades para controlar las alertas y mensajes
  showSuccessAlert = false;
  showErrorAlert = false;
  showValidationAlert = false; // Agrega esta línea
  validationMessage = ''; // Agrega esta línea
  successMessage = '';
  errorMessage = '';


  nuevoBodega: any = {
    departure: '', 
    coat:'', 
    amount:'', 
    available:'', 
    used:'', 
    harvest: '',
    date: ''
  };
  stores: any[] = [];

  constructor(private authService: AuthService,
  private authBodega: AuthBodega) {}

  ngOnInit(): void {
    this.getStores();
  }

  insertarBodega() {
    this.resetValidationAlert();
    this.closeSuccessAlert();
    this.closeErrorAlert();
    // Verifica si alguno de los campos está vacío
    if (
      !this.nuevoBodega.departure ||
      !this.nuevoBodega.coat || 
      !this.nuevoBodega.amount ||
      !this.nuevoBodega.available || 
      !this.nuevoBodega.used || 
      !this.nuevoBodega.harvest || 
      !this.nuevoBodega.date
      ) {                
      // Muestra una alerta de error y el mensaje correspondiente
      this.showValidationAlert = true;
      this.validationMessage = 'Por favor, completa todos los campos';
  
      return; // Detén la función si falta algún campo
    }
  
    this.authBodega.insertStore(this.nuevoBodega).subscribe(
      () => {
        // Muestra la alerta de éxito y el mensaje correspondiente
        this.showSuccessAlert = true;
        this.successMessage = 'Partida insertado con éxito';
  
        // Limpia el formulario
        this.nuevoBodega = {
          departure: '', 
          coat:'', 
          amount:'', 
          available:'', 
          used:'', 
          harvest: '',
          date: ''
        };
  
        // Actualiza la lista de usuarios después de la inserción
        this.getStores();
      },

      (error) => {
        // Muestra la alerta de error y el mensaje correspondiente
        this.showErrorAlert = true;
        this.errorMessage = 'Error al insertar el Partida';
  
        console.error('Error al insertar el Partida', error);
      }
    );
  }
  closeValidationAlert() {
    this.showValidationAlert = false;
  }
  closeSuccessAlert() {
    this.showSuccessAlert = false;
    this.successMessage = '';
  }
  closeErrorAlert() {
    this.showErrorAlert = false;
    this.errorMessage = '';
  }
  getStores() {
    this.authBodega.getStoreData().subscribe(data => {
      this.stores = data;
    });
  }
  resetValidationAlert() {
    this.showValidationAlert = false;
    this.validationMessage = '';
  }
}

