
 import {MongoClient} from 'mongodb'

async function handler(req,res) {
   if(req.method === 'POST'){
    const data = req.body;
    const client =await MongoClient.connect('mongodb+srv://Bhawak_1996:Bhawak_1996@first-node.juhmu.mongodb.net/allMeetups?retryWrites=true&w=majority')
    const db= client.db();
    const meetupCollections =db.collection('meetups');   
    const result = await meetupCollections.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({message : 'success!!'});
  }
}
export default handler;