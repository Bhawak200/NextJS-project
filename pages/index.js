import Layout from "@/components/layout/Layout";
import MeetupList from "@/components/meetup/MeetupList";
import { MongoClient } from "mongodb";

/*const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "Helloo world",
    image:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
    address: "House NO-2537/a",
    description: "My name is Bhawak",
  },
  {
    id: "m2",
    title: "Helloo world",
    image:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
    address: "House NO-2537/a",
    description: "My name is Bhawak",
  },
];*/

const Home = (props) => {
  return (
    <Layout>
      <MeetupList meetups={props.meetups} />
    </Layout>
  );
};

export async function getStaticProps(){

  const client =await MongoClient.connect('mongodb+srv://Bhawak_1996:Bhawak_1996@first-node.juhmu.mongodb.net/allMeetups?retryWrites=true&w=majority')
  const db= client.db();
  const meetupCollections = db.collection('meetups');   
  const meetups = await meetupCollections.find().toArray();
  client.close();


  return{
    props : {
      meetups : (await meetups).map( meetup => ({
        title :meetup.title,
        address :meetup.address,
        description : meetup.description,
        image : meetup.image,
        id : meetup._id.toString()
      }))
    },
    revalidate : 10
  }
}

export default Home;
