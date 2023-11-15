import { Component, OnInit, numberAttribute } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service'; // I
import { ClienteService } from 'src/app/services/cliente.service'; // I
import { VentasService } from 'src/app/services/ventas'; // I
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PDFDocument, rgb, degrees } from 'pdf-lib';
import { StandardFonts } from 'pdf-lib';


// campos de los barros de la base de datos 
interface Producto {
  id: number;
  code: string;
  product: string;
  presentation: string;
  sale_price: string;
  existence: string;
  vender:number;

  
  // Agrega más propiedades si es necesario
}// campos de los clientes de la base de datos 
interface Cliente {
  nit:string;
  id: number;
  nombre: string;
  telefono:string;
  correo:string;
  direccion:string;
  
  // Agrega más propiedades si es necesario
}


@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {
  

  productos: Producto[] = [];
  productoSeleccionado: Producto | undefined;
  nombreCliente: string = '';
  itemsFactura: Producto[] = [];
  mostrarSeleccionProductos: boolean = false;

  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente | undefined;
  mostrarCamposNuevoCliente = false;
  mostrarCamposClienteExistente = true;
   // Variable para la configuración común de Toastr
   toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos
  



  nuevoCliente = {
    nit: '',
    nombre: '',
    telefono: '',
    correo: '',
    direccion: ''
  };


  constructor(
    private productoService: ProductoService,
    private ventasService: VentasService,
    private clienteService: ClienteService,
    private http: HttpClient,

    private cdr: ChangeDetectorRef, // Agrega esta línea

    
    ) {}
   
  alternarCamposNuevoCliente() {
    this.mostrarCamposNuevoCliente = !this.mostrarCamposNuevoCliente;
    this.mostrarCamposClienteExistente = !this.mostrarCamposClienteExistente;
  }

  
  seleccionarBarraco(event: any) {
    const productId = event.target.value;
    
    if (productId === "ocultar") {
      // Si se selecciona "Ocultar Barraco", oculta los datos del barraco
      this.productoSeleccionado = undefined;
    } else {
      // Si se selecciona un barraco diferente, obtén sus datos
      this.http.get<Producto>(`https://cafebase-backend-production.up.railway.app/product/product/${productId}`)
        .subscribe((producto: Producto) => {
          console.log('Barraco seleccionado:', producto);
          this.productoSeleccionado = producto;
        }, error => {
          console.error('Error al seleccionar el barraco:', error);
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
          this.clienteSeleccionado = cliente;// Trae los datos del cliente seleccionado y lo almacena en la variable "cliente"
          // Muestra los campos del cliente existente y oculta los del nuevo cliente
          this.mostrarCamposNuevoCliente = false;
          this.mostrarCamposClienteExistente = true;
        }, error => {
          console.error('Error al seleccionar el cliente:', error);
        });
    }
  }
  
  
  //esta funcion trae las tablas completas y se asinga en una variable "barracos " y "clientes"
  ngOnInit(): void {
    this.productoService.getData().subscribe(data => {
      this.productos = data;
      console.log('Datos de barracos obtenidos:', data);
    });
    this.clienteService.getData().subscribe(data => {
      this.clientes = data;
      console.log('Datos de clientes obtenidos:', data);
    });
  }


  agregarItemFactura() {
    if (this.productoSeleccionado) {
      const existeItem = this.itemsFactura.some((item) => item.id === this.productoSeleccionado!.id);
  
      if (!existeItem) {
        this.itemsFactura.push(this.productoSeleccionado);
  
        // Crea la alerta visual de éxito usando toastrConfig
      
        console.log('Valores de itemsFactura después de agregar:', this.itemsFactura);
      } else {
        // Crea la alerta visual de advertencia usando toastrConfig
      
      }
    } else {
      // Crea la alerta visual de error usando toastrConfig
     
    }
  }
  

  
  calcularSubtotal(item: Producto): number {
    const precioNumerico = parseFloat(item.sale_price);
    const cantidadVender = item.vender;
  
    if (!isNaN(precioNumerico) && !isNaN(cantidadVender)) {
      return precioNumerico * cantidadVender;
    }
  
    return 0; // Si los valores no son válidos, retorna 0
  }
  
  calcularTotalFactura(): number {
    let total = 0;
    for (const item of this.itemsFactura) {
      total += this.calcularSubtotal(item);
    }
  
    return total;
  }
  
  facturado = false;


// Función para cargar el logo desde la carpeta 'assets' de tu proyecto
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

async generarFacturaPDF(clienteFactura: any, itemsFactura: any) {
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
  page.drawText('Factura ve Venta', {
    x: 150,
    y: height - 2 * fontSize,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

    // Sección de encabezado
    page.drawText('Factura de Ventas', {
      x: 150,
      y: height - 2 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
  // Sección de encabezado
  page.drawText('Factura de Ventas', {
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
  // Sección de datos del cliente
  yOffset -= 5 * fontSize;
  if (clienteFactura.nombre) {
    page.drawText(`Cliente: ${clienteFactura.nombre}`, {
      x: 50,
      y: yOffset,
      size: fontSize - 10,
      color: rgb(0, 0, 0),
    });
    yOffset -= fontSize;
  }
  if (clienteFactura.nit) {
    page.drawText(`Nit: ${clienteFactura.nit}`, {
      x: 50,
      y: yOffset,
      size: fontSize - 10,
      color: rgb(0, 0, 0),
    });
    yOffset -= fontSize;
  }

  // Sección de detalles de los productos
 // Sección de detalles de la venta
yOffset -= 5 * fontSize;
page.drawText('DETALLE DE LA VENTA:', {
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
  x: 225,
  y: yOffset,
  size: fontSize - 5,
  color: rgb(0, 0, 0),
});
page.drawText('PRECIO', {
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
  page.drawText(item.product, {
    x: 50,
    y: yOffset,
    size: fontSize - 10,
    color: rgb(0, 0, 0),
  });
  page.drawText(item.vender.toString(), {
    x: 230,
    y: yOffset,
    size: fontSize - 10,
    color: rgb(0, 0, 0),
  });
  
  page.drawText(item.sale_price.toString(), {
    x: 350,
    y: yOffset,
    size: fontSize - 10,
    color: rgb(0, 0, 0),
  });
  
  page.drawText((item.vender * item.sale_price).toString(), {
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
  a.download = 'factura.pdf';
  a.click();
}


  facturar() {
    // Obtener los datos del cliente seleccionado (si existe)
    let clienteFactura = {
      nombre: '',
      nit: '',
      telefono: '',
      correo: '',
      direccion: ''
    };
  
    if (this.clienteSeleccionado) {
      clienteFactura = {
        nombre: this.clienteSeleccionado.nombre,
        nit: this.clienteSeleccionado.nit,
        telefono: this.clienteSeleccionado.telefono,
        correo: this.clienteSeleccionado.correo,
        direccion: this.clienteSeleccionado.direccion
      };
      console.log('Datos del cliente enviados al pdf:', clienteFactura);
    }
  
    if (this.itemsFactura.length > 0) {
      // Recorre todos los elementos de la factura
      this.itemsFactura.forEach(product => {
        const productoId = product.id;
        const cantidadVendida = product.vender;
  
        // Realiza la actualización en la base de datos
        this.productoService. actualizarCantidadLechones(productoId, cantidadVendida).subscribe(
          (response) => {
            // La actualización fue exitosa
            console.log('Cantidad de productos actualizada:', response);
            this.refrescarVistaSeleccion();
          },
          (error) => {
            console.error('Error al actualizar la cantidad de productos:', error);
          }
        );
  
        // Convierte el precio en un número si es necesario
        const precioUnidadNumber = parseFloat(product.sale_price);
        if (isNaN(precioUnidadNumber)) {
          console.error('El precio no es un número válido:', product.sale_price);
          return;
        }
  
        // Calcula el total de la venta
        const totalVenta = cantidadVendida * precioUnidadNumber;
  
        // Construye los datos de la venta
        const ventaData = {
          product: product.product,
          code: product.code,
          sale_price: precioUnidadNumber,
          vender: cantidadVendida,
          total: totalVenta,
          fecha: new Date(),
          nit:clienteFactura.nit,
          nombre:clienteFactura.nombre
   
        };
  
        console.log('Datos mandados a insertarse en ventas:', ventaData);
  
        // Realiza la inserción en la base de datos (ajusta esto según tu servicio o lógica)
        this.ventasService.insertarVenta(ventaData).subscribe(
          (response) => {
            console.log('Venta insertada con éxito:', response);
            this.refrescarVistaSeleccion();
          },
          (error) => {
            console.error('Error al insertar la venta:', error);
          }
        );
      });
  
      // Genera la factura en PDF (ajusta esta parte según tus necesidades)
    //  this.generarFacturaPDF(clienteFactura);

    this.generarFacturaPDF(clienteFactura, this.itemsFactura);
      // Restablece la factura
      this.itemsFactura = [];
    }
  
    // Restablece la selección de cliente y producto
    this.clienteSeleccionado = undefined;
    this.mostrarCamposClienteExistente = false;
    this.productoSeleccionado = undefined;
  
    if (this.mostrarCamposNuevoCliente) {
      // Aquí construye el objeto contenedorLocal con los datos del nuevo cliente
      const contenedorLocal = {
        nit: this.nuevoCliente.nit,
        nombre: this.nuevoCliente.nombre,
        telefono: this.nuevoCliente.telefono,
        correo: this.nuevoCliente.correo,
        direccion: this.nuevoCliente.direccion
      };
  
      // Llama al servicio para insertar el nuevo cliente
      this.clienteService.insert(contenedorLocal).subscribe(
        (response) => {
          console.log('Nuevo cliente insertado con éxito:', response);
          this.refrescarVistaSeleccion();
  
          // Ocultar los campos de nuevo cliente y restablecer el objeto nuevoCliente
          this.mostrarCamposNuevoCliente = false;
          this.nuevoCliente = {
            nit: '',
            nombre: '',
            telefono: '',
            correo: '',
            direccion: ''
          };
        },
        (error) => {
          console.error('Error al insertar el nuevo cliente:', error);
        }
      );
    }
  }
  


  pulsarBotonFacturar() {
    // Simula el evento click en el botón de facturar
    const botonFacturar = document.getElementById('botonFacturar');
    if (botonFacturar) {
      botonFacturar.click();
    }
  }

// Esto sirve para actualizar los datos de los clientes y barros que se han agregado o eliminado 
  refrescarVistaSeleccion() {
    // Vuelve a consultar los datos de barraco y cliente para mantener la vista actualizada
    this.productoService.getData().subscribe(data => {
      this.productos = data;
      console.log('Datos de barracos obtenidos:', data);
    });
  
    this.clienteService.getData().subscribe(data => {
      this.clientes = data;
      console.log('Datos de clientes obtenidos:', data);
    });
  }



  // Función para eliminar un barraco por su ID
  eliminarBarraco(productId: number) {
    this.http.delete(`https://cafebase-backend-production.up.railway.app/product/productEliminar/${productId}`)
      .subscribe(() => {
        // La eliminación en la base de datos fue exitosa.
        // Puedes realizar otras operaciones si es necesario.
      }, error => {
        console.error('Error al eliminar el barraco:', error);
      });
    }

  agregarBarraco() {
    this.mostrarSeleccionProductos = true;
  }

  // Agregar una función para seleccionar otro barraco 
  seleccionarBarracoAdicional(event: any) {
    const productId = event.target.value;
    this.http.get<Producto>(`https://cafebase-backend-production.up.railway.app/product/product/${productId}`)
      .subscribe((product: Producto) => {
        this.itemsFactura.push(product);
      }, error => {
        console.error('Error al seleccionar el barraco adicional:', error);
      });
  }

  
  eliminarItemFactura(index: number) {
    if (index >= 0 && index < this.itemsFactura.length) {
      this.itemsFactura.splice(index, 1); // Elimina el elemento de la lista
    }
  }
  
}