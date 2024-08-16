import * as React from 'react';

import { pages } from '@/ config/pageConfig';
import AdbIcon from '@mui/icons-material/Adb';
import { AppBar, Box, Toolbar, IconButton, Typography, Button, Avatar } from '@mui/material';

import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <AppBar position="static" sx={{ flexGrow: 1 }}>
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            pl: 5,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          BANK TEST APP
        </Typography>

        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

        <Box
          sx={{
            flexGrow: 1,
            pr: 5,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {pages.map(page => (
              <Button
                key={page.route}
                onClick={() => router.push(page.route)}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontWeight: currentRoute === page.route ? 'bold' : 'normal',
                  textDecoration: currentRoute === page.route ? 'underline' : 'none',
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <IconButton sx={{ p: 0, ml: 2 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
