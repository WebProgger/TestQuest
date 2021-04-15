import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import {Navigation} from './components/navigation.component';
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './contexts/auth.context';

function App() {
  const {login, logout, token, userId, userName} = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);
  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, userName, isAuth
    }}>
      <Router>
          <Navigation isAuth={isAuth} name={userName} />
          {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
