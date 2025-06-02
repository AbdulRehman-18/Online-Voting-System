import express from 'express';
import User from '../models/User.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [{
        model: Election,
        as: 'votedElections',
        attributes: ['id', 'title', 'startDate', 'endDate', 'status']
      }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    await user.update({
      name: name || user.name,
      email: email || user.email,
      avatar: avatar || user.avatar
    });

    // Return updated user without password
    const updatedUser = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Get candidate list
router.get('/candidates', authenticateToken, async (req, res) => {
  try {
    const candidates = await User.findAll({
      where: { role: 'candidate' },
      attributes: { exclude: ['password'] }
    });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching candidates', error: error.message });
  }
});

export default router;