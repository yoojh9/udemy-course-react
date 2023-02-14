import { redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom';

import NewPostForm from '../components/NewPostForm';
import { savePost } from '../util/api';

function NewPostPage() {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation(); 

  function cancelHandler() {
    navigate('/blog');
  }

  return (
    <>
    {data && data.status && <p>{data.message}</p>}
      <NewPostForm
        onCancel={cancelHandler}
        submitting={navigation.state === 'submitting'}
      />
    </>
  );
}

export default NewPostPage;


export async function action({request}) {
  const formData = await request.formData();
  const post = {
    title: formData.get('title'),
    body: formData.get('post-text')
  }
  try {
    await savePost(post);
  } catch(error) {
    if(error.status === 422) {
      return error;
    }
    throw error;
  }
  return redirect('/blog')
}