import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./Login";
import Users from "./Users";
import UserPage from "./UserPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/list-users" element={<Users />} />
            <Route path="/user-detail" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
