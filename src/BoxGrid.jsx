import Box from "./Box";
import {useState} from "react";
function BoxGrid(){
        const [boxes, setBoxes] = useState([
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ]);
        const reset = () => {
            setBoxes([false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,]);
        };
       const toggleBox = (idk) => {
         setBoxes((oldBoxes) => {
            return oldBoxes.map((value, i) =>{
                if(i === idk){
                    return !value;
                } else {
                    return value;
                }
            });
         });
       };

    return (
        <div className="BoxGrid">
          {boxes.map((b , idk) => (
          <Box key={idk} isActive={b} toggle={() => toggleBox(idk)}/>
        ))}
        <button onClick={reset}>Reset</button>
     </div>
    );
}

export default BoxGrid;