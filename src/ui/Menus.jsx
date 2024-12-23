import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  /* position: fixed; */

  /* background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px; */
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-200);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const MenusContext = createContext();
function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  useEffect(() => {
    // console.log("opened id:", openId);
  }, [openId]);
  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}
const StyledDialog = styled.dialog`
  position: absolute;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 999;
`;
function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    //BUG:  IT CLOSES AND OPENS AGAIN BECAUSE when useoutsideclick() it goes '' then this handleClick sets it back again
    //first we make it listen on bubbling phase, by default.
    //
    //added stopPropagation so that it wont propagate further
    e.stopPropagation(); //without it will travel outside DOM, triggering the func in <List> and closes the list again.
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: rect.left - 150,
      y: rect.top + window.scrollY + rect.height + 3,
    });

    openId === "" || openId !== id ? open(id) : close();
    // console.log(`id:${id}`);
    console.log("open");
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  //by default in bubbling phase, Event goes from DOM to target element
  const ref = useOutsideClick(close, false); //setting up false so event is captured in bubbling phase
  // const ref = useOutsideClick(() => {
  //   console.log("outside");
  //   return close();
  // }, false); //setting up false so event is captured in bubbling phase
  if (openId !== id || !openId) return null;

  return (
    <StyledDialog ref={ref} position={position} open>
      {children}
    </StyledDialog>
  );
}
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <div>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </div>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
