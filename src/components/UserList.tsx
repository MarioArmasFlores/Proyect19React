import { useMemo, useState } from "react"
import { Row, Col, Stack, Button, Form, Card, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { availInterests } from "../App"

type SimplifiedUser = {
    interests: availInterests[]
    name: string
    lastName: string
    id: string
    jobRole: string
    email: string

}

type UserListProps = {
    availInterests: availInterests[]
    users: SimplifiedUser[]

}







export function UserList({availInterests, users}: UserListProps) {

    const [selectedInterest, setSelectedInterest] = useState<availInterests[]>([]);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [jobRole, setJobRole] = useState("");
    const [email, setEmail] = useState("")

    const filteredUsers = useMemo(() => {
        return users. filter((user) => {
            return (name === "" || user.name.toLowerCase().includes(name.toLowerCase())) && (selectedInterest?.length === 0 ||
               selectedInterest?.every(tag => user.interests.some(userTag => userTag.id === tag.id)) )
        })
    }, [name, selectedInterest, users ])
    





    return (
        <>
            <Row className="align-items-center mb-4">
                <Col><h1>Users</h1></Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to="/new">
                            <Button variant="primary"> Create User </Button>
                        </Link>
                        <Button>Edit Tags</Button>
                    </Stack>
                </Col>

            </Row>
            <Form>
                <Stack gap={4}>
                    <Row>
                        <Col>

                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control  type="text" value={name} onChange={e => setName(e.target.value)} />
                            </Form.Group>

                        </Col>
                        <Col>

                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                            </Form.Group>

                        </Col>

                    </Row>

                    <Row>
                        <Form.Group controlId="emailAddress">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)}  />
                        </Form.Group>

                        <Form.Group controlId="JobRole">
                            <Form.Label>Job Role</Form.Label>
                            <Form.Control type="text" value={jobRole} onChange={e => setJobRole(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="interest">
                            <Form.Label>Interest</Form.Label>
                            <ReactSelect
                                value={selectedInterest.map((tag) => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                options={availInterests.map((tag) => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange={tags => {
                                    setSelectedInterest(tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    }))
                                }}
                                isMulti />
                        </Form.Group>
                    </Row>
                </Stack>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                {filteredUsers.map(user => (
                    <Col key={user.id}>
                        <UserCard id={user.id} name={user.name} lastName={user.lastName} interests={user.interests} email={user.email} jobRole={user.jobRole}/>
                    </Col>
                ))}

            </Row>

        </>
    )
}

function UserCard({id, name, lastName, interests, email, jobRole }: SimplifiedUser) {
    return (
            <Card as={Link} to={`${id}`}>
                <Card.Body>
                    <Stack gap={2} className="align-items-center justify-content-center h-100">
                        <span>{`${name} ${lastName}`}</span>
                        <span>{`${email} ${jobRole}`}</span>
                        {interests.length > 0 && (
                            <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
                                {interests.map(tag => (
                                    <Badge className="text-truncate" key={tag.id}> {tag.label}</Badge>
                                ))}
                            </Stack>
                        )}
                    </Stack>
                </Card.Body>


            </Card>
    )
}