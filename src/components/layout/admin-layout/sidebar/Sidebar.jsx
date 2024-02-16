import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import policeLogo from "../../../../assets/sidebar/police-project-logo.svg";
// import hamburgerMenu from "../../../../assets/sidebar/menu.svg";
// import closeMenu from "../../../../assets/sidebar/close.svg";

/* eslint-disable react/prop-types */
const Sidebar = ({ sidebarItems }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [showMenu, setShowMenu] = useState(true);

  const activeIconStyling = (route) => {
    if (pathname.includes(route)) {
      return "";
    } else if (route.includes("/logout")) {
      return "";
    } else {
      return "brightness-0 invert";
    }
  };

  const activeTextStyling = (route) => {
    if (pathname.includes(route)) {
      return "text-project-yellow";
    } else if (route.includes("/logout")) {
      return "text-project-red";
    } else {
      return "text-white";
    }
  };

  // calculate currentpageindex on page mount.
  useEffect(() => {
    if (pathname.includes("overview")) {
      setCurrentTabIndex(0);
    } else if (pathname.includes("cases")) {
      setCurrentTabIndex(1);
    } else if (pathname.includes("report")) {
      setCurrentTabIndex(2);
    } else if (pathname.includes("notifications")) {
      setCurrentTabIndex(3);
    } else if (pathname.includes("settings")) {
      setCurrentTabIndex(4);
    } else if (pathname.includes("help")) {
      setCurrentTabIndex(5);
    } else if (pathname.includes("logout")) {
      setCurrentTabIndex(6);
    }
  }, [pathname]);

  //   calculate current tab index on tab click
  useEffect(() => {
    setIndicatorPosition(
      currentTabIndex === 0
        ? "0"
        : currentTabIndex > 4
        ? `calc(${currentTabIndex * 1.5}rem + ${
            currentTabIndex * 1.75
          }rem + 40px)`
        : `calc(${currentTabIndex * 1.5}rem + ${currentTabIndex * 1.75}rem)`
    );
  }, [currentTabIndex]);

  return (
    // sidebar container
    <>
      {/* Sidebar for big screens */}
      <div className="w-[clamp(200px,20%,255px)] hidden fixed md:block md:sticky h-screen mx-0 top-0 bg-project-blue">
        <div className="absolute bottom-0 left-0 w-full h-[15%] pointer-events-none z-10 bg-gradient-to-b from-transparent to-[#020065]" />
        {/* sidebar */}
        <div className="w-full h-full pt-6 rounded-[1.25rem] relative bg-primary-black poppins flex flex-col">
          <div className="w-full px-2 flex flex-col items-center justify-center font-bold text-base gap-y-1">
            <p className="text-project-gray w-fit">Divisional Police Station</p>
            <p className="text-project-gray w-fit">Utako</p>
            <img src={policeLogo} className="w-1/3" />
          </div>
          <div className="w-full flex flex-col gap-y-7 relative mt-12 flex-1 overflow-scroll pb-20 hide-scrollbar">
            {sidebarItems.map((sidebarItem, i) => {
              return (
                <button
                  key={sidebarItem.title}
                  className="flex mx-auto w-[70%] gap-x-3 items-center relative z-[1] transition-all duration-300"
                  aria-label={sidebarItem.title}
                  onClick={() => {
                    setCurrentTabIndex(i);
                    navigate(`/${sidebarItem.route}`);
                  }}
                  style={{
                    marginTop: i == 5 ? "40px" : "",
                  }}
                >
                  <img
                    src={sidebarItem.icon}
                    className={`h-5 brightness ${activeIconStyling(
                      sidebarItem.route
                    )}`}
                    style={{
                      transition: "all 300ms ease",
                    }}
                  />
                  <p
                    className={`hidden sm:block text-base font-medium font-poppins ${activeTextStyling(
                      sidebarItem.route
                    )}`}
                    style={{
                      transition: "all 300ms ease",
                    }}
                  >
                    {sidebarItem.title}
                  </p>
                </button>
              );
            })}
            {/* indicator */}
            <div
              className={`absolute h-6  w-1 rounded-tl-sm rounded-bl-sm ${
                currentTabIndex === 6 ? "bg-project-red" : "bg-project-yellow"
              } bg-[rgba(255,255,255,0.2)] right-0`}
              style={{
                top: indicatorPosition,
                transition: "all 300ms ease",
              }}
            />
          </div>
        </div>
      </div>

      {/* Sidebar for small screens */}
      <div className="w-[clamp(50px,10%,119px)] left-2 fixed md:hidden md:sticky h-screen ml-0 top-0">
        {/* menu button */}
        <button
          aria-label="Menu"
          onClick={() => setShowMenu(!showMenu)}
          className="mb-4 transition-all duration-200 shadow-primary-dark hover:shadow-primary-dark-hovered w-full h-10 py-2 rounded-[1.25rem] relative mt-12 bg-primary-black flex justify-center items-center"
        >
          <img
            src={showMenu ? "hamburgerMenu" : "closeMenu"}
            className="h-full"
          />
        </button>
        {/* sidebar */}
        <div
          style={{
            left: showMenu ? "-100px" : 0,
            transition: "all 200ms ease-in-out",
            boxShadow: "5px 7px 12px rgba(0,0,0,0.3)",
          }}
          className="w-full h-fit py-10 rounded-[1.25rem] relative bg-primary-black mt-14 after:content('') after:text-white after:absolute after:w-full after:h-1/2 after:block after:-right-[6px] after:-z-10 after:rounded-[1.25rem] after:bg-gradient-to-b after:from-[#EB9207] after:to-[transparent] after:top-[6%]"
        >
          <div className="w-full flex flex-col gap-y-8 relative">
            {sidebarItems.map((sidebarItem, i) => {
              return (
                <button
                  key={sidebarItem.title}
                  className="flex flex-col gap-1 items-center justify-center h-14 relative z-[1] transition-all duration-300"
                  aria-label={sidebarItem.title}
                  onClick={() => {
                    setCurrentTabIndex(i);
                    setShowMenu(!showMenu);
                    navigate(`/${sidebarItem.route}`);
                  }}
                >
                  <img
                    src={sidebarItem.icon}
                    className={`h-8 brightness ${activeIconStyling(
                      sidebarItem.route
                    )}`}
                    style={{
                      transition: "all 300ms ease",
                    }}
                  />
                  {/* <p
                    className={`hidden sm:block sm:text-[0.5rem] md:text-[0.65rem] lg::text-xs font-medium font-poppins ${activeTextStyling(
                      sidebarItem.route
                    )}`}
                    style={{
                      transition: "all 300ms ease",
                    }}
                  >
                    {sidebarItem.title}
                  </p> */}
                </button>
              );
            })}
            {/* indicator */}
            <div
              className={`absolute w-1 rounded-tl-sm rounded-bl-sm bg-project-yellow h-[3.75rem] bg-[rgba(255,255,255,0.2)] -0 right-0`}
              style={{
                top: indicatorPosition,
                transition: "all 300ms ease",
              }}
            />
          </div>
          {/* green glow */}
          <div className="w-full h-full rounded-[1.25rem] overflow-hidden absolute top-0">
            <div className="w-40 h-40 rounded-full bg-primary-dark-green absolute -bottom-28 -left-4 blur-3xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
