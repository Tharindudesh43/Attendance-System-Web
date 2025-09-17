import mongoose from 'mongoose';

const LecturerUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  faculty: { type: String, required: true },
  department: { type: String, required: true },
  image: { type: String, required: true },
  lecid: { type: String, required: true },
  contactno: { type: Number, required: true },
  title: { type: String, required: true },
  subjects: { type: [[]], default: [] },
  attendance: { type: [[]], default: [[],[],[],[]] }
});

const LecturerUser = mongoose.model('At_admin_lecturer_details', LecturerUserSchema, 'At_admin_lecturer_details');
export default LecturerUser;
