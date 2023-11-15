import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthCafe } from 'src/app/services/auth.cafe';


@Component({
  selector: 'app-crear-cafe',
  templateUrl: './crear-cafe.component.html',
  styleUrls: ['./crear-cafe.component.css']
})
export class CrearCafeComponent {
  // Define las propiedades para controlar las alertas y mensajes
  showSuccessAlert = false;
  showErrorAlert = false;
  showValidationAlert = false; // Agrega esta línea
  validationMessage = ''; // Agrega esta línea
  successMessage = '';
  errorMessage = '';


  nuevoCafe: any = {
    libra: '', 
    precio:'', 
    cosecha:'',    
  };

  cafe: any[] = [];

  constructor(private authService: AuthService,private authCafe: AuthCafe) {}

  ngOnInit(): void {
    this.getCafe();
  }

  insertarCafe() {
    this.resetValidationAlert();
    this.closeSuccessAlert();
    this.closeErrorAlert();
    // Verifica si alguno de los campos está vacío
    if (!this.nuevoCafe.libra || 
        !this.nuevoCafe.precio || 
        !this.nuevoCafe.cosecha ) {
      
      
      
      // Muestra una alerta de error y el mensaje correspondiente


      this.showValidationAlert = true;
      this.validationMessage = 'Por favor, completa todos los campos';
  
      return; // Detén la función si falta algún campo
    }
  
    this.authCafe.insertCafe(this.nuevoCafe).subscribe(
      () => {
        // Muestra la alerta de éxito y el mensaje correspondiente
        this.showSuccessAlert = true;
        this.successMessage = 'Usuario insertado con éxito';
  
        // Limpia el formulario
        this.nuevoCafe = {
          libra: '', 
          precio:'', 
          cosecha:'',  
        };
  
        // Actualiza la lista de usuarios después de la inserción
        this.getCafe();
      },
      (error) => {
        // Muestra la alerta de error y el mensaje correspondiente
        this.showErrorAlert = true;
        this.errorMessage = 'Error al insertar el producto';
  
        console.error('Error al insertar el producto', error);
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
  

  getCafe() {
    this.authCafe.getCafeData().subscribe(data => {
      this.cafe = data;
    });
  }

  resetValidationAlert() {
    this.showValidationAlert = false;
    this.validationMessage = '';
  }
}
