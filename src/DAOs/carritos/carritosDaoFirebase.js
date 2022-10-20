import FirebaseContainer from "../../contenedores/ContenedorFirebase.js";
import { dbFirebase } from "../../DB/firebase/firebase.js";

export default class CartsFirebaseDao extends FirebaseContainer {
    constructor() {
        super(dbFirebase, "carritos");
    }
}