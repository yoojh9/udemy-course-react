import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';

import BlogLayout from './pages/BlogLayout';
import BlogPostsPage, { loader as blogPostsLoader} from './pages/BlogPosts';
import NewPostPage from './pages/NewPost';
import PostDetailPage, {loader as blogPostLoader} from './pages/PostDetail';
import RootLayout from './components/RootLayout';
import WelcomePage from './pages/Welcome';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout/>}>
    <Route index element={<WelcomePage />} /> {/* index : 부모 라우트의 경로가 활성화되면 렌더링 되는 default 라우트*/}
    <Route path="/blog" element={<BlogLayout />}>
      <Route index element={<BlogPostsPage />} loader={blogPostsLoader} />
      <Route path=":id" element={<PostDetailPage />}  loader={blogPostLoader}/>
    </Route>
    <Route path="/blog/new" element={<NewPostPage />} />
  </Route>

))

function App() {
  return (
    <RouterProvider router={router}/>
    
  );
}

export default App;
