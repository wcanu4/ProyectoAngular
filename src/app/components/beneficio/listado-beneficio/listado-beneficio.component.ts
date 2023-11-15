import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthBeneficio } from 'src/app/services/auth.beneficio';
import { EditarBeneficioComponent } from '../../beneficio/editar-beneficio/editar-beneficio.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listado-beneficio',
  templateUrl: './listado-beneficio.component.html',
  styleUrls: ['./listado-beneficio.component.css']
})
export class ListadoBeneficioComponent {
  sortedColumn: string | null = null; // Columna actualmente ordenada
  sortDirection: number = 1; // 1 para ascendente, -1 para descendente

  stores: any[] = [];
  pageSize: number = 10; // Cantidad de registros por página
  currentPage: number = 0; // Página actual
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showConfirmationModal: boolean = false;
  beneficioToDelete: any = null; // Almacena el producto a eliminar
  showSuccessModal: boolean = false;
  searchText: string = ''; // Texto de búsqueda

  constructor(private authBeneficio: AuthBeneficio, private modalService: NgbModal) {}

ngOnInit(): void {
  this.authBeneficio.getBeneficioData().subscribe(data => {
    this.stores = data;
  });
}

  get visibleStores() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filtered.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.stores.length / this.pageSize - 1) {
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
  
    this.stores.sort((a, b) => {
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
  showDeleteConfirmation(beneficio: any) {
    this.beneficioToDelete = beneficio;
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
    this.authBeneficio.deleteBeneficio(this.beneficioToDelete.id).subscribe(
      () => {
        this.stores = this.stores.filter(u => u.id !== this.beneficioToDelete.id);
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
    this.beneficioToDelete = null;
  }

  closeSuccessAlert() {
    this.successMessage = null;
  }

  closeErrorAlert() {
    this.errorMessage = null;
  }

  editarStore(store: any) {
    const id = store.id;
    const modalRef = this.modalService.open(EditarBeneficioComponent, {
      size: 'lg',
    });
    
    modalRef.componentInstance.bodega = store;
   
  }

  get filtered() {
    return this.stores.filter(store =>
      store.id.toString().includes(this.searchText.toLowerCase()) ||
      store.quintales.toString().includes(this.searchText.toLowerCase()) ||
      store.despulpado.toString().includes(this.searchText.toLowerCase()) ||
      store.fermentacion.toString().includes(this.searchText.toLowerCase()) ||
      store.lavado.toString().includes(this.searchText.toLowerCase()) ||
      store.secado.toString().includes(this.searchText.toLowerCase()) ||
      store.pergamino.toString().includes(this.searchText.toLowerCase()) ||
      store.fecha_final.toString().includes(this.searchText.toLowerCase())

    // ****AQUI VAS AGREGANDO LAS COLUMNAS SI QUERES QUE BUSQUE MAS COLUMNAS */
    );
  }
  
}
