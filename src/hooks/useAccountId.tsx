import { useAppSelector } from './utilityHooks';

const useAccountId = (): string | undefined => {
  const accountId = useAppSelector(state => state.user.data.accountId);
  return accountId;
};

export default useAccountId;
