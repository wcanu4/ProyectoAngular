import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  template: `
    <button (click)="logout()">Salir</button>`,    
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent {

  constructor(private router: Router) {}

  logout() {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
    
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['login']);
  }
}
