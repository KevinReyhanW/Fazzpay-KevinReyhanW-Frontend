import { combineReducers } from "redux";

import counter from "./counter";
import signin from "./signin";
import signup from "./signup";
import user from "./user";
import pinC from "./pin";
import topupM from "./topup";
import transferM from "./transfer";

export default combineReducers({
  counter,
  signin,
  signup,
  user,
  pinC,
  topupM,
  transferM,
});
