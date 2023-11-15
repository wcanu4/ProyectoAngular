import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthProveedor{
  insertproveedor(nuevoProveedor: any) {
    throw new Error('Method not implemented.');
  }
  private URL = 'https://cafebase-backend-production.up.railway.app';
  constructor(
    private http: HttpClient, 
    private jwrtHelper: JwtHelperService) { }
  singin(proveedor:any){
    return this.http.post(`${this.URL}/proveedor/singin`,proveedor);
  }


 // Mostrar productos existentes en la base de datos 
  getProveedorData(): Observable<any[]> {
    return this.http.get<any[]>('https://cafebase-backend-production.up.railway.app/proveedor');
  }

// Eliminar productos de la base de datos 
  deleteProveedor(id: number) {
    return this.http.delete(`https://cafebase-backend-production.up.railway.app/proveedor/proveedorEliminacion/${id}`);
  }
  
 // Insertar productos de la base de datos 
  insertProveedor(proveedor: any) {
    return this.http.post(`https://cafebase-backend-production.up.railway.app/proveedor/proveedorInsertar`, proveedor);
  }
}
