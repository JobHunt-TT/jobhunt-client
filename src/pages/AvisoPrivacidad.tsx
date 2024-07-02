
import React from "react";
import { ContentLayout } from "../layouts";

export const AvisoPrivacidad = () => {
  return (
    <ContentLayout>
      <div className="w-4/5 mx-auto py-16">
        <div className="bg-white rounded-md p-8">
          <h1 className="text-4xl font-bold text-politectico mb-4">Aviso de Privacidad</h1>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            El presente aviso de privacidad se coloca con el objetivo de informarle sobre el tratamiento de datos que se dará a sus datos personales recabados a través de la Bolsa de Trabajo Institucional, que será llamada de aquí en adelante como “Sistema”
          </p>
          <h2 className="text-2xl font-semibold text-politectico mt-8 mb-4">Datos Personales Recabados</h2>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            El Sistema recabará los siguientes datos personales:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-7 mb-4">
            <li>Datos de identificación: Nombre completo, RFC, domicilio, teléfono, celular, correo electrónico.</li>
            <li>Datos académicos: Institución educativa de procedencia, carrera cursada, fecha de egreso, promedio general, cursos o certificaciones realizados.</li>
            <li>Datos laborales: Experiencia laboral previa, habilidades técnicas, áreas de especialidad.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-politectico mt-8 mb-4">Finalidades del Tratamiento de Datos Personales</h2>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            Los datos personales recabados a través del Sistema serán utilizados para las siguientes finalidades:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-7 mb-4">
            <li>Gestionar su registro y participación en el Sistema: Crear su perfil en el Sistema, verificar su identidad y autenticidad de la información proporcionada, y administrar su acceso al Sistema.</li>
            <li>Generar recomendaciones de candidatos para vacantes laborales: Analizar su perfil académico, laboral y habilidades técnicas para identificarlo como posible candidato para vacantes laborales que coincidan con sus características.</li>
            <li>Contactarlo para informarle sobre oportunidades laborales: Enviarle información sobre vacantes laborales que podrían ser de su interés, de acuerdo con su perfil y preferencias.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-politectico mt-8 mb-4">Fundamento Jurídico del Tratamiento de Datos Personales</h2>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            El tratamiento de sus datos personales se encuentra fundamentado en las siguientes bases jurídicas:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-7 mb-4">
            <li>Su consentimiento: Al proporcionar sus datos personales a través del Sistema, usted otorga su consentimiento expreso para el tratamiento de los mismos conforme a las finalidades descritas en el presente Aviso.</li>
            <li>Relación jurídica: El tratamiento de sus datos personales es necesario para la gestión de su registro y participación en el Sistema, así como para la generación de recomendaciones de candidatos para vacantes laborales.</li>
            <li>Obligaciones legales: El responsable del sistema se encuentra obligado al tratamiento de ciertos datos personales en cumplimiento de diversas disposiciones legales, tales como la Ley Federal de Trabajo y la Ley del Servicio Público.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-politectico mt-8 mb-4">Transferencias de Datos Personales</h2>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            Sus datos personales no serán transferidos a terceros sin su consentimiento previo, salvo en los casos previstos por la ley. En caso de que se requiera realizar alguna transferencia de datos personales, el IPN implementará las medidas de seguridad necesarias para proteger su información.
          </p>
          <h2 className="text-2xl font-semibold text-politectico mt-8 mb-4">Medidas de Seguridad</h2>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            El sistema implementará las medidas de seguridad técnicas, físicas y administrativas necesarias para proteger sus datos personales contra pérdida, robo, uso indebido, acceso no autorizado, divulgación, alteración o destrucción.
          </p>
          <h2 className="text-2xl font-semibold text-politectico mt-8 mb-4">Plazo de Conservación de Datos Personales</h2>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            Sus datos personales serán conservados durante el tiempo necesario para cumplir con las finalidades para las cuales fueron recabados, así como para cumplir con las obligaciones legales aplicables. Una vez cumplido el plazo de conservación, sus datos personales serán bloqueados y posteriormente eliminados de las bases de datos del IPN.
          </p>
          <h2 className="text-2xl font-semibold text-politectico mt-8 mb-4">Derechos ARCO</h2>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            Usted tiene derecho a:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-7 mb-4">
            <li>Acceder a sus datos personales y conocer los detalles del tratamiento que se le da a los mismos.</li>
            <li>Rectificar sus datos personales en caso de ser inexactos o incompletos.</li>
            <li>Solicitar la cancelación de sus datos personales cuando ya no sean necesarios para las finalidades para las que fueron recabados o cuando considere que su tratamiento es contrario a la ley.</li>
            <li>Oponerse al tratamiento de sus datos personales para fines específicos.</li>
            <li>Revocar su consentimiento.</li>
          </ul>
        </div>
      </div>
    </ContentLayout>
  );
};

export default AvisoPrivacidad;