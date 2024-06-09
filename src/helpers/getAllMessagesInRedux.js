import { getAllMessagesInState } from "../redux/reducers/chatSessionsReducer"
import databaseService from "../services/appwrite/database"
import authService from "../services/appwrite/auth"

export default function GetAllMessagesInRedux({ dispatch }) {

    authService.getCurrentUser()
        .then(
            user => {
                databaseService
                    .getAllMessagesByUserId({
                        userId: user.$id
                    })
                    .then(messages => {
                        console.log("Hello")
                        return dispatch(getAllMessagesInState(messages))
                    })
                    .catch(err => {
                        console.error(err)
                    })
            })
}