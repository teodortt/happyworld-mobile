import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.sora",
  projectId: "660d0e00da0472f3ad52",
  storageId: "660d0e59e293896f1eaf",
  databaseId: "660d14b2b809e838959a",
  userCollectionId: "660d14c0e8ae0ea842b8",
  videoCollectionId: "660d157fcb8675efe308",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    // const newAccount = await account.create(
    //   ID.unique(),
    //   email,
    //   password,
    //   username
    // );

    // if (!newAccount) throw Error;

    // const avatarUrl = avatars.getInitials(username);

    // await signIn(email, password);

    // const newUser = await databases.createDocument(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.userCollectionId,
    //   ID.unique(),
    //   {
    //     accountId: newAccount.$id,
    //     email: email,
    //     username: username,
    //     avatar: avatarUrl,
    //   }
    // );

    return {};
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    // const session = await account.createEmailSession(email, password);

    return {};
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    // const currentAccount = await account.get();

    return {};
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    // const currentAccount = await getAccount();
    // if (!currentAccount) throw Error;

    // const currentUser = await databases.listDocuments(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.userCollectionId,
    //   [Query.equal("accountId", currentAccount.$id)]
    // );

    // if (!currentUser) throw Error;

    return {};
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    // const session = await account.deleteSession("current");

    return {};
  } catch (error) {
    throw new Error(error);
  }
}

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    // const uploadedFile = await storage.createFile(
    //   appwriteConfig.storageId,
    //   ID.unique(),
    //   asset
    // );

    // const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return "fileUrl";
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    // if (type === "video") {
    //   fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    // } else if (type === "image") {
    //   fileUrl = storage.getFilePreview(
    //     appwriteConfig.storageId,
    //     fileId,
    //     2000,
    //     2000,
    //     "top",
    //     100
    //   );
    // } else {
    //   throw new Error("Invalid file type");
    // }

    // if (!fileUrl) throw Error;

    return "fileUrl";
  } catch (error) {
    throw new Error(error);
  }
}

// Create Video Post
export async function createVideoPost(form) {
  try {
    // const [thumbnailUrl, videoUrl] = await Promise.all([
    //   uploadFile(form.thumbnail, "image"),
    //   uploadFile(form.video, "video"),
    // ]);

    // const newPost = await databases.createDocument(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.videoCollectionId,
    //   ID.unique(),
    //   {
    //     title: form.title,
    //     thumbnail: thumbnailUrl,
    //     video: videoUrl,
    //     prompt: form.prompt,
    //     creator: form.userId,
    //   }
    // );

    return {};
  } catch (error) {
    throw new Error(error);
  }
}

// Get all video Posts
export async function getAllPosts() {
  try {
    // const posts = await databases.listDocuments(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.videoCollectionId
    // );

    return [];
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserPosts(userId) {
  try {
    // const posts = await databases.listDocuments(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.videoCollectionId,
    //   [Query.equal("creator", userId)]
    // );

    return [];
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts that matches search query
export async function searchPosts(query) {
  try {
    // const posts = await databases.listDocuments(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.videoCollectionId,
    //   [Query.search("title", query)]
    // );

    // if (!posts) throw new Error("Something went wrong");

    return [];
  } catch (error) {
    throw new Error(error);
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    // const posts = await databases.listDocuments(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.videoCollectionId,
    //   [Query.orderDesc("$createdAt"), Query.limit(7)]
    // );

    return [];
  } catch (error) {
    throw new Error(error);
  }
}

// API
export async function getOffers() {
  // try {
  //   const response = await fetch(
  //     "http://localhost:8000/api/v2/pages/?type=home.WATJobPage&fields=*"
  //   );

  //   if (!response.ok) {
  //     throw new Error(`Error: ${response.status} - ${response.statusText}`);
  //   }

  //   return await response.json();
  // } catch (error) {
  //   console.error("Error fetching offers:", error);
  //   throw new Error(error.message);
  // }

  return {
    items: [
      {
        id: 1,
        meta: { type: "full-time" },
        position: "Software Engineer",
        city: "San Francisco",
        state: "CA",
        featuresList: ["Remote", "Healthcare"],
        hourly_rate: 50,
        tips_available: false,
        unavailable: false,
      },
      {
        id: 2,
        meta: { type: "part-time" },
        position: "Data Analyst",
        city: "New York",
        state: "NY",
        featuresList: ["Flexible hours", "401k"],
        hourly_rate: 40,
        tips_available: true,
        unavailable: false,
      },
      {
        id: 3,
        meta: { type: "internship" },
        position: "Marketing Intern",
        city: "Los Angeles",
        state: "CA",
        featuresList: ["Paid internship", "Mentorship", "Remote command"],
        hourly_rate: 20,
        tips_available: false,
        unavailable: true,
      },
    ],
  }
}
