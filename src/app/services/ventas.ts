import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode, { JwtDecodeOptions } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrl = 'https://cafebase-backend-production.up.railway.app'; // URL para operaciones relacionadas con usuarios

  constructor(
    private http: HttpClient,
    private jwrtHelper: JwtHelperService,
    ) {}
  
    getData(): Observable<any[]> {
      return this.http.get<any[]>('https://cafebase-backend-production.up.railway.app/ventas');
   }

 // Método para insertar una venta en la base de datos
  // Método para insertar una venta en la base de datos
  insertarVenta(ventaData: any): Observable<any> {
    const url = `${this.apiUrl}/ventas/insertarVenta`; // Ruta de la API para insertar venta
    return this.http.post(url, ventaData);
  }


  delete(id: number) {
    return this.http.delete(`https://cafebase-backend-production.up.railway.app/ventas/eliminarVenta/${id}`);
  }
  insertar(ventaData: any): Observable<any> {
    const url = `${this.apiUrl}/ventas/insertarVentas`; // Ruta de la API para insertar venta
    return this.http.post(url, ventaData);
  }

}
