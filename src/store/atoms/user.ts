import {atom} from 'recoil'
import {UserType} from "../../typedef.ts"

export const userState = atom<UserType>({
    key : 'userState',
    default : {
        isLoading :true,
        userEmail : null,
    }
});

