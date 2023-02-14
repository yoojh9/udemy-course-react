import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';

import BlogLayout from './pages/BlogLayout';
import BlogPostsPage, { loader as blogPostsLoader} from './pages/BlogPosts';
import NewPostPage, {action as newPostAction} from './pages/NewPost';
import PostDetailPage, {loader as blogPostLoader} from './pages/PostDetail';
import RootLayout from './components/RootLayout';
import WelcomePage from './pages/Welcome';
import ErrorPage from './pages/Error';
import DeferredBlogPostsPage, {loader as defferedBlogPostsLoader} from './pages/DefferedBlogPosts';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout/>} errorElement={<ErrorPage/>}>
    <Route index element={<WelcomePage />} /> {/* index : 부모 라우트의 경로가 활성화되면 렌더링 되는 default 라우트*/}
    <Route path="/blog" element={<BlogLayout />}>
      <Route index element={<DeferredBlogPostsPage />} loader={defferedBlogPostsLoader} />
      <Route path=":id" element={<PostDetailPage />} loader={blogPostLoader} errorElement={<p>An error occured!</p>}/>
    </Route>
    <Route path="/blog/new" element={<NewPostPage />} action={newPostAction}/>
  </Route>

))

function App() {
  return (
    <RouterProvider router={router}/>
    
  );
}

export default App;
