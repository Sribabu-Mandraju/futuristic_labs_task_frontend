import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import axios from 'axios';
import DraggableComponent from './DraggableComponent';
import TextComponent from './TextComponent';
import ImageComponent from './ImageComponent';
import ButtonComponent from './ButtonComponent';
import { HeaderComponent, FooterComponent } from './HeaderComponent';
import CarouselComponent from './CarouselComponent';
import CardComponent from './CardComponent';
import VideoComponent from './VideoComponent';
import FormComponent from './FormComponent';
import GridComponent from './GridComponent';
import SocialMediaComponent from './SocialMediaComponent';
import SEOSettings from './SEOSettings';  // Importing the SEO component
import './styles.css';
import CustomFileInput from './InputFile'; // Importing the custom file input component
import { MdOutlineSaveAlt } from "react-icons/md";
import { TiExport } from "react-icons/ti";



const CanvasContainer = styled.div`
  flex: 1;
  background:white ; 
  height: 100vh; /* Adjust height dynamically based on content */
  overflow-y:scroll;  
  overflow-x:hidden;
`;

const Canvas = ({ components, setComponents }) => {
  const [seoData, setSeoData] = useState({
    title: '',
    description: '',
    keywords: '',
  });

  const [, drop] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: (item) => {
      setComponents((prevComponents) => [
        ...prevComponents,
        { type: item.type, id: Date.now() },
      ]);
    },
  }));

  const moveComponent = (dragIndex, hoverIndex) => {
    const draggedComponent = components[dragIndex];
    setComponents(
      update(components, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedComponent],
        ],
      })
    );
  };

  useEffect(() => {
    // Fetch components from the server using the ID stored in local storage
    const designId = localStorage.getItem('designId');
    if (designId) {
      axios.get(`http://localhost:5001/design/${designId}`)
        .then((response) => {
          const fetchedComponents = response.data.design.components || [];
          setComponents(fetchedComponents);
        })
        .catch((error) => {
          console.error('Error fetching components:', error);
        });
    }
  }, [setComponents]);

  // Save components to the server
  const saveComponents = () => {
    axios.post('http://localhost:5001/design/new', {
      title: seoData.title,
      desc: seoData.description,
      keywords: seoData.keywords.split(','),
      components: components
    })
    .then((response) => {
      const designId = response.data.design._id; // Accessing the design ID
      localStorage.setItem('designId', designId);
      alert('Design saved!');
    })
    .catch((error) => {
      console.error('Error saving design:', error);
    });
  };

  // Export components as JSON
  const exportComponents = () => {
    const json = JSON.stringify(components);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Import components from JSON
  const importComponents = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const importedComponents = JSON.parse(e.target.result);
        setComponents(importedComponents);
        alert('Design imported successfully!');
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <CanvasContainer ref={drop}>
      <div className=" w-full flex flex-row-reverse bg items-center justify-start">

        <button onClick={saveComponents} className="bg-black text-white flex items-center">
          <MdOutlineSaveAlt className="mx-1" />
          <span>Save Design</span>
        </button>
        <button onClick={exportComponents} className="bg-black text-white flex items-center">
          <TiExport className="mx-1" />
          <span>Export Design</span>
        </button>
        <CustomFileInput onFileChange={importComponents} />
      </div>
      
      {/* SEO Settings Component */}
      <SEOSettings seoData={seoData} setSeoData={setSeoData} />
      {components.map((component, index) => {
        switch (component.type) {
          case 'text':
            return <DraggableComponent key={component.id} index={index} component={<TextComponent />} moveComponent={moveComponent} />;
          case 'image':
            return <DraggableComponent key={component.id} index={index} component={<ImageComponent />} moveComponent={moveComponent} />;
          case 'button':
            return <DraggableComponent key={component.id} index={index} component={<ButtonComponent text="Button" link="#" />} moveComponent={moveComponent} />;
          case 'header':
            return <DraggableComponent key={component.id} index={index} component={<HeaderComponent text="Header" link="#" />} moveComponent={moveComponent} />;
          case 'footer':
            return <DraggableComponent key={component.id} index={index} component={<FooterComponent text="Footer" link="#" />} moveComponent={moveComponent} />;
          case 'carousel':
            return <DraggableComponent key={component.id} index={index} component={<CarouselComponent images={["image1.jpg", "image2.jpg"]} />} moveComponent={moveComponent} />;
          case 'card':
            return <DraggableComponent key={component.id} index={index} component={<CardComponent title="Card Title" content="Card content here." image="image.jpg" />} moveComponent={moveComponent} />;
          case 'video':
            return <DraggableComponent key={component.id} index={index} component={<VideoComponent videoUrl="https://www.youtube.com/embed/videoID" />} moveComponent={moveComponent} />;
          case 'form':
            return <DraggableComponent key={component.id} index={index} component={<FormComponent />} moveComponent={moveComponent} />;
          case 'grid':
            return <DraggableComponent key={component.id} index={index} component={<GridComponent items={["Item 1", "Item 2", "Item 3"]} />} moveComponent={moveComponent} />;
          case 'social':
            return <DraggableComponent key={component.id} index={index} component={<SocialMediaComponent />} moveComponent={moveComponent} />;
          default:
            return null;
        }
      })}
    </CanvasContainer>
  {/* ); */}
    </>
  )
};

export default Canvas;
