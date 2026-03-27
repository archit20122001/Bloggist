import config from "../Config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteEndpoint)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID: userId
                }
            )
        }
        catch (error) {
            console.log("Appwrite error :: createPost :: error", error)
        }

    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID: userId
                }
            )
        } catch (error) {
            console.log("AppWrite error :: updatePost :: error", error)
        }
    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("AppWrite error :: deletePost :: error", error)
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("AppWrite error :: getPost :: error", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,

            )
        } catch (error) {
            console.log("AppWrite error :: getPosts :: error", error)
        }
    }

    // file Upload Service

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteStorageId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("AppWrite error :: uploadFile :: error", error)
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                config.appwriteStorageId,
                fileId
            )
            return true
        } catch (error) {
            console.log("AppWrite error :: deleteFile :: error", error)
        }
    }

    getFileView(fileId) {
        return this.storage.getFileView(
            config.appwriteStorageId,
            fileId
        )
    }

    downloadFile(fileId) {
        try {
            return this.storage.getFileDownload(
                config.appwriteStorageId,
                fileId
            )

        } catch (error) {
            console.log("AppWrite error :: downloadFile :: error", error)
        }
    }
}

const service = new Service();

export default service;