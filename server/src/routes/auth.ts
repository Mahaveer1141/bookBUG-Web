import express from "express";
const router = express.Router();
import passport from "passport";
import { backAuthenticated } from "../middleware";

router.get("/github", passport.authenticate("github", { session: false }));

router.get(
  "/oauth/github",
  backAuthenticated,
  passport.authenticate("github", { session: false }),
  (req: any, res) => {
    req.session.userID = req.user.user.id;
    req.session.accessToken = req.user.accessToken;
    req.session.refreshToken = req.user.refreshToken;

    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/me");
  }
);

export default router;
