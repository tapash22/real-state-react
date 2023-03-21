import React from "react";

function Footer(props) {
//   const date = new Date().getFullYear();
  return (
    <div className=" bg-gray-200 text-center py-8">
      <div className="p-2 flex flex-col lg:flex-row gap-x-2 gap-y-2">
        <div className="p-2 w-2/6">
          
            <div className="text-2xl text-start font-semibold py-2 w-1/2">
              RealState
            </div>
            <div className="text-sm text-start py-2 mb-4">
              This is very beautiful house and it's south face view and use
              metarials are imported from italie. there have 4 room, 3 wash room
              and every room have 2 window with attach balcone
            </div>
            <div className="text-sm font-normal text-start">
                &copy; All Right Reserved - privacy policy
            </div>
          
        </div>
        <div className="p-2 w-1/6"></div>
        <div className="p-2 w-1/6"></div>
        <div className="p-2 w-2/6 justify-center">
        <div className="text-2xl  font-semibold py-2 w-1/2">
              Address
            </div>
            <div className="text-sm text-start py-2 mb-4 w-2/3">
              House: 40; Road: 01; Block: #E;
              Bpnosree, Rampura, Dhaka
            </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
