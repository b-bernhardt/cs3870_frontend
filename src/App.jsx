
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./navigation/Layout.jsx";
import Contacts from "./Contacts.jsx";
import AddContact from './AddContact.jsx';
import DeleteContact from "./DeleteContact.jsx";
import UpdateContact from "./UpdateContact.jsx";
import GetOneContact from "./GetOneContact.jsx";

const Home = () => <p>Welcome.</p>;
// const AddContact = () => <p>(POST) Add contact screen (coming soon)</p>;
// const DeleteContact = () => <p>(DELETE) Delete contact screen (coming soon)</p>;
//const UpdateContact = () => <p>(PUT) Update contact screen (coming soon)</p>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout title="Phone Contacts App"><Home /></Layout>}
        />
        <Route
          path="/contacts"
          element={<Layout title="Contacts List"><Contacts /></Layout>}
        />
        <Route
          path="/add"
          element={<Layout title="Add Contact"><AddContact /></Layout>}
        />
        <Route
          path="/delete"
          element={<Layout title="Delete Contact"><DeleteContact /></Layout>}
        />
        <Route
          path="/update"
          element={<Layout title="Update Contact"><UpdateContact /></Layout>}
        />
        <Route
          path="/getonecontact"
          element={<Layout title="View Contact"><GetOneContact /></Layout>}
        />
        {/* NEW ROUTES */}
        <Route
          path="/signup"
          element={<Layout title="Signup"><Signup /></Layout>}
        />
        <Route
          path="/login"
          element={<Layout title="Login"><Login /></Layout>}
        />
        {/* default */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App