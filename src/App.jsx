import { Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Protected from "./layouts/Protected"
import {
  Home,
  Login,
  NotFound,
  Signup,
  WelcomePage
} from "./pages"
import { ChatSession } from "./components"

function App() {

  return (
    <Routes>
      <Route index path="/welcome" element={<WelcomePage />} />

      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/" element={<Protected><Home /></Protected>}>
        <Route path="/:sessionId" element={<ChatSession />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App