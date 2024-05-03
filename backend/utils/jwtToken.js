//Create and send token and save in the cookie.

export const sendToken = (user, statusCode, res) => {
  //Create jwt token
  const token = user.getJwtToken();




// Convert the string into a number
const cookieExpiresTimeInDays = parseInt(process.env.COOKIE_EXPIRES_TIME);

  
  const options = {
    expires: new Date(
      Date.now() + cookieExpiresTimeInDays * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true, 
    sameSite: "none", 
  };

  res.cookie("token", token,options).status(statusCode).json({
    success: true,
  });
};
