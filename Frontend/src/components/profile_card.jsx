import FemaleIcon from "@mui/icons-material/FemaleRounded";
import MaleIcon from "@mui/icons-material/MaleRounded";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

export default function ProfileCard({
  title,
  email,
  department,
  faculty,
  contactno,
  lecId,
  name,
  gender,
  profilePic,
}) {
  return (
    <div className="w-full max-w-xs mx-auto overflow-hidden bg-white shadow-lg rounded-2xl">
      <div className="relative flex flex-col items-center pt-6 pb-2 bg-blue-600">
        <div className="w-24 h-24 overflow-hidden bg-white border-4 border-blue-200 rounded-full shadow-lg">
          <img
            src={profilePic}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="flex flex-col items-center px-6 pt-4 pb-4 bg-white">
        <h3 className="mb-2 text-lg font-semibold text-gray-800">
          {title}
          {name} {gender === "female" ? <FemaleIcon /> : <MaleIcon />}
        </h3>
        <p className="text-gray-500 text-center text-sm mb-4 space-x-1.5">
          {" "}
          {lecId} | {faculty} | {department}
          <Box sx={{ p: 1 }}>
            <Chip
              label={email}
              sx={{
                height: "auto",
                "& .MuiChip-label": {
                  display: "block",
                  whiteSpace: "wrap",
                },
              }}
              color="primary"
            />
          </Box>
          <Box sx={{ p: 0 }}>
            <Chip
              label={contactno}
              sx={{
                height: "auto",
                "& .MuiChip-label": {
                  display: "block",
                  whiteSpace: "wrap",
                },
              }}
              color="primary"
            />
          </Box>
        </p>

        <IconButton
          aria-label="edit"
          size="small"
          sx={{
            backgroundColor: "#19CCD2FF",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
            p: 1,
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}
