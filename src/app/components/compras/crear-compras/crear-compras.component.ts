import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthProducto } from 'src/app/services/auth.producto';
import { ComprasService } from 'src/app/services/compras';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal
@Component({
  selector: 'app-crear-compras',
  templateUrl: './crear-compras.component.html',
  styleUrls: ['./crear-compras.component.css']
})
export class CrearComprasComponent {

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
    code: '', 
    product:'', 
    presentation:'', 
    cost_price:'', 
    sale_price:'', 
    existence: ''
  };

  products: any[] = [];

  constructor(
    private comprasService: ComprasService,
    public activeModal: NgbActiveModal,
    private authService: AuthService,private authProducto: AuthProducto) {}

  ngOnInit(): void {
    this.getProducts();
  }

  insertarProducto() {
    this.resetValidationAlert();
    this.closeSuccessAlert();
    this.closeErrorAlert();
    // Verifica si alguno de los campos está vacío
  
  
    this.comprasService.insertar(this.nuevoProducto).subscribe(
      () => {
        // Muestra la alerta de éxito y el mensaje correspondiente
        this.showSuccessAlert = true;
        this.successMessage = 'Usuario insertado con éxito';
  
        // Limpia el formulario
        this.nuevoProducto = {
          nombreProducto: '',
          cantidad_vendida: 0, // Establece el valor predeterminado según el tipo de dato
          precio_unitario: 0.0, // Establece el valor predeterminado según el tipo de dato
          total: 0.0, // Establece el valor predeterminado según el tipo de dato
          IDProveedor: 0, // Establece el valor predeterminado según el tipo de dato
          IDProducto: 0, // Establece el valor predeterminado según el tipo de dato
          fecha: new Date() //
        };
  
        // Actualiza la lista de usuarios después de la inserción
       

    // Activa el temporizador para cerrar el modal después de 2 segundos
    setTimeout(() => {
      this.activeModal.close('Guardado con éxito');
      this.getProducts();
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
  

  getProducts() {
    this.comprasService.getData().subscribe(data => {
      console.log('Esto es lo que retorna despues de insertar',data)
      this.products = data;
    });
  }
  resetValidationAlert() {
    this.showValidationAlert = false;
    this.validationMessage = '';
  }
}
