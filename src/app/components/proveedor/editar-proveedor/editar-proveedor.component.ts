import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from 'src/app/services2/proveedor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css']
})
export class EditarProveedorComponent implements OnInit {
  proveedor: any = {};
  isLoading: boolean = true;
  exito: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private proveedorService: ProveedorService,

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.proveedorService.getById(id).subscribe(
        (response) => {
          this.proveedor = response;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
          this.isLoading = false;
        }
      );
    } 
  }

 
 guardarCambios() {
    // Utiliza el servicio usuarioService para enviar los cambios al servidor
    this.proveedorService.editar(this.proveedor.id, this.proveedor).subscribe(
      (response) => {
        // Manejar la respuesta exitosa del servidor, si es necesario
        console.log('Usuario actualizado exitosamente:', response);
  
        // Muestra el mensaje de éxito y cierra el modal
        this.exito = true;
  
        // Cierra el modal después de 2 segundos (puedes ajustar el tiempo)
        setTimeout(() => {
          this.activeModal.close('Guardado con éxito');
        }, 2000);
      },
      (error) => {
        // Manejar errores en caso de que la actualización falle
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
  cancelar() {
    // Cierra el modal sin guardar cambios
    this.activeModal.dismiss('Cancelado');
  }
  
}
