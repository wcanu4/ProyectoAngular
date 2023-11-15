import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CrearUsuarioComponent } from '../../usuarios/crear-usuario/crear-usuario.component';
import { CrearProductoComponent } from '../../productos/crear-producto/crear-producto.component';
import { CrearBodegaComponent } from '../../bodega/crear-bodega/crear-bodega.component';
import { CrearBeneficioComponent } from '../../beneficio/crear-beneficio/crear-beneficio.component';
import { CrearClienteComponent } from '../../inventario/crear-cliente/crear-cliente.component';
import { ComprasComponent } from '../../compras/compras/compras.component';
import { VentasComponent } from '../../ventas/ventas/ventas.component';
import { ProductosCompraComponent } from '../../productosCompra/productos-compra/productos-compra.component';

import { FacturacionComponent } from '../../inventario/facturacion/facturacion.component';
import { ValeComponent } from '../../proveedor/vale/vale.component';
import { CrearProveedorComponent } from '../../proveedor/crear-proveedor/crear-proveedor.component';
import { CrearCafeComponent } from '../../cafe/crear-cafe/crear-cafe.component';

import { ListadoUsuariosComponent } from '../../usuarios/listado-usuarios/listado-usuarios.component';
import { ListadoProductosComponent } from '../../productos/listado-productos/listado-productos.component';
import { ListadoCafeComponent } from '../../cafe/listado-cafe/listado-cafe.component';
import { ListadoBodegasComponent } from '../../bodega/listado-bodegas/listado-bodegas.component';
import { ListadoClienteComponent } from '../../inventario/listado-cliente/listado-cliente.component';
import { ListadoProveedoresComponent } from '../../proveedor/listado-proveedores/listado-proveedores.component';


import { FacturacionCComponent } from '../../compras/facturacion-c/facturacion-c.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ListadoBeneficioComponent } from '../../beneficio/listado-beneficio/listado-beneficio.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent  {
  OpenUsuario = false;
  OpenUsuarioCrear = false;
  OpenUsuarioLista = false;


  OpenProducto = false;
  OpenProductoCrear = false;
  OpenProductoLista = false;
  OpenClienteCrear = false;
  OpenClienteLista = false;
  OpenFacturacion = false;
  
  OpenBodega = false;
  OpenBodegaCrear = false;
  OpenBodegaLista = false;

  OpenProceso = false;
  OpenProcesoCrear = false;
  OpenProcesoLista = false;

    
  OpenReportes = false;
  OpenCompras = false;
  OpenVentas=false
  
  OpenCompra = false;
  OpenCompraProveedor = false;
  OpenCompraLista = false;
  OpenCompraCafe = false;
  OpenCompraListacafe = false;
  OpenVale = false;



  OpenInventario = false;
  


//toggle para inicializar los botones pero se declaran arriba 

  toggleProducto() {
    this.OpenProducto = !this.OpenProducto;
    this.OpenProductoCrear = false;
    this.OpenClienteCrear = false;
    this.OpenProductoLista = false;
    this.OpenClienteLista = false;
    this.OpenFacturacion = false;

  }
  toggleBodega() {
    this.OpenBodega = !this.OpenBodega;
    this.OpenBodegaCrear = false;
    this.OpenBodegaLista = false;
  }

  toggleCompra(){
    this.OpenCompra = !this.OpenCompra;
    this.OpenCompraProveedor = false;
    this.OpenCompraLista = false;
    this.OpenCompraCafe = false;
    this.OpenCompraListacafe = false;
    this.OpenVale = false;
  }


  toggleProceso() {
    this.OpenProceso = !this.OpenProceso;
    this.OpenProcesoCrear = false;
    this.OpenProcesoLista = false;
  }

  toggleReportes() {
    this.OpenReportes = !this.OpenReportes;
    this.OpenCompras = false;
    this.OpenVentas = false;
  }

  toggleUsuario() {
    this.OpenUsuario = !this.OpenUsuario;
    this.OpenUsuarioCrear = false;
    this.OpenUsuarioLista = false;
  }

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}
  crearUsuario() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(CrearUsuarioComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  crearProducto() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(CrearProductoComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  crearBodega() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(CrearBodegaComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }

  crearBeneficio() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(CrearBeneficioComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }

  crearCliente() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(CrearClienteComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }

  crearProveedor() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(CrearProveedorComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }

  crearCafe() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(CrearCafeComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }

  Facturacion() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(FacturacionComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  Vale() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ValeComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }





  

  listadoUsuario() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ListadoUsuariosComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
   
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  listadoProducto() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ListadoProductosComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  listadoProductoCompras() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ProductosCompraComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  listadoBodega() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ListadoBodegasComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  listadoBeneficio() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ListadoBeneficioComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }

  listadoCliente() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ListadoClienteComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  listadoProveedor() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ListadoProveedoresComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  compras() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ComprasComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  ventas() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(VentasComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  listadoCafe() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ListadoCafeComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  FacturacionCompra() {
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();
    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(FacturacionCComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }




  
  checkPermisoVentas(): boolean {
    const permisos = this.usuarioService.getNameAndRole();
    const permisoVentas = permisos && permisos.ventas.toLowerCase() === "activado";
    return permisoVentas;
  }
  
  checkPermisoCompras(): boolean {
    const permisos = this.usuarioService.getNameAndRole();
    const permisoCompras = permisos && permisos.compras.toLowerCase() === "activado";
    return permisoCompras;
  }
  
  checkPermisoInventario(): boolean {
    const permisos = this.usuarioService.getNameAndRole();
    const permisoInventario = permisos && permisos.inventario.toLowerCase() === "activado";
    return permisoInventario;
  }
  checkPermisoBodega(): boolean {
    const permisos = this.usuarioService.getNameAndRole();
    const permisoBodega = permisos && permisos.bodega.toLowerCase() === "activado";
    return permisoBodega;
  }
  
  checkPermisoProcesos(): boolean {
    const permisos = this.usuarioService.getNameAndRole();
    const permisoProcesos = permisos && permisos.procesos.toLowerCase() === "activado";
    return permisoProcesos;
  }

  
  checkPermisoReportes(): boolean {
    const permisos = this.usuarioService.getNameAndRole();
    const permisoReportes = permisos && permisos.reportes.toLowerCase() === "activado";
    return permisoReportes;
  }
  
  checkPermisoUsuarios(): boolean {
    const permisos = this.usuarioService.getNameAndRole();
    const permisoUsuarios = permisos && permisos.usuarios.toLowerCase() === "activado";
    return permisoUsuarios;
  }



  

  
}
