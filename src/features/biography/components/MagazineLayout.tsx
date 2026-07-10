import React from "react";
import { BioContent, ModelLayoutProps } from "../types";

const DEFAULT_BIO: BioContent = {
  paragraphsLeft: [
    "BIOGRAPHY: Elizabeth was the daughter of Henry VIII and Anne Boleyn, his second wife, who was executed two and a half years after Elizabeth's birth. Anne's marriage to Henry VIII was annulled, and Elizabeth was declared illegitimate. Her half-brother, Edward VI, ruled until his death in 1553, bequeathing the crown to Lady Jane Grey and ignoring the claims of his two half-sisters, Elizabeth and the Roman Catholic Mary, in spite of statute law to the contrary. Edward's will was set aside and Mary became queen, deposing Lady Jane Grey. During Mary's reign, Elizabeth was imprisoned for nearly a year on suspicion of supporting Protestant rebels.",
    "SKETCH: The Speech to the Troops at Tilbury was delivered on 9 August Old Style (19 August New Style) 1588 by Queen Elizabeth I of England to the land forces earlier assembled at Tilbury in Essex in preparation for repelling the expected invasion by the Spanish Armada.",
    "Before the speech the Armada had been driven from the Strait of Dover in the Battle of Gravelines eleven days earlier, and had by then rounded Scotland on its way home, but troops were still held at ready in case the Spanish army of Alessandro Farnese, the Duke of Parma, might yet attempt to invade from Dunkirk; two days later they were discharged. On the day of the speech, the Queen left her bodyguard before Tilbury Fort and went among her subjects with an escort of six men. Lord Ormonde walked ahead with the Sword of State; he was followed by a page leading the Queen's charger and another bearing her silver helmet on a cushion; then came the Queen herself, in white with a silver cuirass and mounted on a grey gelding. She was flanked on horseback by her lieutenant general the Earl of Leicester on the right, and on the left by the Earl of Essex, her Master of the Horse. Sir John Norreys brought up the rear.",
    "SPEECH: My loving people, We have been persuaded by some that are careful of our safety, to take heed how",
  ],
  paragraphsRight: [
    "we commit ourselves to armed multitudes, for fear of treachery; but I assure you I do not desire to live to distrust my faithful and loving people. Let tyrants fear, I have always so behaved myself that, under God, I have placed my chiefest strength and safeguard in the loyal hearts and good-will of my subjects; and therefore I am come amongst you, as you see, at this time, not for my recreation and disport, but being resolved, in the midst and heat of the battle, to live and die amongst you all, to lay down for my God, and for my kingdom, and my people, my honour and my blood, even in the dust. I know I have the body but of a weak and feeble woman; but I have the heart and stomach of a king, and of a king of England too, and think foul scorn that Parma or Spain, or any prince of Europe, should dare to invade the borders of my realm; to which rather than any dishonour shall grow by me, I myself will take up arms, I myself will be your general, judge, and rewarder of every one of your virtues in the field. I know already, for your forwardness you have deserved rewards and crowns; and We do assure you in the word of a prince, they shall be duly paid you. In the mean time, my lieutenant general shall be in my stead, than whom never prince commanded a more noble or worthy subject; not doubting but by your obedience to my general, by your concord in the camp, and your valour in the field, we shall shortly have a famous victory over those enemies of my God, of my kingdom, and of my people. •",
  ],
};

const MagazineLayout: React.FC<ModelLayoutProps> = ({
  imageSrc,
  content = DEFAULT_BIO,
}) => {
  return (
    <div className="w-full   p-8 md:p-12 bg-[#dbd7d2] font-serif antialiased relative h-[85vh] min-h-[680px] flex items-center">
      {/* 
        LAYER 1: CENTRAL BACKDROP PHOTO
        Set explicitly to h-[90%] to secure the exact proportional scale requirements.
      */}
      <div className="absolute inset-x-0 top-[0%]  h-[90%] z-0 flex justify-center items-center pointer-events-none bg-transparent">
        <div className="h-full  overflow-hidden ">
          <img
            src={imageSrc}
            alt="Editorial Dynamic Panel Background"
            className="w-full h-full object-fit backdrop-blur-sm -z-20"
          />
        </div>
      </div>

      {/* 
        LAYER 2: ACTIVE TEXT WRAPPING OVERLAY
        Spans full height over the structural element backdrop.
      */}
      <div className="relative z-50 w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-48 text-[11px] md:text-[13px] leading-relaxed text-justify tracking-wide font-medium h-full items-start bg-transparent">
        {/* LEFT WRAPPING CHANNEL */}
        <div className="relative h-full overflow-hidden">
          {/* Pushes paragraph layout away from the center model shape */}
          <div
            style={{
              float: "right",
              width: "38%",
              height: "100%",
              shapeOutside:
                "polygon(100% 0%, 20% 0%, 15% 20%, 35% 45%, 40% 65%, 25% 85%, 10% 100%, 100% 100%)",
            }}
            className="pointer-events-none"
          />
          <div className="space-y-4 pr-2">
            {content.paragraphsLeft.map((para, idx) => (
              <p
                key={`left-layer-${idx}`}
                className="mix-blend-difference text-zinc-900"
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* RIGHT WRAPPING CHANNEL */}
        <div className="relative h-full overflow-hidden ">
          {/* Mirrors the silhouette curves along the right field border */}
          <div
            style={{
              float: "left",
              width: "38%",
              height: "100%",
              shapeOutside:
                "polygon(0% 0%, 80% 0%, 70% 20%, 45% 45%, 35% 65%, 50% 85%, 65% 100%, 0% 100%)",
            }}
            className="pointer-events-none z-50"
          />
          <div className="space-y-4 pl-2">
            {content.paragraphsRight.map((para, idx) => (
              <p
                key={`right-layer-${idx}`}
                // Mix-blend utility automatically shifts dark text to light elements when crossing dark photo backgrounds
                className="text-zinc-800 "
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagazineLayout;
