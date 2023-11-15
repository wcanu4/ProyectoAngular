import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthProveedor } from 'src/app/services/auth.proveedor';
import { ProveedorService } from 'src/app/services2/proveedor';
import { EditarProveedorComponent } from '../../proveedor/editar-proveedor/editar-proveedor.component';
import { CrearProveedorComponent } from '../../proveedor/crear-proveedor/crear-proveedor.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listado-proveedores',
  templateUrl: './listado-proveedores.component.html',
  styleUrls: ['./listado-proveedores.component.css']
})
export class ListadoProveedoresComponent {
  sortedColumn: string | null = null; // Columna actualmente ordenada
  sortDirection: number = 1; // 1 para ascendente, -1 para descendente

  proveedores: any[] = [];
  pageSize: number = 10; // Cantidad de registros por página
  currentPage: number = 0; // Página actual
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showConfirmationModal: boolean = false;
  storeToDelete: any = null; // Almacena el producto a eliminar
  showSuccessModal: boolean = false;
  searchText: string = ''; // Texto de búsqueda
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos
  
  constructor(private proveedorService: ProveedorService, private modalService: NgbModal) {}

ngOnInit(): void {
  this.proveedorService.getData().subscribe(data => {
    this.proveedores = data;
  });
}

  get visibleProveedores() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filtered.slice(startIndex, endIndex);
  }
  abrirModalNuevoProducto() {
    const modalRef = this.modalService.open(CrearProveedorComponent);
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
    this.proveedorService.getData().subscribe(data => {
      console.log('Esto es lo que retorna despues de insertar',data)
      this.proveedores = data;
    });
  }
  nextPage() {
    if (this.currentPage < this.proveedores.length / this.pageSize - 1) {
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
  
    this.proveedores.sort((a, b) => {
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
  showDeleteConfirmation(store: any) {
    this.storeToDelete = store;
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
    this.proveedorService.delete(this.storeToDelete.id).subscribe(
      () => {
        this.proveedores = this.proveedores.filter(u => u.id !== this.storeToDelete.id);
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
    this.storeToDelete = null;
  }

  closeSuccessAlert() {
    this.successMessage = null;
  }

  closeErrorAlert() {
    this.errorMessage = null;
  }

  
  editarProveedor(proveedor: any) {
    const id = proveedor.id;
    const modalRef = this.modalService.open(EditarProveedorComponent, {
      size: 'lg',
    });
    
    modalRef.componentInstance.proveedor = proveedor;
   
  }
  

  get filtered() {
    return this.proveedores.filter(proveedor =>
      proveedor.id.toString().includes(this.searchText.toLowerCase()) ||
      proveedor.nit.toString().includes(this.searchText.toLowerCase()) ||
      proveedor.dpi.toString().includes(this.searchText.toLowerCase()) ||
      proveedor.nombre.toString().includes(this.searchText.toLowerCase()) ||
      proveedor.direccion.toString().includes(this.searchText.toLowerCase()) ||
      proveedor.telefono.toString().includes(this.searchText.toLowerCase()) ||
      proveedor.telefono2.toString().includes(this.searchText.toLowerCase()) 
      

    // ****AQUI VAS AGREGANDO LAS COLUMNAS SI QUERES QUE BUSQUE MAS COLUMNAS */
    );
  }
  
}
