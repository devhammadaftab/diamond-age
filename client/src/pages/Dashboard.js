import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer } from 'react-toastify' 

import AddEvent from '../components/AddEvent';
import ListEvents from '../components/ListEvents';

function Dashboard() {

    const [addEventShow, setAddEventShow] = useState(false);
    const [listEventsShow, setListEventsShow] = useState(false);

    const [eventsStatus, setEventsStatus] = useState("No")

    useEffect(() => {
        fetchEventStatus();
    }, [])

    const fetchEventStatus = () => {
        axios.get("http://localhost:5000/api/eventsStatus")
        .then((response) => {
            setEventsStatus(response.data)
        })
        .catch((err) => console.log(err));

    }

    const domains = [
        {
            title: "Maintenance",
            sub_domain: ["sub domain 1 - maintenance", "sub domain 2 - maintenance", "sub domain 3 - maintenance" ]
        },
        {
            title: "Production",
            sub_domain: ["sub domain 1 - production", "sub domain 2 - production", "sub domain 3 - production" ]
        },
        {
            title: "Software",
            sub_domain: ["sub domain 1 - software", "sub domain 2 - software", "sub domain 3 - software" ]
        },
        {
            title: "Electrical",
            sub_domain: ["sub domain 1 - electrical", "sub domain 2 - electrical", "sub domain 3 - electrical" ]
        },
        {
            title: "Mechanical",
            sub_domain: ["sub domain 1 - mechanical", "sub domain 2 - mechanical", "sub domain 3 - mechanical" ]
        },
    ];

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className='topArea'>
                {eventsStatus === "Yes" && <i className="fas fa-exclamation-triangle text-danger"></i>}
                <button className='btn btn-primary'>Export</button>
                <button className='btn btn-primary' onClick={() => setAddEventShow(true)}>New Event</button>
                <button className='btn btn-primary' onClick={() => setListEventsShow(true)}><i className="fas fa-list"></i></button>
            </div>

            <div className={`content${ eventsStatus === "Yes" ? " warning" : ""}`}>
                <div className='card'></div>
            </div>

            {addEventShow && 
                <AddEvent 
                    domains={domains}
                    setModalShow={setAddEventShow}
                    modalShow={addEventShow}
                    fetchEventStatus={fetchEventStatus}
                />
            }
            
            {listEventsShow && 
                <ListEvents 
                    domains={domains}
                    setModalShow={setListEventsShow}
                    modalShow={listEventsShow}
                    fetchEventStatus={fetchEventStatus}
                />
            }
        
        </>
    )
}

export default Dashboard