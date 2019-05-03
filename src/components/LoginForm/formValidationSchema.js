import * as yup from 'yup';
import { errorMessages } from '../../constants/messages';

export default yup.object().shape({
  email: yup
    .string()
    .email(errorMessages.EMAIL_ERROR)
    .required(errorMessages.EMPTY_FIELD_ERROR),
  password: yup
    .string()
    .required(errorMessages.EMPTY_FIELD_ERROR)
    .min(6, errorMessages.PWD_MIN_ERROR)
});
