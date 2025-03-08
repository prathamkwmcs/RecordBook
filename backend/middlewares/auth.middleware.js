import jwt from "jsonwebtoken";

export const ensureAuth = (req, res, next) => {
  // console.log("Headers received:", req.headers); // 🛠️ Debugging log
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message:
        "Unauthorized, Bearer token is required in the Authorization header",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("Decoded User ID:", decoded.id);
    req.user = { _id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, JWT token is invalid",
      error: error.message,
    });
  }
};
