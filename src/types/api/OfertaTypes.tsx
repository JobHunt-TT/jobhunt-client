export interface Oferta {
  ofertaId: number;
  nombreOferta: string;
  empresaID: number;
  nombreEmpresa: string;
  vigencia: string;
  duracionContrato: string;
  rangoEdad: number;
  rangoExperiencia: number;
  jornadaID: number;
  jornadaString: number;
  direccionId: number;
  estatusId: number;
  visibilidad: number;
  nombrePuesto: string;
  salario: string;
  descripcion: string;
}

export interface Postulacion {
  id: number;
  fecha: string;
  estudianteId: number;
  ofertaId: number;
  estatusId: number;
  nombre: string;
  apellido: string;
  nombreOferta: string;
}
