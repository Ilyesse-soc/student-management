
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Layout from '../components/Layout';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import studentService from '../services/studentService';
import { Student } from '../types/Student';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [listError, setListError] = useState<string | undefined>(undefined);

  const fetchStudents = async () => {
    setLoading(true);
    setListError(undefined);
    try {
      const data = await studentService.getStudents();
      setStudents(data);
    } catch (e) {
      setListError("Erreur lors du chargement des étudiants.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setFormMode('edit');
    setFormSuccess(false);
    setFormError(undefined);
  };

  const handleDelete = async (id: number) => {
    setFormLoading(true);
    setFormSuccess(false);
    setFormError(undefined);
    try {
      await studentService.deleteStudent(id);
      setFormSuccess(true);
      fetchStudents();
    } catch (e) {
      setFormError("Erreur lors de la suppression de l’étudiant.");
    }
    setFormLoading(false);
  };

  const handleFormSubmit = async (student: Student) => {
    setFormLoading(true);
    setFormSuccess(false);
    setFormError(undefined);
    try {
      if (formMode === 'create') {
        await studentService.createStudent(student);
        setFormSuccess(true);
      } else if (selectedStudent) {
        await studentService.updateStudent(selectedStudent.id, student);
        setFormSuccess(true);
      }
      setSelectedStudent(null);
      setFormMode('create');
      fetchStudents();
    } catch (e) {
      setFormError("Erreur lors de l’enregistrement de l’étudiant.");
    }
    setFormLoading(false);
  };

  const handleFormCancel = () => {
    setSelectedStudent(null);
    setFormMode('create');
    setFormSuccess(false);
    setFormError(undefined);
  };

  return (
    <Layout>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Étudiants</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card>
          <StudentForm
            mode={formMode}
            student={selectedStudent}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            loading={formLoading}
            success={formSuccess}
            error={formError}
          />
        </Card>
        <Card>
          {listError ? (
            <div style={{ color: '#991b1b', background: '#fef2f2', border: '1px solid #ef4444', borderRadius: 6, padding: '10px 16px', marginBottom: 10, fontSize: 15 }}>{listError}</div>
          ) : (
            <StudentList students={students} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
          )}
          <div style={{ marginTop: 12, color: '#6b7280', fontSize: 15 }}>
            Total étudiants : {students.length}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
