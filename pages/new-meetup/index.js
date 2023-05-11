import Layout from "@/components/layout/Layout";
import NewMeetupForm from "@/components/meetup/NewMeetupForm";

const NewMeetupPage = () => {
  const addMeetupHandler = async (addEvents) => {
    const data = await fetch('/api/new-meetup',{
      method : 'POST',
      body : JSON.stringify(addEvents),
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    const resu = await data.json();
    console.log(resu);
  };
  return (
    <Layout>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Layout>
  );
};

export default NewMeetupPage;
