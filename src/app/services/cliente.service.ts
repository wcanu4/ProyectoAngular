import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode, { JwtDecodeOptions } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://cafebase-backend-production.up.railway.app'; // URL para operaciones relacionadas con usuarios

  constructor(
    private http: HttpClient,
    private jwrtHelper: JwtHelperService,
    ) {}
  
getData(): Observable<any[]> {
   return this.http.get<any[]>('https://cafebase-backend-production.up.railway.app/cliente');
}

insert(contenedorLocal: any) {
  return this.http.post(`https://cafebase-backend-production.up.railway.app/cliente/clienteInsertar`, contenedorLocal);
}

delete(id: number) {
  return this.http.delete(`https://cafebase-backend-production.up.railway.app/cliente/clienteEliminar/${id}`);
}
getById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/cliente/clienteEditar/${id}`);
}
editar(Id: number, contenedorDB: any): Observable<any> {
   // Utiliza la ruta correcta en tu servidor backend
   const url = `${this.apiUrl}/cliente/clienteEditar/${Id}`;
   return this.http.put(url, contenedorDB);
 }

}
