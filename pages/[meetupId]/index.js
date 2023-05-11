import Layout from "@/components/layout/Layout";
import MeetupDetail from "@/components/meetup/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const DetailPage = (props) => {
  console.log(props);
  //if(props) return <h1>Loading..</h1>
  return (
    <Layout>
      <MeetupDetail
        title={props.meetupDetail.title}
        image={props.meetupDetail.image}
        address={props.meetupDetail.address}
        description={props.meetupDetail.description}
      />
    </Layout>
  );
};
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Bhawak_1996:Bhawak_1996@first-node.juhmu.mongodb.net/allMeetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");
  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: await meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://Bhawak_1996:Bhawak_1996@first-node.juhmu.mongodb.net/allMeetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");
  const selectedMeetup = await meetupCollections.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();
  //console.log(context.params.meetupId,meetup);
  return {
    props: {
      meetupDetail: {
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
export default DetailPage;
