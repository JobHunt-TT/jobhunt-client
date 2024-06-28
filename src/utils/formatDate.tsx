import moment from 'moment';
import 'moment/locale/es';  // Importa el idioma español

export const formatDate = (dateString: string) => {
  return moment(dateString).locale('es').format('D MMM YYYY');
};
