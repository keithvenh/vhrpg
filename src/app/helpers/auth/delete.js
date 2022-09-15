import { deleteUser } from "firebase/auth";

export async function destroyUser(user) {
    
    deleteUser(user).then(() => {
      // User deleted.
    }).catch((error) => {
      // An error ocurred
      console.log(error.code);
      if(error.code === 'auth/requires-recent-login') {
        return error.code;
      }
    });
}