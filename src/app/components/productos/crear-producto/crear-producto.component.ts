import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthProducto } from 'src/app/services/auth.producto';
import { ProductoService } from 'src/app/services/producto.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  
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
    private productoService: ProductoService,
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
    if (!this.nuevoProducto.code || !this.nuevoProducto.product || !this.nuevoProducto.presentation || !this.nuevoProducto.cost_price || !this.nuevoProducto.sale_price || !this.nuevoProducto.existence) {
      
      
      
      // Muestra una alerta de error y el mensaje correspondiente


      this.showValidationAlert = true;
      this.validationMessage = 'Por favor, completa todos los campos';
  
      return; // Detén la función si falta algún campo
    }
  
    this.authProducto.insertProduct(this.nuevoProducto).subscribe(
      () => {
        // Muestra la alerta de éxito y el mensaje correspondiente
        this.showSuccessAlert = true;
        this.successMessage = 'Usuario insertado con éxito';
  
        // Limpia el formulario
        this.nuevoProducto = {
          code: '', 
          product:'', 
          presentation:'', 
          cost_price:'', 
          sale_price:'', 
          existence: ''
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
    this.productoService.getData().subscribe(data => {
      console.log('Esto es lo que retorna despues de insertar',data)
      this.products = data;
    });
  }
  resetValidationAlert() {
    this.showValidationAlert = false;
    this.validationMessage = '';
  }
}
