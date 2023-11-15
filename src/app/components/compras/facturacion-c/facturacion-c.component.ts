import { Component, OnInit, numberAttribute } from '@angular/core';
import { BarracoService } from 'src/app/services/barraco.service'; // I
import { ProveedorService } from 'src/app/services2/proveedor'; // I
import { ComprasService } from 'src/app/services2/compras'; // I
import { ProductoService } from 'src/app/services2/producto'; // I
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PDFDocument, rgb, degrees } from 'pdf-lib';

//import { jsPDF } from 'jspdf';


interface Camada {
  id: number;
  codigo_camada: string;
  cerda_nombre: string;
  tip_carga: string;
  lechones: number;
  precio_unidad: string;
  vender: number; // Agrega la propiedad 'vender' de tipo número
  // Agrega más propiedades si es necesario
}
interface Producto {
  id: number;
  nombreProducto: string;
  tipoProducto: string;
  descripcion: string;
  precio: number;
  stock: number;
  fechaVencimiento: Date; // Agrega la propiedad 'vender' de tipo número
  provedorID:number;
  vender: number; // Agrega la propiedad 'vender' de tipo número
  // Agrega más propiedades si es necesario
}
interface Cliente {
  nit:string;
  id: number;
  nombre: string;
  telefono:string;
  correo:string;
  direccion:string;
  
  // Agrega más propiedades si es necesario
}
interface Proveedor {
  id:number;
  nombreProveedor:string;
  telefono: string;
  email: string;
  direccion:string;
  ciudad:string;
  
  // Agrega más propiedades si es necesario
}
@Component({
  selector: 'app-facturacion-c',
  templateUrl: './facturacion-c.component.html',
  styleUrls: ['./facturacion-c.component.css']
})
export class FacturacionCComponent  implements OnInit{
  
  camadas: Camada[] = [];
  camadaSeleccionada: Camada | undefined;
  mostrarSeleccionCamada: boolean = false;
  itemsFacturaCamada:Camada[] = [];


  productos: Producto[] = [];
  productoSeleccionado: Producto | undefined;
  mostrarSeleccionProducto: boolean = false;
  itemsFacturaProducto:Producto[] = [];
  mostrarCamposNuevoProducto = false;
  mostrarCamposProductoExistente = true;


  proveedores:Proveedor[]=[];
  proveedorSelecionado:Proveedor | undefined;
  mostrarCamposNuevoProveedor = false;
  mostrarCamposProveedorExistente =true;

  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente | undefined;
  mostrarCamposNuevoCliente = false;
  mostrarCamposClienteExistente = true;
   // Variable para la configuración común de Toastr
   toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos
  
nuevoProveedor={
  nombreProveedor:'',
  telefono: '',
  email: '',
  direccion:'',
  ciudad:'',

}
nuevoProducto={
  nombreProducto:'',
  tipoProducto: '',
  descripcion: '',
  precio:'',
  fechaVencimiento:'',
  provedorID:'',
  stock:'',
  vender:'',
}
  nuevoCliente = {
    nit: '',
    nombre: '',
    telefono: '',
    correo: '',
    direccion: ''
  };

  constructor(
    private barracoService: BarracoService,
    private comprasService: ComprasService,
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private http: HttpClient,

    private cdr: ChangeDetectorRef, // Agrega esta línea

    
    ) {}

  alternarCamposNuevoCliente() {
    this.mostrarCamposNuevoCliente = !this.mostrarCamposNuevoCliente;
    this.mostrarCamposClienteExistente = !this.mostrarCamposClienteExistente;
  }
  alternarCamposNuevoProveedor() {
    this.mostrarCamposNuevoProveedor = !this.mostrarCamposNuevoProveedor;
    this.mostrarCamposProveedorExistente = !this.mostrarCamposProveedorExistente;
  }
  alternarCamposNuevoProducto() {
    this.mostrarCamposNuevoProducto = !this.mostrarCamposNuevoProducto;
    this.mostrarCamposProductoExistente = !this.mostrarCamposProductoExistente;
  }
 
  seleccionarCamada(event: any) {
    const camadaId = event.target.value;
  
    if (camadaId === "ocultar") {
      // Si se selecciona "Ocultar Camada", oculta los datos de la camada
      this.camadaSeleccionada = undefined;
    } else {
      // Si se selecciona una camada diferente, obtén sus datos
      this.http.get<Camada>(`https://cafebase-backend-production.up.railway.app/camadalechones/camadaLechones/${camadaId}`)
        .subscribe((camada: Camada) => {
          console.log('Camada seleccionada:', camada);
          this.camadaSeleccionada = camada;
        }, error => {
          console.error('Error al seleccionar la camada:', error);
        });
    }
  }
  
  seleccionarProducto(event: any) {
    const productoId = event.target.value;
  
    if (productoId === "ocultar") {
      // Si se selecciona "Ocultar Camada", oculta los datos de la camada
      this.productoSeleccionado = undefined;
    } else {
      // Si se selecciona una camada diferente, obtén sus datos
      this.http.get<Producto>(`https://cafebase-backend-production.up.railway.app/producto/producto/${productoId}`)
        .subscribe((producto: Producto) => {
          console.log('Producto seleccionado:', producto);
          this.productoSeleccionado = producto;
        }, error => {
          console.error('Error al seleccionar la camada:', error);
        });
    }
  }
  seleccionarCliente(event: any) {
    const clienteId = event.target.value;
    
    if (clienteId === "ocultar") {
      // Si se selecciona "Ocultar Cliente", oculta los datos del cliente
      this.clienteSeleccionado = undefined;
      this.mostrarCamposClienteExistente = false;
    } else {
      // Si se selecciona un cliente diferente, obtén sus datos
      this.http.get<Cliente>(`https://cafebase-backend-production.up.railway.app/cliente/cliente/${clienteId}`)
        .subscribe((cliente: Cliente) => {
          console.log('Cliente seleccionado:', cliente);
          this.clienteSeleccionado = cliente;
          // Muestra los campos del cliente existente y oculta los del nuevo cliente
          this.mostrarCamposNuevoCliente = false;
          this.mostrarCamposClienteExistente = true;
  
          // Luego, si el cliente se selecciona aquí, el clienteSeleccionado se establecerá correctamente.
        }, error => {
          console.error('Error al seleccionar el cliente:', error);
        });
    }
  }
  seleccionarProveedor(event: any) {
    const ProveedorId = event.target.value;
    
    if (ProveedorId === "ocultar") {
      // Si se selecciona "Ocultar Cliente", oculta los datos del cliente
      this.proveedorSelecionado = undefined;
      this.mostrarCamposProveedorExistente = false;
    } else {
      // Si se selecciona un cliente diferente, obtén sus datos
      this.http.get<Proveedor>(`https://cafebase-backend-production.up.railway.app/proveedor/proveedor/${ProveedorId}`)
        .subscribe((proveedor: Proveedor) => {
          console.log('Cliente seleccionado:', proveedor);
          this.proveedorSelecionado = proveedor;
          // Muestra los campos del cliente existente y oculta los del nuevo cliente
          this.mostrarCamposNuevoProveedor = false;
          this.mostrarCamposProveedorExistente = true;
  
          // Luego, si el cliente se selecciona aquí, el clienteSeleccionado se establecerá correctamente.
        }, error => {
          console.error('Error al seleccionar el cliente:', error);
        });
    }
  }
  ngOnInit(): void {

    this.proveedorService.getData().subscribe(data => {
      this.proveedores = data;
      console.log('Datos de proveedores obtenidos:', data);
    });
    this.productoService.getData().subscribe(data => {
      this.productos = data;
      console.log('Datos de productos obtenidos:', data);
    });
  }


  agregarProductoFactura() {
    if (this.productoSeleccionado) {
      const existeItemProducto = this.itemsFacturaProducto.some((itemProducto) => itemProducto.id === this.productoSeleccionado!.id);
  
      if (!existeItemProducto) {
        // Agrega la cantidad a vender a la camada seleccionada, incluso si es cero
        const productoConCantidad = { ...this.productoSeleccionado };
        productoConCantidad.vender = this.productoSeleccionado.vender;
  
        this.itemsFacturaProducto.push(productoConCantidad);
  
        // Crea la alerta visual de éxito usando toastrConfig
      
        console.log('Valores de itemsFactura después de agregar:', this.itemsFacturaProducto);
      } else {
        // Crea la alerta visual de advertencia usando toastrConfig
    
      }
    } else {
      // Crea la alerta visual de error si no se ha seleccionado ningún barraco
   
    }
  }
  calcularTotalFactura() {
    let total = 0;
    for (const itemFactura of this.itemsFacturaProducto) {
      const precioNumerico = parseFloat(itemFactura.precio.toString()); // Convierte temporalmente a número
      const cantidad = itemFactura.vender;
  
      if (!isNaN(precioNumerico) && !isNaN(cantidad)) {
        total += precioNumerico * cantidad;
      }
    }
    return total.toFixed(2); // Esto convierte el resultado de vuelta a una cadena (string) con dos decimales
  }
  facturado = false;

  agregarAlInventario() {
    // Crea un objeto contenedor con los datos del nuevo producto
    const contenedorLocalProducto = {
      nombreProducto: this.nuevoProducto.nombreProducto,
      tipoProducto: this.nuevoProducto.tipoProducto,
      descripcion: this.nuevoProducto.descripcion,
      precio: parseFloat(this.nuevoProducto.precio), // Convierte a número
      stock: parseFloat(this.nuevoProducto.stock), // Convierte a número
      fechaVencimiento: this.nuevoProducto.fechaVencimiento,
      proveedorID: this.proveedorSelecionado?.id || 0, // Usa 0 o un valor por defecto apropiado en caso de que proveedorSelecionado sea undefined
      vender: parseFloat(this.nuevoProducto.vender), // Convierte a número
    };
  
    // Llama al servicio para insertar el nuevo producto
    this.productoService.insert(contenedorLocalProducto).subscribe(
      (responseProducto: any) => {
        console.log('Nuevo producto insertado con éxito:', responseProducto);
  
        // Ahora que tenemos el ID del nuevo producto, puedes realizar otras operaciones si es necesario.
  
        // Por ejemplo, puedes borrar los campos del formulario o realizar alguna otra acción.
        this.proveedorSelecionado = undefined;
        this.mostrarCamposNuevoProducto = false;
        this.mostrarCamposNuevoProveedor = false;
        this.mostrarCamposProveedorExistente = false;
        this.productoSeleccionado = undefined;
        this.limpiarCamposNuevoProducto();
        this.refrescarVistaSeleccion();
  
      },
      (errorProducto) => {
        console.error('Error al insertar el nuevo producto:', errorProducto);
      }
    );
  }
  limpiarCamposNuevoProducto() {
    this.nuevoProducto = {
      nombreProducto: '',
      tipoProducto: '',
      descripcion: '',
      precio: '', // Puedes asignar el valor por defecto que desees aquí, pero mantén el tipo como `string` si es necesario
      stock: '', // Puedes asignar el valor por defecto que desees aquí, pero mantén el tipo como `string` si es necesario
      fechaVencimiento: '', // Ajusta a la fecha adecuada si es necesario
      provedorID: '', // Asegúrate de que sea una cadena (string) si es necesario
      vender: '', // Puedes asignar el valor por defecto que desees aquí, pero mantén el tipo como `string` si es necesario
    };
  }
  async cargarLogo(): Promise<ArrayBuffer> {
    const logoUrl = '/assets/logotipo.png'; // Ruta al archivo del logo
    try {
      const logoBytes = await this.http.get(logoUrl, { responseType: 'arraybuffer' }).toPromise();
      return logoBytes || new ArrayBuffer(0); // Asegura que no se devuelve undefined
    } catch (error) {
      console.error('Error al cargar el logo:', error);
      return new ArrayBuffer(0); // Devolver un ArrayBuffer vacío en caso de error
    }
  }
  async generarFacturaCompraPDF(proveedorFactura: any, itemsFactura: any) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    const fontSize = 20;
    let yOffset = height - 50;
  
    const logoBytes = await this.cargarLogo(); // Cargar el logo desde /assets
    const logoImage = await pdfDoc.embedPng(logoBytes);
    page.drawImage(logoImage, {
      x: 50,
      y: yOffset - 30,
      width: 100,
      height: 40,
    });
  
    // Sección de encabezado
    page.drawText('Factura de Compra', {
      x: 150,
      y: height - 2 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
  // Sección de encabezado
  page.drawText('Factura de Compra', {
    x: 150,
    y: height - 2 * fontSize,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  // Datos de la empresa (quemados)
  page.drawText('Empresa XYZ', {
    x: 50,
    y: height - 5 * fontSize,
    size: fontSize,
    color: rgb(0, 0, 0),
  });
  page.drawText('Dirección: Calle 123, Ciudad ABC', {
    x: 50,
    y: height - 6 * fontSize,
    size: fontSize - 10,
    color: rgb(0, 0, 0),
  });

   // Fecha actual
   const fechaActual = new Date();
   page.drawText(`Fecha: ${fechaActual.toLocaleDateString()}`, {
     x: 400,
     y: height - 7 * fontSize,
     size: fontSize - 10,
     color: rgb(0, 0, 0),
   });
 
   // Número de factura único (generado aleatoriamente)
   const numeroFactura = Math.floor(Math.random() * 1000000); // Genera un número aleatorio de 6 dígitos
   page.drawText(`N° Factura: ${numeroFactura}`, {
     x: 400,
     y: height - 8 * fontSize,
     size: fontSize - 10,
     color: rgb(0, 0, 0),
   });
    // Sección de datos del proveedor
    yOffset -= 5 * fontSize;
    if (proveedorFactura.nombreProveedor) {
      page.drawText(`Proveedor: ${proveedorFactura.nombreProveedor}`, {
        x: 50,
        y: yOffset,
        size: fontSize - 10,
        color: rgb(0, 0, 0),
      });
      yOffset -= fontSize;
    }
    if (proveedorFactura.telefono) {
      page.drawText(`Teléfono: ${proveedorFactura.telefono}`, {
        x: 50,
        y: yOffset,
        size: fontSize - 10,
        color: rgb(0, 0, 0),
      });
      yOffset -= fontSize;
    }
  
    // Sección de detalles de los productos
    yOffset -= 5 * fontSize;
    page.drawText('DETALLE DE LA COMPRA:', {
      x: 50,
      y: yOffset,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
    yOffset -= 2 * fontSize;
    page.drawText('NOMBRE/PRODUCTO', {
      x: 50,
      y: yOffset,
      size: fontSize - 4,
      color: rgb(0, 0, 0),
    });
    page.drawText('CANTIDAD', {
      x: 235,
      y: yOffset,
      size: fontSize - 5,
      color: rgb(0, 0, 0),
    });
    page.drawText('PRECIO UNITARIO', {
      x: 350,
      y: yOffset,
      size: fontSize - 5,
      color: rgb(0, 0, 0),
    });
    page.drawText('TOTAL', {
      x: 500,
      y: yOffset,
      size: fontSize - 5,
      color: rgb(0, 0, 0),
    });
  
    for (const item of itemsFactura) {
      yOffset -= 2 * fontSize;
      page.drawText(item.nombreProducto || '', {
        x: 50,
        y: yOffset,
        size: fontSize - 10,
        color: rgb(0, 0, 0),
      });
      page.drawText((item.vender || 0).toString(), {
        x: 245,
        y: yOffset,
        size: fontSize - 10,
        color: rgb(0, 0, 0),
      });
    
      page.drawText((item.precio || 0).toString(), {
        x: 350,
        y: yOffset,
        size: fontSize - 10,
        color: rgb(0, 0, 0),
      });
    
      page.drawText(((item.vender || 0) * (item.precio || 0)).toString(), {
        x: 500,
        y: yOffset,
        size: fontSize - 10,
        color: rgb(0, 0, 0),
      });
    }
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'factura_compra.pdf';
    a.click();
  }
    
  
  facturar() {
    // Comprobar si se debe crear un nuevo proveedor

  
    if (this.mostrarCamposNuevoProveedor) {
      // Aquí construye el objeto contenedorLocal con los datos del nuevo proveedor
      const contenedorLocal = {
        nombreProveedor: this.nuevoProveedor.nombreProveedor,
        telefono: this.nuevoProveedor.telefono,
        email: this.nuevoProveedor.email,
        direccion: this.nuevoProveedor.direccion,
        ciudad: this.nuevoProveedor.ciudad,
      };
  
      // Llama al servicio para insertar el nuevo cliente
      this.proveedorService.insert(contenedorLocal).subscribe(
        (response: any) => {
          console.log('Nuevo cliente insertado con éxito:', response);
          // Ahora que tenemos el ID del nuevo proveedor, procede con la facturación
          this.proveedorSelecionado = {
            id: response.id,  // Utiliza el ID devuelto en la respuesta
            ...contenedorLocal, // Copia los demás datos del nuevo proveedor
          };
          this.realizarFacturacion();
        },
        (error) => {
          console.error('Error al insertar el nuevo cliente:', error);
        }
      );
    } else {
      // No se necesita crear un nuevo proveedor, procede con la facturación directamente
      this.realizarFacturacion();

    }
  }
  
  private realizarFacturacion() {
    // Obtener los datos del Proveedor seleccionado (si existe)
    let proveedorFactura = {
      nombreProveedor: '',
      telefono: '',
      email: '',
      direccion: '',
      ciudad: '',
    };
    if (this.proveedorSelecionado) {
      proveedorFactura = {
        nombreProveedor: this.proveedorSelecionado.nombreProveedor,
        telefono: this.proveedorSelecionado.telefono,
        email: this.proveedorSelecionado.email,
        direccion: this.proveedorSelecionado.direccion,
        ciudad: this.proveedorSelecionado.ciudad
      };
      console.log('Datos del proveedor enviados al pdf:', proveedorFactura);
    }
  
    if (this.itemsFacturaProducto.length > 0) {
      // Resto de la lógica de facturación
      this.itemsFacturaProducto.forEach(producto => {
        const productoId = producto.id;
        const cantidadVendida = producto.vender;

   

  
        // Realiza la actualización en la base de datos
        this.productoService.actualizarCantidadStock(productoId, cantidadVendida).subscribe(
          (response) => {
            // La actualización fue exitosa
            console.log('Cantidad de lechones actualizada:', response);
          },
          (error) => {
            console.error('Error al actualizar la cantidad de lechones:', error);
          }
        );
  
        // Convierte el precio_unidad en un número
        // const precioUnidadNumber = parseFloat(producto.precio);
      // Verifica si el precio es un número antes de usarlo
      const precioUnidadNumber = producto.precio;

      if (!isNaN(precioUnidadNumber)) {
        // Construye los datos de la venta
        const compraData = {
          nombreProducto: producto.nombreProducto,
          cantidad_vendida: cantidadVendida,
          precio_unitario: precioUnidadNumber,
          total: cantidadVendida * precioUnidadNumber,
          IDProveedor: this.proveedorSelecionado?.id || 0,
          IDProducto: productoId,
          fecha: new Date()
        };
        console.log('Datos mandados a insertarse en ventas:', compraData);
  
        // Realiza la inserción en la base de datos (cambia esto según tu servicio o lógica)
        this.comprasService.insert(compraData).subscribe(
          (response) => {
            console.log('Venta insertada con éxito:', response);
          },
          (error) => {
            console.error('Error al insertar la venta:', error);
          }
        );
       }});
     // this.generarFacturaPDF(proveedorFactura);
      // Restablece la factura
      console.log('Detalle de la compra:', this.itemsFacturaProducto); 
      this.generarFacturaCompraPDF(proveedorFactura, this.itemsFacturaProducto);
      this.itemsFacturaProducto = [];
    }
  
    // Restablece la selección de cliente y barraco
    this.proveedorSelecionado = undefined;
    this.mostrarCamposNuevoProducto = false;
    this.mostrarCamposNuevoProveedor = false;
    this.mostrarCamposProveedorExistente = false;
    this.productoSeleccionado = undefined;
  
    // Resto de la lógica
    this.facturado = true;
    
    // Refresca la vista de selección de barracos y clientes
    this.refrescarVistaSeleccion();
  }



    pulsarBotonFacturar() {
      // Simula el evento click en el botón de facturar
      const botonFacturar = document.getElementById('botonFacturar');
      if (botonFacturar) {
        botonFacturar.click();
      }
    }
  
    refrescarVistaSeleccion() {
      // Vuelve a consultar los datos de barraco y cliente para mantener la vista actualizada
      this.productoService.getData().subscribe(data => {
        this.productos = data;
        console.log('Datos de lechones obtenidos:', data);
      });
    
      this.proveedorService.getData().subscribe(data => {
        this.proveedores = data;
        console.log('Datos de clientes obtenidos:', data);
      });
    }
  agregarCamada() {
    this.mostrarSeleccionCamada = true;
  }

  eliminarItemFactura(index: number) {
    if (index >= 0 && index < this.itemsFacturaProducto.length) {
      this.itemsFacturaProducto.splice(index, 1); // Elimina el elemento de la lista
    }
  }

}
