export interface CPInfo {
  error: boolean;
  code_error: number;
  error_message: string;
  response: CPData
}

export interface CPData {
  cp: string;
  asentamiento: string;
  tipo_asentamiento: string;
  municipio: string;
  estado: string;
  ciudad: string;
  pais: string;
}
