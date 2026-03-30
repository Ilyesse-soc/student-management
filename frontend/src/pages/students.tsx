
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import studentService from '../services/studentService';
import { Student } from '../types/Student';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  enrollmentDate: string;
};

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  enrollmentDate: '',
};

const toInputDate = (value: string) => {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toISOString().slice(0, 10);
};

const formatDate = (value: string) => {
  if (!value) return '-';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString('fr-FR');
};

const initials = (firstName: string, lastName: string) => {
  const first = firstName?.charAt(0) ?? '';
  const last = lastName?.charAt(0) ?? '';
  return `${first}${last}`.toUpperCase() || '--';
};

const LOCAL_STORAGE_KEY = 'students-local-fallback';

const readLocalStudents = (): Student[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Student[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeLocalStudents = (data: Student[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [offlineMode, setOfflineMode] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);
  const [toast, setToast] = useState<{ message: string; ok: boolean; visible: boolean }>(
    {
      message: '',
      ok: true,
      visible: false,
    }
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toast.visible) {
        setToast((previous) => ({ ...previous, visible: false }));
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.visible]);

  const showToast = (message: string, ok = true) => {
    setToast({ message, ok, visible: true });
  };

  const fetchStudents = async () => {
    setLoading(true);
    setListError(null);
    try {
      const data = await studentService.getStudents();
      setStudents(data);
      setOfflineMode(false);
    } catch {
      const localData = readLocalStudents();
      setStudents(localData);
      setOfflineMode(true);
      setListError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return students;
    return students.filter((student) => {
      const fullText = `${student.firstName} ${student.lastName} ${student.email}`.toLowerCase();
      return fullText.includes(query);
    });
  }, [students, searchQuery]);

  const onChangeField = (key: keyof FormData, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
    setFormError(null);
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setFormError('Prenom, nom et email requis.');
      showToast('Prenom, nom et email requis.', false);
      return false;
    }

    const isEmailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email);
    if (!isEmailValid) {
      setFormError('Adresse email invalide.');
      showToast('Adresse email invalide.', false);
      return false;
    }

    return true;
  };

  const submitForm = async () => {
    if (!validateForm()) return;

    setSubmitting(true);
    setFormError(null);

    const payload: Student = {
      id: editingId ?? 0,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      enrollmentDate: formData.enrollmentDate,
    };

    try {
      if (offlineMode) {
        const current = readLocalStudents();
        if (editingId) {
          const updated = current.map((student) =>
            student.id === editingId ? { ...payload, id: editingId } : student
          );
          writeLocalStudents(updated);
          setStudents(updated);
          showToast('Etudiant modifie avec succes (mode local).');
        } else {
          const nextId =
            current.length > 0
              ? Math.max(...current.map((student) => student.id || 0)) + 1
              : 1;
          const updated = [...current, { ...payload, id: nextId }];
          writeLocalStudents(updated);
          setStudents(updated);
          showToast('Etudiant ajoute avec succes (mode local).');
        }
      } else {
        if (editingId) {
          await studentService.updateStudent(editingId, payload);
          showToast('Etudiant modifie avec succes.');
        } else {
          await studentService.createStudent(payload);
          showToast('Etudiant ajoute avec succes.');
        }

        await fetchStudents();
      }

      resetForm();
    } catch {
      setFormError("Erreur lors de l'enregistrement de l'etudiant.");
      showToast("Erreur lors de l'enregistrement.", false);
    } finally {
      setSubmitting(false);
    }
  };

  const editStudent = (student: Student) => {
    setEditingId(student.id);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      enrollmentDate: toInputDate(student.enrollmentDate),
    });
    setFormError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setSubmitting(true);
    try {
      if (offlineMode) {
        const current = readLocalStudents();
        const updated = current.filter((student) => student.id !== deleteTarget.id);
        writeLocalStudents(updated);
        setStudents(updated);
      } else {
        await studentService.deleteStudent(deleteTarget.id);
        await fetchStudents();
      }

      setDeleteTarget(null);
      showToast(offlineMode ? 'Etudiant supprime (mode local).' : 'Etudiant supprime.');
    } catch {
      showToast('Erreur lors de la suppression.', false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Gestion des etudiants - Etudiants</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="students-page">
        <nav>
          <div className="nav-brand">
            <span className="dot" />
            Gestion des etudiants
          </div>
          <div className="nav-links">
            <Link href="/" className="nav-link">
              Accueil
            </Link>
            <Link href="/students" className="nav-link active">
              Etudiants
            </Link>
          </div>
        </nav>

        <main>
          <div className="page-header">
            <div>
              <div className="page-title">Etudiants</div>
              <div className="page-subtitle">Gerez la liste des etudiants inscrits</div>
              {offlineMode ? (
                <div className="mode-info">
                  Mode local actif: API indisponible, les donnees sont stockees dans ce navigateur.
                </div>
              ) : null}
            </div>
          </div>

          <div className="card">
            <div className="card-title">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <span>{editingId ? "Modifier un etudiant" : 'Ajouter un etudiant'}</span>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Prenom</label>
                <input
                  type="text"
                  placeholder="Ex : Marie"
                  value={formData.firstName}
                  onChange={(event) => onChangeField('firstName', event.target.value)}
                  disabled={submitting}
                />
              </div>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  placeholder="Ex : Dupont"
                  value={formData.lastName}
                  onChange={(event) => onChangeField('lastName', event.target.value)}
                  disabled={submitting}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="marie.dupont@efrei.net"
                  value={formData.email}
                  onChange={(event) => onChangeField('email', event.target.value)}
                  disabled={submitting}
                />
              </div>
              <div className="form-group">
                <label>Telephone</label>
                <input
                  type="tel"
                  placeholder="+33 6 00 00 00 00"
                  value={formData.phone}
                  onChange={(event) => onChangeField('phone', event.target.value)}
                  disabled={submitting}
                />
              </div>
              <div className="form-group">
                <label>Date d'inscription</label>
                <input
                  type="date"
                  value={formData.enrollmentDate}
                  onChange={(event) => onChangeField('enrollmentDate', event.target.value)}
                  disabled={submitting}
                />
              </div>
            </div>

            {formError ? <div className="form-error">{formError}</div> : null}

            <div className="form-actions">
              <button
                className="btn-primary"
                onClick={submitForm}
                type="button"
                disabled={submitting}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span>{editingId ? 'Enregistrer' : 'Ajouter'}</span>
              </button>
              <button
                className="btn-ghost"
                onClick={resetForm}
                type="button"
                disabled={submitting}
              >
                Annuler
              </button>
            </div>
          </div>

          <div className="table-card">
            <div className="table-header">
              <div className="table-meta">
                Total : <strong>{students.length}</strong> etudiant(s)
              </div>
              <div className="search-wrapper">
                <span className="search-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </span>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
            </div>

            {listError ? <div className="form-error table-error">{listError}</div> : null}

            {loading ? (
              <div className="empty-state">
                <p>Chargement des etudiants...</p>
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <p>Aucun etudiant trouve. Ajoutez le premier.</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Etudiant</th>
                    <th>Telephone</th>
                    <th>Date d'inscription</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <div className="td-name">
                          <div className="avatar">{initials(student.firstName, student.lastName)}</div>
                          <div>
                            <div className="name-text">
                              {student.firstName} {student.lastName}
                            </div>
                            <div className="email-text">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="muted-cell">{student.phone || '-'}</td>
                      <td className="muted-cell">{formatDate(student.enrollmentDate)}</td>
                      <td>
                        <span className="badge badge-active">Actif</span>
                      </td>
                      <td>
                        <button
                          className="action-btn"
                          type="button"
                          onClick={() => editStudent(student)}
                          title="Modifier"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
                          </svg>
                        </button>
                        <button
                          className="action-btn danger"
                          type="button"
                          onClick={() => setDeleteTarget(student)}
                          title="Supprimer"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6M14 11v6M9 6V4h6v2" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>

        <div className={`modal-overlay ${deleteTarget ? 'open' : ''}`}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Supprimer l'etudiant</div>
              <button className="modal-close" type="button" onClick={() => setDeleteTarget(null)}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="modal-text">
              Confirmer la suppression de{' '}
              <strong>
                {deleteTarget ? `${deleteTarget.firstName} ${deleteTarget.lastName}` : ''}
              </strong>{' '}
              ? Cette action est irreversible.
            </p>
            <div className="modal-actions">
              <button className="btn-ghost" type="button" onClick={() => setDeleteTarget(null)}>
                Annuler
              </button>
              <button className="btn-danger" type="button" onClick={confirmDelete} disabled={submitting}>
                Supprimer
              </button>
            </div>
          </div>
        </div>

        <div className={`toast ${toast.visible ? 'show' : ''}`}>
          <div className="toast-dot" style={{ background: toast.ok ? 'var(--success)' : 'var(--danger)' }} />
          <span>{toast.message}</span>
        </div>
      </div>

      <style jsx global>{`
        :root {
          --bg: #ffffff;
          --surface: #ffffff;
          --surface2: #ffffff;
          --border: rgba(15, 23, 42, 0.12);
          --accent: #4f7dff;
          --accent2: #7c5cfc;
          --text: #0f172a;
          --text-muted: #475569;
          --text-dim: #64748b;
          --success: #2dd4a4;
          --danger: #ff5e7d;
          --radius: 14px;
          --radius-sm: 8px;
        }

        * {
          box-sizing: border-box;
        }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          overflow-x: hidden;
          margin: 0;
        }

        .students-page {
          min-height: 100vh;
          position: relative;
        }

        .students-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background: none;
          pointer-events: none;
          z-index: 0;
        }

        nav {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 62px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }

        .nav-brand {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          box-shadow: 0 0 10px var(--accent);
        }

        .nav-links {
          display: flex;
          gap: 6px;
        }

        .nav-link {
          font-size: 0.875rem;
          color: var(--text-muted);
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .nav-link:hover {
          color: var(--text);
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-link.active {
          color: var(--accent);
          background: rgba(79, 125, 255, 0.1);
        }

        main {
          position: relative;
          z-index: 1;
          padding: 48px;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
          animation: fadeUp 0.5s ease both;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 36px;
        }

        .page-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #e8eaf2 30%, #7c8bcc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-subtitle {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .mode-info {
          margin-top: 10px;
          background: rgba(79, 125, 255, 0.12);
          border: 1px solid rgba(79, 125, 255, 0.28);
          color: #b9c9ff;
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          font-size: 0.82rem;
          max-width: 620px;
        }

        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px 32px;
          margin-bottom: 24px;
        }

        .card-title {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text);
        }

        .card-icon {
          width: 32px;
          height: 32px;
          background: rgba(79, 125, 255, 0.1);
          border: 1px solid rgba(79, 125, 255, 0.15);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-icon svg {
          width: 16px;
          height: 16px;
          stroke: var(--accent);
          fill: none;
          stroke-width: 2;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        label {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        input {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 11px 14px;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          outline: none;
          width: 100%;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        input:focus {
          border-color: rgba(79, 125, 255, 0.5);
          box-shadow: 0 0 0 3px rgba(79, 125, 255, 0.1);
        }

        input::placeholder {
          color: var(--text-dim);
        }

        .form-error {
          margin-top: 14px;
          background: rgba(255, 94, 125, 0.15);
          border: 1px solid rgba(255, 94, 125, 0.35);
          color: #ffc9d5;
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          font-size: 0.85rem;
        }

        .table-error {
          margin: 20px 28px;
        }

        .form-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          padding: 10px 22px;
          border-radius: var(--radius-sm);
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(79, 125, 255, 0.25);
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(79, 125, 255, 0.4);
        }

        .btn-primary:disabled,
        .btn-ghost:disabled,
        .btn-danger:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary svg {
          width: 14px;
          height: 14px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
        }

        .btn-ghost {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          padding: 10px 20px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-ghost:hover {
          border-color: rgba(255, 255, 255, 0.15);
          color: var(--text);
          background: rgba(255, 255, 255, 0.04);
        }

        .table-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
        }

        .table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 28px;
          border-bottom: 1px solid var(--border);
          gap: 12px;
          flex-wrap: wrap;
        }

        .table-meta {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .table-meta strong {
          color: var(--accent);
          font-weight: 600;
        }

        .search-wrapper {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-dim);
          pointer-events: none;
          display: flex;
          align-items: center;
        }

        .search-icon svg {
          width: 14px;
          height: 14px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
        }

        .search-input {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px 14px 8px 34px;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          outline: none;
          width: 220px;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          border-color: rgba(79, 125, 255, 0.5);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead th {
          padding: 12px 20px;
          text-align: left;
          font-size: 0.72rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-dim);
          border-bottom: 1px solid var(--border);
        }

        tbody tr {
          transition: background 0.15s;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        tbody tr:hover {
          background: rgba(255, 255, 255, 0.025);
        }

        tbody tr:last-child {
          border-bottom: none;
        }

        tbody td {
          padding: 14px 20px;
          font-size: 0.875rem;
          color: var(--text);
        }

        .muted-cell {
          color: var(--text-muted);
        }

        .avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          color: #fff;
          flex-shrink: 0;
        }

        .td-name {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .name-text {
          font-weight: 500;
        }

        .email-text {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .badge {
          display: inline-flex;
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 500;
        }

        .badge-active {
          background: rgba(45, 212, 164, 0.1);
          color: var(--success);
          border: 1px solid rgba(45, 212, 164, 0.2);
        }

        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all 0.15s;
          margin-right: 6px;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text);
        }

        .action-btn.danger:hover {
          background: rgba(255, 94, 125, 0.1);
          color: var(--danger);
        }

        .action-btn svg {
          width: 15px;
          height: 15px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
        }

        .empty-state {
          padding: 56px 24px;
          text-align: center;
          color: var(--text-muted);
        }

        .empty-icon {
          width: 52px;
          height: 52px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px;
        }

        .empty-icon svg {
          width: 22px;
          height: 22px;
          fill: none;
          stroke: var(--text-dim);
          stroke-width: 1.5;
        }

        .empty-state p {
          font-size: 0.875rem;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 200;
          display: none;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .modal-overlay.open {
          display: flex;
        }

        .modal {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px 32px;
          width: 460px;
          max-width: 100%;
          animation: fadeUp 0.25s ease both;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .modal-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          width: 30px;
          height: 30px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text);
        }

        .modal-close svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
        }

        .modal-text {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.7;
        }

        .modal-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }

        .btn-danger {
          background: rgba(255, 94, 125, 0.15);
          border: 1px solid rgba(255, 94, 125, 0.3);
          color: var(--danger);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          padding: 10px 20px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-danger:hover {
          background: rgba(255, 94, 125, 0.25);
        }

        .toast {
          position: fixed;
          bottom: 28px;
          right: 28px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.875rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          z-index: 999;
          transform: translateY(80px);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          max-width: calc(100vw - 32px);
        }

        .toast.show {
          transform: translateY(0);
          opacity: 1;
        }

        .toast-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          nav {
            padding: 0 20px;
          }

          main {
            padding: 32px 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .table-header {
            padding: 16px;
          }

          .search-input {
            width: 100%;
            min-width: 200px;
          }

          tbody td,
          thead th {
            padding: 12px 10px;
          }

          .toast {
            left: 16px;
            right: 16px;
            bottom: 16px;
            width: auto;
          }
        }
      `}</style>
    </>
  );
}
