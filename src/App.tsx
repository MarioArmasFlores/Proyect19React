import { Routes, Route, Navigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { NewUsers } from "./components/NewUsers"
import { useLocalStorage } from "./components/UseLocalStorage"
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid"
import { UsersLayout } from "./components/UsersLayout"
import { User } from "./components/User"
import { UserList } from "./components/UserList"
import { EditUsers } from "./components/EditUsers"


export type User = {
  id: string
} & UserData

export type UserData = {
  name: string
  lastName: string
  email: string // ! - email son leidos en typescript como strings? r: Si
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
  name: string
  lastName: string
  email: string
  jobRole: string
  interestsId: string[]
  markdown: string
  interests: availInterests[]
}

export type RawUserData = {
  name: string
  lastName: string
  email: string
  jobRole: string
  interestsId: string[]
  markdown: string
}








function App() {
  const [users, setUsers] = useLocalStorage<RawUser[]>("USERS", [])
  const [interests, setInterests] = useLocalStorage<availInterests[]>("INTERESTS", [])


  const usersWithInterests = useMemo(() => {
    return users.map(user => {
      return {
        ...user,
        interests: interests.filter(tag => user.interestsId.includes(tag.id))
      }
    })
  }, [users, interests])













  function onCreateUser({ interests, ...data }: UserData) {
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
  function onUpdateUser(id: string, { interests, ...data }: 
    UserData) {
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.id === id) {
            return {
              ...user, ...data, interestsId: interests.map((tag) =>
              tag.id)
            }
          }else {
            return user
          }
        })
      })
    }












  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<UserList users={usersWithInterests} availInterests={interests} />} />
        <Route path="/new" element={<NewUsers
          onSubmit={onCreateUser}
          onAddTag={addInterest}
          availInterests={interests}
        />} />

        <Route path="/:id" element={<UsersLayout users={usersWithInterests} />}>
          <Route index element={<User />} />
          <Route path="edit" element={<EditUsers onSubmit={onUpdateUser}
            onAddTag={addInterest}
            interests={interests} />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />


      </Routes>
    </Container>

  )
}

export default App
