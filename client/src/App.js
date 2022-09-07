import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SideBar from './components/Sidebar';
import Dashboard from './pages/Dashboard'

function App() {
    return (

        <BrowserRouter>

          <main id="pageContainer">

            <SideBar />

            <section id="page_section">
              {
                <Routes>

                    {/*--------------- Dashboard ---------------------*/}
                    <Route path="/" element={<Dashboard />} />

                </Routes>
              }
            </section>

          </main>

        </BrowserRouter>

    );
}

export default App;
