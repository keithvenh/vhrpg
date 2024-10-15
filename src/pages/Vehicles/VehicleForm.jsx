import Background from "./forms/Background";
import Characteristics from "./forms/Characteristics";
import Attributes from "./forms/Attributes";
import Equipment from "./forms/Equipment";
import Weapons from "./forms/Weapons";
import Appearance from "./forms/Appearance";
import Other from './forms/Other';
import Loading from '../../features/Loading';

import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { fetchVehicle, updateVehicle } from "../../services/vehicles";

export default function VehicleForm() {
  const {id} = useParams();

  const [vehicleForm, setVehicleForm] = useState()
  const [loading, setLoading] = useState(true)

  function handleFormChanges(changes) {
    setVehicleForm((prevState) => ({
      ...prevState,
      ...changes
    }))
  }

  async function handleFormSubmit() {
    console.log("Submitting Form");
    try {
      await updateVehicle(id, vehicleForm);
    }
    catch(error) {"Error Updating Character:", error}
  }

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        const vehicle = await fetchVehicle(id);
        if(vehicle) {setVehicleForm(vehicle)}
      } catch (error) {
        console.error("Error fetching Character:", error)
      } finally {setLoading(false)}
    }

    loadVehicle();
  }, [id])

  
  const sections = {
    appearance: <Appearance vehicle={vehicleForm} handler={handleFormChanges} />,
    attributes: <Attributes vehicle={vehicleForm} handler={handleFormChanges} />,
    background: <Background vehicle={vehicleForm} handler={handleFormChanges} />,
    characteristics: <Characteristics vehicle={vehicleForm} handler={handleFormChanges} />,
    equipment: <Equipment vehicle={vehicleForm} handler={handleFormChanges} />,
    weapons: <Weapons vehicle={vehicleForm} handler={handleFormChanges} />,
    other: <Other vehicle={vehicleForm} handler={handleFormChanges} />
  }
  const [currentSection, setCurrentSection] = useState('background')
  
  function updateSection(section) {
    setCurrentSection(section)
  }
  
  if(loading) return <Loading />

  return (
    <div className='CharacterForm'>
      <div className='form-sections'>
        <a onClick={handleFormSubmit} className='submit-button'>Save Changes</a>
        <a onClick={() => updateSection('background')} className={`active-${currentSection == 'background'}`}>Background</a>
        <a onClick={() => updateSection('appearance')} className={`active-${currentSection == 'appearance'}`}>Appearance</a>
        <a onClick={() => updateSection('attributes')} className={`active-${currentSection == 'attributes'}`}>Attributes</a>
        <a onClick={() => updateSection('characteristics')} className={`active-${currentSection == 'characteristics'}`}>Characteristics</a>
        <a onClick={() => updateSection('equipment')} className={`active-${currentSection == 'equipment'}`}>Equipment</a>
        <a onClick={() => updateSection('weapons')} className={`active-${currentSection == 'weapons'}`}>Weapons</a>
        <a onClick={() => updateSection('other')} className={`active-${currentSection == 'other'}`}>Other</a>
      </div>
      {sections[currentSection]}
    </div>
  )
}