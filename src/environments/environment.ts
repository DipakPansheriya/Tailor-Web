export const baseURL = "https://identitytoolkit.googleapis.com/v1/accounts:";
// export const APIKey = "key=AIzaSyDAtXwI6GLP7h2GSOyWXhyeekh4uqaVfjw";
  
export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyB6kAk4DfAgPx3ufek1PNC9Z6k-4Z0Ef6A",
    authDomain: "tailor-web.firebaseapp.com",
    projectId: "tailor-web",
    storageBucket: "tailor-web.appspot.com",
    messagingSenderId: "172189684583",
    appId: "1:172189684583:web:593b7abd1a43e03d8b95c2"
  },


  // // API URLs Started ========
  signIn: `${baseURL}signInWithPassword?key=`,
  signUp: `${baseURL}signUp?key=`,
  forgetPassword: `${baseURL}sendOobCode?key=`,
  changePassword: `${baseURL}update?key=`,

};