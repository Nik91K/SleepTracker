import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import LogoutButton from '../Buttons/Logout/index';
import './style.css'

function BasicPopover ({children} : {children: React.ReactNode}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <div onClick={handleClick}>
        {children}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }} className='popover-content'>
            <LogoutButton />
        </Typography>
      </Popover>
    </div>
  )
}

export default BasicPopover
