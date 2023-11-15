import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComprasService } from 'src/app/services/compras';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal

@Component({
  selector: 'app-editar-compras',
  templateUrl: './editar-compras.component.html',
  styleUrls: ['./editar-compras.component.css']
})
export class EditarComprasComponent {

  producto: any = {};
  isLoading: boolean = true;
  exito: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private comprasService: ComprasService,

  ) {}

  ngOnInit(): void {

  }

 
 guardarCambios() {
    // Utiliza el servicio usuarioService para enviar los cambios al servidor
    this.comprasService.editar(this.producto.id, this.producto).subscribe(
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
    this.activeModal.close('Cancelado');
  }
  
}
