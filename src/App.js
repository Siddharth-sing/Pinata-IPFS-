import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { uploadFileToIPFS, uploadJSONToIPFS } from './pinata';

function App() {

  const [assetName, setAssetName] = useState("");
  const [imageChosen, setImageChosen] = useState("");
  const [desc, setDesc] = useState("");
  

  function uploadJsonMetadata(s) {
    const myJSON = {
      name: assetName,
      description: desc,
      image: s,
    };
    const jsonString = JSON.stringify(myJSON);
    console.log(jsonString);

    document.getElementById("name").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("image").value = "";

    uploadJSONToIPFS(jsonString).then(r => console.log(r));


  }

  function uploadImage() {
    console.log("Uploading");
    uploadFileToIPFS(imageChosen).then(function (r) {
      console.log("Printing = ",r);
      uploadJsonMetadata(r.pinataURL);
    });
  }


  return (
    <div className="App">
      <h1 style={{ color: "blue" }}>IPFS-Pinata Trial</h1>
      <form>
        <label> Name NFT__
          <input
            id = "name"
            type="text"
            onChange={(e) => setAssetName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Description__
          <input
            id = "desc" 
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>Choose an Image
          <br />
          <input
            id = "image"
            type="file"
            onChange={(e) => {
              setImageChosen(e.target.files[0]);
            }}
          />
        </label>
        <br />
        <br />
      </form>
      <button onClick={uploadImage}>upload</button>

    </div>
  );
}

export default App;
