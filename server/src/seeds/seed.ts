import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";

import { readFile } from 'fs/promises';

const pythonQuestions = JSON.parse(
  await readFile(new URL('./pythonQuestions.json', import.meta.url), 'utf-8')
);
db.once('open', async () => {
  await cleanDB('Question', 'questions');

  await Question.insertMany(pythonQuestions);

  console.log('Questions seeded!');
  process.exit(0);
});
