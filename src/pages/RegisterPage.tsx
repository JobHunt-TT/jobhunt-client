import axios from "axios";
import { RegisterForm } from "../forms";
import { FormLayout } from "../layouts";

export const RegisterPage = () => {
  axios
    .post(
      "http://34.42.210.241:80/user_data",
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
