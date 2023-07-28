import { Routes, Route, Navigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { NewUsers } from "./components/NewUsers"
import { useLocalStorage } from "./components/UseLocalStorage"
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid"
import { UsersLayout } from "./components/UsersLayout"


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

export type RawUser = {
  id: string
} & RawUserData

export type RawUserData = {
  name: string
  lastName: string
  email: string
  jobRole: string
  interestsId: string[]
  markdown: string
}








function App() {
  const [users, setUsers] = useLocalStorage<RawUser>("USERS", [])
  const [interests, setInterests] = useLocalStorage<availInterests[]>("INTERESTS", [])


  const usersWithInterests = useMemo(() => {
    return users.map(user => {
      return { ...user, tags: interests.filter(tag => user.interestsId.includes(tag.id)) }
    })
  }, [users, interests])

  function onCreateUser({ interests, ...data}: UserData) {
    setUsers(prevUsers => {
      return [
        ...prevUsers,
        {
          ...data, id: uuidV4(), interestsId: interests.map(tag => tag.id)
        },
      ]
    })
  }

  function addInterest(interest: availInterests) {
    setInterests(prev => [...prev, interest])
  }

  










  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/new" element={<NewUsers
        onSubmit={onCreateUser}
        onAddTag={addInterest}
        availInterests={interests}
        />} />

        <Route path="/:id" element={<UsersLayout users={usersWithInterests}/>}>
          <Route index element={<User/>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />


      </Routes>
    </Container>

  )
}

export default App
