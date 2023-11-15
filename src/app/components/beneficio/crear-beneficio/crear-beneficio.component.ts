import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthBeneficio } from 'src/app/services/auth.beneficio';

@Component({
  selector: 'app-crear-beneficio',
  templateUrl: './crear-beneficio.component.html',
  styleUrls: ['./crear-beneficio.component.css']
})
export class CrearBeneficioComponent {
  // Define las propiedades para controlar las alertas y mensajes
  showSuccessAlert = false;
  showErrorAlert = false;
  showValidationAlert = false; // Agrega esta línea
  validationMessage = ''; // Agrega esta línea
  successMessage = '';
  errorMessage = '';


  nuevoBeneficio: any = {
    partida: '',
    quintales: '',
    despulpado: '',
    fermentacion: '',
    lavado: '',
    secado : '',
    pergamino: '',
    fecha_final : '',
    d1: '',
    d2: '',
    f1: '',
    f2: '',
    l1: '',
    l2: '',
    s1: '',
    s2: '',


  };

  beneficio: any[] = [];// verificar si aqui no es beneficios

  constructor(private authService: AuthService,private authBeneficio: AuthBeneficio) {}

  ngOnInit(): void {
    this.getStores();//Verificar si es Beneficio
  }

  insertarBeneficio() {
    this.resetValidationAlert();
    this.closeSuccessAlert();
    this.closeErrorAlert();
    // Verifica si alguno de los campos está vacío
    if (!this.nuevoBeneficio.quintales 

      ) {
      
      
      
      // Muestra una alerta de error y el mensaje correspondiente

      this.showValidationAlert = true;
      this.validationMessage = 'Por favor, Ingrese los Quintales Maduros';
  
      return; // Detén la función si falta algún campo
    }
  
    this.authBeneficio.insertBeneficio(this.nuevoBeneficio).subscribe(
      () => {
        // Muestra la alerta de éxito y el mensaje correspondiente
        this.showSuccessAlert = true;
        this.successMessage = 'Dato insertado con éxito';
  
        // Limpia el formulario
        this.nuevoBeneficio = {
          partida: '',
          quintales: '',
          despulpado: '',
          fermentacion: '',
          lavado: '',
          secado : '',
          pergamino: '',
          fecha_final : '',
          d1: '',
          d2: '',
          f1: '',
          f2: '',
          l1: '',
          l2: '',
          s1: '',
          s2: '',
        };
  
        // Actualiza la lista de usuarios después de la inserción
        this.getStores();//Verificar si es Beneficio
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
  

  getStores() {
    this.authBeneficio.getBeneficioData().subscribe(data => {
      this.beneficio = data;
    });
  }
  resetValidationAlert() {
    this.showValidationAlert = false;
    this.validationMessage = '';
  }
}

