import { MUIDataTableOptions } from 'mui-datatables';

export const options: MUIDataTableOptions = {
  filter: false,
  search: false,
  print: false,
  download: false,
  viewColumns: false,
  selectableRows: 'none',
  elevation: 1,
  responsive: 'standard',
  textLabels: {
    body: {
      noMatch: 'No data available',
    },
    toolbar: {
      search: 'Search',
    },
  },
};
