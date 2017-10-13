import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';

import Bundle from './Bundle';
import Home from 'bundle-loader?lazy&name=home!../components/Home/Home';
import Hello from 'bundle-loader?lazy&name=hello!../components/Hello/Hello';

/**
 * 加载页
 * @returns {XML}
 * @constructor
 */
const Loading = function () {
    return <div>Loading...</div>
};

/**
 * 动态加载路由页面
 * @param component
 */
const createComponent = (component) => () => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component/> : <Loading/>
        }
    </Bundle>
);

export default class GetRouter extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to='/'>主页</Link></li>
                        <li><Link to='/hello'>欢迎页</Link></li>
                    </ul>
                    <Switch>
                        <Route exact path='/' component={createComponent(Home)} />
                        <Route path='/hello' component={createComponent(Hello)} />
                    </Switch>
                </div>
            </Router>
        );
    }
};
