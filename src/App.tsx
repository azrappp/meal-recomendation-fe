import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ScreeningStepperPage } from "./pages/ScreeningStepperPage";
import { ClientMenuCalendarPage } from "./pages/ClientMenuCalendarPage";

function App() {
  return (
    <BrowserRouter>
      <div className="border-b bg-white px-6 py-4">
        <Link to="/" className="font-semibold text-indigo-700">
          Meal Screening App
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<ScreeningStepperPage />} />
        <Route path="/client" element={<ClientMenuCalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
