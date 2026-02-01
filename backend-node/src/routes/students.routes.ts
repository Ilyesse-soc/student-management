import { Router } from 'express';
import { body, param } from 'express-validator';
import { createStudent, deleteStudent, getAllStudents, getStudentById, updateStudent } from '../controllers/students.controller';

const router = Router();

router.get('/', getAllStudents);
router.get('/:id', [param('id').isInt()], getStudentById);
router.post('/',
  [
    body('firstName').isString().notEmpty().isLength({ max: 100 }),
    body('lastName').isString().notEmpty().isLength({ max: 100 }),
    body('email').isEmail().notEmpty().isLength({ max: 255 }),
    body('phone').isString().notEmpty().isLength({ max: 20 }),
    body('enrollmentDate').isISO8601().toDate()
  ],
  createStudent
);
router.put('/:id',
  [
    param('id').isInt(),
    body('firstName').isString().notEmpty().isLength({ max: 100 }),
    body('lastName').isString().notEmpty().isLength({ max: 100 }),
    body('email').isEmail().notEmpty().isLength({ max: 255 }),
    body('phone').isString().notEmpty().isLength({ max: 20 }),
    body('enrollmentDate').isISO8601().toDate()
  ],
  updateStudent
);
router.delete('/:id', [param('id').isInt()], deleteStudent);

export default router;
