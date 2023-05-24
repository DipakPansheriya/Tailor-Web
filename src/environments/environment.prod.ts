export const baseURL = "https://identitytoolkit.googleapis.com/v1/accounts:";
// export const APIKey = "key=AIzaSyDZRn9bJmR_Y71Jt3c7YCyfvhNRi32oxe8";

export const environment = {
  production: true,


  firebaseConfig: {
    apiKey: "AIzaSyDZRn9bJmR_Y71Jt3c7YCyfvhNRi32oxe8",
    authDomain: "tailor-221e7.firebaseapp.com",
    projectId: "tailor-221e7",
    storageBucket: "tailor-221e7.appspot.com",
    messagingSenderId: "404320593704",
    appId: "1:404320593704:web:bbee5fefa9f8772c76121d"
  },

  // API URLs Started ========
  signIn: `${baseURL}signInWithPassword?key=`,
  signUp: `${baseURL}signUp?key=`,
  forgetPassword: `${baseURL}sendOobCode?key=`,
  changePassword: `${baseURL}update?key=`,

};
