import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode, { JwtDecodeOptions } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private apiUrl = 'https://cafebase-backend-production.up.railway.app'; // URL para operaciones relacionadas con usuarios

  constructor(
    private http: HttpClient,
    private jwrtHelper: JwtHelperService,
    ) {}
  

    getData(): Observable<any[]> {
        return this.http.get<any[]>('https://cafebase-backend-production.up.railway.app/compras');
     }
 // Método para insertar una venta en la base de datos
  // Método para insertar una venta en la base de datos
  insertar(ventaData: any): Observable<any> {
    const url = `${this.apiUrl}/compras/insertarCompras`; // Ruta de la API para insertar venta
    return this.http.post(url, ventaData);
  }
  delete(id: number) {
    return this.http.delete(`https://cafebase-backend-production.up.railway.app/compras/eliminarCompra/${id}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/compras/editarCompra/${id}`);
  }
  editar(Id: number, contenedorDB: any): Observable<any> {
     // Utiliza la ruta correcta en tu servidor backend
     const url = `${this.apiUrl}/compras/editarCompra/${Id}`;
     return this.http.put(url, contenedorDB);
   }

}
