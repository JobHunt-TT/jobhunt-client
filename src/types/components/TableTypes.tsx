export interface DataHeadTable{
  key: string;
  nombre: string;
  center?: boolean;
  isSelectColor?: boolean;
  configSelectColor?: ConfigSelectColor[]
  onChange?: () => void
}

export interface ConfigSelectColor{
  value: number
  label: string;
  color: ColorSelectTable
}

export type WidthTable =  'sm' | 'md' | 'lg' | 'xl';

export type ColorSelectTable = 'success' | 'error' | 'waring' | 'info';