import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['expectedRole'];
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('Token no encontrado');
      this.router.navigate(['login']);
      return false;
    }

    try {
      const decodedToken: any = decode(token);
      const userRole = decodedToken.rol;
      console.log(userRole);

      if (!this.authService.isAuth() || !expectedRoles.includes(userRole)) {
        console.log('Usuario no autorizado para la vista');
        this.router.navigate(['login']);
        return false;
      }

      return true; // Debes agregar un return true para el caso de autorización exitosa
    } catch (error) {
      console.log('Error al decodificar el token:', error);
      this.router.navigate(['login']);
      return false;
    }
  }
}