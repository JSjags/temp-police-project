/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import handcuffs from "../../assets/overview/handcuffs.svg";
import increase from "../../assets/overview/increase.svg";
import decrease from "../../assets/overview/decrease.svg";
import chevron from "../../assets/titlebar/chevron.svg";
import { PercentageShare } from "../../components/layout/overview";
import { cases } from "../../constants";
import { defaults } from "chart.js";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { Doughnut } from "react-chartjs-2";
import { CaseCard } from "../../components/cases";
import { useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import { useGetDivisionQuery } from "../../service/division.service";
import { useGetCasesQuery } from "../../service/case.service";
import { Oval } from "react-loader-spinner";
import { useGetDashoardDataQuery } from "../../service/user.service";

ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale, BarElement);
defaults.font.family = "'Poppins', sans-serif";
defaults.font.weight = "600";

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  maxBarThickness: 20,
  scales: {
    x: {
      grid: {
        display: false,
        tickBorderDash: 0,
      },
      border: {
        display: false,
      },
      ticks: {
        font: {
          weight: "normal",
        },
        major: {
          enable: true,
        },
      },
    },
    y: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
};
const labels = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const Overview = () => {
  const navigate = useNavigate();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [currentSummmaryItem, setCurrentSummmaryItem] = useState({
    value: "all_cases",
    label: "All cases",
  });

  const generatePeriodText = () => {
    switch (currentTabIndex) {
      case 0:
        return "today";
      case 1:
        return "week";
      case 2:
        return "month";
      case 3:
        return "year";
    }
  };
  const [, setIndicatorWidth] = useState(0);

  const response = useGetDivisionQuery();
  const casesData = useGetCasesQuery();
  const dashboardData = useGetDashoardDataQuery(generatePeriodText());

  console.log(dashboardData);

  const activeTextStyling = (index) => {
    if (index === currentTabIndex) {
      return "text-black";
    } else {
      return "text-project-gray-2";
    }
  };

  const dailyRef = useRef();
  const weeklyRef = useRef();
  const monthlyRef = useRef();
  const yearlyRef = useRef();

  useEffect(() => {
    setIndicatorPosition(calculateIndicatorPosition(currentTabIndex));
  }, [currentTabIndex]);

  useEffect(() => {
    setIndicatorWidth(calculateWidth);
  }, [currentTabIndex]);

  const calculateWidth = (i) => {
    if (i === 0) return dailyRef.current?.offsetWidth;
    if (i === 1) return weeklyRef.current?.offsetWidth;
    if (i === 2) return monthlyRef.current?.offsetWidth;
    if (i === 3) return yearlyRef.current?.offsetWidth;
  };

  const calculateIndicatorPosition = (i) => {
    if (i === 0) return 0;
    if (i === 1) return dailyRef.current.offsetWidth;
    if (i === 2)
      return dailyRef.current.offsetWidth + weeklyRef.current.offsetWidth;
    if (i === 3)
      return (
        dailyRef.current.offsetWidth +
        weeklyRef.current.offsetWidth +
        monthlyRef.current.offsetWidth
      );
  };

  console.log(
    dashboardData?.currentData?.data?.arrestSummary?.summary.filter(
      (item) => item.crimeType === currentSummmaryItem.label
    )
  );

  // doughnut chartdata
  const data = {
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label:
          currentSummmaryItem.label === "All cases"
            ? "Total Cases"
            : currentSummmaryItem.label,
        data: [
          currentSummmaryItem.label === "All cases"
            ? dashboardData?.currentData?.data?.arrestSummary?.summary.reduce(
                (acc, curr) => acc + curr?.count,
                0
              )
            : dashboardData?.currentData?.data?.arrestSummary?.summary.filter(
                (item) => item.crimeType === currentSummmaryItem.label
              )[0]?.count ?? 0,
        ],
        cutout: 55,
        doughnutBackground: {
          enabled: true,
          color: "#E4E6E6",
        },
        // borderRadius: Number.MAX_VALUE,
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
          "rgba(5,4,102)",
        ],
        borderColor: [
          // "rgba(255, 99, 132, 1)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };
  const otherData = {
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label:
          currentSummmaryItem.label.toLowerCase() === "violent activities"
            ? "violent act."
            : currentSummmaryItem.label,
        data: [
          dashboardData?.currentData?.data?.arrestSummary?.summary
            .filter((item) => item.crimeType !== currentSummmaryItem.label)
            .reduce((acc, curr) => acc + curr?.count, 0) ?? 0,
        ],
        cutout: 55,
        doughnutBackground: {
          enabled: true,
          color: "#E4E6E6",
        },
        // borderRadius: Number.MAX_VALUE,
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64)",
          // "rgba(5,4,102,)",
        ],
        borderColor: [
          // "rgba(255, 99, 132, 1)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
      // {
      //   label: currentSummmaryItem.label,
      //   data: [
      //     dashboardData?.currentData?.data?.arrestSummary?.summary.filter(
      //       (item) => item.crimeType === currentSummmaryItem.label
      //     )[0]?.count ?? 0,
      //   ],
      //   cutout: 65,
      //   doughnutBackground: {
      //     enabled: true,
      //     color: "#E4E6E6",
      //   },
      //   // borderRadius: Number.MAX_VALUE,
      //   backgroundColor: [
      //     // "rgba(255, 99, 132, 0.2)",
      //     // "rgba(54, 162, 235, 0.2)",
      //     // "rgba(255, 206, 86, 0.2)",
      //     // "rgba(75, 192, 192, 0.2)",
      //     // "rgba(153, 102, 255, 0.2)",
      //     // "rgba(255, 159, 64, 0.2)",
      //     "rgba(5,4,102)",
      //   ],
      //   borderColor: [
      //     // "rgba(255, 99, 132, 1)",
      //     // "rgba(54, 162, 235, 1)",
      //     // "rgba(255, 206, 86, 1)",
      //     // "rgba(75, 192, 192, 1)",
      //     // "rgba(153, 102, 255, 1)",
      //     // "rgba(255, 159, 64, 1)",
      //   ],
      //   borderWidth: 1,
      //   hoverOffset: 4,
      // },
    ],
  };

  // bar chart data
  const barChartData = {
    labels,
    datasets: [
      {
        label: "Arrests",
        data: dashboardData?.currentData?.data
          ? dashboardData?.currentData?.data?.monthlyArrestStats.reduce(
              (acc, curr) => {
                let yD = acc;
                switch (curr.month) {
                  case "JAN":
                    yD[0] = curr.count;
                    return yD;
                  case "FEB":
                    yD[1] = curr.count;
                    return yD;
                  case "MAR":
                    yD[2] = curr.count;
                    return yD;
                  case "APR":
                    yD[3] = curr.count;
                    return yD;
                  case "MAY":
                    yD[4] = curr.count;
                    return yD;
                  case "JUN":
                    yD[5] = curr.count;
                    return yD;
                  case "JUL":
                    yD[6] = curr.count;
                    return yD;
                  case "AUG":
                    yD[7] = curr.count;
                    return yD;
                  case "SEP":
                    yD[8] = curr.count;
                    return yD;
                  case "OCT":
                    yD[9] = curr.count;
                    return yD;
                  case "NOV":
                    yD[10] = curr.count;
                    return yD;
                  case "DEC":
                    yD[11] = curr.count;
                    return yD;
                }
              },
              Array(12).fill(0)
            )
          : [],
        backgroundColor: "#050466",
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  };

  const myPluginSuperText = {
    id: "myPlugin",
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const xCoor =
        chart.chartArea.left +
        (chart.chartArea.right - chart.chartArea.left) / 2;
      const yCoor =
        chart.chartArea.top +
        (chart.chartArea.bottom - chart.chartArea.top) / 2.3;
      ctx.save();
      ctx.beginPath();
      ctx.arc(xCoor, 64, 55, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(5,4,102, 0.1)";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#003300";
      ctx.stroke();

      ctx.font = "bold 24px 'DM sans', sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        currentSummmaryItem.label.toLowerCase() === "all cases"
          ? dashboardData?.currentData?.data?.arrestSummary?.summary.reduce(
              (acc, curr) => acc + curr?.count,
              0
            )
          : dashboardData?.currentData?.data?.arrestSummary?.summary.filter(
              (item) =>
                item?.crimetype?.toLowerCase().trim() ===
                currentSummmaryItem.label.toLowerCase().trim()
            )[0]?.count ?? 0,
        xCoor,
        yCoor
      );
      ctx.restore();
    },
  };

  const myPluginSubText = {
    id: "myPlugin",
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const xCoor =
        chart.chartArea.left +
        (chart.chartArea.right - chart.chartArea.left) / 2;
      const yCoor =
        chart.chartArea.top +
        (chart.chartArea.bottom - chart.chartArea.top) / 1.6;
      ctx.save();
      ctx.font = "normal 14px 'DM sans', sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${
          currentSummmaryItem.label === "All cases"
            ? "Total Cases"
            : currentSummmaryItem.label
        }`,
        xCoor,
        yCoor
      );
      ctx.restore();
    },
  };

  return (
    <div className="px-4 w-full">
      {/* First Section */}
      <div className="p-5 rounded-xl bg-white font-poppins">
        {/* time range tabs*/}
        <ul className="flex font-medium text-xs min-[380px]:text-sm relative">
          <li
            onClick={() => setCurrentTabIndex(0)}
            ref={dailyRef}
            className={`cursor-pointer border-b border-solid border-project-gray-2 p-2 px-3 flex justify-center items-center transition-all duration-300 ${activeTextStyling(
              0
            )}`}
          >
            <span>Daily</span>
          </li>
          <li
            onClick={() => setCurrentTabIndex(1)}
            ref={weeklyRef}
            className={`cursor-pointer border-b border-solid border-project-gray-2 p-2 px-3 flex justify-center items-center transition-all duration-300 ${activeTextStyling(
              1
            )}`}
          >
            <span>Weekly</span>
          </li>
          <li
            onClick={() => setCurrentTabIndex(2)}
            ref={monthlyRef}
            className={`cursor-pointer border-b border-solid border-project-gray-2 p-2 px-3 flex justify-center items-center transition-all duration-300 ${activeTextStyling(
              2
            )}`}
          >
            <span>Monthly</span>
          </li>
          <li
            onClick={() => setCurrentTabIndex(3)}
            ref={yearlyRef}
            className={`cursor-pointer border-b border-solid border-project-gray-2 p-2 px-3 flex justify-center items-center transition-all duration-300 ${activeTextStyling(
              3
            )}`}
          >
            <span>Yearly</span>
          </li>
          {/* indicator */}
          <li
            className={`h-[3px] absolute -bottom-[1px] bg-black transition-all duration-300`}
            style={{
              left: indicatorPosition,
              width: calculateWidth(currentTabIndex),
            }}
          />
        </ul>

        {/* Summary section */}
        {(dashboardData.isLoading || dashboardData.isFetching) && (
          <div className="flex justify-center items-center w-full h-[clamp(200px,30vh,240px)]">
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#020065"
              secondaryColor="#02006552"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        {dashboardData.isSuccess &&
        dashboardData?.currentData?.data?.arrestSummary?.summary.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {/* First card */}
            <div>
              <div className="justify-between h-52 pt-8 pl-8 border border-solid border-project-gray rounded-xl">
                <div className="flex w-5/6 justify-between items-start">
                  <div>
                    <p className="font-bold text-5xl text-project-light-black">
                      {dashboardData?.currentData?.data?.totalArrest}
                    </p>
                    <p className="font-medium text-base text-project-light-black">
                      Total Arrests
                    </p>
                  </div>
                  <div className="w-11 h-11 p-[6px] rounded-md bg-red-100 flex justify-center items-center">
                    <img src={handcuffs} />
                  </div>
                </div>
                <p className="text-xs mt-4 inline-flex items-center">
                  <img src={increase} className="w-2 inline-flex mr-1" />
                  <span className="text-project-green font-medium">
                    +
                    {(dashboardData?.currentData?.data?.totalArrest /
                      dashboardData?.currentData?.data?.totalArrest) *
                      100}
                    %
                  </span>
                  &nbsp;
                  <span className="text-project-light-black">
                    from the last month
                  </span>
                </p>
              </div>
            </div>
            {/* Second card */}
            <div>
              <div className="justify-between h-52 pt-6 pl-4 border border-solid border-project-gray rounded-xl">
                <p className="font-inter text-xs min-[500px]:text-base text-project-light-black font-semibold">
                  Legal Representation
                </p>
                <div className="mt-3">
                  <div>
                    {/* Can afford */}
                    <p className="font-poppins text-base text-project-light-black font-semibold">
                      Can Afford
                    </p>
                    <PercentageShare
                      bgColor={"rgba(5,4,102,.2)"}
                      color={"rgba(5,4,102,1)"}
                      total={
                        dashboardData?.currentData?.data?.legal_representaion
                          ?.withoutLegalRep?.total +
                        dashboardData?.currentData?.data?.legal_representaion
                          ?.withLegalRep?.total
                      }
                      value={
                        dashboardData?.currentData?.data?.legal_representaion
                          ?.withLegalRep?.total
                      }
                      key={"CAN-AFFORD"}
                    />
                    <p className="text-xs inline-flex items-center -translate-y-2">
                      <img src={decrease} className="w-2 inline-flex mr-1" />
                      <span className="text-project-red font-medium">+8%</span>
                      &nbsp;
                      <span className="text-project-light-black">
                        from the last month
                      </span>
                    </p>

                    {/* Can't afford */}
                    <p className="font-poppins text-base text-project-light-black font-semibold">
                      Can't Afford
                    </p>
                    <PercentageShare
                      bgColor={"rgba(243, 51, 51,.2)"}
                      color={"rgba(243, 51, 51, 1)"}
                      total={
                        dashboardData?.currentData?.data?.legal_representaion
                          ?.withoutLegalRep?.total +
                        dashboardData?.currentData?.data?.legal_representaion
                          ?.withLegalRep?.total
                      }
                      value={
                        dashboardData?.currentData?.data?.legal_representaion
                          ?.withoutLegalRep?.total
                      }
                      key={"CANT-AFFORD"}
                    />
                    <p className="text-xs inline-flex items-center -translate-y-2">
                      <img src={increase} className="w-2 inline-flex mr-1" />
                      <span className="text-project-green font-medium">
                        +5%
                      </span>
                      &nbsp;
                      <span className="text-project-light-black">
                        from the last month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Third card */}
            <div>
              <div className="flex flex-col justify-between h-52 pt-6 border border-solid border-project-gray rounded-xl">
                <div className="flex justify-between items-center">
                  <p className="font-inter text-xs min-[500px]:text-base text-project-light-black font-semibold pl-4 whitespace-nowrap">
                    Arrest Summary
                  </p>
                  {!!(
                    dashboardData.isSuccess &&
                    dashboardData?.currentData?.data?.arrestSummary
                      ?.all_crime_types.length
                  ) && (
                    <div className="mr-4 font-dmsans font-semibold border rounded-sm bg-white border-solid border-project-gray">
                      <Select
                        values={
                          dashboardData.isSuccess &&
                          dashboardData?.currentData?.data?.arrestSummary
                            ?.all_crime_types.length
                            ? [
                                "All cases",
                                ...(dashboardData?.currentData?.data
                                  ?.arrestSummary?.all_crime_types ?? []),
                              ].map((type) => ({
                                value: type.toLowerCase().split(" ").join("_"),
                                label: type,
                              }))
                            : []
                        }
                        dropdownHandleRenderer={({ state, methods }) => (
                          <img
                            src={chevron}
                            className={
                              state.dropdown
                                ? "rotate-180 transition-all"
                                : "transition-all"
                            }
                            onClick={() => methods.dropDown("toggle")}
                          />
                        )}
                        contentRenderer={({ state }) => (
                          <p className="whitespace-nowrap w-24 overflow-hidden text-ellipsis text-project-light-black">
                            {state.values[0].label}
                          </p>
                        )}
                        itemRenderer={({
                          item,
                          itemIndex,
                          props,
                          state,
                          methods,
                        }) => (
                          <div
                            onClick={() => {
                              methods.clearAll();
                              methods.addItem(item);
                              setCurrentSummmaryItem(item);
                            }}
                            className="p-1 px-2 bg-[#F4F0F0] text-project-light-black hover:bg-project-blue hover:text-white transition-all"
                          >
                            {item.label}
                          </div>
                        )}
                        closeOnScroll={true}
                        options={[
                          { value: "all-cases", label: "All cases" },
                          { value: "drug-abuse", label: "Drug Abuse" },
                          {
                            value: "sexual-assault",
                            label: "Sexual Assault",
                          },
                          { value: "murder", label: "Murder" },
                          { value: "cultism", label: "Cultism" },
                          {
                            value: "violent-activities",
                            label: "Violent Activities",
                          },
                          { value: "others", label: "Others" },
                        ]}
                        // onChange={(values) => this.onChange(values)}
                        dropdownGap={5}
                        style={{
                          width: 120,
                          fontSize: "10px",
                          margin: 0,
                          height: 0,
                          minHeight: "20px",
                          border: "none",
                          outlineColor: "red",
                        }}
                        className="custom-outline"
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 items-center justify-between px-2 pb-6">
                  {/* previous button */}
                  {/* <button
                  aria-label="Previous"
                  className=" p-1 hover:bg-project-gray flex justify-center items-center rounded-lg trnasition-all duration-150"
                >
                  <img src={chevron} className="w-6 rotate-90" />
                </button> */}

                  {/* chart */}
                  <div className="flex-1 h-[140px] w-[140px] pt-3 flex justify-center items-center">
                    {/* <ReactEcharts
                    option={options}
                    className="w-[140px] h-[140px]"
                  /> */}
                    <Doughnut
                      redraw={true}
                      data={
                        currentSummmaryItem.label.toLowerCase() === "all cases"
                          ? data
                          : currentSummmaryItem.label.toLowerCase() ===
                            "drug abuse sexual assault murder cultism violent activities others"
                          ? drugData
                          : otherData
                      }
                      currentSummaryItem={currentSummmaryItem}
                      summaryData={
                        dashboardData?.currentData?.data?.arrestSummary?.summary
                      }
                      plugins={[myPluginSuperText, myPluginSubText]}
                    />
                  </div>

                  {/* next button */}
                  {/* <button
                  aria-label="Previous"
                  className=" p-1 hover:bg-project-gray flex justify-center items-center rounded-lg trnasition-all duration-150"
                >
                  <img src={chevron} className="w-6 -rotate-90" />
                </button> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          !dashboardData.isLoading && (
            <div className="flex flex-col font-semibold text-project-light-black items-center justify-center min-h-60">
              <div className="w-11 h-11 p-[6px] rounded-md bg-red-100 flex justify-center items-center">
                <img src={handcuffs} />
              </div>
              <p className="mt-6 mx-4">No arrests made yet!</p>
            </div>
          )
        )}
      </div>
      {/* Second Section */}
      <div className="p-5 rounded-xl bg-white font-poppins mt-6">
        <div className="justify-between items-center pb-2">
          <p className="font-medium text-xl text-project-light-black">
            Monthly Arrest Stats
          </p>
          <div className="pt-4 h-80 w-full">
            <Bar options={options} data={barChartData} className="w-full" />
          </div>
        </div>
      </div>
      {/* Third Section */}
      <div className="p-5 rounded-xl bg-white font-poppins mt-6 mb-10">
        <div className="flex justify-between items-center border-b border-solid border-project-gray pb-2">
          <p className="font-medium text-xl text-project-light-black">
            Recent Cases
          </p>
          <button
            aria-label="View all cases"
            className="flex gap-x-2 items-center hover:bg-project-gray p-2 rounded-lg transition-all"
            onClick={() => navigate("/dashboard/cases")}
          >
            <span className="font-inter font-medium text-xs text-project-light-black">
              View All
            </span>
            <img src={chevron} className="-rotate-90" />
          </button>
        </div>
        <div>
          {casesData.isLoading && (
            <div className="flex justify-center items-center w-full h-[clamp(300px,50vh,360px)]">
              <Oval
                visible={true}
                height="80"
                width="80"
                color="#020065"
                secondaryColor="#02006552"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          {casesData.isSuccess &&
            casesData?.currentData?.data?.cases.length && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-4 gap-4">
                {casesData?.currentData?.data?.cases.slice(0, 3).map((item) => (
                  <CaseCard key={item._id} details={item} />
                ))}
              </div>
            )}
          {casesData.isSuccess &&
            casesData?.currentData?.data?.cases?.length < 1 && (
              <div className="flex justify-center items-center w-full h-[clamp(300px,50vh,360px)]">
                <p className="font-poppins justify-center items-center">
                  No recent cases yet.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
