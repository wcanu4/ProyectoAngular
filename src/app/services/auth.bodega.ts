import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthBodega{
  insertstore(nuevoBodega: any) {
    throw new Error('Method not implemented.');
  }
  private URL = 'https://cafebase-backend-production.up.railway.app';
  constructor(
    private http: HttpClient, 
    private jwrtHelper: JwtHelperService) { }
  singin(store:any){
    return this.http.post(`${this.URL}/store/singin`,store);
  }


 // Mostrar productos existentes en la base de datos 
  getStoreData(): Observable<any[]> {
    return this.http.get<any[]>('https://cafebase-backend-production.up.railway.app/store');
  }

// Eliminar productos de la base de datos 
  deleteStore(id: number) {
    return this.http.delete(`https://cafebase-backend-production.up.railway.app/store/storeEliminacion/${id}`);
  }
  
 // Insertar productos de la base de datos 
  insertStore(store: any) {
    return this.http.post(`https://cafebase-backend-production.up.railway.app/store/storeInsertar`, store);
  }
}
