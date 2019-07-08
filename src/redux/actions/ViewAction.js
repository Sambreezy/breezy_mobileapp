import { SWITCH_VIEW } from "./Types";

export const switchView = (payload) => {

    return {
        type: SWITCH_VIEW,
        payload
    }
};