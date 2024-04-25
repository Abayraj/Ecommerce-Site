//Create and send token and save in the cookie.
import Cookies from 'js-cookie';

export const sendToken = (user,statusCode,res)=>{


    //Create jwt token
    const token = user.getJwtToken();
    console.log('token giving reached')

    //Options for cookie
    // const options ={

    //     expires:new 
    //     Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 1000),
    //     httpOnly: false,
    //     secure: false, // Ensures cookie is only sent over HTTPS
    //     sameSite: 'none' // Allows cross-site requests

    // }

  res.cookie("token",token,{
    httpOnly:true,

  }).status(statusCode).json({
    success:true,

  })
}