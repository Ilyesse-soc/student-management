import Link from 'next/link';
import Button from '../components/Button';
import Card from '../components/Card';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 48,
        }}
      >
        <Card style={{ maxWidth: 520, textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 16,
              color: '#1f2937',
            }}
          >
            Gestion des étudiants
          </h1>

          <p
            style={{
              fontSize: 17,
              color: '#374151',
              marginBottom: 24,
            }}
          >
            Ce projet permet de gérer efficacement les étudiants d’un
            établissement (ajout, modification, suppression, consultation).
            <br />
            <span style={{ color: '#2563eb', fontWeight: 500 }}>
              Projet EFREI – Soutenance finale
            </span>
          </p>

          <Link href="/students" legacyBehavior>
            <Button as="a">Accéder à la gestion des étudiants</Button>
          </Link>
        </Card>
      </div>
    </Layout>
  );
}
