

const User  = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SendRegisterOTP, SendForgetPasswordOTP} = require ('../settings/OtpSender');
const { authoToken, authorizationTokenVerify } = require('../settings/autho');    




        

// Register API

exports.RegisterUser = async (req, res ) =>{
    try {

        const {name, email, password, mobile} = req.body;

        const userExit = await User.findOne({email});
        if (userExit) {
            return res.status(400).json({
                status: "Resister Failed",
                message: "Email is already registered !" 
            });
            
        }
        const six_Detail_otp = Math.floor(100000 + Math.random() * 900000).toString();
        const opt_Expiry = new Date(Date.now() + 10 * 60 * 1000);
        await SendRegisterOTP (name, email,  six_Detail_otp );
        const sigenUsers = new User ({
            name, email, password, mobile, otp: six_Detail_otp, otpExpiry: opt_Expiry   
        });

        await sigenUsers.save();

        res.status(200).json({
            status: "Success",
            message: "OTP sent to your email! Please check and verify.",
            Data: {
                id: sigenUsers._id,
                name: sigenUsers.name,
                email: sigenUsers.email,
                otp: sigenUsers.six_Detail_otp
            }

        });
        
    } catch (error) {
        
        res.status(500).json({
            status: "Failed",
            error: error.message 
        });
        
    }
};

                    //RegisterOtpVerify


 exports.RegisterOtpVerify = async (req, res) => {
    try {
        const {email, otp} = req.body;
        const VerifyRegOtp = await User.findOne({email});
        if (!VerifyRegOtp) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            });
        }

        if (VerifyRegOtp.otp === otp) {
            VerifyRegOtp.isVerified = true;
            VerifyRegOtp.otp = null;
            await VerifyRegOtp.save();
            res.status(200).json({
                status: "Success",
                message: "Otp Verified successfulley! Now you can login."
            });
            
            
        } else {

            res.status(400).json({
                status: "Failed",
                message: "Invalid  OTP! Please check you're email."
            });
            
        }



    } catch (error) {
        
        res.status(500).json({
            error: error.message 
        });
        
    }
    
 }






                // Login API

exports.LoginUesr = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const userLogin = await User.findOne({email});

        if (!userLogin) {
            return res.status(401).json({
                status: "Falied",
                message: "User Not Found ! "
            });  
        }

        const isMatch  = await bcrypt.compare(password, userLogin.password);

        if (!isMatch) {
            return res.status(401).json({
                status: "Falied",
                message: "Invalied Password"
            });
            
        }

        const authorization =  authoToken(userLogin._id);   

        res.status(200).json({
            status: "Success",
            message: "Login Successfulley",
            data:{
                id: userLogin._id,
                email: userLogin.email,
                token: authorization     
            }
        });

    } catch (error) {

        res.status(404).json({
            status: "Falied",
            error: error.message 
        });
        
    }

};                


                //SigleUser API

exports.SigleUser = [authorizationTokenVerify, async (req,res) => {
    try {

        const user_id = req.params.id;
        const userProfile = await User.findById(user_id).select('-password -otpExpiry -isVerified -otp');
        

        if (!userProfile) {
            return res.status(404).json({
                message: "User Not Found"
            });
            
        }

        res.status(200).json({
            status: "Success",
            message: "Get user profile successfully!",
            data:userProfile

        });
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message 
        });
        
    }
    
}];


                // Get All User

exports.GetAllUsers = async (req, res) => {
    try {
        const allUsersGet = await User.find().select('-otpExpiry -isVerified -otp -password')
        res.status(200).json({
            status: "Success",
            message: "Get All Uesrs Details Successfully",
            data: allUsersGet
        });


    } catch (error) {

        res.status(500).json({
            status: "Failed",
            error: error.message
        });
        
    }
    
};




            //User Update Method

exports.UserUpdate = [authorizationTokenVerify, async (req, res) => {
    try {
        const User_Id = req.params.id
        const{name, email, mobile}=req.body
        const updatedUser = await User.findById(User_Id).select('-otpExpiry -isVerified -otp -password');
        
        if (!updatedUser) {
            return res.status(404).json({
                status: "Failed",
                message: "User Not Found"
            });  
        }

        if (name) {
            updatedUser.name = name;    
        }

        if (email) {
            updatedUser.email = email;   
        }

        if (mobile) {
            updatedUser.mobile = mobile  
        }

        const UserDetailsUpdate = await updatedUser.save();

        res.status(200).json({
            status: "Success",
            message: "Update Successfulley",
            data: UserDetailsUpdate
        });

    } catch (error) {

        res.status(500).json({error: error.message }); 
    }

}];           





exports.UserDelete = [authorizationTokenVerify, async (req, res) => {
    try {
        const UserId = req.params.id
        const UserDelete = await User.findByIdAndDelete(UserId);
        
        if (!UserDelete) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            });   
        }

        res.status(200).json({
            status: "Success",
            message:  "User Profile delete successfulley!"
        });
        
    } catch (error) {

        res.status(500).json({
            error: error.message 
        });
        
    }
    
}];





exports.AllUserDataDelete = async (req, res) => {

    try {
        const deleteUsers = await User.deleteMany({});
        res.status(200).json({
            status: "Success",
            message: "All users data (deleted Successfulley)!", 
            data: deleteUsers
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message 
        });
        
    }
    
};


            // Logout API
exports.LogOut  = async (req, res) => {
    try {

        res.status(200).json({
            status: "Success",
            message: "User session ended successfully"
        });
        
    } catch (error) {

        res.status(500).json({ error: error.message});
        
    }
    
}            




                    // Forget Password Otp


exports.resetpassworsOtp =  async(req, res)=>{
    try {
        const {email} = req.body;
        if (!email ) {
            return res.status(404).json({
                status: "Failed",
                message: "Email is required"
            });

        } 

        const user = await User.findOne({email: email}); 
        
        if (!user) {
            return res.status(400).json({
                status: "Failed",
                message: "User Not Found"
            });
            
        }




        const oneTimePassword =  Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await SendForgetPasswordOTP (user.name, email, oneTimePassword);

        user.otp = oneTimePassword;
        user.isVerified = false;
        user.otpExpiry = otpExpiresAt; 

        await user.save();

        return res.status(200).json({
            status: 'Success',
            message: "OTP send  gmail id ",
            email: email 
        });


        
    } catch (error) {

        res.status(500).json({
            status: "Failed",
            error: error.message
        });
        
    }
};                    

            // Otp Verifaid API

exports.VeriyOtp = async (req, res) => {
    try {
        const{email, newPassword, confirmPassword, otp}=req.body
        const user = await User.findOne({email});
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                status: "Failed",
                 message: "OTP has expired. Please request a new one."
            });  
        }

        if (!user) {
            return res.status(404).json({
                status: 'Failed',
                message: "User not found!" 
            });   
        }


        if (user.otp === otp) {

            if (new Date()> user.otpExpiry) {
                return res.status(400).json({
                    message: "OTP has expired. Please request a new one."
                });
                
            }

            user.password = newPassword;
            user.isVerified = true;
            user.otp = null;
            user.otpExpiry = null;

            await user.save();
            res.status(200).json({
                status: "Success",
                message: "Password has been reset successfully!"
            });

        } else {

            res.status(404).json({
                status: "Failed",
                message: "Invalid OTP. Please check your email.",
                error: error.message  
            });
            
        }

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
        
    }
    
}