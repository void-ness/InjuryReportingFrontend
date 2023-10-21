import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Box, Button, DateInput, Form, FormField, Header, Heading, TextInput } from "grommet";

const CreateReport = () => {
    const [formState, setFormState] = useState({
        name: "",
        createdAt: "",
        injuryDate: "",
    });

    const navigate = useNavigate();

    const POST_REPORT_MUTATION = gql`
        mutation PostReport (
            $name: String!,
            $createdAt: DateTime,
            $injuryDate: DateTime
            ) {
                addReport (
                    name: $name,
                    createdAt: $createdAt,
                    injuryDate: $injuryDate
                ) {
                    id
                    name
                    createdAt
                    injuryDate
                    postedBy {
                        id
                        name
                    }
                }
            }
    `

    const [postReport] = useMutation(POST_REPORT_MUTATION, {
        variables: {
            name: formState.name,
            createdAt: formState.createdAt,
            injuryDate: formState.injuryDate
        },
        onCompleted: () => navigate('/')
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
                postReport();
            }}
            >
                <Header background={"brand"} pad={'medium'} margin={{ bottom: "medium" }}>
                    <Heading>
                        Add a New Report
                    </Heading>
                </Header>
                <FormField label="Name of Reporter" name='name' htmlFor='reporter-name' required>
                    <TextInput
                        id='reporter-name'
                        name="name"
                        value={formState.name}
                        onChange={(e) => setFormState({
                            ...formState,
                            name: e.target.value
                        })}
                        placeholder="Enter the name of reporter"
                    />
                </FormField>

                <FormField label="Date of Injury" name='injuryDate' htmlFor='injury-date' required>
                    <DateInput
                        id="injury-date"
                        name="injuryDate"
                        format="yyyy/mm/dd"
                        value={formState.injuryDate ? formState.injuryDate.toISOString() : ""}
                        onChange={(e) => {
                            setFormState({
                                ...formState,
                                injuryDate: new Date(e.value)
                            })
                        }}
                    />
                </FormField>

                <FormField label="Date of Report" name='reportDate' htmlFor='report-date' required>
                    <DateInput
                        id="report-date"
                        name="reportDate"
                        format="yyyy/mm/dd"
                        value={formState.createdAt ? formState.createdAt.toISOString() : ""}
                        onChange={(e) => {
                            setFormState({
                                ...formState,
                                createdAt: new Date(e.value)
                            })
                        }}
                    />
                </FormField>

                <Box direction='row' gap='medium'>
                    <Button type='submit' primary label="Add new report" />

                    <Button type='reset' label="Reset" onClick={() => setFormState({
                        newUser: formState.newUser,
                        name: "",
                        createdAt: "",
                        injuryDate: ""
                    })} />
                </Box>
            </Form>

        </Box>
    );
};

export default CreateReport;