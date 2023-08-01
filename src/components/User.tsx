import { useNavigate, Link } from "react-router-dom"
import { useUsers } from "./UsersLayout"
import { Row, Col, Stack, Badge, Button } from "react-bootstrap"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"





export function User() {
    const user = useUsers()
    const navigate = useNavigate()

    return <>
        <Row>
            <Col>
                <h1>{user.name}</h1>
                {user.interests.length > 0 && (
                    <Stack gap={1} direction="horizontal" className="">
                        {user.interests.map(tag => (
                            <Badge>{tag.label}</Badge>
                        ))}
                    </Stack>
                )}
            </Col>
            <Col>
                <Stack>
                    <Link to={`/${user.id}/edit`}>
                    <Button>Edit</Button>
                    </Link>
                    <Button>Delete</Button>
                    <Link to = "/">
                            <Button> Back </Button>
                    </Link>

                </Stack>
            </Col>
        </Row>
        <ReactMarkdown>{user.markdown}</ReactMarkdown>
    </>

}