"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
        while (_) try {
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
exports.__esModule = true;
var mpv = require("node-mpv");
var fs_1 = require("fs");
var socket_io_client_1 = require("socket.io-client");
var player = new mpv({
    binary: "./bin/mpv.exe"
}, ["--video-aspect-override=16:9"]);
var socketObject = (0, socket_io_client_1.connect)("https://fathomless-ridge-92278.herokuapp.com/");
var isHost = (0, fs_1.existsSync)("host.txt");
var filePath;
if ((0, fs_1.existsSync)("path.txt")) {
    filePath = String.raw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), (0, fs_1.readFileSync)("path.txt", "utf-8"));
    console.log(filePath);
}
else {
    throw new TypeError("path.txt not found!");
}
if (isHost) {
    console.log("You are Hosting");
}
else {
    console.log("You are not Hosting!");
}
function paused(time) {
    console.log(socketObject.connected);
    console.log("Video Paused at ".concat(time));
    if (isHost) {
        socketObject.emit("video_pause", time);
    }
}
function played(time) {
    console.log(socketObject.connected);
    console.log("Video Played at ".concat(time));
    if (isHost) {
        socketObject.emit("video_play", time);
    }
}
if (isHost !== true) {
    socketObject.on("video_pause_from_server", function (seek_time) {
        console.log(seek_time);
        player.goToPosition(seek_time);
        player.pause();
    });
    socketObject.on("video_play_from_server", function (seek_time) {
        console.log(seek_time);
        player.goToPosition(seek_time);
        player.play();
    });
    socketObject.on("video_seeked_from_server", function (seek_time) {
        player.goToPosition(seek_time);
        player.play();
    });
}
else {
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, player.start()];
            case 1:
                _a.sent();
                //await player.load("E:\\Wonder.Woman.2017.1080p.BluRay.x265-RARBG\\movie.mp4");
                return [4 /*yield*/, player.load(filePath)];
            case 2:
                //await player.load("E:\\Wonder.Woman.2017.1080p.BluRay.x265-RARBG\\movie.mp4");
                _a.sent();
                player.on("started", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("Movie Started!");
                                return [4 /*yield*/, player.on("status", function (t) { return __awaiter(void 0, void 0, void 0, function () {
                                        var _a, _b, _c;
                                        return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    if (!(t["property"] === "pause" ? t["value"] : false)) return [3 /*break*/, 2];
                                                    _b = paused;
                                                    return [4 /*yield*/, player.getTimePosition()];
                                                case 1:
                                                    _a = _b.apply(void 0, [_d.sent()]);
                                                    return [3 /*break*/, 4];
                                                case 2:
                                                    _c = played;
                                                    return [4 /*yield*/, player.getTimePosition()];
                                                case 3:
                                                    _a = _c.apply(void 0, [_d.sent()]);
                                                    _d.label = 4;
                                                case 4: return [2 /*return*/, _a];
                                            }
                                        });
                                    }); })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, player.on("seek", function (timepositions) {
                        socketObject.emit("video_seeked", timepositions.end);
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, player.observeProperty("display-fps")];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
var templateObject_1;
