import React, { useState } from "react";

export default function UpdateContact() {
    const [oldName, setOldName] = useState("");
    const [newName, setNewName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [responseMsg, setResponseMsg] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();
        setResponseMsg("");

        if (!oldName.trim()) {
            setResponseMsg("Please enter the name of the contact to update.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8081/contacts/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    old_name: oldName,
                    contact_name: newName || undefined,
                    phone_number: phoneNumber || undefined,
                    message: message || undefined,
                    image_url: imageUrl || undefined
                }),
            });

            const data = await res.json().catch(() => null);

            if (res.ok) {
                setResponseMsg(data.message);
                setOldName("");
                setNewName("");
                setPhoneNumber("");
                setMessage("");
                setImageUrl("");
            } else {
                setResponseMsg(data?.message || "Error updating contact.");
            }

        } catch (error) {
            setResponseMsg("Network error while updating contact.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Update Contact</h2>

            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="Current Name"
                    value={oldName}
                    onChange={(e) => setOldName(e.target.value)}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="New Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="New Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="New Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="New Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <br /><br />

                <button type="submit">Update Contact</button>
            </form>

            {responseMsg && (
                <p style={{ marginTop: "15px", color: "blue" }}>{responseMsg}</p>
            )}
        </div>
    );
}
