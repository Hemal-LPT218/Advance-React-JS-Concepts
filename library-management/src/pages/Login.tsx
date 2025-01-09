import { memo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormikHelpers, useFormik } from "formik";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ACCOUNT_TYPE, ROUTES_URL } from "../constants";
import ButtonComponent from "../components/ButtonComponent";
import PasswordField from "../components/PasswordField";
import HeadingText from "../components/HeadingText";
import InputField from "../components/InputField";
import { login } from "../store/userSlice";
import { RootState } from "../store/store";
import enJson from "../locales/en.json";

interface IFormValue {
  email: string;
  password: string;
}

const initialValues: IFormValue = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email(enJson.emailInvalid).required(enJson.emailRequired),
  password: Yup.string().required(enJson.passwordRequired),
});

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.user.users);

  const onSubmit = useCallback(
    (values: IFormValue, { setFieldError }: FormikHelpers<IFormValue>) => {
      const existingUser = users.find((user) => user.email === values.email);

      if (!existingUser) {
        setFieldError("email", enJson.emailNotExists);

        return;
      } else if (existingUser && existingUser.password !== values.password) {
        setFieldError("password", enJson.passwordInvalid);

        return;
      }

      dispatch(login(existingUser));

      toast.success(enJson.accountLoggedIn);

      navigate(
        existingUser.role === ACCOUNT_TYPE.ADMIN
          ? ROUTES_URL.ADMIN_HOME
          : ROUTES_URL.STUDENT_HOME
      );
    },
    [dispatch, navigate, users]
  );

  const { handleSubmit, values, handleChange, errors, handleBlur, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <div className="flex flex-col gap-10 sm:mx-auto mx-10 my-10 sm:p-10 p-5 max-w-2xl sm:w-full text-center border rounded-2xl shadow-2xl">
      <HeadingText>{enJson.login}</HeadingText>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <InputField
          id="email"
          label={enJson.email}
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        <PasswordField
          id="password"
          label={enJson.password}
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
        />

        <ButtonComponent tooltipTitle={enJson.login} type="submit">
          {enJson.login}
        </ButtonComponent>

        <Typography>
          {enJson.doNotAccount}{" "}
          <Link to={ROUTES_URL.REGISTER} className="text-primary underline">
            {enJson.register}
          </Link>
        </Typography>
      </form>
    </div>
  );
};

export default memo(Login);
