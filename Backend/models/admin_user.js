import mongoose from 'mongoose';

const AdminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
  // Add more fields if needed
});

const AdminUser = mongoose.model('At_admin', AdminUserSchema, 'At_admin');
export default AdminUser;
