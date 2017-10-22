import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore,applyMiddleware} from 'redux';
import reducer from './reducers';

const loggerMiddle = createLogger()

const store = createStore(
	reducer,
	applyMiddleware(
		loggerMiddle
	)
	//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'))
registerServiceWorker();
