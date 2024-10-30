import * as yup from 'yup';

export const transactionSchema = yup.object().shape({
  description: yup.string().required(),
  amount: yup.number().integer().required(),
  currency: yup.object().shape({
    iso: yup.string().length(3).required(),
  }).required(),
  callback_url: yup.string().url(),
  customer: yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    phone_number: yup.object().shape({
      number: yup.string().required(),
      country: yup.string().required(),
    }).required(),
  }).required(),
});