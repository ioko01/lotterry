import { gql } from "@apollo/client";

export const ME = gql`
    query ME {
        me {
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
