import { Form, Stack, Row, Col, Button } from "react-bootstrap"
import CreateReactSelect from "react-select/creatable"
import { FormEvent, useRef, useState, useEffect } from "react"
import { availInterests } from "../App"
import { Link, useNavigate } from "react-router-dom"
import { v4 as uuidV4 } from "uuid"
import { UserData } from "../App"
import image01 from "../assets/images/img01.jpg"
import styles from "./NewUser.module.css"

type UsersFormProps = {
    onSubmit: (data: UserData) => void
    onAddTag: (tag: availInterests) => void
    availInterest: availInterests[]


} & Partial<UserData>


export function NewUsersForm({

    onSubmit,
    onAddTag,
    availInterest,
    name = "",
    lastName = "",
    markdown = "",
    jobRole = "",
    email = "",
    interests = [],
    pfpImage // ******


}: UsersFormProps) {


    const imgRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState<File | null>(null);


    const nameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const jobRoleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedInterest, setSelectedInterest] = useState<availInterests[]>(interests)
    const navigate = useNavigate()



    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        onSubmit({
            name: nameRef.current!.value,
            markdown: markdownRef.current!.value,
            lastName: lastNameRef.current!.value,
            jobRole: jobRoleRef.current!.value,
            email: emailRef.current!.value,
            interests: selectedInterest,
            pfpImage: imgRef.current // *****
            
        })

        navigate("..")
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };





    // defaultValue ******


    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Stack gap={4}>

                    <Row>
                        <Col>
                            <div>
                                <img className={styles.imageSize} src={selectedImage ? URL.createObjectURL(selectedImage) : image01 } alt="" />
                            </div>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Insertar Imagen</Form.Label>
                                <Form.Control type="file" ref={imgRef} onChange={handleImageChange} defaultValue={pfpImage}></Form.Control>
                            </Form.Group>
                        </Col>



                    </Row>
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
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="JobRole">
                                <Form.Label>Job Role</Form.Label>
                                <Form.Control ref={jobRoleRef} type="text" required defaultValue={jobRole} />
                            </Form.Group>

                        </Col>

                        <Col>
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
                                    options={availInterest.map((tag) => {
                                        return { label: tag.label, value: tag.id }
                                    })}
                                    onChange={tags => {
                                        setSelectedInterest(tags.map(tag => {
                                            return { label: tag.label, id: tag.value }
                                        }))
                                    }}
                                    isMulti />
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row>
                        <Form.Group controlId="markdown">
                            <Form.Label>About you</Form.Label>
                            <Form.Control ref={markdownRef} defaultValue={markdown} required as="textarea" rows={10} />
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