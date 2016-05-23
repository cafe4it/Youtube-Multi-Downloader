import React from 'react';
import ReactDom from 'react-dom';

import { Store } from 'react-chrome-redux';
import { Provider } from 'react-redux';

import App from './components/App.jsx';

const proxyStore = new Store({
	portName: 'MY_APP'
});

ReactDom.render(
	<Provider store={proxyStore}><App /></Provider>
	, document.getElementById('app'));