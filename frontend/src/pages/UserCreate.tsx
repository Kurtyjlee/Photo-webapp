import React, { useEffect } from "react";
import { Wrapper } from "../components/Wrapper";
import { useForm } from "../customHooks/useForm";
import { useState } from "react";
import axios from "axios";
import { Role } from "../models/Role";
import { Navigate } from "react-router-dom";

export const UserCreate = () => {

  const [roles, setRoles] = useState([]);
  const [redirect, setRedirect] = useState(false);

  // All fields blank
  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    role_id: 1  // first field is admin
  };

  // Getting the roles
  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get("roles");
        setRoles(data);
      }
    )()
  }, []);

  async function createUserCallback(values: any) {
    await axios.post("users", {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      role_id: +values.role_id  // Convert string to int
    })

    setRedirect(true);
  }

  const { handleInputChange, handleSubmit } = useForm(
    createUserCallback,
    initialState
  );

  if (redirect) {
    return <Navigate to={"/users"} />
  }

  return (
    <Wrapper>
      <main className="form-register">
        <form onSubmit={handleSubmit}>
          <input 
            className="form-input" 
            placeholder="First Name"
            name="first_name"  
            required 
            onChange={handleInputChange}
          />

          <input 
            className="form-input" 
            placeholder="Last Name"
            name="last_name"   
            required 
            onChange={handleInputChange}
          />

          <input 
            className="form-input" 
            placeholder="Email" 
            name="email"  
            required 
            onChange={handleInputChange}
          />

          <select
            className="form-input" 
            name="role_id"
            required
            onChange={handleInputChange}
          >
            {roles.map((r: Role) => {
              return (
                <option key={r.id} value={r.id}>{r.name}</option>
              );
            })}
          </select>

          <button type="submit">Create</button>

        </form>
      </main>
    </Wrapper>
  );
}
