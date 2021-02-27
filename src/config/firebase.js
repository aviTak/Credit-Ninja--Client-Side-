import firebase from 'firebase/app';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyB7vl28TnDPCZEgg8W2qHI18SMY4czs_FQ",
    authDomain: "credit-ninja.firebaseapp.com",
    projectId: "credit-ninja",
    storageBucket: "credit-ninja.appspot.com",
    messagingSenderId: "483467426800",
    appId: "1:483467426800:web:92d73a1a17c7aebaa6fb35",
    measurementId: "G-XR9ZQ3B2CF"
};
  
firebase.initializeApp(firebaseConfig);
firebase.analytics();
