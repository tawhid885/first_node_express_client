import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UpdateUser = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();



    useEffect(() => {
        fetch(`http://localhost:4000/users/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [id]);

    const handleUdpateForm = (e) => {
        const url = `http://localhost:4000/users/${id}`;

        // send data to server 
        fetch(url, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert("Updated Successfully!");
                    setUser({});
                }
            })
        e.preventDefault();
    }

    const handleName = e => {
        const newName = e.target.value;
        const newUser = { ...user };
        newUser.name = newName;
        setUser(newUser);
    }

    const handleEmail = e => {
        const newEmail = e.target.value;
        const newUser = { ...user };
        newUser.email = newEmail;
        setUser(newUser);
    }


    return (
        <div>
            <h2>This is Update User :{user.name} ::{user.email}</h2>
            <p><small>{id}</small></p>
            <form onSubmit={handleUdpateForm}>
                <input type="text" onChange={handleName} value={user.name || ""} />
                <input type="email" onChange={handleEmail} value={user.email || ""} />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;