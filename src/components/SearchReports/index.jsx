import { useLazyQuery, useMutation } from "@apollo/client";
import { Box, Button, DataTable, Header, Heading, ResponsiveContext, Text, TextInput } from "grommet";
import React, { useEffect, useState } from "react";
import { Edit, Search, Trash } from 'grommet-icons';
import { FIND_FILTERED_REPORTS } from "../../utils/graphql/Queries";
import { useNavigate } from 'react-router-dom';
import { DELETE_MUTATION } from "../../utils/graphql/Mutations";
import { AUTH_TOKEN } from "../../constants";
import { getFinalDateTime } from "../../utils/helper";

const SearchReport = () => {
    const [searchFilter, setSearchFilter] = useState("");
    const navigate = useNavigate();
    const user = localStorage.getItem(AUTH_TOKEN);

    const size = React.useContext(ResponsiveContext);

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    })

    const [executeSearch, { data, loading, error }] = useLazyQuery(FIND_FILTERED_REPORTS);
    const [deleteReport] = useMutation(DELETE_MUTATION)

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
                </Button>
            </Box>

            {loading && <Text textAlign="center" margin={{ top: "large" }} size="large">Loading....</Text>}

            {error && (
                <Text textAlign="center" margin={{ top: "large" }} size="large">Unable to load your reports due to - {error.message}.<br />Please try Again later.</Text>
            )}

            {(!data && !error) && (
                <Text textAlign="center" size="large" margin={{ top: "large" }}>Search for your reports by the name of the reporter</Text>
            )}

            {data && data.report.length === 0 && <Text textAlign="center" size="large" margin={{ top: "large" }}>No Reports Found</Text>}

            {(data && data.report.length !== 0) && (
                <>
                    <Header textAlign="center" margin={"auto"} pad={{
                        bottom: "medium"
                    }}
                    >
                        <Heading weight={"bold"}>
                            User Reports
                        </Heading>
                    </Header>

                    <Box overflow={size === "small" ? "scroll" : ""}>
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
                                        const date = getFinalDateTime(datum.injuryDate);
                                        return (
                                            <Text>{date}</Text>
                                        )
                                    }
                                },
                                {
                                    property: 'createdAt',
                                    header: <Text>Date of Report</Text>,
                                    render: (datum) => {
                                        const date = getFinalDateTime(datum.injuryDate);
                                        return (
                                            <Text>{date}</Text>
                                        )
                                    }
                                },
                                {
                                    property: 'id',
                                    header: "Modify",
                                    render: (datum) => {
                                        return (
                                            <Box direction="row" justify="between">
                                                <Edit cursor={"pointer"} onClick={() => navigate(`/update/${datum.id}`)} />
                                                <Trash cursor={"pointer"} onClick={() => deleteReport({
                                                    variables: {
                                                        reportId: datum.id
                                                    }
                                                })} />
                                            </Box>
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
                    </Box>
                </>
            )}
        </Box>
    );
};

export default SearchReport;