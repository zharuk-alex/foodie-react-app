import { openLoginModal, closeLoginModal } from "./slice";

export const setModalLoginOpen = (isOpen) => {
    return (dispatch) => {
        if (isOpen) {
            dispatch(openLoginModal());
        } else {
            dispatch(closeLoginModal());
        }
    };
}