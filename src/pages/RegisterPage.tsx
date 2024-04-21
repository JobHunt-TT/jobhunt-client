import axios from "axios";
import { RegisterForm } from "../forms";
import { FormLayout } from "../layouts";

export const RegisterPage = () => {
  axios
    .post(
      "http://34.42.210.241:80/user_data",
      { userId: "124" },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Permitir acceso desde cualquier origen
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS", // Métodos permitidos
        },
      }
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
