export interface Page {
  name: string;
  route: string;
}

export const pages: Page[] = [
  { name: 'Home', route: '/' },
  { name: 'Deposit', route: '/deposit' },
  { name: 'Withdraw', route: '/withdrawal' },
  { name: 'Send Money', route: '/send-money' },
];
