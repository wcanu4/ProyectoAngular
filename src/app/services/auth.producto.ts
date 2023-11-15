import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthProducto{
  insertproduct(nuevoProducto: any) {
    throw new Error('Method not implemented.');
  }
  private URL = 'https://cafebase-backend-production.up.railway.app';
  constructor(
    private http: HttpClient, 
    private jwrtHelper: JwtHelperService) { }
  singin(product:any){
    return this.http.post(`${this.URL}/product/singin`,product);
  }


 // Mostrar productos existentes en la base de datos 
  getProductData(): Observable<any[]> {
    return this.http.get<any[]>('https://cafebase-backend-production.up.railway.app/product');
  }

// Eliminar productos de la base de datos 
  deleteProduct(id: number) {
    return this.http.delete(`https://cafebase-backend-production.up.railway.app/product/productEliminar/${id}`);
  }
  
 // Insertar productos de la base de datos 
  insertProduct(product: any) {
    return this.http.post(`https://cafebase-backend-production.up.railway.app/product/productInsertar`, product);
  }
}
