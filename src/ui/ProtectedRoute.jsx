import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  backgroun-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. load the authenticated user
  const { user, isLoading, isAuthenticated } = useUser();
  //2. if there is no authenticated user, redirect to login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, isLoading]);
  //3. while loading show a spinner
  console.log(user);
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. if there is a user, render app
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
