import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthCliente{
  insertcliente(nuevoCliente: any) {
    throw new Error('Method not implemented.');
  }
  private URL = 'https://cafebase-backend-production.up.railway.app';
  constructor(
    private http: HttpClient, 
    private jwrtHelper: JwtHelperService) { }
  singin(cliente:any){
    return this.http.post(`${this.URL}/cliente/singin`,cliente);
  }


 // Mostrar productos existentes en la base de datos 
  getClienteData(): Observable<any[]> {
    return this.http.get<any[]>('https://cafebase-backend-production.up.railway.app/cliente');
  }

// Eliminar productos de la base de datos 
  deleteCliente(id: number) {
    return this.http.delete(`https://cafebase-backend-production.up.railway.app/cliente/clienteEliminar/${id}`);
  }
  
 // Insertar productos de la base de datos 
  insertCliente(cliente: any) {
    return this.http.post(`https://cafebase-backend-production.up.railway.app/cliente/clienteInsertar`, cliente);
  }
}
