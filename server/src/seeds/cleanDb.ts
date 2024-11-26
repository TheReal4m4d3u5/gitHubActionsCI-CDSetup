import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    // Ensure the model exists in the models object
    const model = models[modelName];
    if (!model || !model.db || !model.db.db) {
      throw new Error(`Model ${modelName} or its database configuration is undefined.`);
    }

    // List collections
    const modelExists = await model.db.db
      .listCollections({ name: collectionName })
      .toArray();

    // Drop the collection if it exists
    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    console.error(`Error in cleanDb: ${err}`);
    throw err;
  }
};