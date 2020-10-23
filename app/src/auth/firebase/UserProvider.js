import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "./firebase";


export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null
  };

  
  
  componentDidMount = async () => {
    console.log("just before auth state changed")
    auth.onAuthStateChanged(async userAuth => {
      console.log("In onAuthStateChanged")
      const user = await generateUserDocument(userAuth);
      this.setState({ user });
    });


  };

  render() {
    const { user } = this.state;

    return (
      <UserContext.Provider value={user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;