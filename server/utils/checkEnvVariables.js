export function checkEnvVariables() {
  //TODO add host port validation

  if ((process.env.AUTOMATE_APP !== 'false') | 'true') {
    console.error('AUTOMATE_APP env variable is not valid');
    process.exit(1);
  }

  if (typeof process.env.IGDB_CLIENT_ID !== 'string') {
    console.error('IGDB_CLIENT_ID env variable is not valid');
    process.exit(1);
  }

  if (typeof process.env.IGDB_CLIENT_SECRET !== 'string') {
    console.error('IGDB_CLIENT_SECRET env variable is not valid');
    process.exit(1);
  }
}
