import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { charactersCollection } from "../../../db/application/db";

import Loading from "../loading/Loading";

// ===== IMPORT FORM FIELDS ===== //
import Form from "../forms/Form";
import FormSection from "../forms/FormSection";

import Overview from "./characterForm/Overview";
import CareerAndSpec from "./characterForm/CareerAndSpec";

import FormInput from "../forms/FormInput";
import FormSelect from "../forms/FormSelect";
import TagInput from "../forms/TagInput";
import FormButton from "../forms/FormButton";

export default function EditCharacter() {
  const [character, setCharacter] = useState(null);
  const [form, setForm] = useState({
    displayName: "",
    type: "",
    imageURL: "",
    species: "",
    career: "",
    specializations: [],
  });

  const { id } = useParams();
  const navigate = useNavigate();

  function handleFormChange(e) {
    if (e && e.target) {
      // This means it's from an input event
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    } else {
      // It's directly the tags array from onTagChange
      setForm((prev) => ({
        ...prev,
        specializations: e, // Assuming specializations is the name for tags
      }));
    }
  }

  async function updateCharacter(editedCharacter) {
    try {
      // Create a reference to the character document using its ID
      const charDocRef = doc(charactersCollection, character.id);

      // Update the document in the database
      await updateDoc(charDocRef, editedCharacter);

      // Navigate to the Character Show page
      navigate(`/characters/${character.id}`);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateCharacter(form);
  }

  async function getCharacter(characterID) {
    const c = await getDoc(doc(charactersCollection, characterID));
    setCharacter({
      ...c.data(),
      id: c.id,
    });
    setForm({
      ...form,
      ...c.data(),
    });
  }

  useEffect(() => {
    getCharacter(id);
  }, [id]);

  if (!form || !character) return <Loading />;

  return (
    <form className="form editCharacterForm" onSumbit={handleSubmit}>
      <div className="formTitleContainer">
        <div className="characterImageContainer">
          <img
            className="characterImage"
            src={form.imageURL || "https://i.imgur.com/tdi3NGa.png"}
            alt=""
          />
        </div>
        <div className="characterTitleContainer">
          <h2 className="formTitle">{character.displayName}</h2>
          <p className="sw formSubtitle">{character.displayName}</p>
          <p className="sw formSubtitle">{character.id}</p>
        </div>
      </div>

      <FormSection label="Overview">
        <Overview
          values={{
            displayName: form.displayName,
            type: form.type,
            imageURL: form.imageURL,
            species: form.species,
          }}
          handleFormChange={handleFormChange}
        />

        {form.type === "pc" && (
          <CareerAndSpec
            values={{
              career: form.career,
              specializations: form.specializations,
            }}
            handleFormChange={handleFormChange}
          />
        )}
      </FormSection>

      <div className="characterContainer">
        <div className="characterDetails">
          <div className="characterOverview"></div>
        </div>
        <div style={{ marginTop: "240px" }}>
          <FormButton
            type="submit"
            label="Update Character"
            handler={handleSubmit}
          />
        </div>
        {/* testing

<div className='characterImageContainer'>
<img className='characterImage' src={this.state.image} alt='' />
</div>

</div>
<div className="divider">
<hr className="dividerLine"></hr>
<p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Attributes</p>
<hr className="dividerLine"></hr>
</div>
<div className='characterAttributes'>
<div className='derived' id="attributes">
<div className="attributeContainer soak">
<div className="label">Soak</div>
<div className="values">
<div className='current'>
<p className='value'>{this.props.character.attributes.soak}</p>
<div className="sublabel">Current</div>
</div>
</div>
</div>

<div className="attributeContainer wounds">
<div className="label">Wounds</div>
<div className="values">
<div className='threshold'>
<p className='value'>{this.props.character.attributes.woundThreshold}</p>
<div className="sublabel">Threshold</div>
</div>
<div className='current'>
<p className='value'>{this.props.character.attributes.wounds}</p>
<div className="sublabel">Current</div>
</div>
</div>

</div>

<div className="attributeContainer strain">
<div className="label">Strain</div>
<div className="values">
<div className='threshold'>
<p className='value'>{this.props.character.attributes.strainThreshold}</p>
<div className="sublabel">Threshold</div>
</div>
<div className='current'>
<p className='value'>{this.props.character.attributes.strain}</p>
<div className="sublabel">Current</div>
</div>
</div>
</div>

<div className="attributeContainer defense">
<div className="label">Defense</div>
<div className="values">
<div className='threshold'>
<p className='value'>{this.props.character.attributes.rangedDefense}</p>
<div className="sublabel">Ranged</div>
</div>
<div className='current'>
<p className='value'>{this.props.character.attributes.meleeDefense}</p>
<div className="sublabel">Melee</div>
</div>
</div>
</div>

<div className="attributeContainer forceRating">
<div className="label">Force Rating</div>
<div className="values">
<div className='current'>
<p className='value'>{this.props.character.attributes.forceRating}</p>
<div className="sublabel">Current</div>
</div>
</div>
</div>
</div>

<div className="divider">
<hr className="dividerLine"></hr>
<p className="dividerLabel"  onClick={(e) => this.collapseElement(e)}>Characteristics</p>
<hr className="dividerLine"></hr>
</div>

<div className='characteristics' id='characteristics'>

<div  className='characteristic brawn'>
<p className='rank'>{this.props.character.characteristics.brawn }</p>
<p className='label'>Brawn</p>
</div>

<div  className='characteristic agility'>
<p className='rank'>{this.props.character.characteristics.agility }</p>
<p className='label'>Agility</p>
</div>

<div  className='characteristic intellect'>
<p className='rank'>{this.props.character.characteristics.intellect }</p>
<p className='label'>Intellect</p>
</div>

<div  className='characteristic cunning'>
<p className='rank'>{this.props.character.characteristics.cunning }</p>
<p className='label'>Cunning</p>
</div>

<div  className='characteristic willpower'>
<p className='rank'>{this.props.character.characteristics.willpower }</p>
<p className='label'>Willpower</p>
</div>

<div  className='characteristic presence'>
<p className='rank'>{this.props.character.characteristics.presence }</p>
<p className='label'>Presence</p>
</div>

</div>
</div>

<div className="divider">
<hr className="dividerLine"></hr>
<p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Skills</p>
<hr className="dividerLine"></hr>
</div>
<div className='characterSkills' id='skills'>
{/*map over array and return list of skills and their ranks.
<div className='skillsRow'>
<div className="divider">
<hr className="dividerLine"></hr>
<p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>General</p>
<hr className="dividerLine"></hr>
</div>
<div className='generalSkills'  id='general'>

{this.state.skillList.filter(skill => skill.category === "General").map((skill) => <CharacterSkill skill={skill} key={skill.name} /> )}

</div>
</div>

<div className='skillsRow'>
<div className="divider">
<hr className="dividerLine"></hr>
<p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Combat</p>
<hr className="dividerLine"></hr>
</div>
<div className='combatSkills' id='combat'>

{this.state.skillList.filter(skill => skill.category === "Combat").map((skill) => <CharacterSkill skill={skill} key={skill.name} /> )}

</div>

<div className="divider">
<hr className="dividerLine"></hr>
<p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Knowledge</p>
<hr className="dividerLine"></hr>
</div>

<div className='knowledgeSkills' id='knowledge'>

{this.state.skillList.filter(skill => skill.category === "Knowledge").map((skill) => <CharacterSkill skill={skill} key={skill.name} /> )}

</div>
</div>
</div>
</div>
<div className="divider">
<hr className="dividerLine"></hr>
<p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Talents</p>
<hr className="dividerLine"></hr>
</div>
<div className='character-talents' id='talentsß'>
{/* WE NEED TO FIGURE OUT HOW TO LOOP THROUGH props.character.talents
</div> */}
      </div>
    </form>
  );
}
