import axios from "axios";
import { RegisterForm } from "../forms";
import { FormLayout } from "../layouts";

export const RegisterPage = () => {
  axios
    .post(
      "/api/user_data",
      { userId: "124" },
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
