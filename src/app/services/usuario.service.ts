// usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode, { JwtDecodeOptions } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private apiUrl = 'https://cafebase-backend-production.up.railway.app'; // URL para operaciones relacionadas con usuarios

  constructor(private http: HttpClient) {}

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/userEditar/${userId}`);
  }
  

  editarUsuario(userId: number, usuario: any): Observable<any> {
    // Utiliza la ruta correcta en tu servidor backend
    const url = `${this.apiUrl}/user/userEditar/${userId}`;
    return this.http.put(url, usuario);
  }


  obtenerPermisosPorUsuario(idUsuario: number): Observable<any> {
    const url = `${this.apiUrl}/user/usuarios/${idUsuario}/permisos`; // Reemplaza 'permisos' con la ruta adecuada en tu API
    return this.http.get(url);
  } 

  getNameAndRole(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: {
        permisos: any
      } = jwt_decode(token);
  
      const permisos = decodedToken.permisos;
 
  
      return permisos; // Devuelve directamente los permisos
    } else {
      console.log('Token no encontrado en el almacenamiento local.');
      return {}; // Devuelve un objeto vacío en caso de que el token no se encuentre
    }
  }
  
  
  // Otros métodos relacionados con la gestión de usuarios...
}