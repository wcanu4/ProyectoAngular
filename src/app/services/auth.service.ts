import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  insertProduct(nuevoProducto: any) {
    throw new Error('Method not implemented.');
  }
  private URL = 'https://cafebase-backend-production.up.railway.app';
  constructor(
    private http: HttpClient, 
    private jwrtHelper: JwtHelperService) { }
  singin(user:any){
    return this.http.post(`${this.URL}/user/singin`,user);
  }

  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(this.jwrtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
  // Mostrar usuarios existentes en la base de datos 
  getUserData(): Observable<any[]> {
    return this.http.get<any[]>('https://cafebase-backend-production.up.railway.app/user');
  }

 // Eliminar usuarios existentes en la base de datos 
  deleteUser(id: number) {
    return this.http.delete(`https://cafebase-backend-production.up.railway.app/user/userEliminar/${id}`);
  }
  
  // Insertar usuarios existentes en la base de datos 
  insertUser(user: any) {
    return this.http.post(`https://cafebase-backend-production.up.railway.app/user/userInsertar`, user);
  }


  
}
