import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect((err) => {
      if (err) {
        console.error(`MongoDB client not connected to the server: ${err}`);
      } else {
        this.db = this.client.db(database);
        console.log('MongoDB client connected to the server');
      }
    });
  }

  isAlive() {
    return this.client && this.client.isConnected();
  }

  async nbUsers() {
    if (this.db) {
      return this.db.collection('users').countDocuments();
    }
    return 0;
  }

  async nbFiles() {
    if (this.db) {
      return this.db.collection('files').countDocuments();
    }
    return 0;
  }
}

const dbClient = new DBClient();
export default dbClient;
