import { NextFunction, Request, Response } from 'express';
import prisma from '../config/prisma';

export const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (err) {
    next(err);
  }
};

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) return res.status(404).json({ error: 'Étudiant non trouvé' });
    res.json(student);
  } catch (err) {
    next(err);
  }
};

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, phone, enrollmentDate } = req.body;
    // Validation manuelle des champs obligatoires
    if (!firstName || !lastName || !email || !phone || !enrollmentDate) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires (prénom, nom, email, téléphone, date inscription).' });
    }
    // Conversion de la date
    const dateObj = new Date(enrollmentDate);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ error: 'Format de date d\'inscription invalide.' });
    }
    const student = await prisma.student.create({
      data: { firstName, lastName, email, phone, enrollmentDate: dateObj }
    });
    res.status(201).json(student);
  } catch (err) {
    if (typeof err === 'object' && err !== null && 'code' in err) {
      if ((err as { code?: string }).code === 'P2002') return res.status(409).json({ error: 'Email déjà utilisé' });
    }
    next(err);
  }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const { firstName, lastName, email, phone, enrollmentDate } = req.body;
    const student = await prisma.student.update({
      where: { id },
      data: { firstName, lastName, email, phone, enrollmentDate: new Date(enrollmentDate) }
    });
    res.json(student);
  } catch (err) {
    if (typeof err === 'object' && err !== null && 'code' in err) {
      if ((err as { code?: string }).code === 'P2025') return res.status(404).json({ error: 'Étudiant non trouvé' });
      if ((err as { code?: string }).code === 'P2002') return res.status(409).json({ error: 'Email déjà utilisé' });
    }
    next(err);
  }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await prisma.student.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    if (typeof err === 'object' && err !== null && 'code' in err) {
      if ((err as { code?: string }).code === 'P2025') return res.status(404).json({ error: 'Étudiant non trouvé' });
    }
    next(err);
  }
};
