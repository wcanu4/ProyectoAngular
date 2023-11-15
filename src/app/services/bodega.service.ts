// usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BodegaService {
  private apiUrl = 'https://cafebase-backend-production.up.railway.app'; // URL para operaciones relacionadas con usuarios

  constructor(private http: HttpClient) {}

  getStoreById(storeId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/store/storeEditar/${storeId}`);
  }
//Revisar en caso que no funcione colocar codigo 
  editarBodega(storeId: number, partida: any): Observable<any> {
    // Utiliza la ruta correcta en tu servidor backend
    const url = `${this.apiUrl}/store/storeEditar/${storeId}`;
    return this.http.put(url, partida);
  }

  // Otros métodos relacionados con la gestión de usuarios...
}
