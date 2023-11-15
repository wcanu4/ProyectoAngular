import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthCafe{
  insertcafe(nuevoCafe: any) {
    throw new Error('Method not implemented.');
  }
  private URL = 'https://cafebase-backend-production.up.railway.app';
  constructor(
    private http: HttpClient, 
    private jwrtHelper: JwtHelperService) { }
  singin(cafe:any){
    return this.http.post(`${this.URL}/cafe/singin`,cafe);
  }


 // Mostrar productos existentes en la base de datos 
  getCafeData(): Observable<any[]> {
    return this.http.get<any[]>('https://cafebase-backend-production.up.railway.app/cafe');
  }

// Eliminar productos de la base de datos 
  deleteCafe(id: number) {
    return this.http.delete(`https://cafebase-backend-production.up.railway.app/cafe/cafeEliminar/${id}`);
  }
  
 // Insertar productos de la base de datos 
  insertCafe(cafe: any) {
    return this.http.post(`https://cafebase-backend-production.up.railway.app/cafe/cafeInsertar`, cafe);
  }
}
