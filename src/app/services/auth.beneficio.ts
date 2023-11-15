import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthBeneficio{
  insertbeneficio(nuevoBeneficio: any) {
    throw new Error('Method not implemented.');
  }
  private URL = 'https://cafebase-backend-production.up.railway.app';
  constructor(
    private http: HttpClient, 
    private jwrtHelper: JwtHelperService) { }
  singin(beneficio:any){
    return this.http.post(`${this.URL}/beneficio/singin`,beneficio);
  }


 // Mostrar productos existentes en la base de datos 
  getBeneficioData(): Observable<any[]> {
    return this.http.get<any[]>('https://cafebase-backend-production.up.railway.app/beneficio');
  }

// Eliminar productos de la base de datos 
  deleteBeneficio(id: number) {
    return this.http.delete(`https://cafebase-backend-production.up.railway.app/beneficio/beneficioEliminar/${id}`);
  }
  
 // Insertar productos de la base de datos 
  insertBeneficio(beneficio: any) {
    return this.http.post(`https://cafebase-backend-production.up.railway.app/beneficio/beneficioInsertar`, beneficio);
  }
}
