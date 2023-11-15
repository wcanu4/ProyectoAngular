import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CafeService } from 'src/app/services/cafe.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal

@Component({
  selector: 'app-editar-cafe',
  templateUrl: './editar-cafe.component.html',
  styleUrls: ['./editar-cafe.component.css']
})
export class EditarCafeComponent implements OnInit {
  cafe: any = {};
  isLoading: boolean = true;
  exito: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private cafeService: CafeService,

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.cafeService.getById(id).subscribe(
        (response) => {
          this.cafe = response;
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
    this.cafeService.editar(this.cafe.id, this.cafe).subscribe(
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
