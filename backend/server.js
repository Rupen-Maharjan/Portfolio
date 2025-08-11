import express from 'express';
import session from 'express-session';
import { Basic, Home, Image, Login,Project, Register } from './apis/export.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connect } from './database/connect.js';

const app = express();
const port = 3000;

// Bodyparser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session config
app.use(session({
  secret: 'your-secret-key', // use a strong secret in production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // true if HTTPS
}));

// Cors config
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

connect();

app.use('/',Home)
app.use('/api/login', Login);
app.use('/api/register',Register)
app.use('/admin/projects',Project);
app.use('/api/img',Image);
app.use('/api/basic',Basic)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
