import React from "react";
import house1 from "../assets/house1.jpg";
import AboutPart from "./AboutPart";

function About(props) {

  const abouts =[
    {
      id:1,
      title:'Budget Friendly',
      des:'Properties are most budget friendly so you have opportunity to find the best one'
    },
    {
      id:2,
      title:'Prime Location',
      des:'Properties are most budget friendly so you have opportunity to find the best one',
      
    },
    {
      id:3,
      title:'Trusted By Thousand',
      des:'Properties are most budget friendly so you have opportunity to find the best one',
      
    }
  ];

  return (
    <section>
      <div className="container mx-auto my-10">
        <h2 className="py-2 text-sm font-bold text-start">Why choose us</h2>
        <div className="flex flex-col lg:flex-row gap-x-2 gap-y-2">
          <div className="text-2xl text-start font-semibold py-2 w-1/2">
            WE PRODIVE LATEST PROPERTY FOR OUR VALUABLE CLIENT
          </div>
          <div className="text-sm text-justify py-2 px-10 w-1/2">
            this is very beautiful house and it's south face view and use
            metarials are imported from italie. there have 4 room, 3 wash room
            and every room have 2 window with attach balcone
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-y-2 gap-x-2 p-2">
          <div className="w-1/2 min-h-[300px] flex justify-center items-center">
            <img src={house1} alt="" />
          </div>
          <div className="flex justify-center flex-col w-1/2 p-4">
            {
              abouts.map((about)=>{
                return (
                  <AboutPart key={about.id} about={about} />
                )
              })
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
