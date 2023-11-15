// usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BeneficioService {
  private apiUrl = 'https://cafebase-backend-production.up.railway.app'; // URL para operaciones relacionadas con usuarios

  constructor(private http: HttpClient) {}

  getBeneficioById(beneficioId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/beneficio/beneficioEditar/${beneficioId}`);
  }
//Revisar en caso que no funcione colocar codigo 
  editarBeneficio(beneficioId: number, quintales: any): Observable<any> {
    // Utiliza la ruta correcta en tu servidor backend
    const url = `${this.apiUrl}/beneficio/beneficioEditar/${beneficioId}`;
    return this.http.put(url, quintales);
  }

  // Otros métodos relacionados con la gestión de usuarios...
}
