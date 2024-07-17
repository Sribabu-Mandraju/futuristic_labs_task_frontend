import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import { FaCube } from "react-icons/fa";


const SidebarContainer = styled.div`
  width: 250px;
  background: black;
  color:white;
  border-right: 1px solid #ccc;
  position:sticky ;
  height:100vh;
  overflow-y:scroll;
  top:0px;  
`;

const SidebarItem = styled.div`
  padding: 10px;
  width:80%;
  margin: 10px auto;
  cursor: pointer;
  padding-left:20px;
`;

const Item = ({ type, children }) => {
  const [, drag] = useDrag(() => ({
    type: 'COMPONENT',
    item: { type },
  }));

  return <SidebarItem className="hover:text-blue-500 my-1 hover:border-l-[4px] h-[30px] flex items-center" ref={drag}><span>{children}</span></SidebarItem>;
};

const Sidebar = () => (
  <SidebarContainer>
    <div className="flex items-center mt-2 text-2xl text-blue-500  cursor-pointer">
      <FaCube className="mx-1 " />
      <span>Components</span>
    </div>
    <Item className="hover:text-blue-500 text-blue-500" type="text">Text Block</Item>
    <Item className="hover:text-blue-500 text-blue-500" type="image">Image Holder</Item>
    <Item className="hover:text-blue-500 text-blue-500" type="button">Button</Item>
    <Item className="hover:text-blue-500 text-blue-500" type="header">Header</Item>
    <Item className="hover:text-blue-500 text-blue-500" type="footer">Footer</Item>
    <Item className="hover:text-blue-500 text-blue-500" type="carousel">Carousel</Item>
    <Item className="hover:text-blue-500 text-blue-500" type="card">Card</Item>
    <Item className="hover:text-blue-500 text-blue-500" type="video">Video Embed</Item>
    <Item className="hover:text-blue-500 text-blue-500" type="form">Form</Item>
    <Item className="hover:text-blue-500 text-blue-500" type="grid">Grid Layout</Item>
    <Item className="hover:text-blue-500 text-blue-500" type="social">Social Media Icons</Item>
  </SidebarContainer>
);

export default Sidebar;
