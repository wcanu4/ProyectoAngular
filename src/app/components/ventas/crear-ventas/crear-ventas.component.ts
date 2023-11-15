import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthProducto } from 'src/app/services/auth.producto';
import { VentasService } from 'src/app/services/ventas';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal

@Component({
  selector: 'app-crear-ventas',
  templateUrl: './crear-ventas.component.html',
  styleUrls: ['./crear-ventas.component.css']
})
export class CrearVentasComponent {

  // Define las propiedades para controlar las alertas y mensajes
  showSuccessAlert = false;
  showErrorAlert = false;
  showValidationAlert = false; // Agrega esta línea
  validationMessage = ''; // Agrega esta línea
  successMessage = '';
  errorMessage = '';



  // Agrega una propiedad para controlar la visibilidad del modal
  showModal = false;
  nuevoProducto: any = {
    nit: '', 
    nombre: '', 
    code: '', 
    product: '', 
    sale_price: '', 
    vender: '', 
    total: '', 
    fecha: ''
  };
  

  products: any[] = [];

  constructor(
    private ventasService: VentasService,
    public activeModal: NgbActiveModal,
    private authService: AuthService,private authProducto: AuthProducto) {
   
    }

  ngOnInit(): void {

  }

  insertarProducto() {
    this.resetValidationAlert();
    this.closeSuccessAlert();
    this.closeErrorAlert();
    // Verifica si alguno de los campos está vacío
  
  
    this.ventasService.insertar(this.nuevoProducto).subscribe(
      () => {
        // Muestra la alerta de éxito y el mensaje correspondiente
        this.showSuccessAlert = true;
        this.successMessage = 'Usuario insertado con éxito';
  
        // Limpia el formulario
   
  
        // Actualiza la lista de usuarios después de la inserción
       

    // Activa el temporizador para cerrar el modal después de 2 segundos
    setTimeout(() => {
      this.activeModal.close('Guardado con éxito');
  
    }, 2000);
      },
      (error) => {
        // Muestra la alerta de error y el mensaje correspondiente
        this.showErrorAlert = true;
        this.errorMessage = 'Error al insertar el producto';
  
        console.error('Error al insertar el producto', error);
      }
    );
  }

  cancelar() {
    // Cierra el modal sin guardar cambios
    this.activeModal.close('Cancelado');
  }

 // Función para abrir el modal
 abrirModalNuevoProducto() {
  this.showModal = true;
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
  


  resetValidationAlert() {
    this.showValidationAlert = false;
    this.validationMessage = '';
  }
}
