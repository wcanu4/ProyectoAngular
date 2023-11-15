import { Component, OnInit, numberAttribute } from '@angular/core';
import { CafeService } from 'src/app/services/cafe.service'; // I
import { ProveedorService } from 'src/app/services/proveedor.service'; // I
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';




// campos de los barros de la base de datos 
interface Cafe {
  id: number;
  libra: string;
  precio: string;
  cosecha: string;


  
  // Agrega más propiedades si es necesario
}// campos de los clientes de la base de datos 
interface Proveedor {
  id: number;
  nit:string;
  dpi: string;  
  nombre: string;
  direccion:string;
  telefono:string;
  telefono2:string;
  
  // Agrega más propiedades si es necesario
}


@Component({
  selector: 'app-vale',
  templateUrl: './vale.component.html',
  styleUrls: ['./vale.component.css']
})

export class ValeComponent implements OnInit {
  

  cafes: Cafe[] = [];
  cafeSeleccionado: Cafe | undefined;
  nombreProveedor: string = '';
  itemsFactura: Cafe[] = [];
  mostrarSeleccionCafes: boolean = false;


  proveedores: Proveedor[] = [];
  proveedorSeleccionado: Proveedor | undefined;
  mostrarCamposNuevoProveedor = false;
  mostrarCamposProveedorExistente = true;
   // Variable para la configuración común de Toastr
   toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos
  



  nuevoProveedor = {
    nit: '',
    dpi: '',
    nombre: '',
    direccion: '',
    telefono: '',
    telefono2: '',
  };




  constructor(
    private cafeService: CafeService,
    private proveedorService: ProveedorService,
    private http: HttpClient,

    private cdr: ChangeDetectorRef, // Agrega esta línea

    
    ) {}
   
  alternarCamposNuevoProveedor() {
    this.mostrarCamposNuevoProveedor = !this.mostrarCamposNuevoProveedor;
    this.mostrarCamposProveedorExistente = !this.mostrarCamposProveedorExistente;
  }


  
  seleccionarCafe(event: any) {
    const cafeId = event.target.value;
    
    if (cafeId === "ocultar") {
      // Si se selecciona "Ocultar Barraco", oculta los datos del barraco
      this.cafeSeleccionado = undefined;
    } else {
      // Si se selecciona un barraco diferente, obtén sus datos
      this.http.get<Cafe>(`https://cafebase-backend-production.up.railway.app/cafe/cafe/${cafeId}`)
        .subscribe((cafe: Cafe) => {
          console.log('Cafe seleccionado:', cafe);
          this.cafeSeleccionado = cafe;
        }, error => {
          console.error('Error al seleccionar el cafe:', error);
        });
    }
  }
  


  seleccionarProveedor(event: any) {
    const proveedorId = event.target.value;
    
    if (proveedorId === "ocultar") {
      // Si se selecciona "Ocultar Cliente", oculta los datos del cliente
      this.proveedorSeleccionado = undefined;
      this.mostrarCamposProveedorExistente = false;
    } else {
      // Si se selecciona un cliente diferente, obtén sus datos
      this.http.get<Proveedor>(`https://cafebase-backend-production.up.railway.app/proveedor/proveedor/${proveedorId}`)
        .subscribe((proveedor: Proveedor) => { 
          console.log('Cliente seleccionado:', proveedor);
          this.proveedorSeleccionado = proveedor;// Trae los datos del cliente seleccionado y lo almacena en la variable "cliente"
          // Muestra los campos del cliente existente y oculta los del nuevo cliente
          this.mostrarCamposNuevoProveedor = false;
          this.mostrarCamposProveedorExistente = true;
        }, error => {
          console.error('Error al seleccionar el proveedor:', error);
        });
    }
  }
  
  
  //esta funcion trae las tablas completas y se asinga en una variable "barracos " y "clientes"
  ngOnInit(): void {
    this.cafeService.getData().subscribe(data => {
      this.cafes = data;
      console.log('Datos de cafe obtenidos:', data);
    });
    this.proveedorService.getData().subscribe(data => {
      this.proveedores = data;
      console.log('Datos de proveedor obtenidos:', data);
    });
  }


  agregarItemFactura() {
    if (this.cafeSeleccionado) {
      const existeItem = this.itemsFactura.some((item) => item.id === this.cafeSeleccionado!.id);
  
      if (!existeItem) {
        this.itemsFactura.push(this.cafeSeleccionado);
  
        // Crea la alerta visual de éxito usando toastrConfig
      
        console.log('Valores de itemsFactura después de agregar:', this.itemsFactura);
      } else {
        // Crea la alerta visual de advertencia usando toastrConfig
      
      }
    } else {
      // Crea la alerta visual de error usando toastrConfig
     
    }
  }
  

  
  calcularTotalFactura() {  
    let total = 0;
    for (const item of this.itemsFactura) {
      const precioNumerico = parseFloat(item.precio);
      if (!isNaN(precioNumerico)) {
        total += precioNumerico;
      }
    }
    
    

    return total.toFixed(2);
  }
  
  facturado = false;



  facturar() {
     // Restablece la selección de cliente y barraco
  this.proveedorSeleccionado = undefined;    // al facturar limpia los campos para volver a ingresar un nuevo dato  
  this.mostrarCamposProveedorExistente = false; //  al facturar limpia los campos para volver a ingresar un nuevo dato 
  this.cafeSeleccionado = undefined;       // al facturar limpia los campos para volver a ingresar un nuevo dato  
    if (this.mostrarCamposNuevoProveedor) {
      // Aquí construye el objeto contenedorLocal con los datos del nuevo cliente
      const contenedorLocal = { // inserta nuevo cliente si no detecta que el cliente ya existe 
        nit: this.nuevoProveedor.nit,
        dpi: this.nuevoProveedor.dpi,
        nombre: this.nuevoProveedor.nombre,
        direccion: this.nuevoProveedor.direccion,
        telefono: this.nuevoProveedor.telefono,
        telefono2: this.nuevoProveedor.telefono2,
        
        
      };
  
      // Llama al servicio para insertar el nuevo cliente
      this.proveedorService.insert(contenedorLocal).subscribe(
        (response) => {
          // Manejar la respuesta del servidor si es necesario
        
          console.log('Nuevo proveedor insertado con éxito:', response);
  
          // Ocultar los campos de nuevo cliente y restablecer el objeto nuevoCliente
          this.mostrarCamposNuevoProveedor = false;
          this.nuevoProveedor = {
            nit: '',
            dpi: '',
            nombre: '',
            direccion: '',
            telefono: '',
            telefono2: '',


          };
          this.refrescarVistaSeleccion();
        },
        (error) => {
          // Manejar errores si es necesario
          console.error('Error al insertar el nuevo proveedor:', error);
        }
      );
    }
  
    if (this.itemsFactura.length > 0) {
      this.refrescarVistaSeleccion();
      // Recorre todos los barracos seleccionados y elimínalos uno por uno
      this.itemsFactura.forEach(cafe => {
        this.eliminarCafe(cafe.id);

      });
 
      this.itemsFactura = [];
      this.facturado = true;
      // Reinicia el componente
   
      
      // Refresca la vista de selección de barracos y clientes
      this.refrescarVistaSeleccion();
     
      // "Pulsa" automáticamente el botón de facturar después de un breve retraso (500 milisegundos)
      setTimeout(() => {
        this.pulsarBotonFacturar();
      }, 500);
    } else {
      console.log('No hay barracos seleccionados para facturar.');
    }
    this.refrescarVistaSeleccion();
    this.mostrarCamposProveedorExistente = false;

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
    this.cafeService.getData().subscribe(data => {
      this.cafes = data;
      console.log('Datos de cafe obtenidos:', data);
    });
  
    this.proveedorService.getData().subscribe(data => {
      this.proveedores = data;
      console.log('Datos de proveedores obtenidos:', data);
    });
  }


  insertCafe(cafe: any) {
    return this.http.post(`https://cafebase-backend-production.up.railway.app/cafe/cafeInsertar`, cafe);
  }



  // Función para eliminar un barraco por su ID
  eliminarCafe(cafeId: number) {
    this.http.delete(`https://cafebase-backend-production.up.railway.app/cafe/cafeEliminar/${cafeId}`)
      .subscribe(() => {
        // La eliminación en la base de datos fue exitosa.
        // Puedes realizar otras operaciones si es necesario.
      }, error => {
        console.error('Error al eliminar el cafe:', error);
      });
    }








  agregarCafe() {
    this.mostrarSeleccionCafes = true;
  }

  // Agregar una función para seleccionar otro barraco 
  seleccionarCafeAdicional(event: any) {
    const cafeId = event.target.value;
    this.http.get<Cafe>(`https://cafebase-backend-production.up.railway.app/cafe/cafe/${cafeId}`)
      .subscribe((cafe: Cafe) => {
        this.itemsFactura.push(cafe);
      }, error => {
        console.error('Error al seleccionar el cafe adicional:', error);
      });
  }

  
  eliminarItemFactura(index: number) {
    if (index >= 0 && index < this.itemsFactura.length) {
      this.itemsFactura.splice(index, 1); // Elimina el elemento de la lista
    }
  }
  
}