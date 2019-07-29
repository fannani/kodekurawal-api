import Achievement from './Achievement/Achievement';
import DetailAchievement from './Achievement/Detail/DetailAchievement';
import { Schema } from 'mongoose';

export const achievement = () => {
  let a1 = new Achievement();
  a1.title = 'Membara';
  a1.continuous = false;
  a1.save(() => {
    let d1 = new DetailAchievement();
    d1.achievement = a1._id;
    d1.star = 1;
    d1.caption = 'Pertahankan 4-hari beruntun';
    d1.target_point = 4;
    d1.save();

    let d2 = new DetailAchievement();
    d2.achievement = a1._id;
    d2.star = 2;
    d2.caption = 'Pertahankan 7-hari beruntun';
    d2.target_point = 7;
    d2.save();

    let d3 = new DetailAchievement();
    d3.achievement = a1._id;
    d3.star = 3;
    d3.caption = 'Pertahankan 20-hari beruntun';
    d3.target_point = 20;
    d3.save();
  });

  let a2 = new Achievement();
  a1.continuous = true;
  a2.title = 'Juara';
  a2.save(() => {
    let d4 = new DetailAchievement();
    d4.achievement = a2._id;
    d4.star = 1;
    d4.caption = 'Selesaikan 1 Course';
    d4.target_point = 1;
    d4.save();

    let d5 = new DetailAchievement();
    d5.achievement = a2._id;
    d5.star = 2;
    d5.caption = 'Selesaikan 3 Course';
    d5.target_point = 3;
    d5.save();

    let d6 = new DetailAchievement();
    d6.achievement = a2._id;
    d6.star = 3;
    d6.caption = 'Selesaikan 6 Course';
    d6.target_point = 6;
    d6.save();
  });

  let a3 = new Achievement();
  a3.continuous = true;
  a3.title = 'Supel';
  a3.save(() => {
    let d4 = new DetailAchievement();
    d4.achievement = a3._id;
    d4.star = 1;
    d4.caption = 'Tambah 3 teman';
    d4.target_point = 3;
    d4.save();

    let d5 = new DetailAchievement();
    d5.achievement = a3._id;
    d5.star = 2;
    d5.caption = 'Tambah 10 teman';
    d5.target_point = 10;
    d5.save();

    let d6= new DetailAchievement();
    d6.achievement = a3._id;
    d6.star = 3;
    d6.caption = 'Tambah 20 teman';
    d6.target_point = 20;
    d6.save();
  });

  let a4 = new Achievement();
  a4.continuous = false;
  a4.title = 'Bagus';
  a4.save(() => {
    let d4 = new DetailAchievement();
    d4.achievement = a4._id;
    d4.star = 1;
    d4.caption = 'Dapatkan 50 XP dalam sehari';
    d4.target_point = 50;
    d4.save();

    let d5 = new DetailAchievement();
    d5.achievement = a4._id;
    d5.star = 2;
    d5.caption = 'Dapatkan 100 XP dalam sehari';
    d5.target_point = 100;
    d5.save();

    let d6 = new DetailAchievement();
    d6.achievement = a4._id;
    d6.star = 3;
    d6.caption = 'Dapatkan 200 XP dalam sehari';
    d6.target_point = 200;
    d6.save();

  });

  let a5 = new Achievement();
  a5.continuous = true;
  a5.title = 'Penembak Jitu';
  a5.save(() => {
    let d4 = new DetailAchievement();
    d4.achievement = a5._id;
    d4.star = 1;
    d4.caption = 'Selesaikan 2 stage tanpa kesalahan';
    d4.target_point = 2;
    d4.save();

    let d5 = new DetailAchievement();
    d5.achievement = a5._id;
    d5.star = 2;
    d5.caption = 'Selesaikan 5 stage tanpa kesalahan';
    d5.target_point = 5;
    d5.save();

    let d6 = new DetailAchievement();
    d6.achievement = a5._id;
    d6.star = 3;
    d6.caption = 'Selesaikan 10 stage tanpa kesalahan';
    d6.target_point = 10;
    d6.save();
  });













};
