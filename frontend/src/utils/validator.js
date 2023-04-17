import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  username: yup.string().required('required'),
  password: yup.string().required('required'),
});

export const ChannelSchema = (channels) => yup.object().shape({
  name: yup.string().min(3,"err_minLengthChannel").notOneOf(channels, 'err_alreadyExist').required('err_required'),
});

export const SignupSchema = yup.object({
  username: yup.string()
    .min(3, 'err_lengthUsername')
    .max(20, 'err_lengthUsername')
    .required('err_required'),
  password: yup.string()
    .min(6, 'err_minPassword')
    .required('err_required'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'err_samePassword'),
});