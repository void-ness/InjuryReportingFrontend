import React, { useEffect, useState } from "react";
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Box, Button, DateInput, Form, FormField, Header, Heading, MaskedInput, TextInput } from "grommet";
import { POST_REPORT_MUTATION } from "../../utils/graphql/Mutations";
import { AUTH_TOKEN } from "../../constants";
import { InputTimeMask, getQueryVariables } from "../../utils/helper";
import { FIND_REPORTS } from "../../utils/graphql/Queries";

const CreateReport = () => {
    const [formState, setFormState] = useState({
        name: "",
        createdAt: "",
        injuryDate: "",
        injuryTime: "",
        reportTime: ""
    });

    const navigate = useNavigate();

    const user = localStorage.getItem(AUTH_TOKEN);

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    })

    const orderBy = { createdAt: 'desc' };

    const [postReport] = useMutation(POST_REPORT_MUTATION, {
        onCompleted: () => navigate('/'),
        update: (cache, { data: { addReport } }) => {
            const data = cache.readQuery({
                query: FIND_REPORTS,
                variables: {
                    orderBy
                }
            });

            cache.writeQuery({
                query: FIND_REPORTS,
                data: {
                    report: [addReport, ...data.report]
                },
                variables: {
                    orderBy
                }
            })
        }
    })

    const handleSubmit = () => {
        const queryVariables = getQueryVariables(formState);

        postReport({
            variables: queryVariables
        });
    }

    return (
        <Box
            width={"large"}
            margin={{ horizontal: "auto", top: "xlarge", bottom: "xlarge" }}
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

                <FormField label="Date of Report" name='reportDate' htmlFor='report-date' required>
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

                <Box direction="row" gap='medium' margin={{ top: "large" }}>
                    <Button type='submit' primary label="Add new report" />

                    <Button type='reset' label="Reset" onClick={() => setFormState({
                        name: "",
                        createdAt: "",
                        injuryDate: "",
                        reportTime: "",
                        injuryTime: ""
                    })} />
                </Box>
            </Form>

        </Box>
    );
};

export default CreateReport;