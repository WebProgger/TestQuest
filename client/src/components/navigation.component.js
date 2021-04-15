import React, {useContext} from 'react';
import { NavLink, useHistory } from "react-router-dom";
import {AuthContext} from '../contexts/auth.context';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    fontFamily: 'Roboto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  itemMenu: {
    fontSize: '14px',
    padding: '0 5px',
    fontWeight: 'bold',
  },
  linkButton: {
    textDecoration: 'none',
    color: '#fff',
  },
  linkButtonProfile: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
  },
}));

export const Navigation = (props) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = event => {
    handleMenuClose();
    event.preventDefault();
    auth.logout();
    history.push('/')
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <NavLink to='/lk' className={classes.linkButtonProfile}>
        <MenuItem onClick={handleMenuClose}>Личный кабинет</MenuItem>
      </NavLink>
      <MenuItem onClick={handleLogout}>Выйти</MenuItem>
    </Menu>
  );

  const renderAuthorized = (
    <IconButton
      edge="end"
      aria-label="Аккаунт"
      aria-controls={menuId}
      aria-haspopup="true"
      onClick={handleProfileMenuOpen}
      color="inherit"
    >
      <p className={classes.itemMenu}>{props.name}</p>
      <AccountCircle />
    </IconButton>
  );

  const renderUnAuthorized = (
    <div>
      <NavLink to='/login' className={classes.linkButton}>
        <Button color="inherit">Войти</Button>
      </NavLink>
      /
      <NavLink to='/register' className={classes.linkButton}>
        <Button color="inherit">Регистрация</Button>
      </NavLink>
    </div>
  );

  return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Container>
            <Toolbar>
              <Typography className={classes.title} variant="h6" noWrap>
                <NavLink to='/' className={classes.linkButton}>Новости</NavLink>
              </Typography>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                { (props.isAuth && renderAuthorized) || renderUnAuthorized }
              </div>
            </Toolbar>
          </Container>
        </AppBar>
        {renderMenu}
      </div>
  );
}