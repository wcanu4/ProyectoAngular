import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductoService } from 'src/app/services2/producto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal


@Component({
  selector: 'app-crear-productos-compra',
  templateUrl: './crear-productos-compra.component.html',
  styleUrls: ['./crear-productos-compra.component.css']
})
export class CrearProductosCompraComponent {
  // Define las propiedades para controlar las alertas y mensajes
  showSuccessAlert = false;
  showErrorAlert = false;
  showValidationAlert = false; // Agrega esta línea
  validationMessage = ''; // Agrega esta línea
  successMessage = '';
  errorMessage = '';

  nuevoProveedor: any = {
    nombreProveedor: '', 
    telefono: '', 
    email: '', 
    direccion: '', 
    ciudad: ''
  };
  

  proveedor: any[] = [];

  constructor(private authService: AuthService,
    public activeModal: NgbActiveModal,
    private productoService: ProductoService) {}

  ngOnInit(): void {

  }

  insertarProveedor() {
    this.resetValidationAlert();
    this.closeSuccessAlert();
    this.closeErrorAlert();
    // Verifica si alguno de los campos está vacío

  
    this.productoService.insert(this.nuevoProveedor).subscribe(
      () => {
        // Muestra la alerta de éxito y el mensaje correspondiente
        this.showSuccessAlert = true;
        this.successMessage = 'Usuario insertado con éxito';
  
  
  
        // Actualiza la lista de usuarios después de la inserción

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
