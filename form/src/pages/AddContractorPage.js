import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewContractorForm from "../components/NewContractorForm";
import classes from "./AddContractorPage.module.css";

const AddContractorPage = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const addContractor = (contractorData) => {
    fetch("https://localhost:60001/Contractor/Save", {
      method: "POST",
      body: JSON.stringify(contractorData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError("Nie znaleziono metody zapisu");
      });
  };

  return (
    <section>
      <NewContractorForm onAddContractor={addContractor} />
      {error && <p className={classes.error}>{error}</p>}
    </section>
  );
};

export default AddContractorPage;
