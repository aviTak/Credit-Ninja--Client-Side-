import { gql } from '@apollo/client';

export const getUserQuery = gql`
    query{
        user{
          _id
          service  
          name
        }
    }
`;

export const getCompanyQuery = gql`
    query($id: ID!){
        company(id: $id){
            _id
            Employer_Name
            banks{
                name
                category
            }
        }
    }
`;

export const getCompaniesQuery = gql`
    query($search: String!){
        companies(search: $search){
            _id
            Employer_Name
        }
    }
`;

export const loadUserQuery = gql`
    query{
        userInfo @client
    }
`;
