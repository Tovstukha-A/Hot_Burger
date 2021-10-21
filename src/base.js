import Rebase from "re-base";
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyACCE0Nxa_60Lh7WIqvIr3pi4vpIzlOVNk",
    authDomain: "hot-burger-47074.firebaseapp.com",
    databaseURL: "https://hot-burger-47074-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;