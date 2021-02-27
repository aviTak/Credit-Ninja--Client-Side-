import { gql } from '@apollo/client';

export const sendOtpMutation = gql`
    mutation($number: String!, $old: Boolean!){
        sendOtp(number: $number, old: $old){
            value
            message
        }
    }
`;

export const verifyMutation = gql`
    mutation($session: String!, $otp: String!, $password: String!, $name: String, $email: String, $old: Boolean!){
        verify(session: $session, otp: $otp, password: $password, name: $name, email: $email, old: $old){
            _id
            service
            name
        }
    }
`;

export const loginMutation = gql`
    mutation($number: String!, $password: String!){
        login(number: $number, password: $password){
            _id
            service
            name
        }
    }
`;

export const logoutMutation = gql`
    mutation{
        logout{
            value
        }
    }
`;