import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const middleWare = applyMiddleware(thunk)

const store = createStore(
	reducer,
	compose(middleWare, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'))
registerServiceWorker();
