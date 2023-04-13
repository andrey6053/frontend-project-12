import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  username: yup.string().required('required'),
  password: yup.string().required('required'),
});

export const ChannelSchema = (channels) => yup.object().shape({
  name: yup.string().notOneOf(channels, 'alreadyExist').required('required'),
});

export const SignupSchema = yup.object({
  username: yup.string()
    .min(3, 'lengthUsername')
    .max(20, 'lengthUsername')
    .required('required'),
  password: yup.string()
    .min(6, 'minPassword')
    .required('required'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'samePassword'),
});