import React, { useState } from 'react'
import * as $ from 'jquery'

import SideBarItem from './SideBarItem'
import Accordion from 'react-bootstrap/Accordion';

const SideBar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const hideFullMenu = () => {
        $(".navTitle").css({ "width": "0px", "padding-left": "0px" });
        setTimeout(() => {
            $("#menu_section").css({ "width": "60px", "min-width": "60px", "padding-left": "0" });
        }, 50)

        $(".sideBarItem .accordion-button").addClass("collapsed");
        $(".sideBarItem .accordion-collapse").removeClass("show");
    }

    const showFullMenu = () => {
        $("#menu_section").css({ "min-width": "225px", "width": "225px", "padding-left": "0" });
        setTimeout(() => {
            $(".navTitle").css({ "width": "160px", "padding-left": "20px" });
        }, 50)
        
    }

    const onMenuClick = () => {
        if (!menuOpen) {
            document.querySelector('.menu_btn').classList.add('menuOpen');
            showFullMenu();
            setMenuOpen(true)
        } else {
            document.querySelector('.menu_btn').classList.remove('menuOpen');
            hideFullMenu();
            setMenuOpen(false)
        }
    }

    return (
        <section id="menu_section">

            <header>
                <div className="navTitle">Navigation</div>

                <button className='menuArea' onClick={onMenuClick}>
                    <span id="sideMenu" className="menu_btn">
                        <span className="menu_btn_burger"></span>
                    </span>
                </button>
            </header>

            <Accordion>

                <SideBarItem
                    itemKey="0"
                    title="Dashboard"
                    icon="fas fa-tachometer-alt"
                    redirect="/"
                    className="active"
                />

            </Accordion>

        </section>

    );
}

export default React.memo(SideBar)