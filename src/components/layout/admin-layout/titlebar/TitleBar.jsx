// import { logo } from "../../../../assets";
// import search from "../../../../assets/titlebar/search.svg";
// import notification from "../../../../assets/titlebar/notification.svg";
import placeholder from "../../../../assets/titlebar/placeholder-avatar.svg";
import chevron from "../../../../assets/titlebar/chevron.svg";
import { useLocation, useNavigate } from "react-router-dom";
import policeLogo from "../../../../assets/sidebar/police-project-logo.svg";

const TitleBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
      <div className="flex gap-2 sm:gap-4 mr-10 items-center">
        <button
          aria-label="Profile"
          className="flex flex-nowrap gap-2 items-center hover:bg-primary-gray rounded p-1"
        >
          <img src={placeholder} className="w-[28px] h-[28px] sm:w-10" />
          <div className="font-poppins flex flex-col justify-between items-start">
            <p className="font-inter hidden sm:block text-sm">Yarri Sandra</p>
            <p className="font-inter hidden sm:block text-sm text-gray-500">
              NPF/123SD-34FR
            </p>
          </div>
          <img className="w-3" src={chevron} />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
