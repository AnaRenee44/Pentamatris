const passport = require('passport');
const LocalStrategy = require("passport-local");
const bcrypt = require('bcrypt');
const { Users } = require('../models');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = passport => {
  passport.use('local',new LocalStrategy({
    usernameField: 'email',
    session: false
  },
  async function(email, password, done) {
  
    let user = await Users.findOne({ where: { email: email }})
    if (user !== null){
      user = user.dataValues
    } 
  
    if(user === null){
      return done('Cannot find user')
    }
    try {
      //need to change console logs after JWT sent
      if(await bcrypt.compare(password, user.password)){
        console.log(null,'success')
      } else {
        console.log(null,'Not Allowed');
      }
    } catch (err) {
      console.error(err);
    }
    
    
      
    }
  ));

  // const opts = {
  //   jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  //   secretOrKey: null,
  // };
  
  // passport.use(
  //   'jwt',
  //   new Jwttrategy(opts, (jwt_payload, done) => {
  //     try {
  //       Users.findOne({
  //         where: {
  //           id: jwt_payload.id,
  //         },
  //       }).then(user => {
  //         if (user) {
  //           console.log('user found in db in passport');
  //           // note the return removed with passport JWT - add this return for passport local
  //           done(null, user);
  //         } else {
  //           console.log('user not found in db');
  //           done(null, false);
  //         }
  //       });
  //     } catch (err) {
  //       done(err);
  //     }
  //   }),
  // );
  
}
