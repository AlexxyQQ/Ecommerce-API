const User = require("../../models/userModel");

async function userData(req, res) {
  try {
    const localUser = res.locals.user;
    console.log(req.body.userId);

    if (localUser.username === "admin") {
      if (!req.body.userId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const dbUser = await User.findById(req.body.userId);

      return res.status(200).json({
        success: true,
        message: "All Users",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = userData;
