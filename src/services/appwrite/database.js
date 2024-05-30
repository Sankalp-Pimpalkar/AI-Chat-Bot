/* eslint-disable no-useless-catch */
import { Account, Client, Databases, ID, Query } from "appwrite";
import configs from '../config';

class DatabaseService {
    client = new Client()
    account;
    database;

    constructor() {
        this.client
            .setEndpoint(configs.appwriteUrl)
            .setProject(configs.projectId);

        this.account = new Account(this.client);
        this.database = new Databases(this.client);
    }

    async addNewMessage({ sessionId, userId, sender, message }) {
        try {
            const newMessage = await this.database.createDocument(
                configs.databaseId,
                configs.collectionId,
                ID.unique(),
                {
                    sessionId,
                    userId,
                    sender,
                    message
                }
            )

            if (newMessage) {
                return newMessage
            }

        } catch (error) {
            throw error
        }
    }

    async getMessagesBySessionId({ sessionId, userId }) {
        try {
            const messages = await this.database.listDocuments(
                configs.databaseId,
                configs.collectionId,
                [
                    Query.equal('sessionId', sessionId),
                    Query.equal('userId', userId),
                    Query.orderAsc('$createdAt')
                ]
            )
            console.log(messages)

            if (messages) {
                return messages.documents
            }

        } catch (error) {
            throw error
        }
    }

    async getAllMessagesByUserId({ userId }) {
        try {

            const messages = await this.database.listDocuments(
                configs.databaseId,
                configs.collectionId,
                [
                    Query.equal('userId', userId)
                ]
            )

            if (messages) {
                return messages.documents
            }

        } catch (error) {
            throw error
        }
    }

}

const databaseService = new DatabaseService()
export default databaseService