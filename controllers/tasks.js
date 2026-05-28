// import { getDb } from '../models/db.js';
// import { ObjectId } from 'mongodb';

// const getAllTasks = async (req, res) => {
//   try {
//     const result = await getDb().db().collection('tasks').find().toArray();
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message || "An error occurred retrieving tasks." });
//   }
// };

// const getTaskById = async (req, res) => {
//   try {
//     if (!ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: "Must use a valid task id to find a task." });
//     }
//     const taskId = new ObjectId(req.params.id);
//     const result = await getDb().db().collection('tasks').findOne({ _id: taskId });
//     if (!result) return res.status(404).json({ message: "Task not found." });
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const createTask = async (req, res) => {
//   try {
//     const task = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email, 
//       favoriteColor: req.body.favoriteColor,
//       birthday: req.body.birthday
//     };
//     const response = await getDb().db().collection('tasks').insertOne(task);
//     res.status(201).json({ acknowledged: response.acknowledged, insertedId: response.insertedId });
//   } catch (err) {
//     res.status(500).json({ message: err.message || "Insertion failed." });
//   }
// };

// const updateTask = async (req, res) => {
//   try {
//     if (!ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: "Must use a valid task id to update." });
//     }
//     const taskId = new ObjectId(req.params.id);
//     const task = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email, 
//       favoriteColor: req.body.favoriteColor,
//       birthday: req.body.birthday
//     };
//     const response = await getDb().db().collection('tasks').replaceOne({ _id: taskId }, task);
//     if (response.modifiedCount === 0) {
//       return res.status(404).json({ message: "No task found or data unchanged." });
//     }
//     res.status(204).send();
//   } catch (err) {
//     res.status(500).json({ message: err.message || "Modification failed." });
//   }
// };

// const deleteTask = async (req, res) => {
//   try {
//     if (!ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: "Must use a valid task id to delete." });
//     }
//     const taskId = new ObjectId(req.params.id);
//     const response = await getDb().db().collection('tasks').deleteOne({ _id: taskId });
//     if (response.deletedCount === 0) return res.status(404).json({ message: "No task found to delete." });
//     res.status(204).send();
//   } catch (err) {
//     res.status(500).json({ message: err.message || "Deletion failed." });
//   }
// };


// export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };