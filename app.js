require('dotenv').config();
const app_host = process.env.APP_HOST;
const app_port = process.env.APP_PORT;
const db_url = process.env.DB_URL;
const { default: mongoose } = require("mongoose");
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");
const { User } = require("./MODELS/user.model");
const { authRoutes } = require("./ROUTES/auth.routes");
const { userRoutes } = require('./ROUTES/user.routes');
const { ticketRoutes } = require('./ROUTES/ticket.routes');


app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(userRoutes);
app.use(ticketRoutes);

mongoose.connect(db_url).then(() => {

    console.log(`Connection to mongodb has gotten successful`);

    const Admin = new User({
      name: process.env.ADMIN,
      userId: process.env.ADMIN_id,
      email: process.env.ADMIN_email,
      password: bcrypt.hashSync(process.env.ADMIN_password, 8),
      userType: 'ADMIN',
      userStatus:'APPROVED'
    });

    User.findOne({ userId: process.env.ADMIN_id }).then((admin) => {
        if (!admin) {
            Admin.save();
        }
        
    });

})
    .catch(err => console.log(`Connection to db got failed,${err}`));
    
app.listen(app_port,()=>console.log(`Server is listening at http:${app_host}:${app_port}`));
