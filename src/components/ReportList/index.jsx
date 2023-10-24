import { useQuery, useMutation } from "@apollo/client";
import { Box, Button, DataTable, Header, Heading, ResponsiveContext, Text } from "grommet";
import React, { useEffect, useState } from "react";
import { Ascending, Descending, Unsorted, Trash, Edit } from 'grommet-icons';

import { FIND_REPORTS } from '../../utils/graphql/Queries';
import { DELETE_MUTATION } from '../../utils/graphql/Mutations';
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../../constants";
import { getFinalDateTime } from "../../utils/helper";

const ReportList = () => {
    const [orderBy, setOrderBy] = useState({
        createdAt: 'desc'
    });

    const size = React.useContext(ResponsiveContext);

    const user = localStorage.getItem(AUTH_TOKEN);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    })

    const [deleteReport] = useMutation(DELETE_MUTATION, {
        update: (cache, { data: { deleteReport } }) => {
            const data = cache.readQuery({
                query: FIND_REPORTS,
                variables: {
                    orderBy
                }
            });

            const updatedData = data.report.filter((item) => {
                return (item.id !== deleteReport.id);
            })

            cache.writeQuery({
                query: FIND_REPORTS,
                data: {
                    report: updatedData
                },
                variables: {
                    orderBy
                }
            })
        }
    })

    const { data, loading, error } = useQuery(FIND_REPORTS, {
        variables: {
            orderBy
        }
    });

    return (
        <Box pad={"medium"} width={"xlarge"} margin={"auto"}>
            {loading && <Text textAlign="center" margin={{ top: "large" }} size="large">Loading....</Text>}

            {error && (
                <Text textAlign="center" margin={{ top: "large" }} size="large">Unable to load your reports due to - {error.message}.<br />Please try Again later.</Text>
            )}

            {data && data.report.length === 0
                ? (<Text textAlign="center" margin={{ top: "large" }} size="large">No Reports Found. Please Create One</Text>)
                : (
                    data && (
                        <Box>
                            <Header
                                textAlign="center"
                                margin={"auto"}
                                pad={{
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
                                        body: ["light-2", "light-4"]
                                    }}
                                    pad={"small"}
                                    columns={[
                                        {
                                            size: "medium",
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
                                                const date = getFinalDateTime(datum.injuryDate);
                                                return (
                                                    <Text>{date}</Text>
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
                                                const date = getFinalDateTime(datum.createdAt);
                                                return (
                                                    <Text>{date}</Text>
                                                )
                                            }
                                        },
                                        {
                                            property: 'id',
                                            primaryKey: true,
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
                        </Box>
                    )
                )}

        </Box>
    );
};

export default ReportList;