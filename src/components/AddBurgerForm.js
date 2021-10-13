import React from "react";

class AddBurgerForm extends React.Component {

    createBurger = event => {
        event.preventDefault();
        console.log("add Burger");
    }

    render() {
        return (
            <>
                <form className="burger-edit" onSubmit={this.createBurger}>
                    <input name="name" type="text" placeholder="Name" autoComplete="off" />
                    <input name="price" type="text" placeholder="Price" autoComplete="off" />

                    <select name="status" className="status">
                        <option value="available">Доступно к заказу</option>
                        <option value="unavailable">Убрать из меню</option>
                    </select>

                    <textarea name="desc" placeholder="Desc"></textarea>
                    <input name="image" type="text" placeholder="Image" autoComplete="off" />

                    <button type="submit">+ Добавить в меню</button>

                </form>
            </>
        )
    }
}

export default AddBurgerForm;