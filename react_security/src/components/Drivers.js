import React, { useState, useEffect } from "react";
import facade from "./loginFacade";
import uuid from "uuid/v1";

function Drivers({ loggedIn, allDrivers, setAllDrivers }) {
    console.log("Drivers");

    const deleteDriverById = () => {
        if (loggedIn) {
            const getData = async () => {
                try {
                    var driverToDelete = Number(document.getElementById("driverToDelete").value);
                    console.log("driverToDelete", driverToDelete);
                    const deletingDriver = await facade.deleteDriver(driverToDelete);
                    console.log("Deleting Driver", deletingDriver);
                    const driverData = await facade.fetchAllDrivers();
                    console.log("driverData", driverData);
                    setAllDrivers(driverData);
                } catch (e) {
                    console.log("err", e);
                }
            };
            getData();
        }
      };
    const editDriver = () => {
        if (loggedIn) {
            
            const getData = async () => {
                try {
                    var driverToEditId = Number(document.getElementById("driverToEdit").value);
                    var driverToEditName = {
                        firstName: document.getElementById("driverToEditFirstName").value, 
                        lastName: document.getElementById("driverToEditLastName").value
                    };
                    const editingDriver = 
                    await facade.editDriver(driverToEditId, driverToEditName);
                    console.log("Editing Driver", editingDriver);
                    const driverData = await facade.fetchAllDrivers();
                    console.log("driverData", driverData);
                    setAllDrivers(driverData);
                } catch (e) {
                    console.log("err", e);
                }
            };
            getData();
        }
      };
      const createDriver = () => {
        if (loggedIn) {
            
            const getData = async () => {
                try {
                    var driverToCreateName = {
                        firstName: document.getElementById("driverToCreateFirstName").value, 
                        lastName: document.getElementById("driverToCreateLastName").value
                    };
                    const creatingDriver = 
                    await facade.createDriver(driverToCreateName);
                    console.log("Creating Driver", creatingDriver);
                    const driverData = await facade.fetchAllDrivers();
                    console.log("driverData", driverData);
                    setAllDrivers(driverData);
                } catch (e) {
                    console.log("err", e);
                }
            };
            getData();
        }
      };

    if(facade.getRole() === "admin"){
        return (
        <div>
        <h3>Drivers</h3>
        <table>
            <thead><tr><td><b>Name</b></td></tr></thead>
             <tbody>
                {allDrivers.map((driver) => (
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
        <h3>Drivers</h3>
        <hr />
        <table>
            <thead><tr><td><b>Driver Id</b></td><td><b>First name</b></td><td><b>Last name</b></td><td><b>Truck name</b></td></tr></thead>
             <tbody>
                {allDrivers.map((driver) => (
                    <tr key={uuid()}>
                        <td>{driver.id}</td>
                        <td>{driver.firstName}</td>
                        <td>{driver.lastName}</td>
                        <td>{driver.trucks[0].name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <hr />
        <select id="driverToDelete">
            <option> - select a Driver to delete - </option>
            {allDrivers.map((driver) => {
            return <option key={uuid()} value={driver.id}>{driver.id} - {driver.firstName}</option>;
            })};
        </select>
        <button onClick={deleteDriverById} >Delete Driver</button>
        <hr />
        <select id="driverToEdit">
            <option> - select a Driver to edit - </option>
            {allDrivers.map((driver) => {
            return <option key={uuid()} value={driver.id}>{driver.id} - {driver.firstName}</option>;
            })};
        </select>
            <input placeholder="First name" type="text" id="driverToEditFirstName"/>
            <input placeholder="Last name" type="text" id="driverToEditLastName"/>
            <button onClick={editDriver} >Edit Driver</button>
        <hr />
            <input placeholder="First name" type="text" id="driverToCreateFirstName"/>
            <input placeholder="Last name" type="text" id="driverToCreateLastName"/>
            <button onClick={createDriver} >Create Driver</button>
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

export default Drivers;