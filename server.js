require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const mongoose = require('mongoose');
const { addLead, getLeads, reset } = require('./Controller');

const app = express();

// Secure application by setting several HTTP headers
app.use(helmet());

// Cross Origin Resource Sharing
const allowedOrigins = [
    'http://localhost:3000',
    'https://lead-management-app-chi.vercel.app/'
];

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.includes(origin) || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error(`origin: ${origin} Not allowed by CORS`));
//         }
//     },
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };

// Handle actual requests
app.use(cors());
// Handle preflight for all routes
// app.options('*', cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// built-in middleware for json 
app.use(express.json({ limit: '50mb' }));

// default route
app.get('/', (req, res) => {
    res.status(200);
    if (req.accepts('json')) {
        res.json({ "message": "Welcome to the Lead Management App Backend" });
    } else {
        res.type('txt').send("Welcome to the Lead Management App Backend");
    }
});

app.post('/lead', addLead);
app.get('/leads', getLeads);

// Catch all unknown routes
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// Database on MongoDB Atlas for testing
const databaseURI = 'mongodb+srv://test_user:pass123@cluster0.fn7ak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connectDB = async () => {
    try {
        await mongoose.set('strictQuery', true);
        await mongoose.connect(databaseURI);
    } catch (err) {
        console.log(err);
    }
}
connectDB();

mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB');
    app.listen(3500, () => console.log(`Server running on port 3500`));
    // reset();
});