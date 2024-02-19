import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import policeLogo from "../../../../assets/sidebar/police-project-logo.svg";
import hamburgerMenu from "../../../../assets/sidebar/menu.svg";
import closeMenu from "../../../../assets/sidebar/close.svg";
import { handleLogout } from "../../../../static/logout";
import { useDispatch } from "react-redux";
import { userApiSlice } from "../../../../service/division.service";

/* eslint-disable react/prop-types */
const Sidebar = ({ sidebarItems }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const divisionData = userApiSlice.endpoints.getDivision.useQueryState();

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
        : currentTabIndex > 1
        ? `calc(${currentTabIndex * 1.5}rem + ${
            currentTabIndex * 1.75
          }rem + 140px)`
        : `calc(${currentTabIndex * 1.5}rem + ${currentTabIndex * 1.75}rem)`
    );
  }, [currentTabIndex]);

  return (
    // sidebar container
    <>
      {/* Sidebar for big screens */}
      <div className="w-[clamp(200px,20%,255px)] min-w-[200px] hidden fixed md:block md:sticky h-screen mx-0 top-0 bg-project-blue">
        <div className="absolute bottom-0 left-0 w-full h-[15%] pointer-events-none z-10 bg-gradient-to-b from-transparent to-[#020065]" />
        {/* sidebar */}
        <div className="w-full h-full pt-6 rounded-[1.25rem] relative bg-primary-black poppins flex flex-col">
          <div className="w-full px-2 flex flex-col items-center justify-center font-bold text-base gap-y-1">
            <p className="text-project-gray w-fit">
              {divisionData?.currentData?.data[0]?.division_name
                .split(" ")
                .slice(0, -1)
                .join(" ")}
            </p>
            <p className="text-project-gray w-fit">
              {divisionData?.currentData?.data[0]?.division_name
                .split(" ")
                .slice(-1)
                .join("")}
            </p>
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
                    i === 2
                      ? handleLogout(dispatch)
                      : navigate(`/${sidebarItem.route}`);
                  }}
                  style={{
                    marginTop: i == 2 ? "140px" : "",
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
                currentTabIndex === 2 ? "bg-project-red" : "bg-project-yellow"
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
      {/* menu button for small screens */}

      {/* menu button */}
      <button
        aria-label="Menu"
        onClick={() => setShowMenu(!showMenu)}
        className="fixed md:hidden z-20 top-2 sm:top-4 right-2 sm:right-4 p-2 rounded-md bg-project-blue "
      >
        <img src={showMenu ? closeMenu : hamburgerMenu} className="h-full" />
      </button>

      <div
        className="w-screen h-screen fixed backdrop-blur z-20 bg-[rgba(0,0,0,0.5)]"
        style={{
          width: showMenu ? "100%" : "0",
          opacity: showMenu ? "1" : "0",
          transition: "all 200ms ease-in-out",
        }}
      >
        {/* menu button */}
        <button
          aria-label="Menu"
          onClick={() => setShowMenu(!showMenu)}
          className="absolute top-2 right-2 p-2 rounded-md bg-project-blue "
        >
          <img
            src={showMenu ? closeMenu : hamburgerMenu}
            className="h-full invert"
          />
        </button>
        <div
          className="w-[clamp(200px,80%,255px)] left-0 fixed md:hidden md:sticky h-screen ml-0 top-0 z-20"
          style={{
            width: showMenu ? "clamp(200px,80%,255px)" : "0",
            left: showMenu ? "0" : "-100%",
            transition: "all 200ms ease-in-out",
            boxShadow: "5px 7px 12px rgba(0,0,0,0.3)",
          }}
        >
          {/* sidebar */}
          <div
            style={{
              width: showMenu ? "100%" : "100%",
              left: showMenu ? "0" : "-100%",
              transition: "all 200ms ease-in-out",
              boxShadow: "5px 7px 12px rgba(0,0,0,0.3)",
            }}
            className="w-full h-full py-10 relative bg-primary-black bg-project-blue"
          >
            {/* sidebar */}
            <div className="w-full h-full pt-6 rounded-[1.25rem] relative bg-primary-black poppins flex flex-col">
              <div className="w-full px-2 flex flex-col items-center justify-center font-bold text-base gap-y-1">
                <p className="text-project-gray w-fit">
                  Divisional Police Station
                </p>
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
                        setShowMenu(false);
                        setCurrentTabIndex(i);
                        navigate(`/${sidebarItem.route}`);
                      }}
                      style={{
                        marginTop: i == 2 ? "140px" : "",
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
                        className={`text-base font-medium font-poppins ${activeTextStyling(
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
                    currentTabIndex === 6
                      ? "bg-project-red"
                      : "bg-project-yellow"
                  } bg-[rgba(255,255,255,0.2)] right-0`}
                  style={{
                    top: indicatorPosition,
                    transition: "all 300ms ease",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
