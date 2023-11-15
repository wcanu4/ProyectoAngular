import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent{
  sortedColumn: string | null = null; // Columna actualmente ordenada
  sortDirection: number = 1; // 1 para ascendente, -1 para descendente



  users: any[] = [];
  pageSize: number = 10; // Cantidad de registros por página
  currentPage: number = 0; // Página actual
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showConfirmationModal: boolean = false;
  userToDelete: any = null; // Almacena el usuario a eliminar
  showSuccessModal: boolean = false;
  searchText: string = ''; // Texto de búsqueda

  constructor( private authService: AuthService,
    private usuarioService: UsuarioService,
     private modalService: NgbModal) {}

  ngOnInit(): void {
    this.authService.getUserData().subscribe(data => {
      this.users = data;
    });
  }

  get visibleUsers() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filtered.slice(startIndex, endIndex);    
  }
 
  nextPage() {
    if (this.currentPage < this.users.length / this.pageSize - 1) {
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
  
    this.users.sort((a, b) => {
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
  showDeleteConfirmation(user: any) {
    this.userToDelete = user;
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
    this.authService.deleteUser(this.userToDelete.id).subscribe(
      () => {
        this.users = this.users.filter(u => u.id !== this.userToDelete.id);
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
    this.userToDelete = null;
  }

  closeSuccessAlert() {
    this.successMessage = null;
  }

  closeErrorAlert() {
    this.errorMessage = null;
  }

  editarUsuario(user: any) {
    const id = user.id;

    console.log('ID de usuario a editar:', id);
  
    // Realiza una consulta para obtener los permisos del usuario
    this.usuarioService.obtenerPermisosPorUsuario(id).subscribe((permisos) => {
      // Asigna los permisos individualmente al objeto user
      user.compras = permisos.compras;
      user.ventas = permisos.ventas;
      user.inventario = permisos.inventario;
      user.procesos = permisos.procesos;
      user.reportes = permisos.reportes;
      user.usuarios = permisos.usuarios;
      user.bodega = permisos.bodega;
    const modalRef = this.modalService.open(EditarUsuarioComponent, {
      size: 'lg',
    });
    
    modalRef.componentInstance.usuario = user;
    console.log('Datos del usuario que se pasan al componente EditarUsuarioComponent:', user);
      modalRef.result.then(
        (result) => {
          // El modal se cerró con éxito, ahora actualiza la lista de usuarios
   
        },
        (reason) => {
          // El modal se cerró sin éxito o el usuario canceló, puedes manejarlo aquí si es necesario
        }
      );
    });
   }

   get filtered() {
    return this.users.filter(user =>
      user.id.toString().includes(this.searchText.toLowerCase()) ||
      user.name.toString().includes(this.searchText.toLowerCase()) ||
      user.user.toString().includes(this.searchText.toLowerCase()) ||
      user.rol.toString().includes(this.searchText.toLowerCase()) 
    // ****AQUI VAS AGREGANDO LAS COLUMNAS SI QUERES QUE BUSQUE MAS COLUMNAS */
    );
  }
}
