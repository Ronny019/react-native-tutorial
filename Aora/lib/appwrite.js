import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '6666178c002c33089f56',
    databaseId: '666618cf003116f87cd5',
    userCollectionID: '666618e8003b4d66010f',
    videoCollectionId: '666619040007febb8b41',
    storageId: '66661ad0000f6de278e5'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        // const newAccount = await account.create(
        //     ID.unique(),
        //     "asasa",
        //     "sasasas",
        //     "rtyrtrtrt"
        // )
        if(!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password);
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionID,
            ID.unique(),
            {
              accountId: newAccount.$id,
              email: email,
              username: username,
              avatar: avatarUrl,
            }
          );
          return newUser;
    } catch (error) {
        throw new Error(error);
    }
}

export async function signIn(email, password) {
    try {
      const session = await account.createEmailSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }


