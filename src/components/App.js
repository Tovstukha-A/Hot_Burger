import React from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import Burger from "./Burger";
import sampleBurgers from "../sample-burgers";
import base from "../base";
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import SignIn from "./Auth/SignIn";

class App extends React.Component {

    static propTypes = {
        match: PropTypes.object
    };

    state = {
        burgers: {},
        order: {}
    }

    componentDidMount() {
        const { params } = this.props.match;

        const localStorageRef = localStorage.getItem(params.restaurantId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${params.restaurantId}/burgers`, {
            context: this,
            state: 'burgers'
        });
    }

    componentDidUpdate() {
        const { params } = this.props.match;
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addBurger = burger => {
        // 1. Создаем копию объекта state
        const burgers = { ...this.state.burgers };
        // 2. Добавляем новый бургер в переменную burgers
        burgers[`burger${Date.now()}`] = burger;
        // 3. Записываем наш новый объект burgers в state
        this.setState({ burgers });
    }

    addToOrder = key => {
        // 1. Создаем копию объекта state
        const order = { ...this.state.order };
        // 2. Добавляем по 1 шт. при клике кнопки к значению уже купленных бургеров, либо добовляем новое значение если в корзине нет таких бургеров
        order[key] = order[key] + 1 || 1;
        // 3. Записываем наш новый объект order в state
        this.setState({ order });
    }

    updateBurger = (key, updatedBurger) => {
        // 1. Создаем копию объекта state
        const burgers = { ...this.state.burgers };
        // 2. Обновляем нужный нам burger
        burgers[key] = updatedBurger;
        // 3. Записываем наш новый объект burgers в state
        this.setState({ burgers });
    };

    deleteBurger = (key) => {
        // 1. Создаем копию объекта state
        const burgers = { ...this.state.burgers };
        // 2. Удаляем burger
        burgers[key] = null;
        // 3. Записываем наш новый объект burgers в state
        this.setState({ burgers });
    }

    deleteFromOrder = (key) => {
        // 1. Создаем копию объекта state
        const order = { ...this.state.order };
        // 2. Добавляем новый бургер в переменную burgers
        delete order[key];
        // 3. Записываем наш новый объект order в state
        this.setState({ order });
    }

    loadSampleBurgers = () => {
        this.setState({ burgers: sampleBurgers });
    }

    handleLogout = async () => {
        await firebase.auth().signOut();
        window.location.reload();
    };

    render() {
        return (
            <SignIn>
                <div className="burger-paradise">
                    <div className="menu">
                        <Header title="Very Hot Burger" />
                        <ul className="burgers">
                            {Object.keys(this.state.burgers).map(key => {
                                return <Burger key={key} index={key} details={this.state.burgers[key]} addToOrder={this.addToOrder} />
                            })}
                        </ul>
                    </div>
                    <Order burgers={this.state.burgers} order={this.state.order} deleteFromOrder={this.deleteFromOrder} />
                    <MenuAdmin addBurger={this.addBurger} loadSampleBurgers={this.loadSampleBurgers} burgers={this.state.burgers} updateBurger={this.updateBurger} deleteBurger={this.deleteBurger} handleLogout={this.handleLogout} />
                </div>
            </SignIn>
        )
    }
}

export default App;