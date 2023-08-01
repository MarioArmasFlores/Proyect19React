import { availInterests } from "../App";
import { NewUsersForm } from "./NewUsersForm";
import { useUsers } from "./UsersLayout";
import { UserData } from "../App";




type EditUsersProps = {
    onSubmit: (id: string, data: UserData) => void
    onAddTag: (tag: availInterests) => void
    interests: availInterests[]
}





export function EditUsers({ onSubmit, onAddTag, interests }: EditUsersProps) {

    const user = useUsers()

    return (
        <>
            <h1 className="mb-4">Edit User</h1>
            <NewUsersForm
                name={user.name}
                lastName={user.lastName}
                interests={interests}
                markdown={user.markdown}
                onAddTag={onAddTag}
                onSubmit={data => onSubmit(user.id, data)}
                jobRole={user.jobRole}
                email={user.email}

            />
        </>
    )
}