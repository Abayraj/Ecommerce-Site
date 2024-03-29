//Create and send token and save in the cookie.

export const sendToken = (user,statusCode,res)=>{

    //Create jwt token
    const token = user.getJwtToken();

    //Options for cookie
    const options ={

        expires:new 
        Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 1000),
        httpOnly: true,
        // secure: true, // Ensures cookie is only sent over HTTPS
        // sameSite: 'none' // Allows cross-site requests

    }

    res.status(statusCode).cookie('token',token,options).json({
        sucess:true,
        token,
        user
    })
}