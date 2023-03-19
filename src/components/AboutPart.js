import React from 'react';
import { RiMapPinLine } from "react-icons/ri";

function AboutPart(props) {
    return (
        <div>
            <div className="p-2 w-full h-32 shadow-1 flex justify-start my-1">
              <div className="flex justify-center w-44">
                <RiMapPinLine className="text-5xl font-bold text-violet-600" />
              </div>
              <div>
                <h6 className="text-start text-xl font-bold p-1">title</h6>
                <p className="text-sm p-1 text-justify">
                  this is very beautiful house and it's south face view and use
                  metarials are imported from italie. there have 4 room, 3 wash
                  room and every room have 2 window with attach balcone
                </p>
              </div>
            </div>
        </div>
    );
}

export default AboutPart;