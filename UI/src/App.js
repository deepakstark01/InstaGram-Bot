import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
// import ReactToExcel from 'react-html-table-to-excel';
import * as XLSX from "xlsx";

function App() {
  const [items, setItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);
//   const handleDelete = (items,setItems) => {
//     setData(data.filter((v, i) => i !== index));
// };
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      console.log(d);
      setItems(d);
    });
  };

  const handleChecked = (e) => {
    let newState = selectedRows;
    const checkbox = e.currentTarget;
    const data = checkbox.getAttribute('data-key');
    console.log(checkbox.checked);
    if(checkbox.checked) {
     newState = [...newState, data];           
    } else {
      newState = newState.filter(item => item !== data)
    }
    return setSelectedRows(newState);
  }

  const handleAllChecked = (e) => {
    let newState = selectedRows;
    const checkbox = e.currentTarget;
    const elements = document.querySelectorAll('.loopCheck');
    if(checkbox.checked) {
      elements.forEach(el => {
        // el.setAttribute('checked', true);
        const data = el.getAttribute('data-key');
        newState = [...newState, data];  
      })
            
    } else {
      elements.forEach(el => {
        // el.removeAttribute('checked');        
        newState = [];  
      })
    }
    setSelectedRows(newState);

  }

  


  const exportData = (data, filename) =>
    {
               
        var ws = XLSX.utils.json_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "People");
        XLSX.writeFile(wb,filename);
     }

  
  const handleDelete = () => {
    var result = window.confirm("Do you Want to delete those followers?");
    if (result) {
              //Logic to delete the item
        const newData = items.filter((item, index) => selectedRows.findIndex(x => x === item.UserIds) === -1)
        
        exportData(newData, 'userData.xlsx');
    }

    return false;
  }
  
  
  return (

    
    <div>
          
    <div class="custom-file input-group mb-3" >
    <input type="file" class="custom-file-input" id="inputGroupFile01"
    
    onChange={(e) => {
      
      const file = e.target.files[0];
      readExcel(file);
      var namefile = e.target.files[0].name;
      document.getElementById('label-name').innerHTML=namefile;
      
    }}/>
    <label class="custom-file-label" id="label-name" for="inputGroupFile01">choose file</label>
   
  </div>
  
  <div className="form-check checkCs">
  <button type="button" onClick={handleDelete} class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">Delete </button>
  <input onChange={handleAllChecked} className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label className="form-check-label" for="flexCheckDefault">
    Select All
  </label>
</div>

      <table className="table container">
        <thead>
          <tr className="mt-4" >
            <th scope="col">S.No</th>
            <th scope="col">Profile pic</th>
            <th scope="col">Name</th>
            <th scope="col">Follower</th>
            <th scope="col">Following</th>
          </tr>
        </thead>
        <tbody>
          
          {items.map((d, key) => (
            
            <tr key={key + 1}>
              <th>{`${key+1}`}</th>
              <th>
              {/* <img className="profileImg" src={require(`./image/image${key+1}.jpeg`)} alt="profile" */}
              <img className="profileImg" src={require(`./image/image${key+1}.jpg`)} alt="profile"
              width="71" 
              height="71" />
              </th>
              
              <th>{d.UserIds}</th>
              <td>{d.Follower}</td>
              <td>{d.Following}</td>
              <input data-key={d.UserIds} checked={selectedRows.findIndex(x => x === d.UserIds) !== -1 ? true : false} onChange={handleChecked} className="form-check-input loopCheck " type="checkbox" value="" id="flexCheckDefault"/>
              
              
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
