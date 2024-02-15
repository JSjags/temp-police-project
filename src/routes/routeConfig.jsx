import { Routes, Route } from "react-router-dom";
import { Register, Login } from "../page";

import * as routes from "./constants";

const RouterConfig = () => {
  return (
    <>
      <Routes>
        <Route path={routes.REGISTER} element={<Register />} />
        <Route path={routes.LOGIN} element={<Login />} />
      </Routes>
    </>
  );
};

export default RouterConfig;
