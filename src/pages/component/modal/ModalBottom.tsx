export default function ModalBottom() {
  return (
    <div className="relative -top-12 bg-[#1B1B1B] rounded-lg w-full max-w-lg border-b border-x border-[#38B82D]">
      <div className="w-full max-w-lg flex  justify-between px-10 py-10">
        <div className="flex  w-full">
          <div className="border p-3 rounded-[20px] bg-white flex flex-col w-[158px] h-[101px]">
            <div className="flex justify-start mb-5">LTV</div>
            <div className="flex justify-end">00%</div>
          </div>
          <div className="flex items-center mx-2">
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M25 12.6992C25 19.6028 19.4036 25.1992 12.5 25.1992C5.59644 25.1992 0 19.6028 0 12.6992C0 5.79566 5.59644 0.199219 12.5 0.199219C19.4036 0.199219 25 5.79566 25 12.6992ZM7.20312 11.7255H17.3726V9.09766H7.20312V11.7255ZM7.20312 17.1059V14.5067C7.92497 13.7398 8.83789 13.3456 9.83573 13.335C10.7013 13.3403 11.5012 13.6405 12.3021 13.941C13.1121 14.245 13.923 14.5493 14.8037 14.5493C15.7909 14.5493 16.672 14.1552 17.3726 13.3776V15.9768C16.6508 16.7437 15.7379 17.1485 14.74 17.1485C13.866 17.1485 13.0561 16.8451 12.2461 16.5416C11.4426 16.2406 10.6389 15.9395 9.77204 15.9341C8.78481 15.9448 7.90374 16.3389 7.20312 17.1059Z"
                fill="url(#paint0_linear_5225_10985)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_5225_10985"
                  x1="1.38889"
                  y1="0.199219"
                  x2="21.0185"
                  y2="23.9029"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#1F53FF" />
                  <stop offset="1" stop-color="#9C1FFF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="border p-3 rounded-[20px] bg-white flex flex-col  w-[240px] h-[101px]">
            <div className="flex justify-start mb-5 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 inline-block text-transparent bg-clip-text font-pretendard font-bold text-[20px] leading-[25px] ">
              Amount
            </div>
            <div className="flex justify-end bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 inline-block text-transparent bg-clip-text font-pretendard font-bold text-[20px] leading-[25px] ">
              0000
            </div>
          </div>
        </div>
      </div>
      <button className="px-10 pb-5">
        <img src="confirm.png" />
      </button>
    </div>
  );
}
