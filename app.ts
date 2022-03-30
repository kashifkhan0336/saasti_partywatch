let mpv = require("node-mpv");
import { existsSync, readFileSync } from "fs";
import { connect, Socket } from "socket.io-client";

let player: any = new mpv(
  {
    binary: "./bin/mpv.exe",
  } as object,
  ["--video-aspect-override=16:9"] as Array<string>
);
const socketObject: Socket = connect(
  "https://fathomless-ridge-92278.herokuapp.com/"
);
const isHost: boolean = existsSync("host.txt");
let filePath: string;
if (existsSync("path.txt")) {
  filePath = String.raw`${readFileSync("path.txt", "utf-8")}`;
  console.log(filePath);
} else {
  throw new TypeError("path.txt not found!");
}
if (isHost) {
  console.log("You are Hosting");
} else {
  console.log("You are not Hosting!");
}
function paused(time: number): void {
  console.log(socketObject.connected);
  console.log(`Video Paused at ${time}`);
  if (isHost) {
    socketObject.emit("video_pause", time);
  }
}
function played(time: number): void {
  console.log(socketObject.connected);
  console.log(`Video Played at ${time}`);
  if (isHost) {
    socketObject.emit("video_play", time);
  }
}
if (isHost !== true) {
  socketObject.on("video_pause_from_server", (seek_time) => {
    console.log(seek_time);
    player.goToPosition(seek_time);
    player.pause();
  });
  socketObject.on("video_play_from_server", (seek_time) => {
    console.log(seek_time);

    player.goToPosition(seek_time);
    player.play();
  });
  socketObject.on("video_seeked_from_server", (seek_time) => {
    player.goToPosition(seek_time);
    player.play();
  });
} else {
}
(async (): Promise<void> => {
  await player.start();
  //await player.load("E:\\Wonder.Woman.2017.1080p.BluRay.x265-RARBG\\movie.mp4");
  await player.load(filePath);
  player.on("started", async (): Promise<void> => {
    console.log("Movie Started!");
    await player.on(
      "status",
      async (t: object): Promise<void> =>
        ((t["property"] as string) === "pause" ? (t["value"] as string) : false)
          ? paused(await player.getTimePosition())
          : played(await player.getTimePosition())
    );
  });
  await player.on("seek", (timepositions: { start: number; end: number }) => {
    socketObject.emit("video_seeked", timepositions.end);
  });
  await player.observeProperty("display-fps");
})();
