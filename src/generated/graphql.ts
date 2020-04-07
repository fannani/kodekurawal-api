import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../utils/context';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};

export type Achievement = {
   __typename?: 'Achievement',
  text: Scalars['String'],
  _id: Scalars['ID'],
  title: Scalars['String'],
  continuous: Scalars['Boolean'],
  caption?: Maybe<Scalars['String']>,
  star?: Maybe<Scalars['Int']>,
  target_point?: Maybe<Scalars['Int']>,
  point?: Maybe<Scalars['Int']>,
  detail?: Maybe<Array<Maybe<AchievementDetail>>>,
  updated_at: Scalars['String'],
};

export type AchievementDetail = {
   __typename?: 'AchievementDetail',
  _id: Scalars['ID'],
  achievement: Scalars['ID'],
  star: Scalars['Int'],
  caption: Scalars['String'],
  target_point: Scalars['Int'],
  updated_at: Scalars['String'],
};

export type AnswerInput = {
  index: Scalars['Int'],
  answer?: Maybe<Scalars['String']>,
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  tokens?: Maybe<Tokens>,
  user?: Maybe<User>,
};

export type Avatar = {
   __typename?: 'Avatar',
  _id: Scalars['ID'],
  title?: Maybe<Scalars['String']>,
  min_exp?: Maybe<Scalars['Int']>,
  imageid?: Maybe<Scalars['String']>,
  unlock?: Maybe<Scalars['Boolean']>,
  updated_at: Scalars['String'],
};

export type Badge = {
   __typename?: 'Badge',
  _id: Scalars['ID'],
  title?: Maybe<Scalars['String']>,
  imageid?: Maybe<Scalars['String']>,
  updated_at: Scalars['String'],
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Course = {
   __typename?: 'Course',
  _id: Scalars['ID'],
  name: Scalars['String'],
  index?: Maybe<Scalars['Int']>,
  script?: Maybe<Scalars['String']>,
  desc: Scalars['String'],
  imageid?: Maybe<Scalars['String']>,
  updated_at: Scalars['String'],
  badge?: Maybe<Badge>,
  stages?: Maybe<Array<Maybe<Stage>>>,
  leaderboard?: Maybe<Array<Maybe<Leaderboard>>>,
};

export type File = {
   __typename?: 'File',
  id: Scalars['ID'],
  title: Scalars['String'],
  path: Scalars['String'],
};

export type FileInput = {
  title: Scalars['String'],
  file: Scalars['Upload'],
};

export type Leaderboard = {
   __typename?: 'Leaderboard',
  _id: Scalars['ID'],
  score: Scalars['Int'],
  player?: Maybe<Player>,
};

export type Material = {
   __typename?: 'Material',
  _id: Scalars['ID'],
  stage?: Maybe<Stage>,
  body?: Maybe<Scalars['String']>,
  materialType?: Maybe<MaterialType>,
  url?: Maybe<Scalars['String']>,
};

export type MaterialInput = {
  body?: Maybe<Scalars['String']>,
  stage?: Maybe<Scalars['ID']>,
  materialType?: Maybe<MaterialType>,
  url?: Maybe<Scalars['String']>,
};

export enum MaterialType {
  Pdf = 'PDF',
  Web = 'WEB'
}

export type MaterialWhere = {
  _id?: Maybe<Scalars['ID']>,
  stage?: Maybe<Scalars['ID']>,
};

export type Mission = {
   __typename?: 'Mission',
  _id: Scalars['ID'],
  quest: Scalars['String'],
  score: Scalars['Int'],
  testcase?: Maybe<Array<Maybe<TestCaseMission>>>,
  updated_at: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  signUp?: Maybe<AuthPayload>,
  signIn?: Maybe<AuthPayload>,
  addTestCase?: Maybe<TestCase>,
  deleteTestcase?: Maybe<TestCase>,
  addStage?: Maybe<Stage>,
  updateStage?: Maybe<Stage>,
  deleteStage?: Maybe<Stage>,
  reorderStage?: Maybe<Course>,
  addScore?: Maybe<Score>,
  createQuiz?: Maybe<Quiz>,
  upsertQuiz?: Maybe<Quiz>,
  updateQuiz?: Maybe<Quiz>,
  deleteQuiz?: Maybe<Quiz>,
  submitQuiz?: Maybe<Score>,
  addPlayerLevel?: Maybe<PlayerLevel>,
  addPlayerAchievement?: Maybe<Achievement>,
  giveAchievement?: Maybe<Achievement>,
  addEnergy?: Maybe<Player>,
  changeAvatar?: Maybe<Player>,
  addBadgePlayer?: Maybe<Player>,
  setTutorial?: Maybe<Player>,
  addExp?: Maybe<Player>,
  addFriend?: Maybe<Player>,
  register?: Maybe<User>,
  deleteTestCaseMission?: Maybe<TestCaseMission>,
  addTestCaseMission?: Maybe<TestCaseMission>,
  addMission?: Maybe<Mission>,
  updateMission?: Maybe<Mission>,
  createMaterial?: Maybe<Material>,
  updateMaterial?: Maybe<Material>,
  upsertMaterial?: Maybe<Material>,
  deleteMaterial?: Maybe<Material>,
  addAchievement?: Maybe<Achievement>,
  addDetailAchievement?: Maybe<AchievementDetail>,
  addAvatar?: Maybe<Avatar>,
  addBadge?: Maybe<Badge>,
  updateBadge?: Maybe<Badge>,
  addCourse?: Maybe<Course>,
  updateCourse?: Maybe<Course>,
  deleteCourse?: Maybe<Course>,
  uploadImage?: Maybe<Scalars['String']>,
  uploadFile?: Maybe<File>,
};


export type MutationSignUpArgs = {
  name: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  role: Scalars['String']
};


export type MutationSignInArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationAddTestCaseArgs = {
  caption: Scalars['String'],
  script: Scalars['String']
};


export type MutationDeleteTestcaseArgs = {
  id: Scalars['ID']
};


export type MutationAddStageArgs = {
  title: Scalars['String'],
  teory?: Maybe<Scalars['String']>,
  time?: Maybe<Scalars['Int']>,
  index?: Maybe<Scalars['Int']>,
  exp_reward?: Maybe<Scalars['Int']>,
  course: Scalars['ID'],
  language?: Maybe<Scalars['String']>,
  script?: Maybe<Scalars['String']>,
  type?: Maybe<StageType>
};


export type MutationUpdateStageArgs = {
  id: Scalars['ID'],
  title?: Maybe<Scalars['String']>,
  teory?: Maybe<Scalars['String']>,
  index?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['Int']>,
  exp_reward?: Maybe<Scalars['Int']>,
  course?: Maybe<Scalars['ID']>,
  file?: Maybe<Scalars['Upload']>,
  script?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>
};


export type MutationDeleteStageArgs = {
  id: Scalars['ID']
};


export type MutationReorderStageArgs = {
  courseid?: Maybe<Scalars['ID']>,
  source?: Maybe<Scalars['Int']>,
  destination?: Maybe<Scalars['Int']>
};


export type MutationAddScoreArgs = {
  player: Scalars['ID'],
  stage: Scalars['ID'],
  course: Scalars['ID'],
  score: Scalars['Int'],
  time: Scalars['Int'],
  stars: Array<Maybe<Scalars['Boolean']>>,
  script: Scalars['String']
};


export type MutationCreateQuizArgs = {
  input: QuizInput
};


export type MutationUpsertQuizArgs = {
  id: Scalars['ID'],
  data: QuizInput
};


export type MutationUpdateQuizArgs = {
  id: Scalars['ID'],
  input: QuizInput
};


export type MutationDeleteQuizArgs = {
  id: Scalars['ID']
};


export type MutationSubmitQuizArgs = {
  input: QuizSubmitInput
};


export type MutationAddPlayerLevelArgs = {
  level: Scalars['Int'],
  exp_req: Scalars['Int']
};


export type MutationAddPlayerAchievementArgs = {
  player: Scalars['ID'],
  achievement: Scalars['ID'],
  star: Scalars['Int'],
  point: Scalars['Int']
};


export type MutationGiveAchievementArgs = {
  player: Scalars['ID'],
  achievement: Scalars['ID']
};


export type MutationAddEnergyArgs = {
  energy: Scalars['Int'],
  userid: Scalars['ID']
};


export type MutationChangeAvatarArgs = {
  player: Scalars['ID'],
  avatar: Scalars['ID']
};


export type MutationAddBadgePlayerArgs = {
  id: Scalars['ID'],
  badge: Scalars['ID']
};


export type MutationSetTutorialArgs = {
  userid: Scalars['ID'],
  tutorial?: Maybe<Scalars['Boolean']>,
  index?: Maybe<Scalars['Int']>
};


export type MutationAddExpArgs = {
  exp: Scalars['Int'],
  userid: Scalars['ID']
};


export type MutationAddFriendArgs = {
  playerid: Scalars['ID'],
  friendid: Scalars['ID']
};


export type MutationRegisterArgs = {
  name: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationDeleteTestCaseMissionArgs = {
  id: Scalars['ID']
};


export type MutationAddTestCaseMissionArgs = {
  mission: Scalars['ID'],
  testcase: Scalars['ID'],
  params?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type MutationAddMissionArgs = {
  quest: Scalars['String'],
  score: Scalars['Int'],
  stage: Scalars['ID']
};


export type MutationUpdateMissionArgs = {
  id: Scalars['ID'],
  quest?: Maybe<Scalars['String']>,
  score?: Maybe<Scalars['Int']>
};


export type MutationCreateMaterialArgs = {
  input: MaterialInput
};


export type MutationUpdateMaterialArgs = {
  where: MaterialWhere,
  input: MaterialInput
};


export type MutationUpsertMaterialArgs = {
  id: Scalars['ID'],
  data: MaterialInput
};


export type MutationDeleteMaterialArgs = {
  id: Scalars['ID']
};


export type MutationAddAchievementArgs = {
  title: Scalars['String'],
  continuous: Scalars['Boolean'],
  file?: Maybe<Scalars['Upload']>
};


export type MutationAddDetailAchievementArgs = {
  achievement: Scalars['ID'],
  star: Scalars['Int'],
  caption: Scalars['String'],
  target_point: Scalars['Int']
};


export type MutationAddAvatarArgs = {
  title: Scalars['String'],
  min_exp: Scalars['Int'],
  image?: Maybe<Scalars['Upload']>
};


export type MutationAddBadgeArgs = {
  title: Scalars['String'],
  imageid?: Maybe<Scalars['String']>
};


export type MutationUpdateBadgeArgs = {
  id?: Maybe<Scalars['ID']>,
  title?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['Upload']>,
  course?: Maybe<Scalars['ID']>
};


export type MutationAddCourseArgs = {
  name: Scalars['String'],
  desc: Scalars['String'],
  script?: Maybe<Scalars['String']>,
  file?: Maybe<Scalars['Upload']>
};


export type MutationUpdateCourseArgs = {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  desc?: Maybe<Scalars['String']>,
  script?: Maybe<Scalars['String']>,
  file?: Maybe<Scalars['Upload']>
};


export type MutationDeleteCourseArgs = {
  id: Scalars['ID']
};


export type MutationUploadImageArgs = {
  courseid?: Maybe<Scalars['ID']>,
  file?: Maybe<Scalars['Upload']>
};


export type MutationUploadFileArgs = {
  input: FileInput
};

export type Player = {
   __typename?: 'Player',
  _id: Scalars['ID'],
  user: User,
  energy: Scalars['Int'],
  friends?: Maybe<Array<Maybe<Scalars['ID']>>>,
  daily_exp?: Maybe<Scalars['Int']>,
  avatar?: Maybe<Avatar>,
  avatars?: Maybe<Array<Maybe<Avatar>>>,
  daily_login?: Maybe<Scalars['Boolean']>,
  energy_time?: Maybe<Scalars['String']>,
  tutorial?: Maybe<Array<Maybe<Scalars['Boolean']>>>,
  badges?: Maybe<Array<Maybe<Badge>>>,
  achievements?: Maybe<Array<Maybe<Achievement>>>,
  achievement_total?: Maybe<Scalars['Int']>,
  stars?: Maybe<Scalars['Int']>,
  course?: Maybe<Array<Maybe<Course>>>,
  level?: Maybe<Scalars['Int']>,
  birthday?: Maybe<Scalars['String']>,
  exp?: Maybe<Scalars['Int']>,
  target_exp?: Maybe<Scalars['Int']>,
  updated_at?: Maybe<Scalars['String']>,
};

export type PlayerAchievement = {
   __typename?: 'PlayerAchievement',
  _id: Scalars['ID'],
  player: Scalars['ID'],
  achievement: Scalars['ID'],
  star: Scalars['Int'],
  point: Scalars['Int'],
  updated_at: Scalars['String'],
};

export type PlayerLevel = {
   __typename?: 'PlayerLevel',
  _id: Scalars['ID'],
  level: Scalars['Int'],
  exp_req: Scalars['Int'],
  updated_at: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  users?: Maybe<Array<Maybe<User>>>,
  testcases?: Maybe<Array<Maybe<TestCase>>>,
  stages?: Maybe<Array<Maybe<Stage>>>,
  scores?: Maybe<Array<Maybe<Score>>>,
  quiz?: Maybe<Quiz>,
  allQuiz?: Maybe<Array<Maybe<Quiz>>>,
  playerLevel?: Maybe<Array<Maybe<PlayerLevel>>>,
  playerAchievements?: Maybe<Array<Maybe<PlayerAchievement>>>,
  players?: Maybe<Array<Maybe<Player>>>,
  testCaseMissions?: Maybe<Array<Maybe<TestCaseMission>>>,
  missions?: Maybe<Array<Maybe<Mission>>>,
  material?: Maybe<Material>,
  materials?: Maybe<Array<Maybe<Material>>>,
  achievements?: Maybe<Array<Maybe<Achievement>>>,
  avatars?: Maybe<Array<Maybe<Avatar>>>,
  badges?: Maybe<Array<Maybe<Badge>>>,
  courses?: Maybe<Array<Maybe<Course>>>,
  files?: Maybe<Array<Maybe<File>>>,
  File?: Maybe<Course>,
};


export type QueryUsersArgs = {
  _id?: Maybe<Scalars['ID']>
};


export type QueryStagesArgs = {
  _id?: Maybe<Scalars['ID']>,
  course?: Maybe<Scalars['ID']>,
  player?: Maybe<Scalars['ID']>
};


export type QueryQuizArgs = {
  where: QuizWhere,
  random?: Maybe<Scalars['Boolean']>
};


export type QueryPlayersArgs = {
  _id?: Maybe<Scalars['ID']>,
  energy?: Maybe<Scalars['Int']>
};


export type QueryTestCaseMissionsArgs = {
  _id?: Maybe<Scalars['ID']>,
  mission?: Maybe<Scalars['ID']>
};


export type QueryMaterialArgs = {
  where: MaterialWhere,
  css?: Maybe<Scalars['Boolean']>
};


export type QueryAchievementsArgs = {
  _id?: Maybe<Scalars['ID']>,
  player?: Maybe<Scalars['ID']>
};


export type QueryCoursesArgs = {
  _id?: Maybe<Scalars['ID']>
};


export type QueryFileArgs = {
  id: Scalars['ID']
};

export type Question = {
   __typename?: 'Question',
  content?: Maybe<Scalars['String']>,
  questionType?: Maybe<QuestionType>,
  choice?: Maybe<Array<Maybe<Scalars['String']>>>,
  answer?: Maybe<Scalars['String']>,
  score: Scalars['Int'],
};

export type QuestionInput = {
  content?: Maybe<Scalars['String']>,
  questionType?: Maybe<QuestionType>,
  choice?: Maybe<Array<Maybe<Scalars['String']>>>,
  answer?: Maybe<Scalars['String']>,
  score: Scalars['Int'],
};

export enum QuestionType {
  MultipleChoice = 'MULTIPLE_CHOICE',
  Essay = 'ESSAY'
}

export type Quiz = {
   __typename?: 'Quiz',
  _id: Scalars['ID'],
  title?: Maybe<Scalars['String']>,
  questions?: Maybe<Array<Maybe<Question>>>,
  time?: Maybe<Scalars['Int']>,
  stage?: Maybe<Stage>,
};

export type QuizInput = {
  time?: Maybe<Scalars['Int']>,
  title?: Maybe<Scalars['String']>,
  questions?: Maybe<Array<Maybe<QuestionInput>>>,
  stage?: Maybe<Scalars['ID']>,
};

export type QuizSubmitInput = {
  time?: Maybe<Scalars['Int']>,
  quiz?: Maybe<Scalars['ID']>,
  player?: Maybe<Scalars['ID']>,
  answer?: Maybe<Array<Maybe<AnswerInput>>>,
};

export type QuizWhere = {
  id?: Maybe<Scalars['ID']>,
  stage?: Maybe<Scalars['ID']>,
};

export type Score = {
   __typename?: 'Score',
  _id: Scalars['ID'],
  score: Scalars['Int'],
  time: Scalars['Int'],
  stars: Array<Maybe<Scalars['Boolean']>>,
  updated_at: Scalars['String'],
  script: Scalars['String'],
  player?: Maybe<Player>,
  course?: Maybe<Course>,
  stage?: Maybe<Stage>,
  stages?: Maybe<Array<Maybe<Stage>>>,
};

export type Stage = {
   __typename?: 'Stage',
  _id: Scalars['ID'],
  title: Scalars['String'],
  teory?: Maybe<Scalars['String']>,
  exp_reward?: Maybe<Scalars['Int']>,
  index?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['Int']>,
  win?: Maybe<Scalars['Boolean']>,
  score?: Maybe<Scalars['Int']>,
  type?: Maybe<StageType>,
  badge_name?: Maybe<Scalars['String']>,
  badge_image?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>,
  stars?: Maybe<Array<Maybe<Scalars['Boolean']>>>,
  imageid?: Maybe<Scalars['String']>,
  script?: Maybe<Scalars['String']>,
  missions?: Maybe<Array<Maybe<Mission>>>,
  quiz?: Maybe<Quiz>,
  material?: Maybe<Material>,
  course?: Maybe<Course>,
  updated_at: Scalars['String'],
};

export enum StageType {
  Programming = 'PROGRAMMING',
  Material = 'MATERIAL',
  Quiz = 'QUIZ'
}

export type TestCase = {
   __typename?: 'TestCase',
  _id?: Maybe<Scalars['ID']>,
  caption?: Maybe<Scalars['String']>,
  script?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['String']>,
};

export type TestCaseMission = {
   __typename?: 'TestCaseMission',
  _id: Scalars['ID'],
  mission: Scalars['ID'],
  testcase?: Maybe<TestCase>,
  params?: Maybe<Array<Maybe<Scalars['String']>>>,
  updated_at: Scalars['String'],
};

export type Tokens = {
   __typename?: 'Tokens',
  accessToken?: Maybe<Scalars['String']>,
  refreshToken?: Maybe<Scalars['String']>,
};


export type User = {
   __typename?: 'User',
  _id: Scalars['ID'],
  email: Scalars['String'],
  name: Scalars['String'],
  role: Scalars['String'],
  city?: Maybe<Scalars['String']>,
  province?: Maybe<Scalars['String']>,
  last_login?: Maybe<Scalars['String']>,
  userdetailid: Scalars['String'],
  password: Scalars['String'],
  updated_at: Scalars['String'],
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  User: ResolverTypeWrapper<User>,
  String: ResolverTypeWrapper<Scalars['String']>,
  TestCase: ResolverTypeWrapper<TestCase>,
  Stage: ResolverTypeWrapper<Stage>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  StageType: StageType,
  Mission: ResolverTypeWrapper<Mission>,
  TestCaseMission: ResolverTypeWrapper<TestCaseMission>,
  Quiz: ResolverTypeWrapper<Quiz>,
  Question: ResolverTypeWrapper<Question>,
  QuestionType: QuestionType,
  Material: ResolverTypeWrapper<Material>,
  MaterialType: MaterialType,
  Course: ResolverTypeWrapper<Course>,
  Badge: ResolverTypeWrapper<Badge>,
  Leaderboard: ResolverTypeWrapper<Leaderboard>,
  Player: ResolverTypeWrapper<Player>,
  Avatar: ResolverTypeWrapper<Avatar>,
  Achievement: ResolverTypeWrapper<Achievement>,
  AchievementDetail: ResolverTypeWrapper<AchievementDetail>,
  Score: ResolverTypeWrapper<Score>,
  QuizWhere: QuizWhere,
  PlayerLevel: ResolverTypeWrapper<PlayerLevel>,
  PlayerAchievement: ResolverTypeWrapper<PlayerAchievement>,
  MaterialWhere: MaterialWhere,
  File: ResolverTypeWrapper<File>,
  Mutation: ResolverTypeWrapper<{}>,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  Tokens: ResolverTypeWrapper<Tokens>,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  QuizInput: QuizInput,
  QuestionInput: QuestionInput,
  QuizSubmitInput: QuizSubmitInput,
  AnswerInput: AnswerInput,
  MaterialInput: MaterialInput,
  FileInput: FileInput,
  CacheControlScope: CacheControlScope,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  User: User,
  String: Scalars['String'],
  TestCase: TestCase,
  Stage: Stage,
  Int: Scalars['Int'],
  Boolean: Scalars['Boolean'],
  StageType: StageType,
  Mission: Mission,
  TestCaseMission: TestCaseMission,
  Quiz: Quiz,
  Question: Question,
  QuestionType: QuestionType,
  Material: Material,
  MaterialType: MaterialType,
  Course: Course,
  Badge: Badge,
  Leaderboard: Leaderboard,
  Player: Player,
  Avatar: Avatar,
  Achievement: Achievement,
  AchievementDetail: AchievementDetail,
  Score: Score,
  QuizWhere: QuizWhere,
  PlayerLevel: PlayerLevel,
  PlayerAchievement: PlayerAchievement,
  MaterialWhere: MaterialWhere,
  File: File,
  Mutation: {},
  AuthPayload: AuthPayload,
  Tokens: Tokens,
  Upload: Scalars['Upload'],
  QuizInput: QuizInput,
  QuestionInput: QuestionInput,
  QuizSubmitInput: QuizSubmitInput,
  AnswerInput: AnswerInput,
  MaterialInput: MaterialInput,
  FileInput: FileInput,
  CacheControlScope: CacheControlScope,
};

export type AchievementResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Achievement'] = ResolversParentTypes['Achievement']> = {
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  continuous?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  caption?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  star?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  target_point?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  point?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  detail?: Resolver<Maybe<Array<Maybe<ResolversTypes['AchievementDetail']>>>, ParentType, ContextType>,
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AchievementDetailResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AchievementDetail'] = ResolversParentTypes['AchievementDetail']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  achievement?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  star?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  caption?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  target_point?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AuthPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  tokens?: Resolver<Maybe<ResolversTypes['Tokens']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AvatarResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Avatar'] = ResolversParentTypes['Avatar']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  min_exp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  imageid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  unlock?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type BadgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Badge'] = ResolversParentTypes['Badge']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  imageid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CourseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  script?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  desc?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  imageid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  badge?: Resolver<Maybe<ResolversTypes['Badge']>, ParentType, ContextType>,
  stages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Stage']>>>, ParentType, ContextType>,
  leaderboard?: Resolver<Maybe<Array<Maybe<ResolversTypes['Leaderboard']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type FileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type LeaderboardResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Leaderboard'] = ResolversParentTypes['Leaderboard']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  player?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MaterialResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Material'] = ResolversParentTypes['Material']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  stage?: Resolver<Maybe<ResolversTypes['Stage']>, ParentType, ContextType>,
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  materialType?: Resolver<Maybe<ResolversTypes['MaterialType']>, ParentType, ContextType>,
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MissionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mission'] = ResolversParentTypes['Mission']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  quest?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  testcase?: Resolver<Maybe<Array<Maybe<ResolversTypes['TestCaseMission']>>>, ParentType, ContextType>,
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signUp?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationSignUpArgs, 'name' | 'email' | 'password' | 'role'>>,
  signIn?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'email' | 'password'>>,
  addTestCase?: Resolver<Maybe<ResolversTypes['TestCase']>, ParentType, ContextType, RequireFields<MutationAddTestCaseArgs, 'caption' | 'script'>>,
  deleteTestcase?: Resolver<Maybe<ResolversTypes['TestCase']>, ParentType, ContextType, RequireFields<MutationDeleteTestcaseArgs, 'id'>>,
  addStage?: Resolver<Maybe<ResolversTypes['Stage']>, ParentType, ContextType, RequireFields<MutationAddStageArgs, 'title' | 'course'>>,
  updateStage?: Resolver<Maybe<ResolversTypes['Stage']>, ParentType, ContextType, RequireFields<MutationUpdateStageArgs, 'id'>>,
  deleteStage?: Resolver<Maybe<ResolversTypes['Stage']>, ParentType, ContextType, RequireFields<MutationDeleteStageArgs, 'id'>>,
  reorderStage?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, MutationReorderStageArgs>,
  addScore?: Resolver<Maybe<ResolversTypes['Score']>, ParentType, ContextType, RequireFields<MutationAddScoreArgs, 'player' | 'stage' | 'course' | 'score' | 'time' | 'stars' | 'script'>>,
  createQuiz?: Resolver<Maybe<ResolversTypes['Quiz']>, ParentType, ContextType, RequireFields<MutationCreateQuizArgs, 'input'>>,
  upsertQuiz?: Resolver<Maybe<ResolversTypes['Quiz']>, ParentType, ContextType, RequireFields<MutationUpsertQuizArgs, 'id' | 'data'>>,
  updateQuiz?: Resolver<Maybe<ResolversTypes['Quiz']>, ParentType, ContextType, RequireFields<MutationUpdateQuizArgs, 'id' | 'input'>>,
  deleteQuiz?: Resolver<Maybe<ResolversTypes['Quiz']>, ParentType, ContextType, RequireFields<MutationDeleteQuizArgs, 'id'>>,
  submitQuiz?: Resolver<Maybe<ResolversTypes['Score']>, ParentType, ContextType, RequireFields<MutationSubmitQuizArgs, 'input'>>,
  addPlayerLevel?: Resolver<Maybe<ResolversTypes['PlayerLevel']>, ParentType, ContextType, RequireFields<MutationAddPlayerLevelArgs, 'level' | 'exp_req'>>,
  addPlayerAchievement?: Resolver<Maybe<ResolversTypes['Achievement']>, ParentType, ContextType, RequireFields<MutationAddPlayerAchievementArgs, 'player' | 'achievement' | 'star' | 'point'>>,
  giveAchievement?: Resolver<Maybe<ResolversTypes['Achievement']>, ParentType, ContextType, RequireFields<MutationGiveAchievementArgs, 'player' | 'achievement'>>,
  addEnergy?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<MutationAddEnergyArgs, 'energy' | 'userid'>>,
  changeAvatar?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<MutationChangeAvatarArgs, 'player' | 'avatar'>>,
  addBadgePlayer?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<MutationAddBadgePlayerArgs, 'id' | 'badge'>>,
  setTutorial?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<MutationSetTutorialArgs, 'userid'>>,
  addExp?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<MutationAddExpArgs, 'exp' | 'userid'>>,
  addFriend?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<MutationAddFriendArgs, 'playerid' | 'friendid'>>,
  register?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'name' | 'email' | 'password'>>,
  deleteTestCaseMission?: Resolver<Maybe<ResolversTypes['TestCaseMission']>, ParentType, ContextType, RequireFields<MutationDeleteTestCaseMissionArgs, 'id'>>,
  addTestCaseMission?: Resolver<Maybe<ResolversTypes['TestCaseMission']>, ParentType, ContextType, RequireFields<MutationAddTestCaseMissionArgs, 'mission' | 'testcase'>>,
  addMission?: Resolver<Maybe<ResolversTypes['Mission']>, ParentType, ContextType, RequireFields<MutationAddMissionArgs, 'quest' | 'score' | 'stage'>>,
  updateMission?: Resolver<Maybe<ResolversTypes['Mission']>, ParentType, ContextType, RequireFields<MutationUpdateMissionArgs, 'id'>>,
  createMaterial?: Resolver<Maybe<ResolversTypes['Material']>, ParentType, ContextType, RequireFields<MutationCreateMaterialArgs, 'input'>>,
  updateMaterial?: Resolver<Maybe<ResolversTypes['Material']>, ParentType, ContextType, RequireFields<MutationUpdateMaterialArgs, 'where' | 'input'>>,
  upsertMaterial?: Resolver<Maybe<ResolversTypes['Material']>, ParentType, ContextType, RequireFields<MutationUpsertMaterialArgs, 'id' | 'data'>>,
  deleteMaterial?: Resolver<Maybe<ResolversTypes['Material']>, ParentType, ContextType, RequireFields<MutationDeleteMaterialArgs, 'id'>>,
  addAchievement?: Resolver<Maybe<ResolversTypes['Achievement']>, ParentType, ContextType, RequireFields<MutationAddAchievementArgs, 'title' | 'continuous'>>,
  addDetailAchievement?: Resolver<Maybe<ResolversTypes['AchievementDetail']>, ParentType, ContextType, RequireFields<MutationAddDetailAchievementArgs, 'achievement' | 'star' | 'caption' | 'target_point'>>,
  addAvatar?: Resolver<Maybe<ResolversTypes['Avatar']>, ParentType, ContextType, RequireFields<MutationAddAvatarArgs, 'title' | 'min_exp'>>,
  addBadge?: Resolver<Maybe<ResolversTypes['Badge']>, ParentType, ContextType, RequireFields<MutationAddBadgeArgs, 'title'>>,
  updateBadge?: Resolver<Maybe<ResolversTypes['Badge']>, ParentType, ContextType, MutationUpdateBadgeArgs>,
  addCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationAddCourseArgs, 'name' | 'desc'>>,
  updateCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationUpdateCourseArgs, 'id'>>,
  deleteCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationDeleteCourseArgs, 'id'>>,
  uploadImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, MutationUploadImageArgs>,
  uploadFile?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType, RequireFields<MutationUploadFileArgs, 'input'>>,
};

export type PlayerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  energy?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  friends?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>,
  daily_exp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  avatar?: Resolver<Maybe<ResolversTypes['Avatar']>, ParentType, ContextType>,
  avatars?: Resolver<Maybe<Array<Maybe<ResolversTypes['Avatar']>>>, ParentType, ContextType>,
  daily_login?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  energy_time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  tutorial?: Resolver<Maybe<Array<Maybe<ResolversTypes['Boolean']>>>, ParentType, ContextType>,
  badges?: Resolver<Maybe<Array<Maybe<ResolversTypes['Badge']>>>, ParentType, ContextType>,
  achievements?: Resolver<Maybe<Array<Maybe<ResolversTypes['Achievement']>>>, ParentType, ContextType>,
  achievement_total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  stars?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  course?: Resolver<Maybe<Array<Maybe<ResolversTypes['Course']>>>, ParentType, ContextType>,
  level?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  birthday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  exp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  target_exp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  updated_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PlayerAchievementResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PlayerAchievement'] = ResolversParentTypes['PlayerAchievement']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  player?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  achievement?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  star?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  point?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PlayerLevelResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PlayerLevel'] = ResolversParentTypes['PlayerLevel']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  exp_req?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, QueryUsersArgs>,
  testcases?: Resolver<Maybe<Array<Maybe<ResolversTypes['TestCase']>>>, ParentType, ContextType>,
  stages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Stage']>>>, ParentType, ContextType, QueryStagesArgs>,
  scores?: Resolver<Maybe<Array<Maybe<ResolversTypes['Score']>>>, ParentType, ContextType>,
  quiz?: Resolver<Maybe<ResolversTypes['Quiz']>, ParentType, ContextType, RequireFields<QueryQuizArgs, 'where' | 'random'>>,
  allQuiz?: Resolver<Maybe<Array<Maybe<ResolversTypes['Quiz']>>>, ParentType, ContextType>,
  playerLevel?: Resolver<Maybe<Array<Maybe<ResolversTypes['PlayerLevel']>>>, ParentType, ContextType>,
  playerAchievements?: Resolver<Maybe<Array<Maybe<ResolversTypes['PlayerAchievement']>>>, ParentType, ContextType>,
  players?: Resolver<Maybe<Array<Maybe<ResolversTypes['Player']>>>, ParentType, ContextType, QueryPlayersArgs>,
  testCaseMissions?: Resolver<Maybe<Array<Maybe<ResolversTypes['TestCaseMission']>>>, ParentType, ContextType, QueryTestCaseMissionsArgs>,
  missions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Mission']>>>, ParentType, ContextType>,
  material?: Resolver<Maybe<ResolversTypes['Material']>, ParentType, ContextType, RequireFields<QueryMaterialArgs, 'where' | 'css'>>,
  materials?: Resolver<Maybe<Array<Maybe<ResolversTypes['Material']>>>, ParentType, ContextType>,
  achievements?: Resolver<Maybe<Array<Maybe<ResolversTypes['Achievement']>>>, ParentType, ContextType, QueryAchievementsArgs>,
  avatars?: Resolver<Maybe<Array<Maybe<ResolversTypes['Avatar']>>>, ParentType, ContextType>,
  badges?: Resolver<Maybe<Array<Maybe<ResolversTypes['Badge']>>>, ParentType, ContextType>,
  courses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Course']>>>, ParentType, ContextType, QueryCoursesArgs>,
  files?: Resolver<Maybe<Array<Maybe<ResolversTypes['File']>>>, ParentType, ContextType>,
  File?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<QueryFileArgs, 'id'>>,
};

export type QuestionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  questionType?: Resolver<Maybe<ResolversTypes['QuestionType']>, ParentType, ContextType>,
  choice?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  answer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QuizResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Quiz'] = ResolversParentTypes['Quiz']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  questions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Question']>>>, ParentType, ContextType>,
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  stage?: Resolver<Maybe<ResolversTypes['Stage']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ScoreResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Score'] = ResolversParentTypes['Score']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  stars?: Resolver<Array<Maybe<ResolversTypes['Boolean']>>, ParentType, ContextType>,
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  script?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  player?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType>,
  course?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType>,
  stage?: Resolver<Maybe<ResolversTypes['Stage']>, ParentType, ContextType>,
  stages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Stage']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type StageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Stage'] = ResolversParentTypes['Stage']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  teory?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  exp_reward?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  win?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  score?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['StageType']>, ParentType, ContextType>,
  badge_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  badge_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  stars?: Resolver<Maybe<Array<Maybe<ResolversTypes['Boolean']>>>, ParentType, ContextType>,
  imageid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  script?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  missions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Mission']>>>, ParentType, ContextType>,
  quiz?: Resolver<Maybe<ResolversTypes['Quiz']>, ParentType, ContextType>,
  material?: Resolver<Maybe<ResolversTypes['Material']>, ParentType, ContextType>,
  course?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType>,
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TestCaseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestCase'] = ResolversParentTypes['TestCase']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  caption?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  script?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updated_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TestCaseMissionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestCaseMission'] = ResolversParentTypes['TestCaseMission']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  mission?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  testcase?: Resolver<Maybe<ResolversTypes['TestCase']>, ParentType, ContextType>,
  params?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TokensResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Tokens'] = ResolversParentTypes['Tokens']> = {
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  province?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  last_login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  userdetailid?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = Context> = {
  Achievement?: AchievementResolvers<ContextType>,
  AchievementDetail?: AchievementDetailResolvers<ContextType>,
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  Avatar?: AvatarResolvers<ContextType>,
  Badge?: BadgeResolvers<ContextType>,
  Course?: CourseResolvers<ContextType>,
  File?: FileResolvers<ContextType>,
  Leaderboard?: LeaderboardResolvers<ContextType>,
  Material?: MaterialResolvers<ContextType>,
  Mission?: MissionResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Player?: PlayerResolvers<ContextType>,
  PlayerAchievement?: PlayerAchievementResolvers<ContextType>,
  PlayerLevel?: PlayerLevelResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Question?: QuestionResolvers<ContextType>,
  Quiz?: QuizResolvers<ContextType>,
  Score?: ScoreResolvers<ContextType>,
  Stage?: StageResolvers<ContextType>,
  TestCase?: TestCaseResolvers<ContextType>,
  TestCaseMission?: TestCaseMissionResolvers<ContextType>,
  Tokens?: TokensResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
