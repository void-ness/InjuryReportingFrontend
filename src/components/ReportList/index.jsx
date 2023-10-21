import { gql, useQuery } from "@apollo/client";
import { Box, Button, DataTable, Header, Heading, Text } from "grommet";
import React, { useEffect, useState } from "react";
import { Ascending, Descending, Unsorted } from 'grommet-icons';

const ReportList = () => {
    const FIND_REPORTS = gql`
        query findReports (
            $orderBy: reportOrderByInput,
            $filter: String
        ) {
            report (
                orderBy: $orderBy,
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

    const [orderBy, setOrderBy] = useState({
        createdAt: 'desc'
    });

    const { data, loading, error } = useQuery(FIND_REPORTS, {
        variables: {
            orderBy
        }
    });

    return (
        <Box pad={"medium"} width={"xlarge"} margin={"auto"}>
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
                                header: <Box direction="row" align="center">
                                    <Text>Reporter Name</Text>
                                    <Button
                                        onClick={
                                            () => setOrderBy(
                                                {
                                                    name: orderBy.name === "desc" ? "asc" : "desc"
                                                })
                                        }
                                        icon={orderBy.name
                                            ? (orderBy.name === "asc"
                                                ? <Ascending />
                                                : <Descending />)
                                            : <Unsorted />}>
                                    </Button>
                                </Box>,
                                primary: true
                            },
                            {
                                property: 'injuryDate',
                                header: <Box direction="row" align="center">
                                    <Text>Date of Injury</Text>
                                    <Button
                                        onClick={
                                            () => setOrderBy(
                                                {
                                                    injuryDate: orderBy.injuryDate === "desc" ? "asc" : "desc"
                                                })
                                        }
                                        icon={orderBy.injuryDate
                                            ? (orderBy.injuryDate === "asc"
                                                ? <Ascending />
                                                : <Descending />)
                                            : <Unsorted />}>
                                    </Button>
                                </Box>,
                                render: (datum) => {
                                    const date = new Date(datum.injuryDate);
                                    return (
                                        <Text>{date.getFullYear()}-{date.getMonth()}-{date.getDate()}</Text>
                                    )
                                }
                            },
                            {
                                property: 'createdAt',
                                header: <Box direction="row" align="center">
                                    <Text>Date of Report</Text>
                                    <Button
                                        onClick={
                                            () => setOrderBy(
                                                {
                                                    createdAt: orderBy.createdAt === "desc" ? "asc" : "desc"
                                                })
                                        }
                                        icon={orderBy.createdAt
                                            ? (orderBy.createdAt === "asc"
                                                ? <Ascending />
                                                : <Descending />)
                                            : <Unsorted />}>
                                    </Button>
                                </Box>,
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

export default ReportList;