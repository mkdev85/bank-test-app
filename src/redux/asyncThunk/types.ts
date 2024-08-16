export interface UserData {
  id: string;
  name: string;
  email: string;
  accountId: string;
}

export interface Statement {
  id?: string;
  type: string;
  amount: number;
  createdAt: string;
  remainingBalance?: number;
}

export interface BalanceData {
  currentBalance: number;
  currency: string;
}

export interface UserResponse {
  user: {
    data: UserData;
    isLoading: boolean;
    error: boolean;
  };
  statement: {
    data: Statement[];
    isLoading: boolean;
    error: boolean;
  };
  balance: {
    data: BalanceData;
    isLoading: boolean;
  };
}
