import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthCafe} from 'src/app/services/auth.cafe';
import { EditarCafeComponent } from '../../cafe/editar-cafe/editar-cafe.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listado-cafe',
  templateUrl: './listado-cafe.component.html',
  styleUrls: ['./listado-cafe.component.css']
})
export class ListadoCafeComponent {
  sortedColumn: string | null = null; // Columna actualmente ordenada
  sortDirection: number = 1; // 1 para ascendente, -1 para descendente

  cafe: any[] = [];
  pageSize: number = 10; // Cantidad de registros por página
  currentPage: number = 0; // Página actual
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showConfirmationModal: boolean = false;
  storeToDelete: any = null; // Almacena el producto a eliminar
  showSuccessModal: boolean = false;
  searchText: string = ''; // Texto de búsqueda

  constructor(private authCafe: AuthCafe, private modalService: NgbModal) {}

ngOnInit(): void {
  this.authCafe.getCafeData().subscribe(data => {
    this.cafe = data;
  });
}

  get visibleCafe() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filtered.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.cafe.length / this.pageSize - 1) {
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
  
    this.cafe.sort((a, b) => {
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
    this.authCafe.deleteCafe(this.storeToDelete.id).subscribe(
      () => {
        this.cafe = this.cafe.filter(u => u.id !== this.storeToDelete.id);
        this.showSuccessMessage('Cafe eliminado con éxito'); // Muestra el mensaje de éxito
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

  
  editarCafe(cafe: any) {
    const id = cafe.id;
    const modalRef = this.modalService.open(EditarCafeComponent, {
      size: 'lg',
    });
    
    modalRef.componentInstance.cafe = cafe;
   
  }
  

  get filtered() {
    return this.cafe.filter(cafe =>
      cafe.id.toString().includes(this.searchText.toLowerCase()) ||
      cafe.libra.toString().includes(this.searchText.toLowerCase()) ||
      cafe.precio.toString().includes(this.searchText.toLowerCase()) ||
      cafe.cosecha.toString().includes(this.searchText.toLowerCase()) 
      

    // ****AQUI VAS AGREGANDO LAS COLUMNAS SI QUERES QUE BUSQUE MAS COLUMNAS */
    );
  }
  
}
