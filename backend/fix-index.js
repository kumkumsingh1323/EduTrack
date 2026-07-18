import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();

async function fixIndex() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    const collection = mongoose.connection.collection('students');
    
    // Check if index exists
    const indexes = await collection.indexes();
    const hasEmailIndex = indexes.some(idx => idx.name === 'email_1');
    
    if (hasEmailIndex) {
      console.log('Dropping email_1 index...');
      await collection.dropIndex('email_1');
      console.log('Index dropped successfully.');
    } else {
      console.log('email_1 index not found.');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

fixIndex();
