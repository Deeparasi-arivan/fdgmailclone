import { getFirestore } from "firebase/firestore";
import { app } from "./setup"; // setup.js file-ல் Firebase initialize பண்ணியிருக்கணும்

const database = getFirestore(app);

export { database };
