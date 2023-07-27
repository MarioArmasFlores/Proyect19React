import { NewUsersForm } from "./NewUsersForm"


//propiedades de los nuevos usuarios:
type NewUsersProps = {
    
}

export function NewUsers() {

    return (
            <>
                <h1 className="mb-4">New User</h1>
                <NewUsersForm/>
            </>
    )

}