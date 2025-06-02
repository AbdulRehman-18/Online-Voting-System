import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';

const Election = sequelize.define('Election', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'active', 'completed'),
    allowNull: false,
    defaultValue: 'upcoming'
  }
});

// Associations
Election.belongsToMany(User, { 
  through: 'ElectionCandidates',
  as: 'candidates',
  foreignKey: 'electionId'
});

User.belongsToMany(Election, {
  through: 'ElectionCandidates',
  as: 'contestedElections',
  foreignKey: 'userId'
});

// Votes association
Election.belongsToMany(User, {
  through: 'Votes',
  as: 'voters',
  foreignKey: 'electionId'
});

User.belongsToMany(Election, {
  through: 'Votes',
  as: 'votedElections',
  foreignKey: 'userId'
});

export default Election;