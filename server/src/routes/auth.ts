import express from "express";
const router = express.Router();
import passport from "passport";
import { backAuthenticated } from "../middleware";

router.get("/github", passport.authenticate("github"));

router.get(
  "/oauth/github",
  backAuthenticated,
  passport.authenticate("github"),
  (req: any, res) => {
    req.session.userID = req.user.user.id;
    req.session.accessToken = req.user.accessToken;
    req.session.refreshToken = req.user.refreshToken;

    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/me");
  }
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    prompt: "select_account",
  })
);

router.get(
  "/oauth/google",
  backAuthenticated,
  passport.authenticate("google"),
  (req: any, res) => {
    req.session.userID = req.user.user.id;
    req.session.accessToken = req.user.accessToken;
    req.session.refreshToken = req.user.refreshToken;
    console.log(req.session);

    // Successful authentication, redirect home.
    res.redirect("https://book-bug-web.vercel.app/me");
  }
);

export default router;
