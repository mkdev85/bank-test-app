import React, { memo } from 'react';

import { iRecentPayeesProps } from '@/constant/interfaces';
import { useAppSelector } from '@/hooks/utilityHooks';
import { Avatar, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import moment from 'moment';

const RecentPayees: React.FC<iRecentPayeesProps> = React.memo(({ handleListItemClick }) => {
  const sentMoney = useAppSelector(state => state.sendMoney.data);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Recent Payees
      </Typography>
      {sentMoney && sentMoney.length > 0 ? (
        <List>
          {sentMoney.map((payment, index) => (
            <ListItem
              sx={{
                backgroundColor: 'lightgrey',
                mt: 1,
              }}
              key={index}
              button
              onClick={() => handleListItemClick(payment.recipientAccountId)}
            >
              <Avatar alt="Payee" src="/static/images/avatar/2.jpg" />
              <ListItemText
                sx={{ ml: 2 }}
                primary={`Account No: ${payment.recipientAccountId}`}
                secondary={`Amount: $${payment.amount} | Date: ${moment(payment.createdAt).format(
                  'LLLL',
                )}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
          No recent payees available.
        </Typography>
      )}
    </Paper>
  );
});

export default memo(RecentPayees);
