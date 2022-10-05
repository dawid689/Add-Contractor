import React, { useEffect, useRef, useState } from "react";
import Card from "../UI/Card";
import classes from "./NewContractorForm.module.css";

const NewContractorForm = (props) => {
  const [company, setCompany] = useState(false);
  const [person, setPerson] = useState(true);
  const [idNumber, setIdNumber] = useState(false);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;

    if (
      enteredFirstName.trim().length === 0 ||
      enteredLastName.trim().length === 0
    ) {
      return;
    }
    if ((person && company) || (!person && !company)) {
      return;
    }
    if (company && idNumber.length !== 10) {
      return;
    }
    if (person && idNumber.length !== 11) {
      return;
    }
    if (image === null) {
      return;
    }

    const contractorData = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      person: person,
      company: company,
      idNumber: idNumber,
      image: image,
    };

    props.onAddContractor(contractorData);
    console.log(contractorData);
  };

  const onChangeNumber = (event) => {
    setIdNumber(event.target.value);
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <Card>
      <h1>Dodaj nowego kontrahenta!</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="firstName">Imię</label>
          <input type="text" required id="firstName" ref={firstNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="lastName">Nazwisko</label>
          <input type="text" required id="lastName" ref={lastNameInputRef} />
        </div>
        <div className={classes.control}>
          {/* <label>Typ</label> */}
          <div className={classes.checkbox}>
            <label htmlFor="person">Osoba</label>
            <input
              type="checkbox"
              defaultChecked={person}
              onChange={() => setPerson(!person)}
              id="person"
            />
            <label htmlFor="company">Firma</label>
            <input
              type="checkbox"
              defaultChecked={company}
              onChange={() => setCompany(!company)}
              id="company"
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="idNumber">Numer identyfikacyjny</label>
          <input
            type="number"
            onChange={onChangeNumber}
            required
            id="idNumber"
          />
        </div>

        {person && !company && idNumber.length !== 11 && (
          <p>Wprowadź prawidłowy numer PESEL (11 znaków).</p>
        )}
        {company && !person && idNumber.length !== 10 && (
          <p>Wprowadź prawidłowy numer NIP (10 znaków).</p>
        )}
        {person && company && <p>Wybierz jedno: Osoba lub Firma.</p>}
        {!person && !company && <p>Wybierz jedno: Osoba lub Firma.</p>}

        <div className={classes.control}>
          <label htmlFor="image">
            Zdjęcie <p>(format: JPG lub JPEG)</p>
          </label>
          <input
            type="file"
            accept="image/jpg, image/jpeg"
            required
            id="image"
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                setImage(file);
              } else {
                setImage(null);
              }
            }}
          />
          <div>
            <img src={preview} alt="" />
          </div>
        </div>

        <div className={classes.control}>
          <div className={classes.actions}>
            <button>Dodaj kontrahenta</button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default NewContractorForm;
