import  jwt  from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "unathorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.SECRET);

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({ success: false, message: "Unauthorized login again" });
    }

    next();
  } catch (error) {
    console.log(`error in auth middleware ${error.message}`);
    return res.json({ success: false });
  }
};



export default userAuth;