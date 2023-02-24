import { MongoClient } from "mongodb";

//  /api/new-meetup
// POST /api/new-meetup

const handler = async (req, res) => {
    if (req.method === "POST") {
        const data = req.body;
        const client = await MongoClient.connect(
            process.env.REACT_APP_MONGODB_URL
        );
        const db = client.db();
        const meetupsCollection = db.collection("meetups");
        const result = await meetupsCollection.insertOne(data);

        client.close();

        res.status(201).json({ message: "Meetup inserted!" });
    }
};

export default handler;
