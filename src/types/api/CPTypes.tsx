export interface CPInfo {
  error: boolean;
  code_error: number;
  error_message: string;
  response: CPData
}

export interface CPData {
  CP: string;
  Colonia: string;
  tipoAsentamiento: string;
  Municipio: string;
  Entidad: string;
  ciudad: string;
  pais: string;
}
