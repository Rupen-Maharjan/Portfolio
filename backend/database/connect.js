// Import Sequelize ORM to manage database connection and queries
import { Sequelize } from "sequelize";

// Load environment variables from a .env file
import env from 'dotenv'
env.config(); // Initialize dotenv configuration

// Destructure database credentials from environment variables
const { DB_USER, DB_PASS, DB_NAME } = process.env;

// Create a new Sequelize instance with MySQL dialect
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: 'mysql', 
  logging:false
});

// Function to authenticate and test the database connection
const connect = async () => {
  try {
    await sequelize.authenticate(); // Attempts to connect to the database
    console.log('Connected to database');
    
    await sequelize.sync();
    console.log('synced');
    
  } catch (err) {
    // Log error if connection fails
    console.log('Failed to connect to database');
  }
}

// Export the connect function for external use (e.g., to initialize the connection)
export { connect };



// Export the sequelize instance as default for use in models or queries
export default sequelize;
