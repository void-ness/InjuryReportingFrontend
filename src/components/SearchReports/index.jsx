import { gql, useLazyQuery } from "@apollo/client";
import { Box, Button, DataTable, Header, Heading, Text, TextInput } from "grommet";
import React, { useState } from "react";
import { Search } from 'grommet-icons';

const SearchReport = () => {
    const FIND_REPORTS = gql`
        query findReports (
            $filter: String
        ) {
            report (
                filter: $filter
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

    const [searchFilter, setSearchFilter] = useState("");
    const [executeSearch, { data, loading, error }] = useLazyQuery(FIND_REPORTS);

    return (
        <Box pad={"medium"} width={"xlarge"} margin={"auto"}>
            <Box direction="row" width={"medium"} margin={"auto"}>
                <TextInput
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder={"Enter the name of reporter"}
                />

                <Button
                    type="button"
                    onClick={() => {
                        executeSearch({
                            variables: { filter: searchFilter.toLowerCase() }
                        })
                    }}
                    icon={<Search />}
                >
                    Search
                </Button>
            </Box>

            {loading && <Text textAlign="center">Loading....</Text>}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {data && data.report.length === 0 && <Text textAlign="center">No Reports Found</Text>}


            {data && (
                <>
                    <Header textAlign="center" margin={"auto"} pad={{
                        bottom: "medium"
                    }}
                    >
                        <Heading weight={"bold"}>
                            User Reports
                        </Heading>
                    </Header>
                    <DataTable
                        background={{
                            header: "brand",
                            body: ["light-2", "light-4"],
                            footer: "dark-3"
                        }}
                        pad={"small"}
                        columns={[
                            {
                                property: 'name',
                                header: <Text>Reporter Name</Text>,
                                primary: true
                            },
                            {
                                property: 'injuryDate',
                                header: <Text>Date of Injury</Text>,
                                render: (datum) => {
                                    const date = new Date(datum.injuryDate);
                                    return (
                                        <Text>{date.getFullYear()}-{date.getMonth()}-{date.getDate()}</Text>
                                    )
                                }
                            },
                            {
                                property: 'createdAt',
                                header: <Text>Date of Report</Text>,
                                render: (datum) => {
                                    const date = new Date(datum.createdAt);
                                    return (
                                        <Text>{date.getFullYear()}-{date.getMonth()}-{date.getDate()}</Text>
                                    )
                                }
                            },
                            {
                                property: 'postedBy.name',
                                header: "Posted By"
                            }
                        ]}
                        data={data.report}
                    />
                </>
            )}
        </Box>
    );
};

export default SearchReport;