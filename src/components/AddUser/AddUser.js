import React from 'react';
import { useRef } from "react";

const AddUser = () => {
    const nameRef = useRef();
    const emailRef = useRef();

    const handleUserAdd = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;

        const newUser = { name, email };

        // send data to server 
        fetch("http://localhost:4000/users", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("user added successfully!");
                    e.target.reset();
                }
            })

        // nameRef.current.value ="";
        // email.current.value = "";
    }
    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleUserAdd}>
                <input type="text" name="name" id="name" placeholder='Name' ref={nameRef} />

                <input type="email" name="email" id="email" placeholder='Eamil' ref={emailRef} />

                <input type="submit" value="Add User" />
            </form>
        </div>
    );
};

export default AddUser;