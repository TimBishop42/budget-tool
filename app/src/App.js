import React from "react";
import Application from "./components/Application";
import UserProvider from "./auth/firebase/UserProvider";
function App() {
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}
export default App;