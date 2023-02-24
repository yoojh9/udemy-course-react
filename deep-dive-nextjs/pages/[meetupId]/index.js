import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = (props) => {
    return (
        <MeetupDetail
            image={props.image}
            title={props.title}
            address={props.address}
            description={props.description}
        />
    );
};

export const getStaticPaths = async () => {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();

    return {
        fallback: false,
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
        // [
        //   {
        //     params: {
        //       meetupId: 'm1'
        //     }
        //   },
        //   {
        //     params: {
        //       meetupId: 'm2'
        //     }
        //   }
        // ]
    };
};

// Meetup 데이터는 자주 바뀌지 않으므로 getStaticProps를 사용한다
export const getStaticProps = async (context) => {
    // fetch data for a singlie meetup
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const selectedMeetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId),
    });

    client.close();

    return {
        props: {
            id: selectedMeetup._id.toString(),
            title: selectedMeetup.title,
            address: selectedMeetup.address,
            image: selectedMeetup.image,
            description: selectedMeetup.description,
        },
    };
};

export default MeetupDetails;
