import { createContext } from "react";

const Context = createContext({
  currentUser: null,
  isAuth: false,
  draft: null,
  pins: [],
  currentPin: null
});

export default Context;
