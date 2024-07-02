export interface DataEnterprise {
  empresaNombre: string;
  empresaId: number;
  tipoEmpresaId: number;
  tipoEmpresa: string;
  userRFC: string;
  empresaGiro: string;
  statusId: number;
}

export interface TipoEmpresa {
  id: number;
  alias: string;
  descripcion: string;
}

export interface AdminEmpresa {
  id: number;
  userName: string;
  userApellido: string;
  userBirthDate: string;
  userPhone: string;
  userEmail: string;
  userPass: string;
  userCurp: string;
  userSexoId: number;
  userEstatusCarreraId: number;
  userBoleta: string;
  usuarioEmpresaId: number;
  userCargo: string;
  sexo: string;
  direccionID: number;
  direccion: string;
  estatusCarrera: string;
  cedula_Profesional: string;
  fechaEgreso: string;
  porcentaje_Cursado: string;
}
