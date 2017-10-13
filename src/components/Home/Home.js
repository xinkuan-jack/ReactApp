import React from 'react';
import {connect} from 'react-redux';

import {increment, decrement, reset} from "../../redux/actions/counter";

import './home.css';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h3>这里是主页</h3>
                <p>测试热更新</p>
                <div>当前计数为: {this.props.counter.count}</div>
                <button onClick={() => this.props.increment()}>自增</button>
                <button onClick={() => this.props.decrement()}>自减</button>
                <button onClick={() => this.props.reset()}>重置</button>
            </div>
        );
    }
}

/**
 * 将redux的state转为组件的props
 * @param state
 * @returns {{counter: *}}
 */
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    };
};
/**
 * 将action的方法转为props的属性函数
 * @param dispatch
 * @returns {{increment: (function(): *), decrement: (function(): *), reset: (function(): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
        reset: () => dispatch(reset())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);