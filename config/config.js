
exports.gplus = {
  clientId:process.env.STORYTREE_GPLUS_CLIENT_ID,
  secret:process.env.STORYTREE_GPLUS_SECRET
};

exports.session = {
  secretKey:process.env.STORYTREE_SESSION_SECRET_KEY
};

exports.mysql = {
  host:process.env.STORYTREE_DB_HOSTNAME,
  user:process.env.STORYTREE_DB_USER,
  password:process.env.STORYTREE_DB_PASSWORD,
  database:process.env.STORYTREE_DB_DATABASE_NAME
};
