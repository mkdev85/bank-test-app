'use client';

import React, { useEffect, useState, useMemo } from 'react';

import { RUNNIG_BALANCE, TransactionType } from '@/constant';
import { iMoneyTransaction } from '@/constant/interfaces';

import withTotalBalance from '@/hoc/withTotalBalance';
import { useAppDispatch, useAppSelector } from '@/hooks/utilityHooks';

import { fetchBalance } from '@/redux/asyncThunk/fetchBalance.asyncThunk';
import { fetchStatements } from '@/redux/asyncThunk/fetchStatement.asyncThunk';
import { fetchUserData } from '@/redux/asyncThunk/fetchUserData.asyncThunk';

import StatementTable from '@/ui-kit/component/dataTable';
import CustomLoadingIndicator from '@/ui-kit/component/loadingIndicator';

import { Typography } from '@mui/material';

const AccountPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const statements = useAppSelector(state => state.statements);
  const balance = useAppSelector(state => state.balance);

  const [statement, setStatement] = useState<iMoneyTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!statements?.data?.length || !balance?.data) {
      dispatch(fetchUserData());
      dispatch(fetchStatements());
      dispatch(fetchBalance());
    }
  }, []);

  const formattedStatements = useMemo(() => {
    try {
      if (statements?.data) {
        setCount(statements?.data?.length);

        let runningBalance = RUNNIG_BALANCE;
        const formattedData = statements?.data?.slice().map((statement: iMoneyTransaction) => {
          if (statement.type === TransactionType.Deposit) {
            runningBalance += statement.amount;
          } else {
            runningBalance -= statement.amount;
          }

          return {
            ...statement,
            remainingBalance: runningBalance,
          };
        });

        return formattedData;
      } else {
        return [];
      }
    } catch (err) {
      setError('An error occurred while processing the statements.');
      return [];
    }
  }, [statements]);

  useEffect(() => {   
    if (formattedStatements?.length > 0) {
      setStatement(formattedStatements);
    }

    setLoading(false);
  }, [formattedStatements]);

  return (
    <div>
      {loading ? (
        <CustomLoadingIndicator />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <StatementTable statement={statement} count={count} />
      )}
    </div>
  );
};

export default withTotalBalance(AccountPage);
