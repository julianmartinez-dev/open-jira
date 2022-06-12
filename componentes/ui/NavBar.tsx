import { useContext } from 'react';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui';
import NextLink from 'next/link';


export const NavBar = () => {

  const { openSideMenu } = useContext(UIContext)

  return (
    <AppBar position='sticky' elevation={0}>
        <Toolbar>
            <IconButton size='large' edge="start" onClick={openSideMenu}>
                <MenuOutlinedIcon />
            </IconButton>

            <NextLink href='/' passHref>
              <Link
                underline='none'
                color='inherit'
              >
                 <Typography variant='h6'>OpenJira</Typography>
              </Link>

            </NextLink>
        </Toolbar>
    </AppBar>
  )
}
