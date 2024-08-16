import { Typography } from '@mui/material';

import { formatCurrency } from '@/utils/formatters';

import { TransactionType } from '@/constant';
import theme from '@/ui-kit/theme/theme';

export const columns = [
  {
    name: 'type',
    label: 'Type',
    options: {
      filter: false,
      sort: false,
      display: false,
      setCellProps: () => ({
        style: {
          textAlign: 'start',
        },
      }),
      setHeaderProps: () => ({
        style: {
          textAlign: 'center',
          fontWeight: 'bold',
          backgroundColor: '#f5f5f5',
        },
      }),
    },
  },
  {
    name: 'createdAt',
    label: 'Transaction Date',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value: string) => {
        const date = new Date(value);
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
        const formattedTime = date
          .toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })
          .toUpperCase();

        return `${formattedDate} ${formattedTime}`;
      },
      setCellProps: () => ({
        style: {
          textAlign: 'start',
        },
      }),
      setHeaderProps: () => ({
        style: {
          textAlign: 'center',
          fontWeight: 'bold',
          backgroundColor: '#f5f5f5',
        },
      }),
    },
  },
  {
    name: 'amount',
    label: 'Amount',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: number, tableMeta: any) => {
        const rowData = tableMeta.rowData;
        const type = rowData[tableMeta.columnIndex - 2];

        const isDeposit = type === TransactionType.Deposit;
        const sign = isDeposit ? '+' : '-';
        const color = isDeposit ? theme.palette.custom.deposit : theme.palette.custom.withdrawal;

        return (
          <Typography sx={{ color: color }}>
            {sign} {formatCurrency(value)}
          </Typography>
        );
      },
      setCellProps: () => ({
        style: {
          textAlign: 'start',
        },
      }),
      setHeaderProps: () => ({
        style: {
          textAlign: 'start',
          fontWeight: 'bold',
          backgroundColor: '#f5f5f5',
        },
      }),
    },
  },
  {
    name: 'remainingBalance',
    label: 'Balance',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: number) => {
        return <Typography>{formatCurrency(value)}</Typography>;
      },
      setCellProps: () => ({
        style: {
          textAlign: 'start',
        },
      }),
      setHeaderProps: () => ({
        style: {
          textAlign: 'center',
          fontWeight: 'bold',
          backgroundColor: '#f5f5f5',
        },
      }),
    },
  },
];
