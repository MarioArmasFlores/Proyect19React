import { useNavigate, Link } from "react-router-dom"
import { useUsers } from "./UsersLayout"
import { Row, Col, Stack, Badge, Button } from "react-bootstrap"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

type UserProps = {
    onDeleteUser: (id: string) => void
}



export function User({ onDeleteUser }: UserProps) {
    const user = useUsers()
    const navigate = useNavigate()

    return <>
        <Row>
            <Col className="align-items-center mb-4">
                <h1>{user.name}</h1>
                {user.interests.length > 0 && (
                    <Stack gap={1} direction="horizontal" className="flex-wrap">
                        {user.interests.map(tag => (
                            <Badge className="text-truncate" key={tag.id}>{tag.label}</Badge>
                        ))}
                    </Stack>
                )}
            </Col>
            <Col xs="auto">
                <Stack gap={2} direction="horizontal">
                    <Link to={`/${user.id}/edit`}>
                        <Button variant="primary">Edit</Button>
                    </Link>
                    <Button onClick={() => {
                        onDeleteUser(user.id)
                        navigate("/")
                    }}
                    variant="outline-danger">Delete</Button>
                    <Link to="/">
                        <Button variant="outline-secondary"> Back </Button>
                    </Link>

                </Stack>
            </Col>
        </Row>
        <ReactMarkdown>{user.markdown}</ReactMarkdown>
    </>

}