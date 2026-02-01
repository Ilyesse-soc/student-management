
import { useEffect, useState } from 'react';
import styles from '../styles/StudentForm.module.css';
import { Student } from '../types/Student';
import Button from './Button';
import Input from './Input';

interface StudentFormProps {
  mode: 'create' | 'edit';
  student: Student | null;
  onSubmit: (student: Student) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  success?: boolean;
  error?: string;
}

const initialState: Student = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  enrollmentDate: '',
};

export default function StudentForm({ mode, student, onSubmit, onCancel, loading, success, error }: StudentFormProps) {
  const [form, setForm] = useState<Student>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === 'edit' && student) {
      setForm(student);
    } else {
      setForm(initialState);
    }
  }, [mode, student]);

  useEffect(() => {
    if (success) setForm(initialState);
  }, [success]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName) errs.firstName = 'Le prénom est requis';
    if (!form.lastName) errs.lastName = 'Le nom est requis';
    if (!form.email) errs.email = 'L’email est requis';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Email invalide';
    if (!form.phone) errs.phone = 'Le téléphone est requis';
    if (!form.enrollmentDate) errs.enrollmentDate = 'La date d’inscription est requise';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(form);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{mode === 'create' ? 'Ajouter un étudiant' : 'Modifier un étudiant'}</h2>
      <div className={styles.grid}>
        <Input
          label="Prénom"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          error={errors.firstName}
          disabled={loading}
        />
        <Input
          label="Nom"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          error={errors.lastName}
          disabled={loading}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          disabled={loading}
        />
        <Input
          label="Téléphone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
          disabled={loading}
        />
        <Input
          label="Date d’inscription"
          name="enrollmentDate"
          type="date"
          value={form.enrollmentDate}
          onChange={handleChange}
          error={errors.enrollmentDate}
          disabled={loading}
        />
      </div>
      {success && <div className={styles.success}>Étudiant ajouté avec succès.</div>}
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.actions}>
        <Button type="submit" disabled={loading}>
          {mode === 'create' ? 'Ajouter' : 'Enregistrer'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
