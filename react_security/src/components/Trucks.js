import React, { useState, useEffect } from "react";
import facade from "./loginFacade";
import uuid from "uuid/v1";

function Trucks({ loggedIn, allTrucks, setAllTrucks }) {
    console.log("Trucks");

    if(loggedIn){
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