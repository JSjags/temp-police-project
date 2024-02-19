/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useOutsideCloser } from "../../hooks/useOutsideCloser";
import noImage from "../../assets/cases/no-image.svg";
import download from "../../assets/cases/download.svg";
import kebabMenu from "../../assets/cases/kebab-menu.svg";
import caseImg from "../../assets/sidebar/cases.svg";
import closeMenu from "../../assets/sidebar/close.svg";

const CaseCard = ({ details }) => {
  const [showCardMenu, setShowCardMenu] = useState(false);
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const modalRef = useRef();

  useOutsideCloser(modalRef, showCaseDetails, setShowCaseDetails);

  return (
    <>
      <div className="border-r borer-solid border-project-gray flex min-h-[298px]">
        <div className="w-3/6 h-full bg-[#D9D9D9] flex items-center">
          {details?.mug_shot_url !== "" ||
          details.mug_shot_url == null ||
          details.mug_shot_url == undefined ? (
            <img
              src={details.mug_shot_url}
              className="w-full h-full object-cover"
            />
          ) : (
            <img src={noImage} className="w-full m-auto" />
          )}
        </div>
        <div className="px-3 pt-4 flex-1  text-project-light-black">
          <div className="flex justify-between text-[0.625rem] w-full">
            <p>
              {new Date(details.time_of_arrest).getDate()}-
              {new Date(details.time_of_arrest).getMonth()}-
              {new Date(details.time_of_arrest).getFullYear()}
            </p>
            <p>
              {details?.gender === "001"
                ? "M"
                : details?.gender === null ||
                  details?.gender === undefined ||
                  details?.gender === ""
                ? "N/A"
                : "F"}
            </p>
          </div>
          <div className="pt-4">
            <p className="text-sm font-medium">
              {details.first_name} {details.last_name}
            </p>
            <div>
              <p className="text-[0.625rem] mt-1 font-semibold leading-5">
                Case ID:
              </p>
              <p className="text-[0.625rem] leading-5">{details.case_id}</p>
            </div>
            <div>
              <p className="text-[0.625rem] mt-1 font-semibold leading-5">
                Location:
              </p>
              <p className="text-[0.625rem] leading-5">{details.address}</p>
            </div>
          </div>
          <div className="mt-6">
            <div>
              <p className="text-[0.625rem] mt-1 font-semibold leading-5">
                Arresting Officer Name:
              </p>
              <p className="text-[0.625rem] leading-5">
                {details.arresting_officer_name ?? "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[0.625rem] mt-1 font-semibold leading-5">
                Officer ID:
              </p>
              <p className="text-[0.625rem] leading-5">
                {details.arresting_officer_id ?? "N/A"}
              </p>
            </div>
          </div>
          {/* action buttons */}
          <div className="flex mt-2 justify-between">
            <button
              aria-label="Download"
              className="flex h-7 px-3 items-center justify-center gap-x-2 bg-[#F0F6FF] hover:bg-[#bed8ff] transition-all rounded-full"
            >
              <img src={download} />
              <span className="text-[0.625rem] text-[#005CE8] font-medium">
                Download
              </span>
            </button>
            <button
              aria-label="Actions"
              className="flex h-7 w-7 items-center justify-center bg-[#F5F6F7] hover:bg-[#ebecec] transition-all rounded-full relative"
              onClick={() => setShowCardMenu(!showCardMenu)}
            >
              <img src={kebabMenu} />
              {/* Profile menu */}
              <AnimatePresence>
                {showCardMenu && (
                  <motion.div
                    initial={{ opacity: 0, translateY: 10 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: 10 }}
                    className="absolute flex flex-col gap-y-1 text-xs -top-8 border border-solid border-project-gray min-w-[140px] right-0 bg-white shadow-xl w-full rounded"
                  >
                    <button
                      aria-label="View Profile"
                      className="p-1 px-2 rounded hover:bg-project-blue w-full flex items-center gap-x-2 transition-all group"
                      onClick={() => setShowCaseDetails(true)}
                    >
                      <img
                        src={caseImg}
                        className="brightness-0 invert-[20%] w-3 group-hover:invert"
                      />
                      <span className="font-poppins text-project-light-black font-semibold text-[0.625rem] group-hover:text-white whitespace-nowrap">
                        View Case Details
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showCaseDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-screen h-screen backdrop-blur-md fixed top-0 left-0 z-30 overflow-y-scroll flex justify-center pt-[15%] min-[480px]:pt-[5%] px-4 bg-[rgba(0,0,0,0.5)]"
          >
            {/* Close btn */}
            <button
              aria-label={"Close modal"}
              className="flex justify-center items-center h-8 w-8 rounded absolute top-4 right-4 bg-white group hover:bg-project-blue"
              onClick={() => setShowCaseDetails(false)}
            >
              <img
                src={closeMenu}
                className="group-hover:invert transition-all"
              />
            </button>
            <motion.div
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 10 }}
              className="px-2 mx-auto w-[clamp(240px,100%,600px)] h-fit p-4 bg-white mb-[5%] shadow-2xl rounded-xl flex gap-4 flex-col min-[480px]:flex-row"
              ref={modalRef}
            >
              {details?.mug_shot_url !== "" ||
              details.mug_shot_url == null ||
              details.mug_shot_url == undefined ? (
                <img
                  src={details?.mug_shot_url}
                  className="w-full min-[480px]:w-[clamp(180px,40%,240px)] h-fit min-h-36 bg-project-gray"
                />
              ) : (
                <img
                  src={noImage}
                  className="w-full min-[480px]:w-[clamp(180px,40%,240px)] h-fit min-h-36 bg-project-gray"
                />
              )}
              <div className="px-3 pt-4 flex-1 text-project-light-black">
                <div className="flex justify-between text-[0.625rem] w-full">
                  <p>
                    {new Date(details.time_of_arrest).getDate()}-
                    {new Date(details.time_of_arrest).getMonth()}-
                    {new Date(details.time_of_arrest).getFullYear()}
                  </p>
                  <p>
                    {details?.gender === "001"
                      ? "M"
                      : details?.gender === null ||
                        details?.gender === undefined ||
                        details?.gender === ""
                      ? "N/A"
                      : "F"}
                  </p>
                </div>
                <div className="pt-4">
                  <p className="text-sm font-medium">
                    {details.first_name} {details.last_name}
                  </p>
                  <div>
                    <p className="text-[0.625rem] mt-1 font-semibold leading-5">
                      Case ID:
                    </p>
                    <p className="text-[0.625rem] leading-5">
                      {details.case_id}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.625rem] mt-1 font-semibold leading-5">
                      Location:
                    </p>
                    <p className="text-[0.625rem] leading-5">
                      {details?.address ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.625rem] mt-1 font-semibold leading-5">
                      Occupation:
                    </p>
                    <p className="text-[0.625rem] leading-5">
                      {details?.occupation ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.625rem] mt-1 font-semibold leading-5">
                      Next of Kin:
                    </p>
                    <p className="text-[0.625rem] leading-5">
                      {details?.NOK ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.625rem] mt-1 font-semibold leading-5">
                      Contact of Next of Kin:
                    </p>
                    <p className="text-[0.625rem] leading-5">
                      {details?.contact_of_NOK ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.625rem] mt-1 font-semibold leading-5">
                      Alleged Offense:
                    </p>
                    <p className="text-[0.625rem] leading-5">
                      {details?.alleged_offense ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.625rem] mt-1 font-semibold leading-5">
                      Type of Crime:
                    </p>
                    <p className="text-[0.625rem] leading-5">
                      {details?.crime_type ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.625rem] mt-1 font-semibold leading-5">
                      Status:
                    </p>
                    <p className="text-[0.625rem] leading-5">
                      {details?.status ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.625rem] mt-1 font-semibold leading-5">
                      Time of Arrest:
                    </p>
                    <p className="text-[0.625rem] leading-5">
                      {new Date(details?.time_of_arrest).getDate()}-
                      {new Date(details?.time_of_arrest).getMonth()}-
                      {new Date(details?.time_of_arrest).getFullYear()}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <div>
                    <p className="text-[0.625rem] mt-1 font-semibold leading-5">
                      Arresting Officer Name:
                    </p>
                    <p className="text-[0.625rem] leading-5">
                      {details.arresting_officer_name ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.625rem] mt-1 font-semibold leading-5">
                      Officer ID:
                    </p>
                    <p className="text-[0.625rem] leading-5">
                      {details.arresting_officer_id ?? "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CaseCard;
