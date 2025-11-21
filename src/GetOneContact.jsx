import React, { useState } from "react";

function GetOneContact() {
    const [name, setName] = useState("");
    const [contact, setContact] = useState(null);
    const [message, setMessage] = useState("");

    const handleLookup = async (e) => {
        e.preventDefault();
        setMessage("");
        setContact(null);

        const trimmedName = name.trim();
        if (!trimmedName) {
            setMessage("Please enter a contact name.");
            return;
        }

        try {
            const encodedName = encodeURIComponent(trimmedName);
            console.log("EncodeURIComponent :", encodedName);
            const res = await fetch(`http://localhost:8081/contacts/${encodedName}`, {
                method: "GET"
            });
            const data = await res.json().catch(() => null);
            if (!res.ok) {
                const errorMsg = data?.message || `Error: HTTP ${res.status}`;
                setMessage(errorMsg);
            } else {
                setContact(data);
                setMessage(""); // clear input
            }
        } catch (error) {
            console.error("Error fetching contact:", error);
            setMessage("Network error while fetching contact.");
        }
    };

    return (<div>
        <h2>View Contact Info</h2>
        <form onSubmit={handleLookup} className="d-flex flex-column gap-3">
            <label className="d-flex flex-column">
                Contact Name:
                <input
                    type="text"
                    value={name}
                    placeholder="e.g. Abraham Aldaco"
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <button type="submit">View Contact</button> <br></br>
        </form>

        {message && <p className="mt-3">{message}</p>}

        {contact && (
            <li key={contact.id} className="list-group-item d-flex align-items-center">
                {contact.image_url && (
                    <img
                        src={contact.image_url}
                        alt={contact.contact_name}
                        style={{ width: '50px', height: '50px', marginRight: '15px', objectFit: 'cover' }}
                    />
                )}
                <div>
                    <strong>{contact.contact_name}</strong> - {contact.phone_number}
                    <p>{contact.message}</p>
                </div>
            </li>
        )}
    </div>

    );
}

export default GetOneContact;
