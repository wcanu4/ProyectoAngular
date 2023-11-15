import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthProducto } from 'src/app/services/auth.producto';
import { EditarComprasComponent } from '../editar-compras/editar-compras.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearComprasComponent } from '../crear-compras/crear-compras.component';
import { ComprasService } from 'src/app/services/compras';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {

  sortedColumn: string | null = null; // Columna actualmente ordenada
  sortDirection: number = 1; // 1 para ascendente, -1 para descendente

  compras: any[] = [];
  pageSize: number = 10; // Cantidad de registros por página
  currentPage: number = 0; // Página actual
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showConfirmationModal: boolean = false;
  productToDelete: any = null; // Almacena el producto a eliminar
  showSuccessModal: boolean = false;
  searchText: string = ''; // Texto de búsqueda

  constructor(private comprasService: ComprasService,
    private authProducto: AuthProducto,
     private modalService: NgbModal) {}


ngOnInit(): void {
  this.comprasService.getData().subscribe(data => {
    this.compras = data;
  });
}
  get visibleProducts() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filtered.slice(startIndex, endIndex);
  }

  abrirModalNuevoProducto() {
    const modalRef = this.modalService.open(CrearComprasComponent);
    // Puedes pasar datos al componente modal a través de inputs
    modalRef.componentInstance.datosPersonalizados = 'Datos para el modal';

    modalRef.result.then((result) => {
      // Manejar el resultado del modal si es necesario
      console.log(result);
      this.getProducts();
    }, (reason) => {
      // Manejar el cierre del modal si es necesario
      console.log(reason);
    });
  }
  getProducts() {
    this.comprasService.getData().subscribe(data => {
      console.log('Esto es lo que retorna despues de insertar',data)
      this.compras = data;
    });
  }
  nextPage() {
    if (this.currentPage < this.compras.length / this.pageSize - 1) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  sortTable(column: string) {
    if (this.sortedColumn === column) {
      this.sortDirection *= -1;
    } else {
      this.sortedColumn = column;
      this.sortDirection = 1;
    }
  
    this.compras.sort((a, b,) => {
      const valueA = column === 'id' ? a[column].toString() : a[column].toLowerCase();
      const valueB = column === 'id' ? b[column].toString() : b[column].toLowerCase();
      
  
      if (column === 'id') {
        // Si es la columna de ID, compara como números
        return (Number(valueA) - Number(valueB)) * this.sortDirection;
      } else {
        // Para otras columnas, compara como cadenas de texto en minúsculas
        return valueA.localeCompare(valueB) * this.sortDirection;
      }
    });
  }








  // Función para mostrar el modal de confirmación
  showDeleteConfirmation(product: any) {
    this.productToDelete = product;
    this.showConfirmationModal = true;
  }
  showSuccessMessage(message: string) {
    this.successMessage = message;

    // Cierra automáticamente el mensaje de éxito después de 3000 milisegundos (3 segundos)
    setTimeout(() => {
      this.closeSuccessAlert();
    }, 1000);
  }

  
  // Función para confirmar la eliminación
  confirmDelete() {
    this.comprasService.delete(this.productToDelete.id).subscribe(
      () => {
        this.compras = this.compras.filter(u => u.id !== this.productToDelete.id);
        this.showSuccessMessage('Usuario eliminado con éxito'); // Muestra el mensaje de éxito
        this.errorMessage = null; // Limpiar mensaje de error
        // Ocultar el modal de confirmación después de eliminar
        this.showConfirmationModal = false;
      },
      (error) => {
        console.error('Error al eliminar el usuario', error);
        this.errorMessage = 'Error al eliminar el usuario'; // Mostrar mensaje de error
        this.successMessage = null; // Limpiar mensaje de éxito
        // Ocultar el modal en caso de error
        this.showConfirmationModal = false;
      }
    );
  }
  

  // Función para cancelar la eliminación
  cancelDelete() {
    this.closeDeleteConfirmation();
  }

  // Función para ocultar el modal de confirmación
  closeDeleteConfirmation() {
    this.showConfirmationModal = false;
    this.productToDelete = null;
  }

  closeSuccessAlert() {
    this.successMessage = null;
  }

  closeErrorAlert() {
    this.errorMessage = null;
  }

  editarProduct(product: any) {
    const id = product.id;
    const modalRef = this.modalService.open(EditarComprasComponent, {
      size: 'lg',
    });
    
    modalRef.componentInstance.producto = product;
   
  }
  get filtered() {
    return this.compras.filter(compra =>
      compra.id.toString().includes(this.searchText.toLowerCase()) ||
      compra.nombreProducto.toString().includes(this.searchText.toLowerCase()) ||
      compra.cantidad_vendida.toString().includes(this.searchText.toLowerCase()) ||
      compra.precio_unitario.toString().includes(this.searchText.toLowerCase()) ||
      compra.total.toString().includes(this.searchText.toLowerCase()) ||
      compra.IDProveedor.toString().includes(this.searchText.toLowerCase()) ||
      compra.IDProducto.toString().includes(this.searchText.toLowerCase()) ||
      compra.fecha.toString().includes(this.searchText.toLowerCase())
      // Agrega aquí más columnas si deseas que se realice la búsqueda en más campos
    );
  }
  
  
}
