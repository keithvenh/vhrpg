import { getAuth, deleteUser, reauthenticateWithCredential, reauthenticateWithPopup } from "firebase/auth";
import login from '../../helpers/auth/login';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../../db/application/db';

export default function destroyUser() {

    const auth = getAuth();
    const user = auth.currentUser;

    function reauthWithPassword() {
        return reauthenticateWithPopup(auth, login())
    }

    reauthenticateWithCredential(user, reauthWithPassword()).then(() => {
        console.log('reauthenticated');
    }).catch((error) => {
        console.log(error)
    })
    // deleteDoc(doc(db, "cities", user.uid));
    
    // deleteUser(user).then(() => {
    //   // User deleted.
    //   console.log('user deleted');
    // }).catch((error) => {
    //   // An error ocurred
    //   console.log(error.code);
    //   if(error.code === 'auth/requires-recent-login') {

    //   }
    // });
}