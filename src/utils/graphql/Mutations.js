import { gql } from '@apollo/client';

const DELETE_MUTATION = gql`
        mutation DeleteReport (
            $reportId: String!
        ) {
            deleteReport (
                reportId: $reportId
            ) {
                id
                name
                createdAt
                injuryDate
            }
        }
    `

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

const UPDATE_REPORT_MUTATION = gql`
        mutation updateReport (
            $reportId: String!,
            $name: String,
            $createdAt: String,
            $injuryDate: String
        ) {
            updateReport (
                reportId: $reportId,
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

export {
    DELETE_MUTATION,
    POST_REPORT_MUTATION,
    LOGIN_MUTATION,
    SIGNUP_MUTATION,
    UPDATE_REPORT_MUTATION
}


