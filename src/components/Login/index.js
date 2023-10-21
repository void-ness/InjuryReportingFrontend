import React, { useState } from 'react';
import { Box, Button, Form, FormField, Header, Text, TextInput } from 'grommet';
import { gql, useMutation } from '@apollo/client'
import { AUTH_TOKEN } from '../../constants';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        newUser: false
    });

    const LOGIN_MUTATION = gql`
        mutation LoginUser(
            $email: String!, 
            $password: String!) {
            login(
                email: $email, 
                password: $password
            ) {
                token
                user {
                    id
                    email
                }
            }
        }
    `

    const SIGNUP_MUTATION = gql`
        mutation SignupUser (
            $name: String!,
            $email: String!,
            $password: String!
        ) {
            signup (
                email: $email,
                password: $password,
                name: $name
            ) {
                token
                user {
                    id
                    name
                    email
                }
            }
        }
    `
    const [login] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: formState.email,
            password: formState.password
        },
        onCompleted: ({ login }) => {
            localStorage.setItem(AUTH_TOKEN, login.token);
            navigate('/');
        }
    })

    const [signup] = useMutation(SIGNUP_MUTATION, {
        variables: {
            name: formState.name,
            email: formState.email,
            password: formState.password
        },
        onCompleted: ({ signup }) => {
            localStorage.setItem(AUTH_TOKEN, signup.token);
            navigate('/');
        }
    })

    return (
        <Box
            width={"large"}
            margin={{ horizontal: "auto", top: "xlarge" }}
            background={"secondary"}
            round="medium"
            pad={"medium"}
        >
            <Form onSubmit={(e) => {
                e.preventDefault();
                formState.newUser ? signup() : login();
            }}
            >
                <Header background={"brand"} pad={'medium'} margin={{ bottom: "medium" }}>
                    <Text size='large'>
                        {formState.newUser ? "Create a new account" : "Login into existing Account"}
                    </Text>
                </Header>
                {formState.newUser && (
                    <FormField label="Name" name='name' htmlFor='user-name' required>
                        <TextInput
                            id='user-name'
                            name="name"
                            value={formState.name}
                            onChange={(e) => setFormState({
                                ...formState,
                                name: e.target.value
                            })}
                        />
                    </FormField>
                )}

                <FormField label="Email" name='email' htmlFor='user-email' required>
                    <TextInput
                        id='user-email'
                        name="email"
                        value={formState.email}
                        onChange={(e) => setFormState({
                            ...formState,
                            email: e.target.value
                        })}
                    />
                </FormField>

                <FormField label="Password" name='password' htmlFor='user-pass' required>
                    <TextInput
                        type='password'
                        id='user-pass'
                        name="password"
                        value={formState.password}
                        onChange={(e) => setFormState({
                            ...formState,
                            password: e.target.value
                        })}
                    />
                </FormField>

                <Box direction='row' gap='medium'>
                    <Button type='submit' primary label={formState.newUser ? 'Sign Up' : 'Login'} />
                    <Button type='button'
                        label={formState.newUser ? "Already have an account?" : "Don't have an account?"}
                        onClick={() => setFormState({
                            ...formState,
                            newUser: !formState.newUser
                        })}
                    />
                    <Button type='reset' label="Reset" onClick={() => setFormState({
                        newUser: formState.newUser,
                        name: "",
                        email: "",
                        password: ""
                    })} />
                </Box>
            </Form>

        </Box>
    );
};

export default Login;