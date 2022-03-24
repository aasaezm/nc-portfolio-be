const {
  getVideos,
  getVideoById,
  postVideo,
  updateVotesByVideoId,
  deleteVideoById,
} = require("./controllers/video-controllers");
const {
  handlePsqlErrors,
  handleCustomErrors,
} = require("./controllers/errorControllers");

const express = require("express");
const {
  getUserForSignin,
  patchUser,
  getUser,
} = require("./controllers/users-controllers");
const { handleNonPSQLErrors } = require("./controllers/errorControllers");

const {
  getCommentsByVideoId,
  postCommentByVideoId,
} = require("./controllers/comments-controllers");

const app = express();

app.use(express.json());

//Videos
app.get("/api/videos", getVideos);
app.get("/api/videos/:video_id", getVideoById);
app.delete("/api/videos/:video_id", deleteVideoById);
app.post("/api/videos", postVideo);
app.patch("/api/videos/:video_id", updateVotesByVideoId);

app.post("/api/signin", getUserForSignin);

//Username

app.patch("/api/users/:username", patchUser);
app.get("/api/users/:username", getUser);

//Comments
app.get("/api/comments/:video_id", getCommentsByVideoId);
app.post("/api/comments/:video_id", postCommentByVideoId);

//Errors
app.use(handleNonPSQLErrors);
app.use(handlePsqlErrors);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

module.exports = app;
