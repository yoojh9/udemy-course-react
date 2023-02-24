import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>React Meetup</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active React meetups"
                ></meta>
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
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
