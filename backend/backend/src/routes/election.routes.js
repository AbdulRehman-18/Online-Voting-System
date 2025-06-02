import express from 'express';
import Election from '../models/Election.js';
import User from '../models/User.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all elections
router.get('/', authenticateToken, async (req, res) => {
  try {
    const elections = await Election.findAll({
      include: [{
        model: User,
        as: 'candidates',
        attributes: ['id', 'name', 'avatar']
      }]
    });
    res.json(elections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching elections', error: error.message });
  }
});

// Create new election (admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { title, description, startDate, endDate, candidateIds } = req.body;
    
    const election = await Election.create({
      title,
      description,
      startDate,
      endDate
    });

    if (candidateIds && candidateIds.length > 0) {
      const candidates = await User.findAll({
        where: {
          id: candidateIds,
          role: 'candidate'
        }
      });
      await election.setCandidates(candidates);
    }

    res.status(201).json(election);
  } catch (error) {
    res.status(500).json({ message: 'Error creating election', error: error.message });
  }
});

// Cast vote
router.post('/:electionId/vote', authenticateToken, async (req, res) => {
  try {
    const { electionId } = req.params;
    const { candidateId } = req.body;
    const voterId = req.user.id;

    const election = await Election.findByPk(electionId);
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    // Check if election is active
    const now = new Date();
    if (now < election.startDate || now > election.endDate) {
      return res.status(400).json({ message: 'Election is not active' });
    }

    // Check if user has already voted
    const existingVote = await election.hasVoter(voterId);
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted in this election' });
    }

    // Record the vote
    await election.addVoter(voterId, {
      through: { candidateId }
    });

    res.json({ message: 'Vote recorded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error recording vote', error: error.message });
  }
});

// Get election results (admin only)
router.get('/:electionId/results', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { electionId } = req.params;
    
    const results = await sequelize.query(`
      SELECT 
        Users.name as candidateName,
        COUNT(Votes.userId) as voteCount
      FROM ElectionCandidates
      LEFT JOIN Users ON Users.id = ElectionCandidates.userId
      LEFT JOIN Votes ON Votes.candidateId = ElectionCandidates.userId
      WHERE ElectionCandidates.electionId = :electionId
      GROUP BY Users.id, Users.name
      ORDER BY voteCount DESC
    `, {
      replacements: { electionId },
      type: QueryTypes.SELECT
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching results', error: error.message });
  }
});

export default router;