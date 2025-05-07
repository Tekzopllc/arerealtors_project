const Information = () => {
  return (
    <div className="flex items-center justify-center px-2 py-10 sm:py-24 bg-gradient-to-br from-blue-900 to-indigo-900">
      <div className="w-[98%] md:w-[90%] xl:w-[70%] py-10 bg-white rounded-lg shadow-lg">
        <h2 className="mb-2 text-[22px] sm:text-[36px] font-extralight text-center">
          Consumer Privacy Act Requests
        </h2>
        <p className="w-[92%] sm:w-[80%] mx-auto mb-6 text-[14px] sm:text-[18px] text-start text-gray-700">
          Residents of California, Colorado, Connecticut, or Virginia may
          request to know what information we have stored about them and ask for
          us to delete that information. If you are a resident of one of these
          states you may complete the form below, email us at{" "}
          <a
            href="mailto:support@acerealtors.org"
            className="text-blue-600 hover:underline"
          >
            support@acerealtors.org
          </a>{" "}
          with a subject line of "CCPA Request", or call us directly at{" "}
          <a
            href="tel:(877) 695-9300"
            className="font-semibold text-orange-500 cursor-pointer hover:underline hover:text-orange-600"
          >
            (877) 695-9300
          </a>
          .
        </p>
        <form className="w-[90%] lg:w-[45%] mx-auto space-y-4">
          <div>
            <label htmlFor="phone" className="block mb-1 text-sm text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 text-sm text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="number"
              placeholder="Phone Number"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-700">
              What is your request? (Check all that apply)
            </label>
            <div className="ml-2 space-y-2">
              <label className="flex items-center text-sm cursor-pointer">
                <input type="checkbox" className="mr-2" />
                I'd like to know what information you have stored about me
              </label>
              <label className="flex items-center text-sm cursor-pointer">
                <input type="checkbox" className="mr-2" />
                I'd like you to delete my information
              </label>
              <label className="flex items-center text-sm cursor-pointer">
                <input type="checkbox" className="mr-2" />
                I'd like to know who my information has been shared with
              </label>
              <label className="flex items-center text-sm cursor-pointer">
                <input type="checkbox" className="mr-2" />
                I'd like my information not be sold to third parties
              </label>
            </div>
          </div>
          <div className="mt-2">
            <p className="mb-2 text-[13px] font-thin text-gray-700">
              Please certify you are a resident of either CA, CO, CT, or VA
              below (required)
            </p>
            <label className="flex items-center mt-3 text-sm cursor-pointer ms-2">
              <input type="checkbox" className="mr-2" />I certify that I am a
              Resident of CA, CO, CT, or VA
            </label>
          </div>
          <div className="grid place-items-center">
            <button
              type="submit"
              className="px-[32px] py-[8px] mt-4 text-[18px] font-semibold text-white transition-colors bg-orange-500 rounded-full hover:bg-orange-600"
            >
              Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Information;
