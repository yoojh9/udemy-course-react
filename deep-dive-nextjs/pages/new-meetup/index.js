import NewMeetupForm from "../../components/meetups/NewMeetupForm";

// our-domain.com/new-meetup
const NewMeetupPage = () => {
  const addMeetupHandler = (enteredMeetupData) => {
    console.log(enteredMeetupData);
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler}/>
}

export default NewMeetupPage;