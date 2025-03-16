import { Client, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_PROJECT_URL) // Your Endpoint
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID); // Your project ID

export const databases = new Databases(client);
export const storage = new Storage(client);

export const projectID = process.env.NEXT_PUBLIC_PROJECT_ID;
export const databaseID = process.env.NEXT_PUBLIC_DATABASE_ID;
export const bucketID = process.env.NEXT_PUBLIC_BUCKET_ID;
export const blogsCollectionID = process.env.NEXT_PUBLIC_BLOGS_COLLECTION_ID;
export const booksCollectionID = process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID;
export const chunksCollectionID = process.env.NEXT_PUBLIC_CHUNKS_COLLECTION_ID;
export const FREE_CONTENT_GENERATION_ENTRIES = process.env.NEXT_PUBLIC_FREE_CONTENT_GENERATION_ENTRIES


export const tokenisationCollectionID = process.env.NEXT_PUBLIC_TOKENISATION_COLLECTION_ID;
export const appwriteAPIKey = process.env.NEXT_PUBLIC_APPWRITE_API_KEY;
export const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
export const clerkSecretKey = process.env.CLERK_SECRET_KEY;
export const publiclySharedBlogsCollectionId = process.env.NEXT_PUBLIC_PUBLICLY_SHARED_BLOGS_COLLECTION_ID;
