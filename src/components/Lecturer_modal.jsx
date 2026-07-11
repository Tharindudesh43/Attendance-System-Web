const Lecturer_modal = ({
  onClose,
  name,
  email,
  image,
  department,
  faculty,
  gender,
  title,
  contactNumber,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg p-5 bg-white shadow-2xl sm:p-6 rounded-2xl animate-fadeIn"
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute flex items-center justify-center w-8 h-8 text-lg transition-colors border rounded-full text-slate-400 border-slate-200 right-4 top-4 sm:right-5 sm:top-5 hover:bg-red-50 hover:text-red-600 hover:border-red-200 focus:outline-none"
          aria-label="Close"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-4 h-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center gap-4 mt-6 mb-6 sm:mt-0 sm:flex-row sm:gap-6 sm:items-start">
          {image && (
            <img
              src={image}
              alt={`${name}'s Profile`}
              className="object-cover w-20 h-20 transition-transform shadow-sm cursor-pointer sm:w-24 sm:h-24 border-3 border-indigo-100 rounded-full hover:scale-105"
              title="Click to enlarge"
            />
          )}
          <div className="text-center sm:text-left sm:mt-2">
            <h2 className="text-xl font-bold sm:text-2xl text-slate-800">
              {title ? `${title} ${name}` : name}
            </h2>
            <p className="text-sm break-all text-slate-500">{email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 text-sm border sm:grid-cols-2 bg-slate-50 rounded-xl border-slate-100">
          <div>
            <p className="font-semibold text-slate-700">Contact Number</p>
            <p className="mt-1 text-slate-600">{contactNumber || "-"}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Gender</p>
            <p className="mt-1 text-slate-600">{gender || "-"}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Faculty</p>
            <p className="mt-1 text-slate-600">{faculty || "-"}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Department</p>
            <p className="mt-1 text-slate-600">{department || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lecturer_modal;