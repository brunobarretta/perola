import { createContext, useState } from "react";
import { App, Credentials } from "realm-web";
import { APP_ID } from "../realm/constants";

// Creating a Realm App Instance
const app = new App(APP_ID);

interface SomeProps {
  user:any
  setUser:any
  fetchUser:() => void
  emailPasswordLogin:(email:string, password:string) => void
  emailPasswordSignup:(email:string, password:string) => void
  logOutUser:() => void
}

export const UserContext = createContext({} as SomeProps);

export const UserProvider = ({ children }:any) => {
  const [user, setUser] = useState<any>(null);

  // Function to login user into our Realm using their email & password
  const emailPasswordLogin = async (email:string, password:string) => {
    const credentials = Credentials.emailPassword(email, password);
    const authedUser:any = await app.logIn(credentials);
    setUser(authedUser);
    return authedUser;
  };

  // Function to signup user into our Realm using their email & password
  const emailPasswordSignup = async (email:string, password:string) => {
    try {
      await app.emailPasswordAuth.registerUser({email, password});
      // Since we are automatically confirming our users we are going to login
      // the user using the same credentials once the signup is complete.
      return emailPasswordLogin(email, password);
    } catch (error) {
      throw error;
    }
  };

  // Function to fetch-user(if the user is already logged in) from local storage
  const fetchUser = async () => {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.refreshCustomData();
      // Now if we have a user we are setting it to our user context
      // so that we can use it in our app across different components.
      setUser(app.currentUser);
      return app.currentUser;
    } catch (error) {
      throw error;
    }
  }

  // Function to logout user from our Realm
  const logOutUser = async () => {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.logOut();
      // Setting the user to null once loggedOut.
      setUser(null);
      return true;
    } catch (error) {
      throw error
    }
  }

  return <UserContext.Provider value={{ user, setUser, fetchUser, emailPasswordLogin, emailPasswordSignup, logOutUser }}>
    {children}
  </UserContext.Provider>;
}