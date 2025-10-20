import { createConnection } from 'typeorm';
import { User } from '../src/backend/models/user';
import { Script } from '../src/backend/models/script';
import { Grade } from '../src/backend/models/grade';

async function migrateDatabase() {
    const connection = await createConnection();

    // Create database schema
    await connection.synchronize(true);

    console.log('Database migration completed successfully.');

    await connection.close();
}

migrateDatabase().catch(error => {
    console.error('Error during database migration:', error);
});