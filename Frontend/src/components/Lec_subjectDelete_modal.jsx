import React, { useEffect, useState } from 'react'; 
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useParams } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useContextData } from "../ReloadContext"
import axios from 'axios';

const LecSubjectDeleteModal = ({ onClose, subject, subjectIndex, year_study,id }) => {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const {reload, setReload} = useContextData();
    const [isDeleting, setIsDeleting] = useState(false);
    //const { id } = useParams();


    async function deletesubject(event) {
        setIsDeleting(true);
        event.preventDefault();
          console.log(year_study);
          console.log(subject);
          console.log(subjectIndex);
          console.log(id)
       
        try {
            const response = await axios.delete('http://localhost:1337/admin/deleteSubject', {
                data: { id, subjectIndex,year_study,subject },
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.data;
            if (data.status === 'ok') {
                enqueueSnackbar("Subject deleted successfully!", { 
                    variant: "success", 
                    autoHideDuration: 3000 
                });
                navigate(`/lecturer/attendace_history/${id}`);
                setReload(prev => !prev);
                setIsDeleting(false);
                onClose();  // Close the modal on success
            } else if (data.status === 'not found') {
                enqueueSnackbar("Lecturer Not Found", { 
                    variant: "error", 
                    autoHideDuration: 3000 
                });
                setIsDeleting(false);
                onClose();
            }
        } catch (error) {
            console.error("Error deleting subject:", error);
            enqueueSnackbar("An error occurred while deleting the subject.", { 
                variant: "error", 
                autoHideDuration: 3000 
            });
            setIsDeleting(false);
            onClose();
        }
    }
    
  return (
    <div>
        <div id="modal"  >
            <div 
                class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-100 z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
                <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                    <svg id="closeIcon" xmlns="http://www.w3.org/2000/svg" onClick={onClose}
                        class="w-3.5 h-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
                        viewBox="0 0 320.591 320.591">
                        <path
                            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                            data-original="#000000"></path>
                        <path
                            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                            data-original="#000000"></path>
                    </svg>
    
                    <div  class="my-6 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 fill-red-500 inline" viewBox="0 0 24 24">
                            <path
                                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                data-original="#000000" />
                            <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                data-original="#000000" />
                        </svg>
                        <h4 class="text-slate-900  text-base font-medium mt-4">Are you sure you want to delete? BECAUSE ALL ATTENDANCE DATA WILL NOT BE RECOVERABALE
                        <h6 className='font-bold text-red-700 text-md'>
                        {subject}
                        </h6>  
                        </h4>
    
                        <div class="text-center space-x-4 mt-10">
                            <button id="closeButton" type="button" onClick={onClose}
                                class="px-5 py-2.5 cursor-pointer rounded-lg text-slate-900 text-sm font-medium bg-gray-200 hover:bg-gray-300 active:bg-gray-200">No,
                                Cancel</button>
                           
                                <button
                                 type="button"
                                 onClick={deletesubject}
                                 className="px-5 cursor-pointer py-2.5 rounded-lg text-white text-sm font-medium bg-red-600 hover:bg-red-700 active:bg-red-600"
                                 disabled={isDeleting}>
                                   {isDeleting ? (
                                      <div className="flex items-center justify-center">
                                       <svg
                                         className="w-5 h-5 text-white animate-spin"
                                        viewBox="0 0 24 24">
                                         <circle
                                           className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                          ></circle>
                                         <path
                                            className="opacity-75"
                                           fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                          ></path>
                                        </svg>
                                      </div>
                                  ) : (
                                      "Yes, Delete all"
                                  )}
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
  );
};

export default LecSubjectDeleteModal;


