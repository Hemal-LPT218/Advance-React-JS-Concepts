import { memo, useCallback } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import enJson from "../locales/en.json";
import { ACCOUNT_TYPE, ROUTES_URL } from "../constants";
import { IUser } from "../types";
import HeadingText from "../components/HeadingText";
import InputField from "../components/InputField";
import SelectInput from "../components/SelectField";
import ButtonComponent from "../components/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/userSlice";
import { v4 as uuid } from "uuid";
import _ from "lodash";
import { RootState } from "../store/store";

interface IFormValue extends IUser {
  confirmPassword: string;
}

const initialValues: IFormValue = {
  id: "",
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: "",
  role: ACCOUNT_TYPE.STUDENT,
};

const validationSchema = Yup.object({
  fullName: Yup.string().required(enJson.fullNameRequired),
  email: Yup.string().email(enJson.emailInvalid).required(enJson.emailRequired),
  password: Yup.string()
    .min(6, enJson.passwordMustLong)
    .required(enJson.passwordRequired),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], enJson.passwordMustMatch)
    .required(enJson.confirmPasswordRequired),
  dateOfBirth: Yup.string().required(enJson.dateOfBirthRequired),
  role: Yup.string().required(enJson.roleRequired),
});

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.user.users);

  const onSubmit = useCallback(
    (values: IFormValue, { setFieldError }: FormikHelpers<IFormValue>) => {
      const existingUsersEmail = users.map((user) => user.email);

      if (existingUsersEmail.includes(values.email)) {
        setFieldError("email", enJson.emailExists);
        return;
      }

      const valuesWithoutConfirmPassword = _.omit(values, ["confirmPassword"]);

      dispatch(register({ ...valuesWithoutConfirmPassword, id: uuid() }));

      navigate(ROUTES_URL.LOGIN);
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
    <>
      <HeadingText>{enJson.register}</HeadingText>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <InputField
          id="fullName"
          label={enJson.fullName}
          type="text"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.fullName && !!errors.fullName}
          helperText={touched.fullName && errors.fullName}
        />

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

        <InputField
          id="password"
          label={enJson.password}
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
        />

        <InputField
          id="confirmPassword"
          label={enJson.confirmPassword}
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword && !!errors.confirmPassword}
          helperText={touched.confirmPassword && errors.confirmPassword}
        />

        <InputField
          id="dateOfBirth"
          label={enJson.dateOfBirth}
          type="date"
          name="dateOfBirth"
          value={values.dateOfBirth}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.dateOfBirth && !!errors.dateOfBirth}
          helperText={touched.dateOfBirth && errors.dateOfBirth}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <SelectInput
          id="role"
          name="role"
          label={enJson.role}
          value={values.role}
          onChange={handleChange}
          onBlur={handleBlur}
          menuList={[
            { title: ACCOUNT_TYPE.ADMIN, value: ACCOUNT_TYPE.ADMIN },
            { title: ACCOUNT_TYPE.STUDENT, value: ACCOUNT_TYPE.STUDENT },
          ]}
        />

        <ButtonComponent type="submit">{enJson.register}</ButtonComponent>
      </form>
    </>
  );
};

export default memo(Register);
