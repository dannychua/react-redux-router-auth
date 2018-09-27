import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reeduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import Header from './containers/Header';
import Home from './containers/Home';
import Feature from './containers/Feature';
import Signin from './containers/Auth/Signin';
import Signup from './containers/Auth/Signup';
import Signout from './containers/Auth/Signout';
import { PrivateRoute } from './components/RequireAuth';

import { AUTH_USER } from './actions/types';
import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';

const createStoreWithMiddleware = applyMiddleware(reeduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const token = localStorage.getItem('token');

if (token) {
    store.dispatch({ type: AUTH_USER })
}


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path='/' exact={true} component={Home} />
                <Route path='/signin' exact={true} component={Signin} />
                <Route path='/signout' exact={true} component={Signout} />
                <Route path='/signup' exact={true} component={Signup} />
                <PrivateRoute path='/feature' component={Feature} />
            </div>
        </Router>
    </Provider>    
, document.getElementById('root'));
