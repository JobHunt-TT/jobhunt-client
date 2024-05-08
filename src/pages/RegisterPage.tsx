import axios from "axios";
import { RegisterForm } from "../forms";
import { FormLayout } from "../layouts";

export const RegisterPage = () => {

  axios
    .post(
      "http://35.232.168.61:80/consulta_estudiante",
      { id: "6" },
    )
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <FormLayout title="Regístrate">
      <RegisterForm />
    </FormLayout>
  );
};
