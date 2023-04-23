
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

// This will be used by every Clarifai endpoint call
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + "9bd16e1cc028409f8da081f35506fd2c");

const handleApiCall = (req, res) => {
    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": "clarifai",
                "app_id": "main"
            },
            model_id: "face-detection",
            // version_id: {MODEL_VERSION},  // This is optional. Defaults to the latest model version
            inputs: [
                { data: { image: { url: req.body.input } } }
            ]
        },
        metadata,
        (err, response) => {
            if (err) {
                throw new Error(err);
            }
    
            if (response.status.code !== 10000) {
                throw new Error("Post model outputs failed, status: " + response.status.description);
            }
            res.json(response.outputs[0].data.regions[0].region_info.bounding_box)
        }
    );
}

        
const handleImage= (req,res,db)=>{
    const {id} =req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}
module.exports={
    handleImage:handleImage,
    handleApiCall:handleApiCall
}