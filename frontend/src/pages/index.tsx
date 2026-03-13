import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Gestion des etudiants - Accueil</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="home-page">
        <nav>
          <div className="nav-brand">
            <span className="dot" />
            Gestion des etudiants
          </div>
          <div className="nav-links">
            <Link href="/" className="nav-link active">
              Accueil
            </Link>
            <Link href="/students" className="nav-link">
              Etudiants
            </Link>
          </div>
        </nav>

        <main>
          <div className="hero">
            <div className="hero-badge">Projet EFREI - Soutenance finale</div>
            <h1>
              Gestion des
              <br />
              etudiants
            </h1>
            <p>
              Plateforme centralisee pour gerer efficacement les etudiants d'un
              etablissement: ajout, modification, suppression et consultation en
              temps reel.
            </p>

            <div className="hero-stats">
              <div className="stat">
                <div className="stat-value">CRUD</div>
                <div className="stat-label">Operations</div>
              </div>
              <div className="divider" />
              <div className="stat">
                <div className="stat-value">REST</div>
                <div className="stat-label">Architecture</div>
              </div>
              <div className="divider" />
              <div className="stat">
                <div className="stat-value">100%</div>
                <div className="stat-label">En ligne</div>
              </div>
            </div>

            <Link href="/students" className="btn-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Acceder a la gestion des etudiants
            </Link>

            <div className="features">
              <div className="feature-chip">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Ajouter
              </div>
              <div className="feature-chip">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
                </svg>
                Modifier
              </div>
              <div className="feature-chip">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
                Supprimer
              </div>
              <div className="feature-chip">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                Consulter
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        :root {
          --bg: #0d0f14;
          --surface: #13161e;
          --border: rgba(255, 255, 255, 0.07);
          --accent: #4f7dff;
          --accent2: #7c5cfc;
          --text: #e8eaf2;
          --text-muted: #6b7290;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          overflow-x: hidden;
        }

        .home-page {
          min-height: 100vh;
          position: relative;
        }

        .home-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(
              ellipse 700px 500px at 15% 10%,
              rgba(79, 125, 255, 0.08) 0%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 500px 400px at 85% 80%,
              rgba(124, 92, 252, 0.07) 0%,
              transparent 70%
            );
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
          background: rgba(13, 15, 20, 0.85);
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
          min-height: calc(100vh - 62px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          margin: 0;
          max-width: none;
          width: 100%;
        }

        .hero {
          text-align: center;
          max-width: 560px;
          animation: fadeUp 0.6s ease both;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(79, 125, 255, 0.1);
          border: 1px solid rgba(79, 125, 255, 0.2);
          color: var(--accent);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 28px;
        }

        .hero-badge::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }

        h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.4rem, 5vw, 3.4rem);
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #e8eaf2 30%, #7c8bcc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero p {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-muted);
          margin-bottom: 40px;
          font-weight: 300;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .stat {
          text-align: center;
        }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.6rem;
          color: var(--text);
          line-height: 1;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .divider {
          width: 1px;
          height: 40px;
          background: var(--border);
          align-self: center;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.925rem;
          font-weight: 500;
          padding: 13px 28px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 4px 24px rgba(79, 125, 255, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(79, 125, 255, 0.45);
        }

        .btn-primary svg {
          width: 16px;
          height: 16px;
        }

        .features {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 48px;
          flex-wrap: wrap;
        }

        .feature-chip {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .feature-chip svg {
          width: 13px;
          height: 13px;
          stroke: var(--accent);
        }

        @media (max-width: 768px) {
          nav {
            padding: 0 16px;
            height: 58px;
          }

          .nav-brand {
            font-size: 0.86rem;
          }

          .nav-link {
            padding: 6px 10px;
            font-size: 0.8rem;
          }

          main {
            min-height: calc(100vh - 58px);
            padding: 30px 16px;
          }

          .hero-stats {
            gap: 16px;
          }

          .divider {
            display: none;
          }

          .btn-primary {
            width: 100%;
            justify-content: center;
            padding: 13px 16px;
          }
        }
      `}</style>
    </>
  );
}
