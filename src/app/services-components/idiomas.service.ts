import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdiomasService {
  public idiomaEs:any = {};
  constructor() { 
    this.procesoIdomaEs();
  }

  procesoIdomaEs(){
    this.idiomaEs = {
      // del form de pago publico
      tabs: {
        tabs1: "Seleccione el medio de pago",
        tabs2: "Complete la información",
        tabs3: "Confirmación"
      },
      form:{
        medioPago: "Seleccione su medio de pago preferido",
        editarEmail: "Editar",
        cambiar: "Cambiar medio de pago",
        complete: "Complete la información",
        descripcionPago: "Valor aproximado a pagar en PayPal en dolares estadounidenses",
        emails: "Ingrese su correo electrónico para iniciar",
        emails2: "Correo electronico",
        nombre: "Nombre y apellidos",
        documento: "Número de Documento",
        numero: "Número de móvil",
        terminos: "Acepto los Términos y condiciones",
        seleccioneBanco: "Seleccione su Banco",
        nombreTarjeta: "Nombre como aparece en la tarjeta",
        numeroTarjeta: "Número de la tarjeta",
        fechaVencimiento: "Fecha de vencimiento",
        indicativo: "Indicativo",
        pais: "Pais",
        cvc: "CVV/CVC",
        cuota: "Cuotas",
        ciudad: "Ciudad",
        direccion: "Dirección",
        guardarDatos: "Guardar mis datos para futuros pagos a un clic",
        buttonContinue: "Continuar"
      },
      components:{
        titulo: "SU COMPRA",
        subtotal: "Subtotal",
        taxes: "Taxes",
        total: "Total",
        titulo2: "¿PREGUNTAS AL COMERCIO?",
        comercio: "Comercio",
        llamenos: "Llámenos",
        escribanos: "Escríbanos",
        titulo3: "PAGO SEGURO"
      },
      footer:{
        atras: "Cancelar y volver a "
      },
      finix:{
        titulo: "Haz realizado un pago de",
        metodo: "Metodo de pago",
        fecha: "Fecha y hora",
        estado: "Estado y respuesta",
        ref_pago: "Ref Pago",
        recibo: "Recibo",
        btnFinal: "Ir A la Web Del Comercio"
      },
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      dashboard:{
        tipoCuenta: "Tipo de cuenta",
        herramienCobro: "Herramientas de cobro",
        email: "Enviar un email de cobro",
        link: "Crear y compartir un link de cobro",
        bottonPago: "Generar e insertar un botón  de cobro",
        saldoDisponible: "Saldo disponible",
        TransaccionAprobadas: "Transacciones aprobadas",
        TransaccionPendiente: "Transacciones pendientes",
        verDetalles: "Ver detalle",
        ultimasTransacciones: "Últimas transacciones"
      },
      tables:{
        ultimasTransaccion:{
          header: ['Ref.Pago', 'Ref.Cliente', 'Descripción', 'Medio de Pago', 'Valor', 'Moneda', 'Estado', 'Test']
        }
      },
    };
  }
}
