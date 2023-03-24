import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  //   const date = new Date().getFullYear();
  return (
    <div className=" bg-gray-200 text-center py-8">
      <div className="p-2 flex flex-col lg:flex-row gap-x-2 gap-y-2">
        <div className="p-2 w-2/6">
          <div className="text-xl text-start font-semibold py-2 w-1/2 tracking-wider">
            RealState
          </div>
          <div className="text-sm tracking-wide text-start py-2 mb-4">
            This is very beautiful house and it's south face view and use
            metarials are imported from italie. there have 4 room, 3 wash room
            and every room have 2 window with attach balcone
          </div>
          <div className="text-sm font-normal text-start">
            &copy; All Right Reserved - privacy policy
          </div>
        </div>
        <div className="p-2 w-1/6">
          <h2 className="text-center mb-4 font-semibold text-xl tracking-wider">
            Information
          </h2>
          <ul className="p-0 m-0">
            <li className="flex justify-center py-1">
              <Link to="#" className="font-thin text-sm text-violet-500">
                About us
              </Link>
            </li>
            <li className="flex justify-center py-1">
              <Link to="#" className="font-thin text-sm text-violet-500">
                Property
              </Link>
            </li>
            <li className="flex justify-center py-1">
              <Link to="#" className="font-thin text-sm text-violet-500">
                Careers
              </Link>
            </li>
            <li className="flex justify-center py-1">
              <Link to="#" className="font-thin text-sm text-violet-500">
                Payment
              </Link>
            </li>
            <li className="flex justify-center py-1">
              <Link
                to="#"
                className="font-thin text-sm text-violet-500
             hover:text-violet-800"
              >
                Blog Post
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-2 w-1/6">
          <h2 className="text-center mb-4 font-semibold text-xl tracking-wider">Support</h2>
          <ul className="p-0 m-0">
            <li className="flex justify-center py-1">
              <Link to="#" className="font-thin text-sm text-violet-500">
                Add property
              </Link>
            </li>
            <li className="flex justify-center py-1">
              <Link to="#" className="font-thin text-sm text-violet-500">
                Terms and Condition
              </Link>
            </li>
            <li className="flex justify-center py-1">
              <Link to="#" className="font-thin text-sm text-violet-500">
                Help Line
              </Link>
            </li>
            <li className="flex justify-center py-1">
              <Link to="#" className="font-thin text-sm text-violet-500">
                Our Agents
              </Link>
            </li>
            <li className="flex justify-center py-1">
              <Link
                to="#"
                className="font-thin text-sm text-violet-500
             hover:text-violet-800"
              >
                Features
              </Link>
            </li>
          </ul>
        </div>

        <div className="p-2 w-2/6 justify-end">
          <div className="text-xl flex tracking-wider
           justify-center font-semibold py-2 ">
            Address
          </div>
          <div className="text-sm tracking-wider text-center py-2 px-12 mx-5 mb-4 ">
            House: 40; Road: 01; Block: #E; Bonosree, Rampura, Dhaka
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
