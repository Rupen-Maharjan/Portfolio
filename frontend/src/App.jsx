import { Routes, Route } from 'react-router-dom';
import { Dashboard, Home, Login, Project, Contact, Skills, Profile, NotFound } from '../pages/export';
import { Navbar } from '../components/export';
import ProtectedRoute from './protected';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <Project />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/skills"
          element={
            <ProtectedRoute>
              <Skills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />

        <Route path='*' element={<NotFound/>}/>
      </Routes>

    </>
  );
};

export default App;
