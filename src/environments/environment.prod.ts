export const baseURL = "https://identitytoolkit.googleapis.com/v1/accounts:";
export const APIKey = "key=AIzaSyDAtXwI6GLP7h2GSOyWXhyeekh4uqaVfjw";

export const environment = {
  production: true,


  firebaseConfig: {
    apiKey: "AIzaSyDAtXwI6GLP7h2GSOyWXhyeekh4uqaVfjw",
    authDomain: "ionic-tailorapp.firebaseapp.com",
    projectId: "ionic-tailorapp",
    storageBucket: "ionic-tailorapp.appspot.com",
    messagingSenderId: "1007527390320",
    appId: "1:1007527390320:web:3a790ee3c22a618d8e58b5",
    measurementId: "G-CTHM34YXMF"
  },

  // API URLs Started ========
  signIn: `${baseURL}signInWithPassword?${APIKey}`,
  signUp: `${baseURL}signUp?${APIKey}`,
  forgetPassword: `${baseURL}sendOobCode?${APIKey}`,
  changePassword: `${baseURL}update?${APIKey}`,

};
