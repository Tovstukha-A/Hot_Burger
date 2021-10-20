import React from "react";
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";

class MenuAdmin extends React.Component {

    render() {
        return (
            <>
                <div className="menu-admin">
                    <h2>Управление меню</h2>
                    {Object.keys(this.props.burgers).map(key => {
                        return (<EditBurgerForm key={key} updateBurger={this.props.updateBurger} burger={this.props.burgers[key]} index={key} />);
                    })}
                    <AddBurgerForm addBurger={this.props.addBurger} />

                    <button onClick={this.props.loadSampleBurgers}>Добавить все бургеры</button>
                </div>
            </>
        )
    }
}

export default MenuAdmin;