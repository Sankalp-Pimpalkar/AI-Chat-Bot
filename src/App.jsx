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
import ChatSession from "./components/ChatSession"
import StartConversation from "./components/StartConversation"

function App() {

  return (
    <Routes>
      <Route index path="/welcome" element={<WelcomePage />} />

      <Route
        element={
          <Protected>
            <AuthLayout />
          </Protected>}
      >
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route
        path="/"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      >
        <Route path="/" element={<StartConversation />} />
        <Route path="/chats/:sessionId" element={<ChatSession />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App