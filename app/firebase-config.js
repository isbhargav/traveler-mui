import * as firebase from 'firebase'

const firebaseconfig = {
  apiKey: "AIzaSyBDVCm2dGFfKEZni3CHxQ0LAY4Y7lRMRNs",
  authDomain: "travel-53fc9.firebaseapp.com",
  databaseURL: "https://travel-53fc9.firebaseio.com",
  projectId: "travel-53fc9",
  storageBucket: "travel-53fc9.appspot.com",
  messagingSenderId: "423484485296"
};
firebase.initializeApp(firebaseconfig);

export default firebase;