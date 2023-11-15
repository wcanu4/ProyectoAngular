import { Component } from '@angular/core';
import { EditarClienteComponent } from '../editar-cliente/editar-cliente.component';
import { CrearClienteComponent } from '../crear-cliente/crear-cliente.component';
import { ClienteService } from 'src/app/services/cliente.service'; // Importa el nuevo servicio
import { AuthService } from 'src/app/services/auth.service'; // Importa el nuevo servicio
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listado-cliente',
  templateUrl: './listado-cliente.component.html',
  styleUrls: ['./listado-cliente.component.css']
})
export class ListadoClienteComponent {
  sortedColumn: string | null = null; // Columna actualmente ordenada
  sortDirection: number = 1; // 1 para ascendente, -1 para descendente
  
  productToDelete: any = null; // Almacena el producto a eliminar
  contenedorDB: any[] = [];
  usuarios: any[] = [];
  pageSize: number = 10; // Cantidad de registros por página
  currentPage: number = 0; // Página actual
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showConfirmationModal: boolean = false;
  ToDelete: any = null; // Almacena el usuario a eliminar
  showSuccessModal: boolean = false;
  
  searchText: string = ''; // Texto de búsqueda
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos
  


  constructor(

    private clienteService: ClienteService,private authService: AuthService, private modalService: NgbModal, private router: Router) {
    this.sortedColumn = 'id'; // Establece la columna inicialmente ordenada
    this.sortDirection = 1; // 1 para ascendente, -1 para descendente (puede ajustarlo según su preferencia)
  }

  ngOnInit(): void {
    this.clienteService.getData().subscribe(data => {
      console.log('Datos de usuarios:', data); // Agregar esta línea para verificar los datos
      this.contenedorDB = data;
    });
    
  }

   // Función para confirmar la eliminación


  nextPage() {
    if (this.currentPage < this.contenedorDB.length / this.pageSize - 1) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  // Función para mostrar el modal de confirmación
  showDeleteConfirmation(contenedorLocal: any) {
    this.ToDelete = contenedorLocal;
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
    this.clienteService.delete(this.ToDelete.id).subscribe(
      () => {
        this.contenedorDB = this.contenedorDB.filter(u => u.id !== this.ToDelete.id);
        // Ocultar el modal de confirmación después de eliminar
        this.showConfirmationModal = false;
      },
      (error) => {
        console.error('Error al eliminar el pacha', error);
  
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
    this.ToDelete = null;
    
  }

  closeSuccessAlert() {
    this.successMessage = null;
   
  }

  closeErrorAlert() {
    this.errorMessage = null;
  }

  // Agrega una propiedad para controlar la visibilidad del modal
  showModal = false;

  // Función para abrir el modal
  openModal() {
    this.showModal = true;
  }

  /**APERTURA DEL MODAL NUEVO USUARIO */
 
    // Función para cancelar la eliminación

    // Función para ocultar el modal de confirmación


  closeModal() {
    this.showModal = false;
  }

  editar(contenedorLocal: any) {
    console.log('Usuario a editar:', contenedorLocal);
    const id = contenedorLocal.id;
    const modalRef = this.modalService.open(EditarClienteComponent, {
      size: 'lg',
    });
  
    modalRef.componentInstance.usuario = contenedorLocal;
  
    modalRef.result.then(
      (result) => {
        // El modal se cerró con éxito, ahora actualiza la lista de usuarios
        this.refreshList();
      },
      (reason) => {
        // El modal se cerró sin éxito o el usuario canceló, puedes manejarlo aquí si es necesario
      }
    );
  }

  
  getProducts() {
    this.clienteService.getData().subscribe(data => {
      console.log('Esto es lo que retorna despues de insertar',data)
      this.contenedorDB = data;
    });
  }
  refreshList() {
    this.clienteService.getData().subscribe(data => {
      console.log('Datos de usuarios:', data);
      this.contenedorDB = data;
    });
  }
  // Función para ordenar la tabla por una columna
  sortTable(column: string) {
    if (this.sortedColumn === column) {
      this.sortDirection *= -1;
    } else {
      this.sortedColumn = column;
      this.sortDirection = 1;
    }
  
    this.contenedorDB.sort((a, b) => {
      const valueA = a[column] !== null && a[column] !== undefined ?
        (column === 'id' ? a[column].toString() : (typeof a[column] === 'string' ? a[column].toLowerCase() : a[column])) :
        ''; // Verifica si el valor de la columna existe
      const valueB = b[column] !== null && b[column] !== undefined ?
        (column === 'id' ? b[column].toString() : (typeof b[column] === 'string' ? b[column].toLowerCase() : b[column])) :
        ''; // Verifica si el valor de la columna existe
  
      if (column === 'id') {
        // Si es la columna de ID, compara como números
        return (Number(valueA) - Number(valueB)) * this.sortDirection;
      } else {
        // Para otras columnas, compara como cadenas de texto en minúsculas
        return String(valueA).localeCompare(String(valueB)) * this.sortDirection;
      }
    });
  }
  
  
  

// Función para filtrar usuarios por búsqueda
get filtered() {
  return this.contenedorDB.filter(ContenedorLocal => {
    const id = ContenedorLocal.id ? ContenedorLocal.id.toString() : '';
    const nit = ContenedorLocal.id ? ContenedorLocal.id.toString() : '';
    const nombre = ContenedorLocal.nombre ? ContenedorLocal.nombre.toLowerCase() : '';
    const telefono = ContenedorLocal.telefono ? ContenedorLocal.telefono.toLowerCase() : '';
    const correo = ContenedorLocal.correo ? ContenedorLocal.correo.toLowerCase() : '';
    const direccion = ContenedorLocal.direccion ? ContenedorLocal.direccion.toLowerCase() : '';

    return (
      id.includes(this.searchText.toLowerCase()) ||
      nit.includes(this.searchText.toLowerCase()) ||
      nombre.includes(this.searchText.toLowerCase()) ||
      telefono.includes(this.searchText.toLowerCase()) ||
      correo.includes(this.searchText.toLowerCase()) ||
      direccion.includes(this.searchText.toLowerCase())
    );
  });
}





get visible() {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return this.filtered.slice(startIndex, endIndex);
}
openNuevo() {
  const valor = 'Este es un valor de ejemplo';

  const modalRef = this.modalService.open(CrearClienteComponent, {
    size: 'lg',
    backdrop: 'static',
    keyboard: false,
    windowClass: 'modal-vertical-center modal-horizontal-center',
  });

  modalRef.componentInstance.parametro = valor;

  modalRef.result.then(
    (result) => {
      // El modal se cerró con éxito, ahora actualiza la lista de usuarios
      this.refreshList();
    },
    (reason) => {
      // El modal se cerró sin éxito o el usuario canceló, puedes manejarlo aquí si es necesario
    }
  );
}

}


