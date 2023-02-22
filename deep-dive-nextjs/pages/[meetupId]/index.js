import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {

  return(
    <MeetupDetail 
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153"
      title="A First Meetup"
      address="Some Street 5, Some city"
      description="This is a first meetup"/>
  )
}

export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      { 
        params: {
          meetupId: 'm1'
        }
      },
      { 
        params: {
          meetupId: 'm2'
        }
      }
    ]
  }
}

// Meetup 데이터는 자주 바뀌지 않으므로 getStaticProps를 사용한다
export const getStaticProps = async (context) => {
  // fetch data for a singlie meetup
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: meetupId,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153",
        title: "A First Meetup",
        address: "Some Street 5, Some city",
        description: "This is a first meetup"
      }
    }
  }
}

export default MeetupDetails;