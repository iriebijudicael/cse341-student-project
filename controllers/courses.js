import { getDb } from '../models/db.js'; // 💡 Notice the required .js extension
import { ObjectId } from 'mongodb';

const getAllCourse = async (req, res) => {
  try {
    const result = await getDb().db().collection('mongodb1').find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message || "An error occurred while retrieving courses." });
  }
};

const getCourseById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Course ID structure format." });
    }
    const courseId = new ObjectId(req.params.id);
    const result = await getDb().db().collection('mongodb1').findOne({ _id: courseId });
    if (!result) return res.status(404).json({ message: "Course document not found." });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message || "Error retrieving target course." });
  }
};

const postCourse = async (req, res) => {
  try {
    const newCourse = {
      courseTitle: req.body.courseTitle,
      courseId: req.body.courseId,
      instructor: req.body.instructor,
      classMax: req.body.classMax,
      currentEnrollment: req.body.currentEnrollment,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
    const response = await getDb().db().collection('mongodb1').insertOne(newCourse);
    res.status(201).json({ acknowledged: response.acknowledged, insertedId: response.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message || "Database insertion execution failure." });
  }
};

const putCourse = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Course ID structure format." });
    }
    const courseId = new ObjectId(req.params.id);
    const updatedCourse = {
      courseTitle: req.body.courseTitle,
      courseId: req.body.courseId,
      instructor: req.body.instructor,
      classMax: req.body.classMax,
      currentEnrollment: req.body.currentEnrollment,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
    const response = await getDb().db().collection('mongodb1').replaceOne({ _id: courseId }, updatedCourse);
    if (response.modifiedCount === 0) {
      return res.status(404).json({ message: "No course modified. Document un-changed or non-existent." });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message || "Database replacement routine failed." });
  }
};

const deleteCourse = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Course ID structure format." });
    }
    const courseId = new ObjectId(req.params.id);
    const response = await getDb().db().collection('mongodb1').deleteOne({ _id: courseId });
    if (response.deletedCount === 0) return res.status(404).json({ message: "No document matched parameters to delete." });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message || "Database deletion execution failed." });
  }
};

export { putCourse, deleteCourse, getAllCourse, getCourseById, postCourse};