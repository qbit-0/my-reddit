import React, { FC, useEffect, useRef, useState } from "react";
import { NavBar } from "../NavBar/NavBar";

type Props = {
    navBarPaths: {
        [path: string]: string;
    };
    bottomMargin: number;
};

const SlideNavBar: FC<Props> = ({ navBarPaths, bottomMargin }) => {
    const [show, setShow] = useState<boolean | null>(null);

    const staticNav = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let lastPageOffset = window.pageYOffset;
        const handleScroll = () => {
            if (staticNav.current === null) {
                return;
            }

            const staticNavTop =
                staticNav.current.getBoundingClientRect().top +
                window.scrollY +
                bottomMargin;

            if (
                staticNavTop &&
                window.scrollY > staticNavTop &&
                window.pageYOffset < lastPageOffset
            ) {
                setShow(true);
            } else {
                setShow(false);
            }
            lastPageOffset = window.pageYOffset;
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [bottomMargin]);

    let animate = "";
    if (show === null) {
    } else if (show === true) {
        animate = "animate-slidein";
    } else if (show === false) {
        animate = "animate-slideout";
    }

    return (
        <nav>
            <div
                className={`w-full z-10 top-0 p-1 bg-neutral-900 text-amber-100 drop-shadow-lg`}
                ref={staticNav}
            >
                <NavBar navBarPaths={navBarPaths} />
            </div>

            <div
                className={`fixed invisible w-full z-10 top-0 p-1 bg-neutral-900 text-amber-100 drop-shadow-lg ${animate}`}
            >
                <NavBar navBarPaths={navBarPaths} />
            </div>
        </nav>
    );
};

export default SlideNavBar;
