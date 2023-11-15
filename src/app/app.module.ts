import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/inicio/home/home.component';
import { AdminComponent } from './components/inicio/admin/admin.component';
import { LoginComponent } from './components/inicio/login/login.component';
// Modules
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
//Providers
import { JwtHelperService, JWT_OPTIONS }  from '@auth0/angular-jwt'
import { Token } from '@angular/compiler';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { LogoutButtonComponent } from './components/inicio/logout-button/logout-button.component';

import { CrearUsuarioComponent } from './components/usuarios/crear-usuario/crear-usuario.component';
import { CrearProductoComponent } from './components/productos/crear-producto/crear-producto.component';
import { CrearBodegaComponent } from './components/bodega/crear-bodega/crear-bodega.component';
import { CrearBeneficioComponent } from './components/beneficio/crear-beneficio/crear-beneficio.component';
import { CrearClienteComponent } from './components/inventario/crear-cliente/crear-cliente.component';
import { CrearCafeComponent } from './components/cafe/crear-cafe/crear-cafe.component';
import { CrearProveedorComponent } from './components/proveedor/crear-proveedor/crear-proveedor.component';
import { FacturacionComponent } from './components/inventario/facturacion/facturacion.component';
import { ValeComponent } from './components/proveedor/vale/vale.component';


import { ListadoUsuariosComponent } from './components/usuarios/listado-usuarios/listado-usuarios.component';
import { ListadoProductosComponent } from './components/productos/listado-productos/listado-productos.component';
import { ListadoBodegasComponent } from './components/bodega/listado-bodegas/listado-bodegas.component';
import { ListadoBeneficioComponent } from './components/beneficio/listado-beneficio/listado-beneficio.component';
import { ListadoClienteComponent } from './components/inventario/listado-cliente/listado-cliente.component';
import { ListadoCafeComponent } from './components/cafe/listado-cafe/listado-cafe.component';
import { ListadoProveedoresComponent } from './components/proveedor/listado-proveedores/listado-proveedores.component';


import { EditarUsuarioComponent } from './components/usuarios/editar-usuario/editar-usuario.component';
import { EditarProductoComponent } from './components/productos/editar-producto/editar-producto.component';
import { EditarBodegaComponent } from './components/bodega/editar-bodega/editar-bodega.component';
import { EditarBeneficioComponent } from './components/beneficio/editar-beneficio/editar-beneficio.component';
import { EditarClienteComponent } from './components/inventario/editar-cliente/editar-cliente.component';
import { EditarCafeComponent } from './components/cafe/editar-cafe/editar-cafe.component';
import { EditarProveedorComponent } from './components/proveedor/editar-proveedor/editar-proveedor.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProductoService } from 'src/app/services/producto.service'; // Importa el nuevo servicio
import { BodegaService } from './services/bodega.service';
import { BeneficioService } from './services/beneficio.service';
import { ClienteService } from 'src/app/services/cliente.service'; // Importa el nuevo servicio
import { ProveedorService } from 'src/app/services/proveedor.service'; // Importa el nuevo servicio
import { CafeService } from 'src/app/services/cafe.service';
import { FacturacionCComponent } from './components/compras/facturacion-c/facturacion-c.component';
import { ComprasComponent } from './components/compras/compras/compras.component';
import { EditarComprasComponent } from './components/compras/editar-compras/editar-compras.component';
import { CrearComprasComponent } from './components/compras/crear-compras/crear-compras.component';
import { VentasComponent } from './components/ventas/ventas/ventas.component';
import { EditarVentasComponent } from './components/ventas/editar-ventas/editar-ventas.component';
import { CrearVentasComponent } from './components/ventas/crear-ventas/crear-ventas.component';
import { ProductosCompraComponent } from './components/productosCompra/productos-compra/productos-compra.component';
import { EditarProductosCompraComponent } from './components/productosCompra/editar-productos-compra/editar-productos-compra.component';
import { CrearProductosCompraComponent } from './components/productosCompra/crear-productos-compra/crear-productos-compra.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    LogoutButtonComponent,
    
    CrearUsuarioComponent,
    CrearProductoComponent,
    CrearBodegaComponent, 
    CrearBeneficioComponent, 

    CrearClienteComponent,
    CrearCafeComponent,
    CrearProveedorComponent,
    FacturacionComponent,
    ValeComponent,


    ListadoUsuariosComponent,
    ListadoProductosComponent,
    ListadoBodegasComponent,
    ListadoBeneficioComponent,
    ListadoClienteComponent,
    ListadoCafeComponent,
    ListadoProveedoresComponent,
    
    
    EditarUsuarioComponent,
    EditarProductoComponent,
    EditarBodegaComponent,
    EditarBeneficioComponent,
    EditarClienteComponent,
    EditarCafeComponent,
    EditarProveedorComponent,
    FacturacionCComponent,
    ComprasComponent,
    EditarComprasComponent,
    CrearComprasComponent,
    VentasComponent,
    EditarVentasComponent,
    CrearVentasComponent,
    ProductosCompraComponent,
    EditarProductosCompraComponent,
    CrearProductosCompraComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    UsuarioService,
    ProductoService,
    BodegaService,
    BeneficioService,
    ClienteService,
    ProveedorService,
    CafeService,
    // JWT
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    // Token interceptor
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
