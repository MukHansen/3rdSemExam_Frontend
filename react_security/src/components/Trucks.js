import React, { useState, useEffect } from "react";
import facade from "./loginFacade";
import uuid from "uuid/v1";

function Trucks({ loggedIn, allTrucks, setAllTrucks }) {
    console.log("Trucks");

    if(facade.getRole() === "admin"){
        return (
        <div>
        <h3>Drivers</h3>
        <table>
            <thead><tr><td><b>Name</b></td></tr></thead>
             <tbody>
                {allTrucks.map((driver) => (
                    <tr key={uuid()}>
                        <td>{driver.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        {/* <hr />
        <select id="hobbyToDelete">
            <option> - select a Hobby to delete - </option>
            {allDrivers.map((hobby) => {
              return <option key={uuid()}>{hobby.name}</option>;
            })};
        </select>
        <button onClick={deleteDriverByName} >Delete Hobby</button>
        <hr />
        <input placeholder="HobbyName" type="text" id="hobbyToEditName" />
        <input placeholder="HobbyDescription" type="text" id="hobbyToEditDescription" />
        <button onClick={addEditDriver} >Add/Edit Hobby</button>
        <hr /> */}
        </div>
        )     
    } else if(facade.getRole() === "user"){
        return (
        <div>
        <h3>Trucks</h3>
        <hr />
        <table>
            <thead><tr><td><b>Truck Id</b></td><td><b>Truck name</b></td><td><b>Capacity</b></td></tr></thead>
             <tbody>
                {allTrucks.map((truck) => (
                    <tr key={uuid()}>
                        <td>{truck.id}</td>
                        <td>{truck.name}</td>
                        <td>{truck.capacity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <hr />
        </div>
        )     
    } else {
        return (
        <div>
            <h2> Please login to view data</h2>
        </div >
        )
    }
}

export default Trucks;