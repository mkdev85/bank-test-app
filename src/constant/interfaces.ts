import { UserData } from '@/redux/asyncThunk/types';

import { TransactionType } from '.';

export interface iSendMoneyTransaction {
  type: string;
  amount: number;
  createdAt: string;
  status: string;
  recipientAccountId: string;
  transactionId: string;
  accountId: string | undefined;
}

export interface iMoneyTransaction {
  type: string;
  amount: number;
  createdAt: string;
  status: string; // ?
  transactionId: string;
  accountId: string | undefined;
}

export interface iRecentPayeesProps {
  handleListItemClick: (accountNumber: string) => void;
}

export interface iStatementsState {
  isLoading: boolean;
  error: boolean;
  data: iMoneyTransaction[];
}

export interface iUpdateBalancePayload {
  type: TransactionType.Deposit | TransactionType.Withdrawal;
  amount: number;
}

export interface iBalanceResponse {
  data: {
    currentBalance: number;
    currency: string;
    accountId: string;
  };
  isLoading: boolean;
  error: boolean;
}

export interface iUserState {
  isLoading: boolean;
  error: boolean;
  data: UserData;
}
