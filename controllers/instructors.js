import { getDb } from '../models/db.js'; 
import { ObjectId } from 'mongodb';

/**
 * GET - Retrieves all instructor documents from the database collection.
 */
export const getAllInstructors = async (req, res) => {
  try {
    const result = await getDb().db().collection('instructors').find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message || "An internal error occurred while retrieving instructors." 
    });
  }
};

/**
 * GET - Retrieves a singular instructor document filtering by its unique ID.
 */
const getInstructorById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid Instructor ID structural format supplied." 
      });
    }
    const instructorId = new ObjectId(req.params.id);
    const result = await getDb().db().collection('instructors').findOne({ _id: instructorId });
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        message: "Instructor document not found." 
      });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message || "An error occurred while retrieving the targeted instructor." 
    });
  }
};

/**
 * POST - Inserts a brand new instructor record into the collection.
 */
const postInstructor = async (req, res) => {
  try {
    const newInstructor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      department: req.body.department,
      officeLocation: req.body.officeLocation || "N/A"
    };
    
    const response = await getDb().db().collection('instructors').insertOne(newInstructor);
    res.status(201).json({ 
      success: true, 
      acknowledged: response.acknowledged, 
      insertedId: response.insertedId 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message || "Database insertion sequence failed." 
    });
  }
};

/**
 * PUT - Replaces an entire existing instructor document with updated payload details.
 */
const putInstructor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid Instructor ID structural format supplied." 
      });
    }
    const instructorId = new ObjectId(req.params.id);
    const updatedInstructor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      department: req.body.department,
      officeLocation: req.body.officeLocation || "N/A"
    };
    
    const response = await getDb().db().collection('instructors').replaceOne({ _id: instructorId }, updatedInstructor);
    
    if (response.modifiedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "No document altered. Instructor non-existent or data unchanged." 
      });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message || "Database modification operation failed." 
    });
  }
};

/**
 * DELETE - Erases an instructor record permanently from the target database collection.
 */
const deleteInstructor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid Instructor ID structural format supplied." 
      });
    }
    const instructorId = new ObjectId(req.params.id);
    const response = await getDb().db().collection('instructors').deleteOne({ _id: instructorId });
    
    if (response.deletedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "No document matched your request criteria to delete." 
      });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message || "Database structural deletion failed." 
    });
  }
};

export { getAllInstructors, getInstructorById, postInstructor, putInstructor, deleteInstructor };