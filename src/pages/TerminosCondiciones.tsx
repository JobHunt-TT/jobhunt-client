import React from "react";
import { ContentLayout } from "../layouts";

export const TerminosCondiciones = () => {
  return (
    <ContentLayout>
      <div className="w-4/5 mx-auto py-16">
        <div className="bg-white rounded-md p-8">
          <h1 className="text-4xl font-bold text-politectico mb-4">Términos y Condiciones</h1>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            Al acceder, utilizar o registrarse en el Sistema, usted declara que ha leído, entendido y acepta todos los Términos que se establecen en este documento. Si no está de acuerdo con los Términos, no debe acceder, utilizar o registrarse en el Sistema.
          </p>
          <h2 className="text-2xl font-semibold text-politectico mt-8 mb-4">Registro de Usuarios</h2>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            Para acceder a ciertas funcionalidades del Sistema, será necesario que se registre como usuario. El registro es gratuito y se realiza proporcionando los datos personales requeridos en el formulario de registro. Usted se compromete a proporcionar información veraz, completa y actualizada sobre sus datos personales.
          </p>
          <h2 className="text-2xl font-semibold text-politectico mt-8 mb-4">Uso del Sistema</h2>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            El Sistema está diseñado para facilitar la vinculación entre empresas y estudiantes o egresados de instituciones educativas de nivel superior del IPN. Usted podrá utilizar el Sistema para:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-7 mb-4">
            <li>Crear su perfil: Completar su información académica, laboral y habilidades técnicas.</li>
            <li>Buscar ofertas laborales: Consultar las vacantes disponibles y aplicar a aquellas que sean de su interés.</li>
            <li>Recibir recomendaciones de candidatos: Si es empresa, podrá recibir recomendaciones de candidatos que se ajusten a los perfiles laborales de sus vacantes.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-politectico mt-8 mb-4">Obligaciones de los Usuarios</h2>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            Usted se compromete a:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-7 mb-4">
            <li>Utilizar el Sistema de manera responsable y ética.</li>
            <li>No proporcionar información falsa, engañosa o inexacta.</li>
            <li>No utilizar el Sistema para fines ilegales o que puedan dañar a terceros.</li>
            <li>No reproducir, distribuir o modificar el contenido del Sistema sin autorización previa y por escrito del IPN.</li>
            <li>Respetar la propiedad intelectual del IPN y de terceros.</li>
            <li>No utilizar el Sistema para enviar spam, publicidad no solicitada o cualquier otro tipo de contenido no deseado.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-politectico mt-8 mb-4">Responsabilidades del IPN</h2>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            El responsable del sistema se compromete a:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-7 mb-4">
            <li>Proteger la confidencialidad de sus datos personales conforme a lo establecido en el Aviso de Privacidad del Sistema.</li>
            <li>Implementar las medidas de seguridad necesarias para proteger el Sistema y la información de los usuarios.</li>
            <li>Mantener el Sistema operativo y actualizado.</li>
            <li>Proporcionar soporte técnico a los usuarios en caso de problemas con el Sistema.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-politectico mt-8 mb-4">Exclusión de Responsabilidad</h2>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            El responsable del sistema no se hace responsable de:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-7 mb-4">
            <li>Los daños o perjuicios que puedan derivarse de la utilización del Sistema por parte de los usuarios.</li>
            <li>La información proporcionada por los usuarios en el Sistema, la cual se presume veraz y completa.</li>
            <li>Las interrupciones o fallos del Sistema que puedan derivarse de causas ajenas al control del responsable del sistema.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-politectico mt-8 mb-4">Modificación de los Términos</h2>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            El sistema se reserva el derecho de modificar unilateralmente los Términos en cualquier momento. Las modificaciones se publicarán en el Sistema y entrarán en vigor al día siguiente de su publicación.
          </p>
          <h2 className="text-2xl font-semibold text-politectico mt-8 mb-4">Terminación del Servicio</h2>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            El sistema podrá, en cualquier momento y sin previo aviso, suspender o cancelar el acceso al Sistema a cualquier usuario que incumpla los Términos.
          </p>
          <h2 className="text-2xl font-semibold text-politectico mt-8 mb-4">Jurisdicción y Competencia</h2>
          <p className="text-gray-700 text-lg leading-7 mb-4">
            Para cualquier controversia que surja en relación con los Términos, se aplicará la legislación vigente en la Ciudad de México. Los tribunales de la Ciudad de México serán competentes para resolver cualquier disputa que surja en relación con los Términos.
          </p>
        </div>
      </div>
    </ContentLayout>
  );
};

export default TerminosCondiciones;
