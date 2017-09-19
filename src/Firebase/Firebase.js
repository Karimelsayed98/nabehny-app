import * as Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBmFH-X9FAtx9Wq0Txm2d9xtNF7XUfrKHs',
  authDomain: 'nabehny-app.firebaseapp.com',
  databaseURL: 'https://nabehny-app.firebaseio.com',
  projectId: 'nabehny-app',
  storageBucket: 'nabehny-app.appspot.com',
  messagingSenderId: '755924762843',
};
export const firebase = Firebase.initializeApp(config);
