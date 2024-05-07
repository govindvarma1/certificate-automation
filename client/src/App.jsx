import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCertificate from "./components/CreateCertificate";
import ViewCertificates from "./components/ViewCertificates";
import Header from "./components/Header";
import "./App.css";

function App() {
    return (
        <>
            <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<CreateCertificate />} />
                    <Route path="/view" element={<ViewCertificates />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
