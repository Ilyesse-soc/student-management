
import styles from '../styles/StudentList.module.css';
import { Student } from '../types/Student';
import Button from './Button';

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export default function StudentList({ students, onEdit, onDelete, loading }: StudentListProps) {
  if (loading) {
    return <div className={styles.loading}>Chargement des étudiants…</div>;
  }
  if (!students.length) {
    return <div className={styles.empty}>Aucun étudiant enregistré pour le moment.</div>;
  }
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Nom</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Téléphone</th>
            <th className={styles.th}>Date d’inscription</th>
            <th className={styles.th} style={{ width: 140 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={student.id} className={idx === students.length - 1 ? styles.lastRow : styles.row}>
              <td className={styles.td}>{student.firstName} {student.lastName}</td>
              <td className={styles.td}>{student.email}</td>
              <td className={styles.td}>{student.phone}</td>
              <td className={styles.td}>{student.enrollmentDate}</td>
              <td className={styles.td}>
                <Button type="button" onClick={() => onEdit(student)} style={{ marginRight: 6 }}>
                  Modifier
                </Button>
                <Button type="button" variant="secondary" onClick={() => onDelete(student.id)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
