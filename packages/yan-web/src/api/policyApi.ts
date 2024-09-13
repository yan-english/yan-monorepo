import {envService} from "../services/EnvService";

export const PolicyAPI = {
    GET_POLICY: `${envService.getBackendUrl()}/role/policies`,
}
