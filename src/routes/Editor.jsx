import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { motion } from 'framer-motion'
import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { purple } from '@mui/material/colors'
import 'grapesjs/dist/css/grapes.min.css'
import {FaCubes} from 'react-icons/fa'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import * as grapesjs from 'grapesjs'
import {  SketchPicker } from 'react-color';

import '../dash.css'
function Editor() {
    const [value, setValue] = React.useState('1');
    const [Editor,setEditor] = React.useState(null)
    const [blocksc,setBlocksc] = useState(true)
    const [StyleSc,setStyleSc] = useState(false)
    const [layersc,setlayersc] = useState(false)
    const [traits,setTraitsc] = useState(false)
    const [color, setColor] = useState({
      r: "241",
      g: "112",
      b: "19",
      a: "1"
    });
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const initGrapesjs = () => {
      const editor = grapesjs.init({
        // Indicate where to init the editor. You can also pass an HTMLElement
        layerManager: {
          appendTo: '.layers-container'
        },
        container: '.edit',
        // Get the content for the canvas directly from the element
        // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
        fromElement: true,
        // Size of the editor
        height: '300px',
        width: 'auto',
        // Disable the storage manager for the moment
        storageManager: false,
        // Avoid any default panel
        panels: { defaults: [] },
        blockManager:{
            appendTo:'#blocks',
            blocks: [
              {
                id: 'section', // id is mandatory
                label: '<b>Section</b>', // You can use HTML/SVG inside labels
                attributes: { class:'gjs-block-section' },
                content: `<section>
                  <h1>This is a simple title</h1>
                  <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
                </section>`,
              }, {
                id: 'text',
                label: 'Text',
                content: '<div data-gjs-type="text">Insert your text here</div>',
              }, {
                id: 'image',
                label: 'Image',
                // Select the component once it's dropped
                select: true,
                // You can pass components as a JSON instead of a simple HTML string,
                // in this case we also use a defined component type `image`
                content: { type: 'image' },
                // This triggers `active` event on dropped components and the `image`
                // reacts by opening the AssetManager
                activate: true,
              }
            ]
        },
        styleManager: {
          appendTo: '.styles-container',
          sectors: [{
              name: 'Dimension',
              open: false,
              // Use built-in properties
              buildProps: ['width', 'min-height', 'padding'],
              // Use `properties` to define/override single property
              properties: [
                {
                  // Type of the input,
                  // options: integer | radio | select | color | slider | file | composite | stack
                  type: 'integer',
                  name: 'The width', // Label for the property
                  property: 'width', // CSS property (if buildProps contains it will be extended)
                  units: ['px', '%'], // Units, available only for 'integer' types
                  defaults: 'auto', // Default value
                  min: 0, // Min value, available only for 'integer' types
                }
              ]
            },{
              name: 'Extra',
              open: false,
              buildProps: ['background-color', 'box-shadow', 'custom-prop'],
              properties: [
                {
                  id: 'custom-prop',
                  name: 'Custom Label',
                  property: 'font-size',
                  type: 'select',
                  defaults: '32px',
                  // List of options, available only for 'select' and 'radio'  types
                  options: [
                    { value: '12px', name: 'Tiny' },
                    { value: '18px', name: 'Medium' },
                    { value: '32px', name: 'Big' },
                  ],
               }
              ]
            }]
        },
      });
      setEditor(editor)
    }
	useEffect(() => {
		const token = localStorage.getItem('token')
		if(token){
			console.log(token)
		}else{
			navigate('/login')
         
		}
    initGrapesjs()
	}, [])
  const openTab = (tabname) => {

  }
	return (
		<motion.div 
		className='bg-blue-200 h-screen maindiv overflow-y-hidden overflow-x-hidden'
		initial={{
			width:0
		}}
		animate={{
			width:'100%',
			height:'92.5vh',
            marginTop:'7.5vh'
		}}
		exit={{
			x:window.innerWidth			
		}}
		transition={{
			duration:1
		}}
		>
            <div className='flex-row flex h-full'>

                <div className='h-full max-2xl: bg-orange-300 resize-x overflow-auto' style={{width:'25vw'}}
                >
         <div className="tab">
  <button className="tablinks flex-row"  onClick={() => {setBlocksc(true);setStyleSc(false);setTraitsc(false);setlayersc(false)}}><FaCubes /> Blocks</button>
  <button className="tablinks" onClick={() => {setStyleSc(true);setBlocksc(false);setTraitsc(false);setlayersc(false)}}>Styles</button>
  <button className="tablinks"  onClick={() => {setlayersc(true);setTraitsc(false);setStyleSc(false);setBlocksc(false)}}>Layers</button>
  <button className="tablinks"  onClick={() => {setTraitsc(true);setlayersc(false);setStyleSc(false);setBlocksc(false)}}>Traits
  </button>
</div>
<div id="blocks" style={blocksc ? {display:'block'} : {display:'none'}}>
</div>

<div id="Paris" style={StyleSc ? {display:'block'} : {display:'none'}}>
<div className='styles flex justify-center text-center'>
  <div className='bg-opacity-50 rounded-lg bg-cyan-900 mt-5'>
    Background Color:
    <div style={{backgroundColor:`rgba(${color.r},${color.g},${color.b},${color.a})`}}>Hello World!</div>
    <SketchPicker color={color} onChange={(value) => {console.log(value.hex);setColor({...value.rgb});Editor.getSelected().setStyle({ 'background-color': `rgba(${color.r},${color.g},${color.b},${color.a})` })}}/>
  </div>
</div>
</div>
<div id="Paris" style={layersc ? {display:'block'} : {display:'none'}} onClick={() => setStyleSc(!StyleSc)}>
<div class="layers-container"></div>
</div>
<div id="Paris" style={traits ? {display:'block'} : {display:'none'}} onClick={() => setStyleSc(!StyleSc)}>
  <h3>Pawis</h3>
  <p>Paris is the capital of France.</p>
</div>



                </div>
                <div className='edit h-screen flex-grow bg-indigo-800'></div>
       
                </div>
		</motion.div>
	)
}

export default Editor