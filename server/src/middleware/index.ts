export const ensureAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) return next();
  else res.redirect("/");
};

export const backAuthenticated = (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) return next();
  else res.redirect("/user/chats");
};
