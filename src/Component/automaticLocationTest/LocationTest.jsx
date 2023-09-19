import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LocationTest() {
  const [districts, setDistricts] = useState([]);
  const [inputDistrict, setInputDistrict] = useState('');
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [areas, setAreas] = useState([]);
console.log("inputDistrict",inputDistrict);
console.log("selectedZone",selectedZone);
console.log("selectedArea",selectedArea);
  // Fetch unique districts when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/unique-districts')
      .then(response => {
        setDistricts(response.data);
      })
      .catch(error => {
        console.error('Error fetching unique districts:', error);
      });
  }, []);

  useEffect(() => {
    if (inputDistrict) {
      axios.get(`http://localhost:5000/zones?district=${encodeURIComponent(inputDistrict)}`)
        .then(response => {
          setZones(response.data);
          console.log("response.data", response.data);
        })
        .catch(error => {
          console.error('Error fetching zones:', error);
          setZones([]);  // Optionally, clear zones if the fetch fails
        });
    } else {
      setZones([]); // Clear zones if the district is not selected
      setAreas([]); // Clear areas as well, as they depend on the zone
    }
  }, [inputDistrict]);
  
    // Fetch areas based on selected zone
    useEffect(() => {
      if (selectedZone) {
        axios.get(`http://localhost:5000/areas/${encodeURIComponent(selectedZone)}`)
          .then(response => {
            setAreas(response.data);
          })
          .catch(error => {
            console.error('Error fetching areas:', error);
            setAreas([]);  // Optionally, clear areas if the fetch fails
          });
      } else {
        setAreas([]); // Clear areas if the zone is not selected
      }
    }, [selectedZone]);

  return (
    <div>
  
      <select
        value={inputDistrict}
        onChange={e => setInputDistrict(e.target.value)}
      >
        <option value="">Select District</option>
        {districts.map(d => <option key={d} value={d}>{d}</option>)}
      </select>

      <select onChange={e => setSelectedZone(e.target.value)}>
        <option value=''>Select Zone</option>
        {zones.map(z => <option key={z} value={z}>{z}</option>)}
      </select>

      <select  onChange={e => setSelectedArea(e.target.value)}>
        <option value=''>Select Area</option>
        {areas.map(a => <option key={a} value={a}>{a}</option>)}
      </select>
    </div>
  );
}

export default LocationTest;
