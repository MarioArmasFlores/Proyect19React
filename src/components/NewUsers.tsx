import { UserData, availInterests } from "../App"
import { NewUsersForm } from "./NewUsersForm"


//propiedades de los nuevos usuarios:
type NewUsersProps = {
    onSubmit: (data: UserData) => void
    onAddTag: (tag: availInterests) => void
    availableInterests: availInterests[] // ! estamos seguros de esto? // solucion: cambie el nombre a availInterests
    
}

export function NewUsers({ onSubmit, onAddTag, availableInterests}: NewUsersProps) {

    return (
            <>
                <h1 className="mb-4">New User</h1>
                <NewUsersForm
                onSubmit={onSubmit}
                onAddTag={onAddTag}
                availableInterests={availableInterests}
                />
            </>
    )

}