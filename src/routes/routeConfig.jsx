import { Routes, Route, Navigate } from "react-router-dom";
import {
  Register,
  Login,
  Cases,
  Overview,
  Reports,
  Settings,
  Help,
} from "../page";
import { ProtectedRoute } from "../guards";
import { AdminLayout } from "../layouts";

import * as routes from "./constants";

const RouterConfig = () => {
  return (
    <>
      <Routes>
        <Route path={routes.REGISTER} element={<Register />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route
          path={routes.DASHBOARD}
          element={<ProtectedRoute component={AdminLayout} />}
        >
          <Route index element={<Navigate to={"/dashboard/overview"} />} />
          <Route path={routes.OVERVIEW} element={<Overview />} />
          <Route path={routes.CASES} element={<Cases />} />
          <Route path={routes.REPORTS} element={<Reports />} />
          <Route path={routes.NOTIFICATIONS} element={<Reports />} />
          <Route path={routes.SETTINGS} element={<Settings />} />
          <Route path={routes.HELP} element={<Help />} />
          <Route path={"*"} element={<Navigate to={"/dashboard/overview"} />} />
        </Route>
      </Routes>
    </>
  );
};

export default RouterConfig;
