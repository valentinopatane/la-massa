import React, { useEffect, useRef, useState } from "react";
import PopupCategory from "../Popup/CatPopup";

const Nav = ({ categories, user }) => {
    const [popup, setPopup] = useState(false);

    // const navRef = useRef(null);
    // const ulRef = useRef(null);
    // const isClicked = useRef(false);
    // const coords = useRef({
    //     start: 0,
    //     last: 0,
    // });
    // useEffect(() => {
    //     if (!ulRef.current || !navRef.current) return;

    //     const ul = ulRef.current;
    //     const nav = navRef.current;
    //     const onMouseDown = (e) => {
    //         isClicked.current = true;
    //         coords.current.start = e.clientX;
    //     };

    //     const onMouseMove = (e) => {
    //         if (!isClicked.current) return;
    //         const nextX =
    //             e.clientX - coords.current.start + coords.current.last;
    //         if (nextX > 0) {
    //             ul.style.left = `0px`;
    //         } else {
    //             ul.style.left = `${nextX}px`;
    //         }
    //     };

    //     const onMouseUp = (e) => {
    //         isClicked.current = false;
    //         coords.current.last = ul.offsetLeft;
    //     };

    //     ul.addEventListener("mousedown", onMouseDown);
    //     ul.addEventListener("mouseup", onMouseUp);
    //     nav.addEventListener("mousemove", onMouseMove);
    //     nav.addEventListener("mouseleave", onMouseUp);

    //     const cleanUp = () => {
    //         ul.removeEventListener("mouseup", onMouseUp);
    //         ul.removeEventListener("mousedown", onMouseDown);
    //         nav.removeEventListener("mousemove", onMouseMove);
    //         nav.removeEventListener("mousemove", onMouseUp);
    //     };

    //     return cleanUp;
    // }, []);

    return (
        <div className="navBarContainer">
            {user ? (
                <button className="addCat" onClick={() => setPopup(true)}>
                    Añadir Categoría +
                </button>
            ) : null}
            <nav className="navBar" ref={navRef}>
                <PopupCategory trigger={popup} setPopup={setPopup} />
                {/* <ul id="catList" ref={ulRef}>
                    {categories.map((cat) => (
                        <li className="itemButton" key={cat.categorieId}>
                            {cat.name}
                        </li>
                    ))}
                </ul> */}
            </nav>
        </div>
    );
};

export default Nav;
