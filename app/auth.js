
import { AsyncStorage } from "react-native";


import firebase from './firebase-config'

export let USER_KEY = "auth-demo"

export const onSignIn = async (email,pass) => { 
  
  
  // let user = await firebase.auth().signInWithEmailAndPassword(email,pass);
  // if(user!=null)
  // {
  //    USER_KEY=user.uid
  //     AsyncStorage.setItem('user',JSON.stringify(user.providerData[0]))
  //     AsyncStorage.setItem(USER_KEY, "true");
  // }
  
}

  
  

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

