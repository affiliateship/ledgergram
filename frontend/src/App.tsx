import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FeedPage from './pages/FeedPage'
import Navbar from './components/Navbar'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Registration'


export default function App() {
return (
<BrowserRouter>
<Navbar />
<Routes>
<Route path="/" element={<FeedPage />} />
<Route path="/feed" element={<FeedPage />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
</Routes>
</BrowserRouter>
)
}