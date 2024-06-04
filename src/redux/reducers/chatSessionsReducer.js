/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // 'sessionId': [
    //     {
    //         sender: 'user1',
    //         message: 'Hello world',
    //         createdAt: 'date',
    //         sessionId: 'sessionId'
    //     }
    // ]
}

const chatSessionSlice = createSlice({
    name: 'chatSession',
    initialState,
    reducers: {
        addNewMessageToState: (state, action) => {
            const { sessionId, sender, message, $createdAt } = action.payload

            if (!state[sessionId]) {
                state[sessionId] = []
            }

            state[sessionId].push({
                sender,
                message,
                $createdAt,
                sessionId
            })
        },
        getAllMessagesInState: (state, action) => {

            if (action.payload) {
                action.payload.forEach(data => {
                    const { sender, message, sessionId, $createdAt } = data

                    if (!state[sessionId]) {
                        state[sessionId] = []
                    }

                    state[sessionId].push({
                        sender,
                        message,
                        $createdAt,
                        sessionId
                    })
                })
            }
        },
        deleteAllMessagesInState: (state) => {
            if (state) {
                state = {}
            }
        }
    }
})

export const { addNewMessageToState, getAllMessagesInState, deleteAllMessagesInState } = chatSessionSlice.actions
export default chatSessionSlice.reducer