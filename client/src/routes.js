import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {IndexPage} from './pages/index.page';
import {LoginPage} from './pages/login.page';
import {RegisterPage} from './pages/register.page';
import {LkPage} from './pages/lk.page';

export const useRoutes = isAuth => {
    if(isAuth) {
        return (
            <Switch>
                <Route path="/" exact>
                    <IndexPage />
                </Route>
                <Route path="/lk" exact>
                    <LkPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <IndexPage />
            </Route>
            <Route path="/register" exact>
                <RegisterPage />
            </Route>
            <Route path="/login" exact>
                <LoginPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}