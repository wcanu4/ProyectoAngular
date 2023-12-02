import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode, { JwtDecodeOptions } from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'https://cafebase-backend-production.up.railway.app'; // URL para operaciones relacionadas con usuarios

  constructor(
    private http: HttpClient,
    private jwrtHelper: JwtHelperService,
    ) {}
  
getData(): Observable<any[]> {
   return this.http.get<any[]>('https://cafebase-backend-production.up.railway.app/product');
}


insert(contenedorLocal: any) {
  return this.http.post(`https://cafebase-backend-production.up.railway.app/product/productInsertar`, contenedorLocal);
}
delete(id: number) {
  return this.http.delete(`https://cafebase-backend-production.up.railway.app/product/productEliminar/${id}`);
}
getById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/product/editarProduct/${id}`);
}

editar(Id: number, contenedorDB: any): Observable<any> {
   // Utiliza la ruta correcta en tu servidor backend
   const url = `${this.apiUrl}/product/editarProduct/${Id}`;
   return this.http.put(url, contenedorDB);
 }
 
 actualizarCantidadLechones(productId: number, cantidadVendida: number): Observable<any> {
  // Define el cuerpo de la solicitud con los datos a enviar al servidor
  const requestBody = {
    cantidadVendida: cantidadVendida
  };
  // Realiza la solicitud POST al servidor para actualizar la cantidad de lechones
  return this.http.post(`${this.apiUrl}/product/actualizarCantidad/${productId}`, requestBody);
}

insertarVenta(ventaData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/product/insertarVenta`, ventaData);
}


}
