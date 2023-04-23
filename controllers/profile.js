const handleProfileGet =(req,res,db)=>{
    const { id } =req.params;
    db.select('*').from('users').where({
        id:id
    })
    .then(user =>{
        if(!user.length){
            throw err;
        }
        res.json(user[0])
    })
    .catch(err=> res.status(400).json('error getting user'))
}
module.exports={
    handleProfileGet:handleProfileGet
}