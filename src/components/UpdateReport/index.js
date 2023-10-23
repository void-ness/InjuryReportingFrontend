import React, { useEffect, useState } from "react";
import { useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, DateInput, Form, FormField, Header, Heading, MaskedInput, TextInput } from "grommet";
import { UPDATE_REPORT_MUTATION } from "../../utils/graphql/Mutations";
import { AUTH_TOKEN } from "../../constants";
import { InputTimeMask, getQueryVariables } from "../../utils/helper";

const UpdateReport = () => {
    const [formState, setFormState] = useState({
        name: "",
        createdAt: "",
        injuryDate: "",
        injuryTime: "",
        reportTime: ""
    });

    const reportId = useParams().id;

    const navigate = useNavigate();

    const user = localStorage.getItem(AUTH_TOKEN);

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    })

    const [updateReport] = useMutation(UPDATE_REPORT_MUTATION, {
        onCompleted: () => navigate('/')
    })

    const handleSubmit = () => {
        const queryVariables = getQueryVariables(formState);

        if (Object.keys(queryVariables).length === 0) {
            alert("You haven't updated anything");
            return;
        }

        queryVariables['reportId'] = reportId;

        console.log(queryVariables);

        updateReport({
            variables: queryVariables
        });
    }

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
                handleSubmit();
            }}
            >
                <Header background={"brand"} pad={'medium'} margin={{ bottom: "medium" }}>
                    <Heading>
                        Update Existing Report
                    </Heading>
                </Header>

                <FormField label="Name of Reporter" name='name' htmlFor='reporter-name'>
                    <TextInput
                        id='reporter-name'
                        name="name"
                        value={formState.name}
                        onChange={(e) => setFormState({
                            ...formState,
                            name: e.target.value
                        })}
                        placeholder="Enter the updated name of reporter"
                    />
                </FormField>

                <FormField label="Date of Injury" name='injuryDate' htmlFor='injury-date'>
                    <DateInput
                        id="injury-date"
                        name="injuryDate"
                        format="yyyy/mm/dd"
                        value={formState.injuryDate}
                        onChange={(e) => {
                            setFormState({
                                ...formState,
                                injuryDate: e.value
                            })
                        }}
                    />
                </FormField>

                <FormField label="Time of Injury" name='injuryTime' htmlFor='injury-time'>
                    <MaskedInput
                        id="injury-time"
                        mask={InputTimeMask}
                        value={formState.injuryTime}
                        onChange={(e) => {
                            setFormState({
                                ...formState,
                                injuryTime: e.target.value
                            })
                        }}
                    />
                </FormField>

                <FormField label="Date of Report" name='reportDate' htmlFor='report-date'>
                    <DateInput
                        id="report-date"
                        name="reportDate"
                        format="yyyy/mm/dd"
                        value={formState.createdAt}
                        onChange={(e) => {
                            setFormState({
                                ...formState,
                                createdAt: e.value
                            })
                        }}
                    />
                </FormField>

                <FormField label="Time of Report" name='reportTime' htmlFor='report-time'>
                    <MaskedInput
                        id="report-time"
                        mask={InputTimeMask}
                        value={formState.reportTime}
                        onChange={(e) => setFormState({
                            ...formState,
                            reportTime: e.target.value
                        })}
                    />
                </FormField>

                <Box direction='row' gap='medium'>
                    <Button type='submit' primary label="Update report" />

                    <Button type='reset' label="Reset" onClick={() => setFormState({
                        name: "",
                        createdAt: "",
                        injuryDate: "",
                        injuryTime: "",
                        reportTime: ""
                    })} />
                </Box>
            </Form>

        </Box>
    );
};

export default UpdateReport;