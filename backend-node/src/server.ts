import app from './app';
import logger from './config/logger';

const port = Number(process.env.PORT) || 3001;
const host = '0.0.0.0';

app.listen(port, host, () => {
  logger.info(`Serveur Node.js démarré sur le port ${port} (host: ${host})`);
});
