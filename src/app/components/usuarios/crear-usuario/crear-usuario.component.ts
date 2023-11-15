import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  // Define las propiedades para controlar las alertas y mensajes
  showSuccessAlert = false;
  showErrorAlert = false;
  showValidationAlert = false; // Agrega esta línea
  validationMessage = ''; // Agrega esta línea
  successMessage = '';
  errorMessage = '';
  //Campos que solicitar al usuario
  nuevoUsuario: any = {
    name: '',
    document: '',
    phone:'',
    mail:'',
    addres:'',
    creation:'',
    user: '',
    rol: '',
    pass: '',
    state:'',
    compras: '',
    ventas: '',
    inventario:'',
    procesos:'',
    reportes:'',
    usuarios:'',
    bodega:''
  };
  users: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  
// esto es para insertar un usuario a la tabla user 

//para enviar datos a la tabla 
  insertarUsuario() {
    this.resetValidationAlert();
    this.closeSuccessAlert();
    this.closeErrorAlert();
  
    // Verifica si alguno de los campos está vacío
    if (
      !this.nuevoUsuario.name ||
      !this.nuevoUsuario.document ||
      !this.nuevoUsuario.phone ||
      !this.nuevoUsuario.mail ||
      !this.nuevoUsuario.addres ||
      !this.nuevoUsuario.creation ||
      !this.nuevoUsuario.user ||
      !this.nuevoUsuario.rol ||
      !this.nuevoUsuario.pass ||
      !this.nuevoUsuario.state ||
      !this.nuevoUsuario.compras ||
      !this.nuevoUsuario.ventas ||
      !this.nuevoUsuario.inventario ||
      !this.nuevoUsuario.procesos ||
      !this.nuevoUsuario.reportes ||
      !this.nuevoUsuario.usuarios
    ) {
      // Muestra una alerta de error y el mensaje correspondiente
      this.showValidationAlert = true;
      this.validationMessage = 'Por favor, completa todos los campos';
  
      return; // Detén la función si falta algún campo
    }
  
    // Crea un objeto 'permisos' con las propiedades requeridas
    const permisos = {
      compras: this.nuevoUsuario.compras,
      ventas: this.nuevoUsuario.ventas,
      inventario: this.nuevoUsuario.inventario,
      procesos: this.nuevoUsuario.procesos,
      reportes: this.nuevoUsuario.reportes,
      usuarios: this.nuevoUsuario.usuarios,
      bodega: this.nuevoUsuario.bodega
    };
  
    // Actualiza 'this.nuevoUsuario' para incluir 'permisos'
    this.nuevoUsuario = {
      name: this.nuevoUsuario.name,
      document: this.nuevoUsuario.document,
      phone: this.nuevoUsuario.phone,
      mail: this.nuevoUsuario.mail,
      addres: this.nuevoUsuario.addres,
      creation: this.nuevoUsuario.creation,
      user: this.nuevoUsuario.user,
      rol: this.nuevoUsuario.rol,
      pass: this.nuevoUsuario.pass,
      state: this.nuevoUsuario.state,
      permisos: permisos, // Agrega el objeto 'permisos' aquí
    };
  
    // Agrega un console.log para ver el JSON antes de enviarlo
    console.log('JSON que se enviará al backend:', this.nuevoUsuario);
  
    this.authService.insertUser(this.nuevoUsuario).subscribe(
      () => {
        // Muestra la alerta de éxito y el mensaje correspondiente
        this.showSuccessAlert = true;
        this.successMessage = 'Usuario insertado con éxito';
  
        // Limpia el formulario
        this.nuevoUsuario = {
          name: '',
          document: '',
          phone: '',
          mail: '',
          addres: '',
          creation: '',
          user: '',
          rol: '',
          pass: '',
          state: '',
          compras: '',
          ventas: '',
          inventario: '',
          procesos: '',
          reportes: '',
          usuarios: '',
          bodega: ''
        };
  
        // Actualiza la lista de usuarios después de la inserción
        this.getUsers();
      },
      (error) => {
        // Muestra la alerta de error y el mensaje correspondiente
        this.showErrorAlert = true;
        this.errorMessage = 'Error al insertar el usuario';
  
        console.error('Error al insertar el usuario', error);
      }
    );
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
  getUsers() {
    this.authService.getUserData().subscribe(data => {
      this.users = data;
    });
  }
  resetValidationAlert() {
    this.showValidationAlert = false;
    this.validationMessage = '';
  }
}
