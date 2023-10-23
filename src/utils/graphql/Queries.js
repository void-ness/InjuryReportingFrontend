import { gql } from '@apollo/client';

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

const FIND_FILTERED_REPORTS = gql`
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
export { FIND_REPORTS, FIND_FILTERED_REPORTS }


