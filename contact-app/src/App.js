import React, { useState, useEffect } from 'react';

function App() {
  const [contacts, setContacts] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber1, setPhoneNumber1] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddContact = async () => {
    console.log("abcde")
    try {
      const response = await fetch('/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, middleName, lastName, email, phoneNumber1, address })
      });
      const newContact = await response.json();
      setContacts([...contacts, newContact]);
      setFirstName('');
      setMiddleName('');
      setlastName('');
      setEmail('');
      setPhoneNumber1('');
      setAddress('');
      fetchContacts()
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditContact = async (id, newFirstName,newMiddleName,newLastName, newEmail, newPhone,newAddress) => {
    try {
      const response = await fetch(`/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({firstName : newFirstName , middleName : newMiddleName, lastName : newLastName, email :newEmail, phoneNumber1 : newPhone, address : newAddress })
      });
      const updatedContact = await response.json();
      const updatedContacts = contacts.map(c => (c.id === id ? updatedContact : c));
      setContacts(updatedContacts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const response = await fetch(`/contacts/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        const deletedContact = await response.json();
        const updatedContacts = contacts.filter(c => c.id !== deletedContact.id);
        setContacts(updatedContacts);
        fetchContacts()
      } else {
        console.error('Failed to delete contact');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Contact App</h1>
      <h2>Add Contact</h2>
      <form>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <br/>
        <label>
          Middle Name:
          <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
        </label>
        <br/>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setlastName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" value={phoneNumber1} onChange={(e) => setPhoneNumber1(e.target.value)} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleAddContact}>Add</button>
      </form>

      <h2>Contacts</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.firstName} {contact.middleName} {contact.lastName} ({contact.email}) - {contact.phoneNumber1} {contact.address}
            <button type="button" onClick={(e) => handleEditContact(contact.id, contact.firstName, contact.middleName,contact.lastName, contact.email,contact.phoneNumber1,contact.address)}>
              Edit
            </button>
            <button type="button" onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;