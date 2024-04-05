const signupusercheck= (req, res, next)=>{
  const {username, useremail, userpass, userconfirmpass}= req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (username.trim().toLowerCase()!== username) {
    return res.status(401).json({message: 'username must be in lowercase'});
  } else if (!emailRegex.test(useremail)) {
    return res.status(401).json({message: 'email enter in correct format'});
  } else if (!passwordRegex.test(userpass)) {
    return res.status(401).json({
      // eslint-disable-next-line max-len
      message: 'password must have capital & small letters and spcial charectors also',
    });
  } else if (userpass !== userconfirmpass) {
    return res.status(401).json({
      // eslint-disable-next-line max-len
      message: 'please enter same password',
    });
  } else {
    next();
  }
};

module.exports=signupusercheck;

