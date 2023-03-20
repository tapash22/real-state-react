import React from 'react';
import { FaRegHandshake } from "react-icons/fa";

function AboutPart(props) {
    return (
        <div>
            <div className="p-2 w-full h-32 shadow-1 flex justify-start my-1">
              <div className="flex justify-center w-44">
              <FaRegHandshake className="text-7xl font-bold text-violet-500" />
              </div>
              <div>
                <h6 className="text-start text-xl font-bold p-1">{props.about.title}</h6>
                <p className="text-sm p-1 text-justify">
                  {props.about.des}
                </p>
              </div>
            </div>
        </div>
    );
}

export default AboutPart;