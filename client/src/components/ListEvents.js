import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Card } from 'react-bootstrap'

function ListEvents({ domains, modalShow, setModalShow, fetchEventStatus }) {

    const [events, setEvents] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/api/events")
        .then((response) => {
            setEvents(response.data)
        })
        .catch((err) => console.log(err));

    }, [modalShow])

    const updateEvent = (event) => {
        if (event.downtown_event === "Yes") {
            axios.put(`http://localhost:5000/api/events/${event._id}`, {downtown_event: "No"})
            .then((response) => {
                
                setEvents(prevEvent => 
                    prevEvent.map(e => e._id === event._id ? {...e, downtown_event: "No"} : e)
                )

                fetchEventStatus();

            })
            .catch((err) => console.log(err));
        }
    }

    return (
        
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div style={{display: 'flex', gap: '10px'}}>
                    {domains?.map((domain, key) => 
                        <div key={key} style={{flex: '1 1 0px', width: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '10px'}} >
                            
                            <Card>
                                <Card.Body style={{textAlign: 'center', backgroundColor: '#eee'}}>
                                    {domain.title}
                                </Card.Body>
                            </Card>

                            {events.filter(event => event.domain === domain.title)?.map((event, key) => 
                                <Card key={key} className={event.downtown_event === "Yes" ? "bg-danger text-white" : ""}>
                                    <Card.Body style={{textAlign: 'center', cursor: 'pointer'}} onClick={() => updateEvent(event)}>
                                        {event.description}
                                    </Card.Body>
                                </Card>
                            )}

                        </div>
                    )}
                </div>
                
            </Modal.Body>

        </Modal>

    )
}

export default ListEvents