
import { merge } from 'lodash'
import achievement from './achievement/resolvers'
import avatar from './avatar/resolvers'
import badge from './badge/resolvers'
import course from './course/resolvers'
import player from './player/resolvers'
import testcase from './testcase/resolvers'
import user from './user/resolvers'

export default merge( achievement, avatar, badge, course,player, testcase, user)
