// import { logo } from "../../../../assets";
// import search from "../../../../assets/titlebar/search.svg";
// import notification from "../../../../assets/titlebar/notification.svg";
// import placeholder from "../../../../assets/titlebar/placeholder-avatar.svg";
import chevron from "../../../../assets/titlebar/chevron.svg";
import { useLocation, useNavigate } from "react-router-dom";
import policeLogo from "../../../../assets/sidebar/police-project-logo.svg";
import avatar from "../../../../assets/cases/no-image.svg";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { userApiSlice } from "../../../../service/division.service";
import { useOutsideCloser } from "../../../../hooks/useOutsideCloser";

const TitleBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.user);
  const profileMenuRef = useRef();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useOutsideCloser(profileMenuRef, showProfileMenu, setShowProfileMenu);

  const divisionData = userApiSlice.endpoints.getDivision.useQueryState();

  const navigateToOverview = () => {
    navigate("/dashboard/overview");
  };

  const generatePageTitle = () => {
    if (pathname.includes("overview")) {
      return "Overview";
    } else if (pathname.includes("cases")) {
      return "Cases";
    } else if (pathname.includes("report")) {
      return "Reports";
    } else if (pathname.includes("notifications")) {
      return "Notifications";
    } else if (pathname.includes("settings")) {
      return "Settings";
    } else if (pathname.includes("help")) {
      return "Help Centre";
    } else if (pathname.includes("logout")) {
      return "Logout";
    }
  };

  return (
    <div className="h-fit mb-4 flex justify-between py-2 w-full px-4 sticky top-0 bg-[#eeeeee] z-10">
      <div
        className="flex gap-1 flex-nowrap items-center w-fit cursor-pointer"
        onClick={navigateToOverview}
      >
        <img src={policeLogo} className="w-12 md:hidden" />
        <p className="sm:text-xl font-pt-serif uppercase text-project-light-black text-2xl font-bold">
          {generatePageTitle()}
        </p>
      </div>
      <div
        className="flex gap-2 sm:gap-4 mr-10 items-center relative"
        ref={profileMenuRef}
      >
        <button
          aria-label="Profile"
          className="flex flex-nowrap gap-2 items-center hover:bg-project-gray-2 transition-all rounded p-1"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <div className="w-[28px] h-[28px] sm:w-10 sm:h-10 rounded-full bg-project-gray-2 relative">
            {/* profile image */}
            <img src={avatar} className="w-full h-full object-contain" />
            {/* status indicator */}
            <div className="w-[10px] h-[10px] absolute bottom-[1px] right-[1px] bg-project-light-black border-[2px] border-solid border-white rounded-full" />
          </div>
          <div className="font-poppins flex flex-col justify-between items-start">
            <p className="font-inter hidden sm:block text-sm">{user?.name}</p>
            <p className="font-inter hidden sm:block text-sm text-gray-500">
              {user?.id_number}
            </p>
          </div>
          <img
            className={
              showProfileMenu
                ? "w-3 rotate-180 transition-all"
                : "w-3 transition-all"
            }
            src={chevron}
          />
        </button>
        {/* Profile menu */}
        <AnimatePresence>
          {showProfileMenu && (
            <motion.div
              initial={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -10 }}
              className="absolute flex flex-col gap-y-1 text-xs top-14 border border-solid border-project-gray min-w-[240px] right-0 py-2 px-2 bg-white shadow-lg w-full rounded"
            >
              <p className="w-full border-b border-solid border-project-gray-2 pb-1 font-poppins font-semibold">
                Account Details
              </p>
              <div className="flex flex-col gap-y-1 mt-2">
                <div className="font-poppins text-project-emerald font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  Name:{" "}
                  <span className="whitespace-nowrap font-normal">
                    {user?.name}
                  </span>
                </div>
                <div className="font-poppins text-project-emerald font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  ID:{" "}
                  <span className="whitespace-nowrap font-normal">
                    {user?.id_number}
                  </span>
                </div>
                <div className="font-poppins text-project-emerald font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  Email:{" "}
                  <span className="whitespace-nowrap font-normal">
                    {user?.email}
                  </span>
                </div>
                <div className="font-poppins text-project-emerald font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  Account Status:{" "}
                  <span
                    className={`whitespace-nowrap font-normal ${
                      user?.disabled
                        ? "bg-yellow-200 text-yellow-700"
                        : "bg-green-200 text-green-700"
                    } rounded-full inline-flex p-1 w-fit px-2`}
                  >
                    {user?.disabled ? "Disabled" : "Enabled"}
                  </span>
                </div>
              </div>
              <p className="w-full border-b border-solid border-project-gray-2 pb-1 font-poppins font-semibold mt-2">
                Division Information
              </p>
              <div className="flex flex-col gap-y-1 mt-2">
                <div className="font-poppins text-project-emerald font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  Division Location:{" "}
                  <span className="whitespace-nowrap font-normal">
                    {divisionData.currentData?.data[0]?.division_location}
                  </span>
                </div>
                <div className="font-poppins text-project-emerald font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  Division Code:{" "}
                  <span className="whitespace-nowrap font-normal">
                    {divisionData.currentData?.data[0]?.division_code}
                  </span>
                </div>
                <div className="font-poppins text-project-emerald font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  Division ID:{" "}
                  <span className="whitespace-nowrap font-normal">
                    {divisionData.currentData?.data[0]?.division_id}
                  </span>
                </div>
              </div>
              <button
                aria-label="View Profile"
                className="p-2 rounded bg-project-gray hover:bg-project-blue w-full flex justify-center items-center transition-all group mt-2"
              >
                <span className="font-poppins text-project-blue font-semibold text-xs group-hover:text-white">
                  View Profile
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TitleBar;
