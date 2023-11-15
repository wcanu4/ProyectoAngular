
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProveedorService } from 'src/app/services2/proveedor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.css']
})
export class CrearProveedorComponent {
  // Define las propiedades para controlar las alertas y mensajes
  showSuccessAlert = false;
  showErrorAlert = false;
  showValidationAlert = false; // Agrega esta línea
  validationMessage = ''; // Agrega esta línea
  successMessage = '';
  errorMessage = '';

    //Campos que solicitar al usuario
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
    private proveedorService: ProveedorService) {}

  ngOnInit(): void {

  }

  insertarProveedor() {
    this.resetValidationAlert();
    this.closeSuccessAlert();
    this.closeErrorAlert();
    // Verifica si alguno de los campos está vacío

  
    this.proveedorService.insert(this.nuevoProveedor).subscribe(
      () => {
        // Muestra la alerta de éxito y el mensaje correspondiente
        this.showSuccessAlert = true;
        this.successMessage = 'Usuario insertado con éxito';
  
        // Limpia el formulario
        this.nuevoProveedor = {
          nit: '', 
          dpi:'', 
          nombre:'', 
          direccion:'', 
          telefono:'', 
          telefono2: ''
        };
  
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



