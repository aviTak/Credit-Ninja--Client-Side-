import { makeVar, InMemoryCache } from "@apollo/client";

export const userInfo = makeVar("start");

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                userInfo: {
                    read() {
                        return userInfo();
                    }
                }
            }
        }
    },
    addTypename: false
});
