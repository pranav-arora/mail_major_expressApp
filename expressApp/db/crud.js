var userSchema=require("./schema");
const UserOperations={
    register:function(userObject){
        var userSchObject=new userSchema({userid:userObject.userid,pwd:userObject.pwd});
        userSchObject.save(function(err,result){
            if(err){
                console.log(err)
            }
            else{
                console.log("registered successfully");
            }
        })

    }
}
module.exports=UserOperations;