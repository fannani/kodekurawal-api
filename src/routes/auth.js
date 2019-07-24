import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import Player from '../data/Player/Player';

const router = express.Router();

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user,
      });
    }
    req.login(user, { session: false }, errlogin => {
      if (errlogin) {
        res.send(errlogin);
      }
      if (user.role === 'siswa') {
        Player.findById(user.userdetailid, (err, player) => {
          const dailyLogin = new Date(player.daily_login);
          const current = new Date();
          if (dailyLogin.getDate() !== current.getDate()) {
            const nextDay = new Date();
            nextDay.setDate(nextDay.getDate() + 1);
            if (dailyLogin.getDate() !== nextDay.getDate()) {
              player.giveAchievement('5c26270a8c56d9072422e3ed');
            } else if (player.daily_login) {
              player.resetAchievement('5c26270a8c56d9072422e3ed');
            } else {
              player.giveAchievement('5c26270a8c56d9072422e3ed');
            }
            player.daily_login = Date.now();
          }
          player.save();
        });
      }

      const token = jwt.sign(user.toJSON(), 'iloveskripsisobad');
      return res.json({ user, token });
    });
    return null;
  })(req, res);
});

export default router;
