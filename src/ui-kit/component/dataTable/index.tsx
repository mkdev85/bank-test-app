import React, { useEffect, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

import { ROW_COUNT_PER_PAGE, TransactionType } from '@/constant';
import { Statement } from '@/redux/asyncThunk/types';
import {
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import MUIDataTable from 'mui-datatables';

import { columns } from './tableColums';
import { options } from './tableOption';
import moment from 'moment';

const StatementTable = ({ statement, count }: { statement: Statement[]; count: number }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [filterType, setFilterType] = useState<string>(TransactionType.All);
  const [filteredStatement, setFilteredStatement] = useState<Statement[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  let totalPages: number = Math.ceil(count / ROW_COUNT_PER_PAGE);

  useEffect(() => {
    setFilteredStatement([...statement].reverse());
  }, [statement]);

  const handleFilter = () => {
    const startISO = startDate ? moment(startDate).startOf('day') : '';
    const endISO = endDate ? moment(endDate).endOf('day') : '';
  
    const filtered = statement.filter(statement => {
      const statementDate = moment(statement.createdAt);
      const isInDateRange =
        (!startISO || statementDate.isSameOrAfter(startISO)) &&
        (!endISO || statementDate.isSameOrBefore(endISO));
      const isTypeMatch = filterType === TransactionType.All || statement.type === filterType;
  
      return isInDateRange && isTypeMatch;
    });
  
    setFilteredStatement([...filtered].reverse());
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setFilterType(TransactionType.All);
    setFilteredStatement([...statement].reverse());
  };

  const handlePagination = (num: number) => {
    setCurrentPage(num);
    setPage(num);
  };

  const handleJumpFirstPage = () => {
    setCurrentPage(1);
    setPage(1);
  };

  const handleLastPageJump = () => {
    setCurrentPage(totalPages);
    setPage(totalPages);
  };

  return (
    <Box sx={{ px: 30, pt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filter Transactions by Date Range and Type
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 0 }}>
          **Please choose a start and end date to filter your transaction history. The end date
          should be greater than or equal to the start date. Future dates are not allowed.
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          **Choose a transaction type to filter your results.
        </Typography>

        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <TextField
            type="date"
            label="Start Date"
            variant="outlined"
            size="small"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              max: endDate || moment().endOf('day').format('YYYY-MM-DD'),
            }}
          />
          <Typography
            sx={{
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {' '}
          </Typography>
          <TextField
            type="date"
            label="End Date"
            variant="outlined"
            size="small"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: startDate,
              max: moment().endOf('day').format('YYYY-MM-DD'),
            }}
          />
          <FormControl sx={{ ml: 1, minWidth: 120 }} size="small">
            <InputLabel id="filter-type-label">Type</InputLabel>
            <Select
              labelId="filter-type-label"
              id="filter-type"
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              label="Type"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value={TransactionType.Deposit}>Deposit</MenuItem>
              <MenuItem value={TransactionType.Withdrawal}>Withdrawal</MenuItem>
              <MenuItem value={TransactionType.SendMoney}>Send-money</MenuItem>
            </Select>
          </FormControl>
          <Button
            sx={{ py: 1 }}
            size="small"
            variant="contained"
            color="primary"
            onClick={handleFilter}
          >
            Apply Filter
          </Button>
          <Button
            sx={{ py: 1 }}
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
        </Box>

        {filteredStatement && (
          <MUIDataTable
            title={'Transaction Summary'}
            data={filteredStatement}
            columns={columns}
            options={{
              ...options,
              customFooter: () =>
                statement ? (
                  <Box sx={{ py: 3, display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleJumpFirstPage} disabled={currentPage === 1}>
                      First Page
                    </Button>
                    <ResponsivePagination
                      current={currentPage}
                      total={Math.ceil(filteredStatement?.length / ROW_COUNT_PER_PAGE)}
                      onPageChange={handlePagination}
                    />
                    <Button
                      onClick={handleLastPageJump}
                      disabled={currentPage === totalPages || statement.length <= 0}
                    >
                      Last Page
                    </Button>
                  </Box>
                ) : (
                  <></>
                ),
              page: page - 1,
              rowsPerPage: 10,
            }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default StatementTable;
