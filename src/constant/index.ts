export let RUNNIG_BALANCE = 0;
export const ROW_COUNT_PER_PAGE = 10

export interface Message {
  success: string;
  error: string;
  info: string;
  depositSuccess: string;
  withdrawSuccess: string;
  sendMoneySuccess: string;
  pinVerified: string;
  pinCodeSent: string;
}

export const MESSAGES: Message = {
  success: 'success',
  error: 'error',
  info: 'info',
  depositSuccess: 'Amount Deposit successful!',
  withdrawSuccess: 'Amount Withdrawal successful!',
  sendMoneySuccess: 'Money Sent successfully!',
  pinVerified: 'PIN verified successfully!',
  pinCodeSent: 'New PIN code sent to your mobile number.',
};

export enum TransactionType {
  Deposit = 'deposit',
  Withdrawal = 'withdrawal',
  SendMoney = 'send-money',
  All = 'all',
}

export enum TransactionStatus {
  Idle = 'idle',
  Pending = 'pending',
  Success = 'success',
  Failed = 'failed',
}
