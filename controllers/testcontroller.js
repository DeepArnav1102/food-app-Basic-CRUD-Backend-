const testcontroller=(req,res)=>{
    try {
    res.status(200).send('This is a test controller');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

module.exports={testcontroller};