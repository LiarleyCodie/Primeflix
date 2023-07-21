import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { Movie } from './pages/Movie'
import { Navbar } from './components/Navbar'
import { NotFound } from './pages/NotFound'
import { Bookmarks } from './pages/Bookmarks'

export function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieID" element={<Movie />} />
        <Route path="/bookmarks" element={<Bookmarks />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
