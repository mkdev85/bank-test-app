import { useState } from 'react';

const useTransactionId = () => {
  const generateRandomId = () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `txn${String(randomNumber).padStart(6, '0')}`;
  };

  const [transactionId] = useState(generateRandomId);

  return transactionId;
};

export default useTransactionId;
