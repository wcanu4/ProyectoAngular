import { NgModule } from '@angular/core';
import { Routes, RouterModule, mapToCanActivate, mapToCanActivateChild } from '@angular/router';
import { HomeComponent } from './components/inicio/home/home.component';
import { AdminComponent } from './components/inicio/admin/admin.component';
import { ListadoProductosComponent } from './components/productos/listado-productos/listado-productos.component';
import { ListadoBodegasComponent } from './components/bodega/listado-bodegas/listado-bodegas.component';
import { ListadoBeneficioComponent } from './components/beneficio/listado-beneficio/listado-beneficio.component';
import { ListadoClienteComponent } from './components/inventario/listado-cliente/listado-cliente.component';
import { ListadoCafeComponent } from './components/cafe/listado-cafe/listado-cafe.component';
import { ListadoProveedoresComponent } from './components/proveedor/listado-proveedores/listado-proveedores.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';



const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'admin', component: AdminComponent,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'producto', component: ListadoProductosComponent,canActivate:[RoleGuard,AuthGuard], data: { expectedRole: ['Empleado']}} ,
  { path: 'bodega', component: ListadoBodegasComponent,canActivate:[RoleGuard,AuthGuard], data: { expectedRole: ['Empleado']}} ,
  { path: 'beneficio', component: ListadoBeneficioComponent,canActivate:[RoleGuard,AuthGuard], data: { expectedRole: ['Empleado']}} ,
  { path: 'cliente', component: ListadoClienteComponent,canActivate:[RoleGuard,AuthGuard], data: { expectedRole: ['Empleado']}} ,
  { path: 'cafe', component: ListadoCafeComponent,canActivate:[RoleGuard,AuthGuard], data: { expectedRole: ['Empleado']}} ,
  { path: 'proveedor', component: ListadoProveedoresComponent,canActivate:[RoleGuard,AuthGuard], data: { expectedRole: ['Empleado']}} ,
  
  
  

  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

