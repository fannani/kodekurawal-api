"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js/stable");
require("regenerator-runtime/runtime");
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var passport_1 = __importDefault(require("passport"));
var mongoose_1 = __importDefault(require("mongoose"));
var routes_1 = __importDefault(require("./routes"));
var apollo_1 = __importDefault(require("./utils/apollo"));
require("./config/passport");
var admin = __importStar(require("firebase-admin"));
var serviceAccount = require('../firebasekey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'kodekurawal-ab777.appspot.com',
});
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
var ObjectId = mongoose_1.default.Types.ObjectId;
mongoose_1.default.connect(process.env.DB_HOST, { useNewUrlParser: true });
mongoose_1.default.Promise = global.Promise;
ObjectId.prototype.valueOf = function () {
    return this.toString();
};
var db = mongoose_1.default.connection;
db.once('open', function () { return console.log('connected to the database'); });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var app = express_1.default();
var server = http_1.default.createServer(app);
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(passport_1.default.initialize());
apollo_1.default.applyMiddleware({
    app: app,
    path: '/api',
});
app.use('/api', function (req, res, next) {
    passport_1.default.authenticate('jwt', { session: false }, function (err, user, info) {
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next);
});
app.use(routes_1.default);
server.listen(process.env.PORT);
