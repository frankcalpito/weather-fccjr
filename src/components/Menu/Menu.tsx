"use client";

import { setMenuState } from "@/lib/features/settings/settingsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { CONTACT_EMAIL, ICONS, SOCIAL_LINKS } from "../../constants/menu";
import Button from "../Button/Button";
import TextReveal from "../TextEffect/TextEffect";

interface MenuItem {
  label: string;
  path: string;
  onClick?: () => void;
  icon: IconProp;
  selectedClassName?: string;
}

interface MenuProps {
  items: MenuItem[];
}

export const Menu = ({ items }: MenuProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { menuState } = useAppSelector((state) => state.settings);

  const Socials = ({
    className = "justify-center",
  }: {
    className?: string;
  }) => {
    return (
      <div className={`inline-flex space-x-6 ${className}`}>
        {SOCIAL_LINKS.map((social, idx) => (
          <a href={social.href} target="_blank" key={idx}>
            <FontAwesomeIcon icon={social.icon} size="xl" spin />
          </a>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`relative w-full top-0 left-0 z-40 transition-all duration-1000 text-white ${
        menuState === "open" ? "bg-transparent" : "bg-gray-800"
      }`}
    >
      {/* Background Overlay */}
      {menuState === "open" && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black opacity-40 z-30"
          onClick={() => dispatch(setMenuState("closed"))}
        />
      )}

      {/* Sliding bg */}
      <div
        className={`fixed bg-gradient-to-b from-gray-800 to-red-600 transition-all duration-1000 c-quad-1 w-screen h-screen right-0 shadow-inner shadow-black/50 ${
          menuState === "open"
            ? "translate-none opacity-100"
            : "translate-x-full -translate-y-full -rotate-45 opacity-0 delay-100"
        }`}
      ></div>

      {/* Toggle button */}
      <Button
        className={`w-full inline-flex py-4 text-white font-mono uppercase px-4 justify-between items-center sm:px-12`}
        onClick={() =>
          dispatch(setMenuState(menuState === "closed" ? "open" : "closed"))
        }
      >
        <TextReveal
          type="fade-down"
          className={`text-lg font-bold text-clip transition-all duration-500 ${
            menuState === "open" ? "text-white" : "text-slate-200"
          }`}
        >
          Custom Weather App
        </TextReveal>
        <FontAwesomeIcon
          icon={ICONS.burger}
          fade
          className={[
            "transition-all duration-500",
            menuState === "open" ? "rotate-180" : "",
          ]
            .join(" ")
            .trimEnd()}
        />
      </Button>

      {/* Actual menu items */}
      <div
        className={[
          `fixed z-50 font-mono w-full sm:w-auto sm:right-0 bg-transparent transition-all duration-500 delay-500 top-1/2 -translate-y-2/3`,
          menuState === "open"
            ? "translate-none sm:-translate-x-1/2"
            : "translate-x-full",
        ].join(" ")}
      >
        {items.map((item, i: number) => {
          const delay = 200 + 100 * i;

          const menuItemStyle = {
            transition: `all 1s ${delay}ms`, // Apply the delay
          };

          const menuItemClass = `
            block w-full py-4 capitalize transition-all duration-1000 my-4 delay-0
            ${menuState === "open" ? "opacity-100" : "opacity-0"}
          `;

          return (
            <Button
              key={`menu-item-${item.label}`}
              className={menuItemClass}
              style={menuItemStyle}
              onClick={() => {
                item.onClick && item.onClick();
                dispatch(setMenuState("closed"));
                router.push(item.path ?? item.label);
              }}
            >
              {item.label} <FontAwesomeIcon icon={item.icon} />
            </Button>
          );
        })}
      </div>

      {/* Social Links */}
      <div
        className={[
          `fixed z-50 font-mono bg-transparent transition-all duration-500 bottom-0 -translate-y-2/3 flex-col flex justify-end space-y-4 w-full sm:w-auto`,
          menuState === "open"
            ? "delay-500 translate-none sm:right-4"
            : " delay-0 translate-x-full sm:-right-24",
        ].join(" ")}
      >
        <Socials />
        <a className="text-center" href={`mailto:${CONTACT_EMAIL}`}>
          <FontAwesomeIcon icon={ICONS.envelope} className="mr-2" />
          {CONTACT_EMAIL}
        </a>
      </div>
    </div>
  );
};
