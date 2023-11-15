// usuario.service.ts
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
insert(contenedorLocal: any) {
  return this.http.post(`https://cafebase-backend-production.up.railway.app/compras/insertarCompras`, contenedorLocal);
}
delete(id: number) {
  return this.http.delete(`https://cafebase-backend-production.up.railway.app/compras/eliminarCompra/${id}`);
}
 

}
