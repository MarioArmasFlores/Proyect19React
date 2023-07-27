import { Form, Stack, Row, Col, Button } from "react-bootstrap"
import CreateReactSelect from "react-select/creatable"
import { useRef, useState } from "react"
import { availInterests } from "../App"
import { Link, useNavigate } from "react-router-dom"
import { v4 as uuidV4 } from "uuid"


type UsersFormProps = {
    availableInterest: availInterests[]
}




export function NewUsersForm({
    availableInterest,
    name = "",
    lastName = "",
    markdown = "",
    jobRole = "",
    email = "",
    interests = [],
    onAddTag,
}: UsersFormProps) {






    const nameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const jobRoleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLInputElement>(null)
    const [selectedInterest, setSelectedInterest] = useState<availInterests[]>(interests)
    const navigate = useNavigate()



    return (
        <>
            <Form>
                <Stack gap={4}>
                    <Row>
                        <Col>

                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control ref={nameRef} type="text" required defaultValue={name} />
                            </Form.Group>

                        </Col>
                        <Col>

                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control ref={lastNameRef} type="text" required defaultValue={lastName} />
                            </Form.Group>

                        </Col>

                    </Row>

                    <Row>
                        <Form.Group controlId="emailAddress">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control ref={emailRef} type="email" required defaultValue={email} />
                        </Form.Group>

                        <Form.Group controlId="JobRole">
                            <Form.Label>Job Role</Form.Label>
                            <Form.Control ref={jobRoleRef} type="text" required defaultValue={jobRole} />
                        </Form.Group>

                        <Form.Group controlId="interest">
                            <Form.Label>Interest</Form.Label>
                            <CreateReactSelect
                                onCreateOption={label => {
                                    const newTag = { id: uuidV4(), label }
                                    onAddTag(newTag)
                                    setSelectedInterest(prev => [...prev, newTag])

                                }}
                                value={selectedInterest.map((tag) => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                options={availableInterest.map((tag) => {
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

                    <Row>
                        <Form.Group controlId="markdown">
                            <Form.Label>About you</Form.Label>
                            <Form.Control ref={markdownRef} required as="textarea" defaultValue={markdown} rows={15} />
                        </Form.Group>

                    </Row>
                    
                    <Stack direction='horizontal' gap={2} className='justify-content-end'>
                        <Button type="submit" variant="primary">Save</Button>
                        <Link to="..">
                            <Button type='button' variant='outline-secondar y'>Cancel</Button>
                        </Link>
                    </Stack>



                </Stack>


            </Form>
        </>
    )

}

// lo ultimo que hicimos fue terminar de crear las funciones de createReactsELECT