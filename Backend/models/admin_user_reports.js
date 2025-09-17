import mongoose from 'mongoose';

const AdminUserReportsSchema = new mongoose.Schema({
  reportId: { type: String, required: true },
  report_title: { type: String, required: true},
  report_description: { type: String, required: true},
  date_of_report: { type: String, required: true},
  time_of_report: { type: String, required: true},
  report_type: { type: String, required: true},
  student_email: { type: String, required: true },
  status: { type: String, required: true},
  user: { type: String, required: true },
  images: { type: [], default: [] },
  user_id: { type: String, required: true },
  // Add more fields if needed
});

const AdminUserReports = mongoose.model('At_Reports', AdminUserReportsSchema, 'At_Reports');
export default AdminUserReports;
