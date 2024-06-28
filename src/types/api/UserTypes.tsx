export interface DataUser {
  cedula_Profesional: string;
  direccion: string;
  direccionId: number;
  estatusCarrera: string;
  fechaEgreso: string;
  id: number;
  porcentaje_Cursado: string;
  sexo: string;
  userApellido: string;
  userBirthDate: string;
  userBoleta: null;
  userCurp: string;
  userEmail: null;
  userEstatusCarreraId: number;
  userName: string;
  userPass: string;
  userPhone: string;
  userSexoId: number;
}

export interface SkillUser {
  id: number;
  descripcion: string;
}

export interface EstatusCarrera {
  id: number;
  carreraDescripcion: string;
}

export interface SexoUser {
  id: number;
  descripcion: string;
}
