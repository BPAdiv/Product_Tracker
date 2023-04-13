"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verfiyToken = exports.login = exports.register = void 0;
//import colection schema
// const User = require("../models/users");
var users_1 = __importDefault(require("../models/users"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userName, hash, newUser, savedUser, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password, userName = _a.userName;
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 1:
                hash = _b.sent();
                newUser = new users_1.default({ email: email, password: hash, userName: userName });
                return [4 /*yield*/, newUser.save()];
            case 2:
                savedUser = _b.sent();
                if (!savedUser)
                    return [2 /*return*/, res.status(400).json({ message: "User already exist" })];
                token = jsonwebtoken_1.default.sign({ id: savedUser._id }, process.env.JWT_);
                res.status(201).json({ message: "user created", data: savedUser, token: token });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.status(500).json({ message: error_1.message, erreeee: "errorsss" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loginUser, bycryptPassword, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, users_1.default.findOne({ email: req.body.email })];
            case 1:
                loginUser = _a.sent();
                if (!loginUser)
                    return [2 /*return*/, res.status(400).json({ message: "User does not exist" })];
                return [4 /*yield*/, bcrypt_1.default.compare(req.body.password, loginUser.password)];
            case 2:
                bycryptPassword = _a.sent();
                if (!bycryptPassword)
                    return [2 /*return*/, res.status(400).json({ message: "Invalid password or email" })];
                token = jsonwebtoken_1.default.sign({ id: loginUser._id }, process.env.JWT_);
                res.status(200).json({ message: "You are In", data: loginUser, token: token });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).json({ message: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
// export const verfiyToken = async (req: Request, res: Response) => {
//   const token = req.body.token;
//   const userId = req.body.userId;
//   try {
//     if (!token || !userId)
//       return res.status(400).json({ message: "Token or User Id is missing" });
//     const decoded = jwt.verify(token, process.env.JWT_ || "");
//     if ((decoded as { id: string }).id != userId)
//       return res.status(400).json({ message: "Invalid Token or User Id" });
//     const user = await User.findById(userId);
//     if (!user) return res.status(400).json({ message: "User does not exist" });
//     res.status(200).json({ data: user });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };
var checkToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var decoded, user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!token)
                    return [2 /*return*/];
                decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ || "");
                if (!decoded.id)
                    return [2 /*return*/];
                return [4 /*yield*/, users_1.default.findById(decoded.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/];
                return [2 /*return*/, user];
            case 2:
                err_1 = _a.sent();
                if (err_1.name === "TokenExpiredError") {
                    console.log("Token expired");
                }
                else {
                    console.error(err_1);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var verfiyToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, token, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authorizationHeader = req.headers.authorization;
                if (!authorizationHeader) {
                    return [2 /*return*/, res.status(401).send({ message: "Unauthorized" })];
                }
                token = authorizationHeader.split(" ")[1];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, checkToken(token)];
            case 2:
                user = _a.sent();
                // If the user is not found, return a 401 status
                if (!user) {
                    return [2 /*return*/, res.status(401).send({ message: "Unauthorized" })];
                }
                // If the user is found, return the user data
                // const { username, admin } = user;
                // const { rows: rows3 } = await db.query(`SELECT * FROM favorite WHERE owner = $1`, [
                //   username,
                // ]);
                res.status(200).json({ user: user });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                // If the token is invalid, return a 401 status
                return [2 /*return*/, res.status(401).send({ message: "Unauthorized" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.verfiyToken = verfiyToken;
