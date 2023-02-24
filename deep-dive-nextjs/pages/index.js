import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
    return <MeetupList meetups={props.meetups} />;
};

// Server-side Rendering
// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }
export const getStaticProps = async () => {
    // fetch data from an API
    // fetch("/api/meetups");

    const client = await MongoClient.connect(process.env.MONGODB_URL);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 10,
    };
};

export default HomePage;
