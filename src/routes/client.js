import express from 'express';
import path from 'path';
import passport from 'passport';

const router = express.Router();
router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => res.status(200).send('YAY! this is a protected Route'),
);

router.get('/', (req, res) => {
  res.send(`
		<div align="center">
			___________________
			<br/>
			Welcome to KodeKurawal API 1.2.11-beta
			<br/>
			______🚀😀🚀_____
		</div>
	`);
});

export default router;
