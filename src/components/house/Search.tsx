import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { RiHome5Line, RiMapPinLine, RiWallet3Line } from "react-icons/ri";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useHideMessageOnOutsideClick } from "../../hooks/useHideMessageOnOutsideClick";
import { useHouseContext } from "../../hooks/useHouseContext";
import { hideMessage, showMessage } from "../../utils/messageAnimation";
import { Dropdown } from "../dropdown/Dropdown";

type SearchProps = {
  // add later if needed
};

export function Search(_props: SearchProps) {
  const { countries, properties, prices } = useHouseContext();
  // const context = useContext(HouseContext);

  const [country, setCountry] = useState("");
  const [property, setProperty] = useState("");
  const [price, setPrice] = useState("");
  const [show, setShow] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  // Initialize navigate hook
  const navigate = useNavigate();

  useEffect(() => {
    if (!messageRef.current) return;

    gsap.set(messageRef.current, {
      height: 0,
      opacity: 0,
      y: -20,
      marginTop: 0,
      overflow: "hidden",
      pointerEvents: "none",
    });
  }, []);

  useHideMessageOnOutsideClick({
    wrapperRef,
    isVisible: show,
    onHide: () =>
      hideMessage({
        messageRef,
        setShow,
      }),
  });
  /*
   * Check whether value is a placeholder.
   */
  const isDefaultValue = (value: string) => {
    if (!value.trim()) return true;

    const normalized = value.toLowerCase().trim();

    return (
      normalized.includes("any") ||
      normalized.includes("select") ||
      normalized.includes("choose")
    );
  };

  // if (!context) return null;

  // const {
  //   country,
  //   setCountry,
  //   countries,

  //   property,
  //   setProperty,
  //   properties,

  //   price,
  //   setPrice,
  //   prices,
  // } = context as HouseContextType;

  //  Wrap handler to combine context filter updates and path redirecting
  const handleSearchSubmit = () => {
    const validCountry = !isDefaultValue(country);
    const validProperty = !isDefaultValue(property);
    const validPrice = !isDefaultValue(price);

    /*
     * At least one real search option
     */
    if (!validCountry && !validProperty && !validPrice) {
      if (!show) {
        showMessage({
          messageRef,
          setShow,
        });
      }

      return;
    }

    /*
     * Hide validation message
     */
    if (show) {
      hideMessage({
        messageRef,
        setShow,
      });
    }

    /*
     * Build URL parameters.
     */
    const params: Record<string, string> = {};

    if (validCountry) {
      params.country = country.trim();
    }

    if (validProperty) {
      params.property = property.trim();
    }

    if (validPrice) {
      params.price = price.trim();
    }

    /*
     * Navigate to List/Search page.
     *
     * Example:
     *
     * /search?country=Dhaka&property=Apartment&price=1000-3000
     */
    navigate({
      pathname: "/search",
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <div
      ref={wrapperRef}
      className="p-0 lg:p-5 transition-all duration-300 rounded-lg w-full"
    >
      <div
        className="
            p-2 lg:p-5
            grid
            grid-cols-1
            lg:grid-cols-4
            gap-1
            lg:gap-0
            rounded-xl transition-colors duration-300 backdrop-blur-sm border-none lg:border lg:border-[var(--border)] shadow-none lg:shadow-md lg:shadow-[var(--primary)] lg:-space-y-0
        "
      >
        {/* <div></div> */}
        <Dropdown
          selectedValue={country}
          // showValue={true}
          onSelect={setCountry}
          options={countries}
          label="Select your place"
          Icon={RiMapPinLine}
        />
        <Dropdown
          selectedValue={property}
          onSelect={setProperty}
          options={properties}
          label="Select type"
          Icon={RiHome5Line}
        />
        <Dropdown
          selectedValue={price}
          onSelect={setPrice}
          options={prices}
          label="Choose your price"
          Icon={RiWallet3Line}
        />

        {/* Search Submission CTA */}
        <div className="w-full">
          <button
            onClick={handleSearchSubmit}
            style={{ backgroundColor: "var(--bg)" }}
            className="w-full lg:h-full py-3 px-20 lg:py-0 rounded-sm lg:rounded-l-none lg:rounded-r-lg  text-(--text) font-semibold transition-opacity hover:opacity-100 tracking-widest cursor-pointer shadow-sm shadow-[var(--primary)]"
            type="button"
          >
            Search
          </button>
        </div>
      </div>
      <div
        ref={messageRef}
        className="
          w-full
          rounded-xl
          overflow-hidden
          "
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,.05) 20%,
              rgba(255,255,255,.78) 50%,
              rgba(255,255,255,.05) 80%,
              rgba(255,255,255,0) 100%
            )
          `,
        }}
      >
        <div className="flex items-center justify-center py-3 px-4">
          <p className="text-center text-sm font-medium tracking-wide text-[var(--text)]">
            Please select at least one search option before clicking Search.
          </p>
        </div>
      </div>
    </div>
  );
}
