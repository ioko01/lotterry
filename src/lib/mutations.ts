import { gql } from "@apollo/client";

export const SIGN_IN = gql`
    mutation SIGN_IN($username: String!, $password: String!) {
        signin(username: $username, password: $password) {
            id
            username
            role
            status
            createAt
            updateAt
            lastActive
        }
    }
`;
