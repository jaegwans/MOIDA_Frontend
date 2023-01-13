import { createGlobalStyle } from "styled-components";
const Global = createGlobalStyle`
*{
      
    margin: 0;
    padding: 0;  
   box-sizing:border-box;
 }
 html,body{
    background-color: white;
    display: flex;
    justify-content: center;  
    flex-direction: center;
 }
`;

export default Global;
