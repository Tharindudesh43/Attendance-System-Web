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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg p-6 bg-white shadow-2xl rounded-2xl animate-fadeIn"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute flex items-center justify-center w-7 h-7 text-lg text-red-600 border border-red-500 rounded-full hover:bg-red-600 hover:text-white transition right-5 top-5"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header: Profile Image and Name/Email */}
        <div className="flex items-center gap-6 mb-6">
          {image && (
            <img
              src={image}
              alt={`${name}'s Profile`}
              className="items-center object-cover w-24 h-24 transition border-4 border-indigo-500 rounded-full cursor-pointer hover:scale-105"
              title="Click to enlarge"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {title ? `${title} ${name}` : name}
            </h2>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-gray-700">Contact Number:</p>
            <p className="text-gray-600">{contactNumber || "-"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Gender:</p>
            <p className="text-gray-600">{gender || "-"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Faculty:</p>
            <p className="text-gray-600">{faculty || "-"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Department:</p>
            <p className="text-gray-600">{department || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lecturer_modal;
