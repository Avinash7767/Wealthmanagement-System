import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testMongoDBConnection = async () => {
  try {
    console.log('🔍 Testing MongoDB Connection...\n');
    
    // Try to connect to the URI from environment or default
    const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wealth-management';
    
    console.log(`📍 Connection URI: ${dbURI}`);
    console.log(`⏳ Attempting to connect...\n`);
    
    await mongoose.connect(dbURI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
    });
    
    // Check connection status
    const readyState = mongoose.connection.readyState;
    const statusMap: { [key: number]: string } = {
      0: 'Disconnected',
      1: 'Connected',
      2: 'Connecting',
      3: 'Disconnecting'
    };
    
    console.log('✅ CONNECTION SUCCESSFUL!\n');
    console.log(`📊 Connection Details:`);
    console.log(`   - Status: ${statusMap[readyState]} (State: ${readyState})`);
    console.log(`   - Host: ${mongoose.connection.host}`);
    console.log(`   - Port: ${mongoose.connection.port}`);
    console.log(`   - Database: ${mongoose.connection.name}`);
    console.log(`   - Connected collections: ${Object.keys(mongoose.connection.collections).length}`);
    
    // Try to list collections
    const admin = mongoose.connection.db?.admin();
    if (admin) {
      const collections = await mongoose.connection.db?.listCollections().toArray();
      console.log(`\n📚 Available Collections:`);
      if (collections && collections.length > 0) {
        collections.forEach(col => {
          console.log(`   - ${col.name}`);
        });
      } else {
        console.log('   (No collections found)');
      }
    }
    
    // Check for models
    const models = Object.keys(mongoose.modelNames());
    console.log(`\n📝 Registered Models: ${models.length}`);
    models.forEach(model => {
      console.log(`   - ${model}`);
    });
    
    await mongoose.disconnect();
    console.log('\n✓ Disconnected successfully');
    
  } catch (error: any) {
    console.log('❌ CONNECTION FAILED!\n');
    console.log(`Error: ${error.message}`);
    
    if (error.name === 'MongoServerSelectionError') {
      console.log('\n💡 Troubleshooting:');
      console.log('   - Is MongoDB running?');
      console.log('   - Check if MongoDB service is started');
      console.log('   - For Docker: Run "docker-compose up -d mongodb"');
      console.log('   - For local: Run "mongod" in terminal');
    }
    
    if (error.name === 'MongoAuthenticationError') {
      console.log('\n💡 Authentication Failed:');
      console.log('   - Check username/password in connection URI');
      console.log('   - Verify database permissions');
    }
  }
};

testMongoDBConnection();
