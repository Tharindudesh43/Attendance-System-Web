import { React,useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { FaBackspace} from "react-icons/fa";
import { useNavigate,useParams } from 'react-router-dom'
import { useContextData } from "../ReloadContext.jsx"
import axios from 'axios';
import DeleteSubjectConfirmModal from '../components/SubjectDelete_modal.jsx'
import loadingimage from '../assets/load_img1.svg'; 


const subjectsdetails = () => {

    const {reload, setReload} = useContextData();  
    const navigate = useNavigate();
    const { id } = useParams();
    const [allsubjects, setallsubjects] = useState([]); 
    const [DeleteConfirmShowModal,setDeleteConfirmShowModal] = useState(false); 
    const [subject,setsubject] = useState('');
    const [year,setyear] = useState('');
    const [idpassed,setidpassed] = useState('');
    const [subjectIndex,setsubjectIndex] = useState();
    const [loadingimg2,setloadingimg2] = useState(false);

    const navigateback = () =>{
      setReload(prev => !prev);
        navigate('/admin')
    }

    const handlesubjectdelete = () =>{
      setReload(prev => !prev);
        navigate('/admin')
    }

    useEffect(() => {
      const fetchSubjects = async () => {
      setloadingimg2(true);
       try {
        const response = await axios.get(`http://localhost:1337/admin/subjectsdetails/${id}`);
        if(response.data.status==='ok'){
          setallsubjects(response.data.subjects);
          console.log(allsubjects);
          setloadingimg2(false);
        }else if(response.data.status==='No subjects available'){
          setloadingimg2(false);
          setallsubjects('No subjects availabl');
        }
        } catch (error) {
          console.error(error);
       }
     };

     fetchSubjects();
    }, [reload]); 



    return (
        <div class="flex flex-col min-h-screen">
            <Header/>
              <div className="relative w-full h-auto p-4">
                    <button onClick={()=>navigateback()} className="absolute top-0 left-0 flex items-center justify-center px-4 py-2 m-4 text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none">
                        <div className="grid items-center justify-center grid-cols-2"> 
                            <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                  style={{ marginRight: '8px' }}
                                >
                          <path
                            fillRule="evenodd"
                            d="M15 8a.5.5 0 0 1-.5.5H2.707l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 1 1 .708.708L2.707 7.5H14.5a.5.5 0 0 1 .5.5z"
                          />
                          </svg>
                            </div>
                            <div className='text-sm'>
                                     Back
                            </div>
                        </div>
                    </button>
                </div>
                        
            <div className="flex flex-grow grid-cols-2 gap-10 pt-10 pl-5 pr-4 md:grid-cols-2">
            <div class="overflow-x-auto w-full">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-100 whitespace-nowrap">
          <tr>
            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">
              Academic Year
            </th>
            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">
            Year
            </th>
            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">
              Semester
            </th>
            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">
              Subject
            </th>
            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">
              Sem Version
            </th>
            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">
              Actions
            </th>
          </tr>
        </thead>
      {
        loadingimg2?(
          <td colspan="5" class="p-4  font-medium text-center">
              <div className="flex items-center justify-center w-full h-30 col-span-full">
                  <img src={loadingimage} alt="Loading..." className="w-25 h-25" />
              </div>
            </td>
        ):(
        allsubjects && allsubjects=='No subjects available'?(
          <tbody class="whitespace-nowrap">
          <tr class="hover:bg-gray-50">
            <td colspan="5" class="p-4 text-[15px] text-slate-900 font-medium text-center">
              No Data Added Yet.
            </td>
          </tr>
        </tbody>    
        ):(       
          <tbody class="whitespace-nowrap">
            {allsubjects.map((subjectSet, index) => (
          // Each subjectSet contains an array of subjects, so map through them
          subjectSet.map((subjectDetails, subIndex) => (
            <tr key={`${index}-${subIndex}`} className="hover:bg-gray-50">
              {/* Displaying the subject details */}
              {subjectDetails.map((item, itemIndex) => (
                <td
                  key={`${subIndex}-${itemIndex}`}
                  className="p-4 text-[15px] text-slate-900 font-medium"
                >
                  {item}
                </td>
              ))}
                <td class="p-4">
              <div class="flex items-center justify-content-center">
                <button title="Delete"  className="cursor-pointer"
                onClick={()=>{
                  setyear(subjectDetails[1]);
                  setsubject(subjectDetails[3]);
                  setidpassed(id);
                  setsubjectIndex(index);
                  setDeleteConfirmShowModal(true)
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                    <path
                      d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                      data-original="#000000" />
                    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                      data-original="#000000" />
                  </svg>
                </button>
              </div>
            </td>
            </tr>
          ))
          
        ))}
        </tbody>
        ))
      }
      </table>
    </div>
            </div>
            {
                DeleteConfirmShowModal&&(
                  <DeleteSubjectConfirmModal id={id} subject={subject} subjectIndex={subjectIndex}  year_study={year}  onClose={()=>setDeleteConfirmShowModal(false)}/>
                )
            }
            <Footer/>
        </div>
    );
};

export default subjectsdetails;