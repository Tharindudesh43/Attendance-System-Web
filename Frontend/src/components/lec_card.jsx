// import React from "react";
// import { FaEdit, FaTrash, FaPlus, FaInfo,FaAddressBook } from "react-icons/fa";
// import DeleteConfirm from "./delete_confirm_modal";
// import { useState } from "react";
// import { useNavigate,useParams } from 'react-router-dom'
// import AdminSubjects from '../pages/admin_subject';
// import Lecturermodal from '../components/Lecturer_modal';
// import subjectsdetails from '../pages/subjectsdetails';
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/InfoOutline';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import AddIcon from '@mui/icons-material/AddCard';
// import DetailsIcon from '@mui/icons-material/Details';
// import { blue,pink,red,green,lime } from '@mui/material/colors';
// import Stack from '@mui/material/Stack';



//  const LecCard = ({ name, email, password, gender,id,faculty,department,image,title,contactno }) => {
//   const [DeleteConfirmShowModal,setAboutUsShowModal] = useState(false);
//   const [LecturerDataModal,setLecturerDataModal] = useState(false);
//   const navigate = useNavigate();

//   const handleAdminSubject = () =>{
//     navigate('/admin/admin_dashboard', {
//       state: {
//         faculty: faculty,
//         department: department,
//         image: image,
//         name: name,
//         id: id,
//         title: title
//       }
//   });
//   }

//   const handleShowAllSubject = () =>{
//     navigate(`/admin/subjectsdetails/${id}`);
//   }

//   const handlelecturer = () =>{
//     <Lecturermodal onClose={()=>setLecturerDataModal(false)}/>
//   }


//   return (
//     <>
//     <div className="mx-auto mt-2 overflow-hidden font-sans bg-gray-700 rounded-lg shadow-md w-60 shadow-gray-500">
//     {/* Lecturer Image */}
//     <div className="w-full h-32">
//       <img src={image} alt={name} className="object-cover w-full h-full" />
//     </div>

//     {/* Lecturer Details */}
//     <div className="p-3 text-center">
//       <h3 className="text-lg font-bold text-white">{title}{name}</h3>
      
//       {/* Action Buttons */}
//       {/* <div className="flex justify-center gap-4 mt-4"> */}

//       <Stack direction="row" spacing={0} sx={{ alignItems: 'flex-end' }}>
        
//       <IconButton aria-label="delete" size="large" onClick={()=>{
//           <Lecturermodal/>
//           setLecturerDataModal(true)
//           }}>
//             <InfoIcon fontSize="inherit" sx={{ color: green['A700'] }}/>
//       </IconButton>

//       <IconButton aria-label="delete" size="large" onClick={()=>handleShowAllSubject()}>
//             <DetailsIcon fontSize="inherit" sx={{ color: lime['A200'] }} />
//       </IconButton>

        
//         <IconButton aria-label="delete" size="large" onClick={
//           ()=>{
//             <DeleteConfirm email={email} image={image}/>
//             setAboutUsShowModal(true)}
//         }>
//           <DeleteOutlinedIcon fontSize="inherit" sx={{ color: red['900'] }} />
//         </IconButton>

//         <IconButton aria-label="delete" size="large" onClick={()=>{handleAdminSubject()}
//         }>
//           <AddIcon fontSize="inherit" sx={{ color: blue[500] }} />
//         </IconButton>

      
//       </Stack>

//       {/* </div> */}
//         {
//                 DeleteConfirmShowModal&&(
//                   <DeleteConfirm name={name} email={email} id={id} image={image} onClose={()=>setAboutUsShowModal(false)}/>
//                 )
//         }
//         {
//                 LecturerDataModal&&(
//                   <Lecturermodal 
//                   image={image} 
//                   title={title} 
//                   department={department} 
//                   contactNumber={contactno}
//                   email={email}
//                   name={name}
//                   faculty={faculty}
//                   gender={gender}
//                   onClose={()=>setLecturerDataModal(false)}/>
//                 )
//         }
//     </div>
//   </div>
//     </>
//   )
// };
// export default LecCard;
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import DeleteConfirm from "./delete_confirm_modal";
import Lecturermodal from './Lecturer_modal';

const LecCard = ({ name, email, password, gender, id, faculty, department, image, title, contactno }) => {
  const [DeleteConfirmShowModal, setDeleteConfirmShowModal] = useState(false);
  const [LecturerDataModal, setLecturerDataModal] = useState(false);
  const navigate = useNavigate();

  const handleAdminSubject = () => {
    navigate('/admin/admin_dashboard', {
      state: { faculty, department, image, name, id, title }
    });
  };

  const handleShowAllSubject = () => {
    navigate(`/admin/subjectsdetails/${id}`);
  };

  return (
  <div className="flex flex-col w-full h-full mx-auto overflow-hidden transition-all duration-300 bg-gray-700 shadow-lg m-fullax-w-xs h rounded-2xl hover:shadow-2xl">
    {/* Modern Circular Image */}
    <div className="flex justify-center mt-4">
      <img
        src={image}
        alt={name}
        className="object-cover w-20 h-20 border-4 border-white rounded-full shadow-md"
      />
    </div>

    {/* Info */}
    <div className="p-2 pb-4 pl-4 pr-4 text-center">
      <h3 className="font-extrabold text-white bold ">{title} {name}</h3>
      <p className="text-xs text-gray-400">{department}</p>
      <p className="text-xs text-gray-500 text-normal">{email}</p>
      <p className="text-xs text-gray-400">{contactno}</p>

      {/* Action Buttons */}
   <div className="flex justify-center gap-3 mt-4">
  {/* Details Button */}
  <button
    onClick={() => setLecturerDataModal(true)}
    className="p-3 text-green-600 transition-all duration-200 bg-green-100 shadow-md rounded-3xl hover:bg-green-200 hover:scale-105"
    title="Details"
  >
    <i className="fas fa-user-circle"></i>
  </button>

  {/* Show Subjects Button */}
  <button
    onClick={handleShowAllSubject}
    className="p-3 transition-all duration-200 rounded-full shadow-md text-lime-600 bg-lime-100 hover:bg-lime-200 hover:scale-105"
    title="Show Subjects"
  >
    <i className="fas fa-book"></i>
  </button>

  {/* Delete Button */}
  <button
    onClick={() => setDeleteConfirmShowModal(true)}
    className="p-3 text-red-600 transition-all duration-200 bg-red-100 rounded-full shadow-md hover:bg-red-200 hover:scale-105"
    title="Delete"
  >
    <i className="fas fa-trash-alt"></i>
  </button>

  {/* Add Subject Button */}
  <button
    onClick={handleAdminSubject}
    className="p-3 text-blue-600 transition-all duration-200 bg-blue-100 rounded-full shadow-md hover:bg-blue-200 hover:scale-105"
    title="Add Subject"
  >
    <i className="fas fa-plus-circle"></i>
  </button>
</div>


    </div>

    {/* Modals */}
    {DeleteConfirmShowModal && (
      <DeleteConfirm
        name={name}
        email={email}
        id={id}
        image={image}
        onClose={() => setDeleteConfirmShowModal(false)}
      />
    )}
    {LecturerDataModal && (
      <Lecturermodal
        image={image}
        title={title}
        department={department}
        contactNumber={contactno}
        email={email}
        name={name}
        faculty={faculty}
        gender={gender}
        onClose={() => setLecturerDataModal(false)}
      />
    )}
  </div>
  );
};

export default LecCard;
