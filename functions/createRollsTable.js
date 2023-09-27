const pool = require('./dbSetup');

const createRollsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE rolls (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(64) NOT NULL,
          character_id VARCHAR(64) NOT NULL,
          skill VARCHAR(64) NOT NULL,
          difficulty VARCHAR(64) NOT NULL,
          dice VARCHAR(64) NOT NULL,
          dice_results VARCHAR(64) NOT NULL,
          roll_results VARCHAR(64) NOT NULL,
          check_type VARCHAR(64),
          fp_spent VARCHAR(64),
          adventure_id VARCHAR(64) NOT NULL,
          episode_id VARCHAR(64) NOT NULL,
          date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table rolls created successfully.');

    // Create indexes on the rolls table
    await pool.query(`CREATE INDEX idx_user ON rolls(user_id);`);
    await pool.query(`CREATE INDEX idx_character ON rolls(character_id);`);
    await pool.query(`CREATE INDEX idx_skill ON rolls(skill);`);
    await pool.query(`CREATE INDEX idx_dice ON rolls(dice);`);
    console.log('Indices created successfully.');
    
  } catch (err) {
    console.error('Error creating table rolls:', err);
  } finally {
    pool.end(); // close the database connection
  }
};

createRollsTable();