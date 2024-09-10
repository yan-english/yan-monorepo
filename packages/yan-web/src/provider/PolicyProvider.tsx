import {createContext} from "react";

type PolicyProviderContextType = {
    policies?: never;
    // TODO: define type for return policy
}

export const PolicyProviderContext = createContext<PolicyProviderContextType>({} as PolicyProviderContextType)

export const PolicyProvider = ({ children }) => {
    // TODO: if not login return

    // TODO: call api return authorization (needs authorization to access home)
    const isAuthorized = true
    return (
        <PolicyProviderContext.Provider
            value={{
                policies: undefined,
            }}
        >
            {isAuthorized}
        </PolicyProviderContext.Provider>
    );
}

export default PolicyProvider;