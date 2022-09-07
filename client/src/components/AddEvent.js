import React, { useState } from 'react'
import axios from 'axios'
import { Modal, ButtonGroup, Button, ToggleButton } from 'react-bootstrap'
import { toast } from 'react-toastify' 

function AddEvent({ domains, modalShow, setModalShow, fetchEventStatus }) {

    const owners = [ "John Doe", "Will Smith", "Amanda Smith"]

    const [formData, setFormData] = useState({
        domain: "",
        sub_domain: "",
        owners: [],
        description: "",
        downtown_event: "No",
    });

    const changeHandler = (e) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const addOwners = (e) => {
        if (e.target.value !== "") {
            setFormData(prevData => ({
                ...prevData,
                owners: [...prevData.owners, e.target.value],
            }))
        }
    }
    
    const removeOwner = (e) => {
        const name = e.target.getAttribute("data");
        setFormData(prevData => ({
            ...prevData,
            owners: prevData.owners?.filter(data => data !== name)
        }))
    }

    const submitForm = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/api/events", formData)
            .then(() => {

                toast.success('Event added successfully!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                
                setModalShow(false);

                setFormData({
                    domain: "",
                    sub_domain: "",
                    owners: "",
                    description: "",
                    downtown_event: "No",
                })

                fetchEventStatus();
            })
            .catch((err) => console.log(err));

    } 

    const getInitials = (name) => {
        const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        let initials = [...name.matchAll(rgx)] || [];
        initials = ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase();

        return initials;
    }

    return (
        
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Event
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="form-group">
                    <label>Domain</label>
                    <select name="domain" className="form-control" value={formData.domain} onChange={changeHandler}>
                        <option value=""></option>
                        {domains?.map(({title}, key) => <option value={title} key={key}>{title}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label>Sub Domain</label>
                    <select name="sub_domain" className="form-control" disabled={formData.domain === ""} value={formData.sub_domain} onChange={changeHandler}>
                        <option value=""></option>
                        {domains?.filter(d => d.title === formData.domain)[0]
                            ?.sub_domain?.map((subText, key) => <option value={subText} key={key}>{subText}</option>)
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Owners</label>
                    <select className="form-control" value="" onChange={addOwners} style={{marginBottom: "10px"}}>
                        <option value=""></option>
                        {owners?.filter(owner => !formData.owners.includes(owner))?.map((owner, key) => 
                            <option value={owner} key={key}>{owner}</option>
                        )}
                    </select>
                    
                    {formData.owners?.map((owner, key) => 
                        <span key={key} className="chips" data={owner} onClick={removeOwner}>
                            {getInitials(owner)}
                        </span>
                    )}

                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={changeHandler} />
                </div>

                <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    
                    <span style={{marginRight: '2em', fontWeight: '600'}}>Downtown Event</span>

                    <ButtonGroup className="me-2">
                        <ToggleButton 
                            key={1}
                            type="radio"
                            id="radio-1"
                            variant="outline-success"
                            name="downtown_event"
                            value="No"
                            onChange={changeHandler}
                            checked={formData.downtown_event === "No"}
                        >
                            No
                        </ToggleButton> 

                        <ToggleButton 
                            key={2}
                            type="radio"
                            id="radio-2"
                            variant="outline-danger"
                            name="downtown_event"
                            value="Yes"
                            onChange={changeHandler}
                            checked={formData.downtown_event === "Yes"}
                        >
                            Yes
                        </ToggleButton>

                    </ButtonGroup>

                </div>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setModalShow(false)}>Cancel</Button>
                <Button variant={formData.downtown_event === "No" ? "success" : "danger"} onClick={submitForm}>Create</Button>
            </Modal.Footer>

        </Modal>

    )
}

export default AddEvent