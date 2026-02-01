
import axios from 'axios';
import { Student } from '../types/Student';
import { API_URL } from './api';

const STUDENTS_URL = `${API_URL}/api/students`;

const getStudents = async (): Promise<Student[]> => {
  const res = await axios.get(STUDENTS_URL);
  return res.data;
};

const getStudent = async (id: number): Promise<Student> => {
  const res = await axios.get(`${STUDENTS_URL}/${id}`);
  return res.data;
};

const createStudent = async (student: Student): Promise<Student> => {
  const res = await axios.post(STUDENTS_URL, student);
  return res.data;
};

const updateStudent = async (id: number, student: Student): Promise<Student> => {
  const res = await axios.put(`${STUDENTS_URL}/${id}`, student);
  return res.data;
};

const deleteStudent = async (id: number): Promise<void> => {
  await axios.delete(`${STUDENTS_URL}/${id}`);
};

export default {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
