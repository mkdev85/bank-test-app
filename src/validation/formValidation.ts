import IBAN from 'iban';
import * as Yup from 'yup';

export const depositValidationSchema = Yup.object({
  amount: Yup.number().min(1, 'Amount must be greater than 1').required('Amount is required'),
});

export const withdrawalValidationSchema = (totalBalance: number) => {
  return Yup.object({
    amount: Yup.number()
      .required('Amount is required')
      .min(1, 'Amount must be greater than 1')
      .test(
        'sufficient-balance',
        'Insufficient balance for withdrawal',
        value => value !== undefined && value <= totalBalance,
      ),
  });
}
  
export const sendMoneyValidation = (totalBalance: number) => {
  return Yup.object({
    recipientAccountId: Yup.string()
      .required('Account number is required')
      .test('is-iban', 'Invalid IBAN', value => IBAN.isValid(value)),
    amount: Yup.number()
      .min(1, 'Amount must be greater than 1')
      .required('Amount is required')
      .test(
        'sufficient-balance',
        'Insufficient balance for withdrawal',
        value => value !== undefined && value <= totalBalance,
      ),
  });
}
  