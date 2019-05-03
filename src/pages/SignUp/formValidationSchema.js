import * as yup from 'yup';
// import { cnpj } from 'cpf-cnpj-validator';
import { errorMessages } from '../../constants/messages';

export default yup.object().shape({
  name: yup.string().required(errorMessages.EMPTY_FIELD_ERROR),
  email: yup
    .string()
    .email(errorMessages.EMAIL_ERROR)
    .required(errorMessages.EMPTY_FIELD_ERROR),
  password: yup
    .string()
    .required(errorMessages.EMPTY_FIELD_ERROR)
    .min(6, errorMessages.PWD_MIN_ERROR),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], errorMessages.PWD_MATCH_ERROR)
    .required(errorMessages.EMPTY_FIELD_ERROR)
    .min(6, errorMessages.PWD_MIN_ERROR),
  cnpj: yup
    .string()
    .required(errorMessages.EMPTY_FIELD_ERROR)
    .max(14, errorMessages.CNPJ_ERROR)
    .min(14, errorMessages.CNPJ_ERROR),
  number: yup
    .string()
    .required(errorMessages.EMPTY_FIELD_ERROR)
    .max(5, errorMessages.LONG_NUMBER)
});
