/* eslint-disable react/prop-types */
import noImage from "../../assets/cases/no-image.svg";
import download from "../../assets/cases/download.svg";
import kebabMenu from "../../assets/cases/kebab-menu.svg";

const CaseCard = ({ details }) => {
  return (
    <div className="border-r borer-solid border-project-gray flex min-h-[298px]">
      <div className="w-3/6 h-full bg-[#D9D9D9] flex items-center">
        {details.image ? (
          <img src={details.image} className="w-full h-full object-cover" />
        ) : (
          <img src={noImage} className="w-full m-auto" />
        )}
      </div>
      <div className="px-3 pt-4 flex-1  text-project-light-black">
        <div className="flex justify-between text-[0.625rem] w-full">
          <p>{details.date}</p>
          <p>{details.sex}</p>
        </div>
        <div className="pt-4">
          <p className="text-sm font-medium">{details.name}</p>
          <div>
            <p className="text-[0.625rem] mt-1 font-semibold leading-5">
              Case ID:
            </p>
            <p className="text-[0.625rem] leading-5">{details.caseId}</p>
          </div>
          <div>
            <p className="text-[0.625rem] mt-1 font-semibold leading-5">
              Location:
            </p>
            <p className="text-[0.625rem] leading-5">{details.location}</p>
          </div>
        </div>
        <div className="mt-6">
          <div>
            <p className="text-[0.625rem] mt-1 font-semibold leading-5">
              Arresting Officer Name:
            </p>
            <p className="text-[0.625rem] leading-5">
              {details.arrestingOfficerName}
            </p>
          </div>
          <div>
            <p className="text-[0.625rem] mt-1 font-semibold leading-5">
              Officer ID:
            </p>
            <p className="text-[0.625rem] leading-5">{details.officerId}</p>
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
            className="flex h-7 w-7 items-center justify-center bg-[#F5F6F7] hover:bg-[#ebecec] transition-all rounded-full"
          >
            <img src={kebabMenu} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseCard;
