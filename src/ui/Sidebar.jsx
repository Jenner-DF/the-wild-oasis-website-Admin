import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Row from "./Row";
import Logo from "./Logo";
import MainNav from "./MainNav";
import useCabins from "../features/cabins/useCabins";
import { useEffect, useState } from "react";
import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function Sidebar() {
  // const [isScreen425px, setIsScreen425px] = useState(
  //   window.matchMedia("(mx-width: 425px)").matches
  // );

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(max-width: 425px)");

  //   // Update state on initial render and whenever the screen size changes
  //   const handleScreenChange = (e) => setIsScreen425px(e.matches);

  //   // Set the listener
  //   mediaQuery.addEventListener("change", handleScreenChange);

  //   // Clean up the event listener on component unmount
  //   return () => mediaQuery.removeEventListener("change", handleScreenChange);
  // }, []);
  return (
    <>
      {
        <StyledSidebar>
          <Logo></Logo>
          <MainNav></MainNav>
          <Uploader />
        </StyledSidebar>
      }
    </>
  );
}
export default Sidebar;
