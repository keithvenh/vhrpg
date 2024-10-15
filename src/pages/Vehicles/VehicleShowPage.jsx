import './styles.scss';

import useFetchData from "../../hooks/useFetchData";
import { fetchVehicle } from "../../services/vehicles";
import { useParams, useNavigate } from 'react-router-dom';

import Loading from '../../features/Loading';

export default function VehicleShowPage() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {data: vehicle, loading} = useFetchData(() => fetchVehicle(id))

  const handleEditClick = () => navigate(`/vehicles/${vehicle.id}/edit`, {state: { vehicle }})

  if(loading) return <Loading />

  return (
    <section className='VehicleShowPage'>
      <h1>{vehicle.designation} Profile:</h1>
      <p className='sw id'>{vehicle.id}</p>
      <i className='fas fa-pencil edit-character-button' onClick={handleEditClick}></i>
      <div className='basic-info'>
        <div className='vehcile-image'>
          {vehicle.imageURL ? <img src={vehicle.imageURL} /> : <i className='fas fa-jet-fighter'></i>}
        </div>
        <div className='info'>
          <h2>{vehicle.displayName}</h2>
          <div className='data'>
            <p>Model (Type): {vehicle.model || "Unknown"} ({vehicle.type || "Unknown"})</p>
            <p>Manufacturer: {vehicle.manufacturer || "Unknown" }</p>
            <p>Hyperdrive (Backup): Class {vehicle.primaryHyperdrive || "Unknown"} ({vehicle.backupHyperdrive || "-" })</p>
            <p>Sensor Range: {vehicle.sensorRange || "Unknown" }</p>
            <p>{vehicle.navicomputer ? <i className='fas fa-square-check' style={{'color': '#009900'}}></i> : <i className='fas fa-square-xmark' style={{'color': '#d60000'}}></i> } Navicomputer</p>
          </div>
        </div>
      </div>
      <div className='more-info'>
        <p>Cost (Rarity): {vehicle.cost || "Unknown"} ({vehicle.rarity || "Unknown"})</p>
        <p>Customization Hard Points: {vehicle.hardPoints || "Unknown"}</p>
        <p>Ship's Complement: {vehicle.complement?.total || "Unknown"}</p>
        <p>Passenger Capacity: {vehicle.passengers || "Unknown"}</p>
        <p>Encumbrance Capacity: {vehicle.encumbranceThreshold || "Unknown"}</p>
        <p>Fuel Capacity: {(vehicle.fuelThreshold || (3.125 * (2 ** vehicle.silhouette))) || "Unknown"}</p>
        <p>Consumables (count): {vehicle.consumables?.value || "Unknown"} {vehicle.consumables?.duration || "Days"} ({vehicle.consumables?.units || "Unknown Quantity"})</p>
      </div>
      <div className='vehicle-stats'>
        <div>
          <p>{vehicle.silhouette || "-"}</p>
          <p>Silhouette</p>
        </div>
        <div>
          <p>{vehicle.speed || "-"}</p>
          <p>Speed</p>
        </div>
        <div>
          <p>{vehicle.handling || "-"}</p>
          <p>Handling</p>
        </div>
        <div>
          <p>Def Fore/Port/Starboard/Aft</p>
          <p>{vehicle.defense.fore || "-"}</p>
          <p>{vehicle.defense.port || "-"}</p>
          <p>{vehicle.defense.starboard || "-"}</p>
          <p>{vehicle.defense.aft || "-"}</p>
        </div>
        <div>
          <p>Armor</p>
          <p>{vehicle.armor || "-"}</p>
        </div>
        <div>
          <p>HT Threshold</p>
          <p>{vehicle.hullTraumaThreshold || "-"}</p>
        </div>
        <div>
          <p>SS Threshold</p>
          <p>{vehicle.systemStrainThreshold || "-"}</p>
        </div>
      </div>
    </section>
  )
}