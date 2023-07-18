import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Movie } from "./pages/Movie";
import { Navbar } from "./components/Navbar";

export function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieID" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}
