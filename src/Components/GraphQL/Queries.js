import { gql } from "@apollo/client";

export const API_KEY = 'lxk.0f37b9290155687c6008bae8b87eda4c'

export const ALL_MINERS_DETAILS = gql`
    query {
        allMinersDetails{
            mpn
            duration
            first
            last
            offset
            before
            after
        }
    }
`;
