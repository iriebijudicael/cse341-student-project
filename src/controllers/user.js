import { getDb } from '../models/db.js';

const getUser = async (req, res, next) => {
  const result = await getDb().db().collection('user').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const getUsername = async (req, res, next) => {
  const result = await getDb().db().collection('user').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0].username);
  });
};

export { getUser, getUsername };