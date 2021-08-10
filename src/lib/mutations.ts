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

export const SIGN_OUT = gql`
    mutation SIGN_OUT {
        signout {
            message
        }
    }
`;

export const CREATE_USER = gql`
    mutation CREATE_USER(
        $username: String!
        $password: String!
        $firstname: String!
        $lastname: String!
        $tagname: String
        $role: String!
    ) {
        createUser(
            username: $username
            password: $password
            firstname: $firstname
            lastname: $lastname
            tagname: $tagname
            role: $role
        ) {
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

export const SCANNER = gql`
    mutation SCANNER($data: String!) {
        scanner(data: $data) {
            data
        }
    }
`;
