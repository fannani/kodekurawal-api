import express from 'express';
import path from 'path';
import passport from 'passport';

const router = express.Router();
router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => res.status(200).send('YAY! this is a protected Route'),
);

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../dist/index.html'));
});

export default router;
