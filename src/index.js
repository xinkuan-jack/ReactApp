import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';

import store from './redux/store';
import GetRouter from './router/router';

render(
	<AppContainer>
		<Provider store = {store}>
			<GetRouter/>
		</Provider>
	</AppContainer>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept('./router/router', () => {
        const NextGetRouter = require('./router/router').default;
        render(
			<AppContainer>
				<Provider store = {store}>
					<NextGetRouter/>
				</Provider>
			</AppContainer>,
            document.getElementById('app')
		);
    })
}