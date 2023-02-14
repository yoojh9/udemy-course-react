import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation"

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <MainNavigation/>
      <main id="error-content">
        <h1>An error occured! {error.message}</h1>
      </main>
    </>
  )
}

export default ErrorPage;