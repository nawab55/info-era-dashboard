const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const userRoutes = require('./routes/user/user.routes');
const employeeTypeRoutes = require('./routes/user/employeeType.routes');
const attendanceRoutes = require('./routes/attendance/attendance.routes');
const leaveRoutes = require("./routes/leaveApplication/leave.routes");
const invoiceRoutes = require('./routes/invoice/invoice.routes');
const customerRoutes = require('./routes/customer/customer.routes');
const categoryRoutes = require('./routes/product/category.routes');
const hsnCodeRoutes = require('./routes/product/hsncode.routes');
const serviceRoutes = require('./routes/product/service.routes');
const router = require('./routes/worksheet/worksheet.routes');
const domainRoutes = require('./routes/domain/domain.routes');
const collegeRoutes = require('./routes/training/college.routes');
const studentRoutes = require('./routes/training/student.routes');
const certificateRoutes = require('./routes/training/certificate.routes');
const jobRoutes = require('./routes/jobs/job.routes');
const activityRoutes = require('./routes/activity/activity.routes');
const ibcRoutes = require('./routes/co-partners/ibc.routes');
const bbcRoutes = require('./routes/co-partners/bbc.routes');
const complainRoutes = require('./routes/customer/complain.routes');

dotenv.config();

const app = express();
// Import and initialize cron jobs
require('./config/cronJobs'); 

const PORT = process.env.PORT || 5454;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the 'uploads' directory

app.get('/', (req, res)=>{
    res.send("Hello World----");
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/type', employeeTypeRoutes);
app.use('/api/employee', attendanceRoutes);
app.use('/api/employeeLeaves', leaveRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/product', categoryRoutes);
app.use('/api/product', hsnCodeRoutes);
app.use('/api/product', serviceRoutes); 
app.use('/api/worksheet', router);
app.use('/api/domain', domainRoutes);
app.use('/api/college', collegeRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/certificate', certificateRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/co-partners/ibc', ibcRoutes);
app.use('/api/co-partners/bbc', bbcRoutes);
app.use('/api/complains', complainRoutes);

app.listen(PORT, async ()=>{
    // await connectDb();
    console.log(`Server running on port ${PORT}`)
})
