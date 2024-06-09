import { currentUser } from "../redux/reducers/authReducer"
import authService from "../services/appwrite/auth"

export default function GetCurrentUserInRedux({dispatch}) {

    authService.getCurrentUser()
        .then(
            user => {
                return dispatch(currentUser(user))
            })
        .catch(err => {
            console.error(err)
        })
}