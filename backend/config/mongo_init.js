db = db.getSiblingDB('TFG_DGB');

db.createUser({
  user: 'root',
  pwd: 'example',
  roles: [
    {
      role: 'readWrite',
      db: 'TFG_DGB'
    }
  ]
});

db.createCollection('users');
db.createCollection('notes');
db.createCollection('projects');