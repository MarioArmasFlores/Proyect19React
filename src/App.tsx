import { Routes, Route, Navigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { NewUsers } from "./components/NewUsers"


export type User = {
  id: string
} & UserData

export type UserData = {
  name: string
  lastName: string
  email: string // ! - email son leidos en typescript como strings?
  markdown: string
  jobRole: string
  interests: availInterests[] 
}

export type availInterests = {
  id: string
  label: string
}














function App() {











  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/new" element={<NewUsers/>} />

        <Route path="/:id">
          <Route index element={<h1>show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />


      </Routes>
    </Container>

  )
}

export default App
