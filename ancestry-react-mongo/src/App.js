
import './App.css';
import { useEffect, useState } from 'react';
import * as apiCalls from './api';

function App() {
  const [ancestryArray, setAncestryArray] = useState([]);

  const loadData = async () => {
    const ancestryData = await apiCalls.getAncestryData();
    setAncestryArray(ancestryData);
  }

  useEffect(() => {
    loadData();
  }, []);


  return (
    <>
      <Welcome />

      <AncestryList ancestryArray={ancestryArray} />

    </>
  );
}
function AncestryList(props) {
  
  //try <Recipe key={recipe.id} {...recipe} /> //spread operator instead of 
  // passing one-by-one property
  //In return statement you wrap Recipe JSX component with div class 'recipe-list'
  const elementJsx = props.ancestryArray.map( item => (
    <AncestryCard 
       key={item._id}
       {...item}
       />
  ))

  return (
    <div className="recipe-list">
      {elementJsx}
    </div>
  );
}
 
 
function AncestryCard(props) {

    return (
      <div className="recipe-card">
        <div className="ancestry-long-content">
          <h4>Hash Sequence</h4>
          <h4>{props.hashSeq}</h4>
        </div>
        <div className="recipe-card-content">
          <p className="ancestry-long-content">Label: {props.label}</p>
          <h4 className="recipe-title">cDNA Sequence:</h4>
          <div className="ancestry-long-content" >
            <p>{props.seq}</p>
          </div>
          <h4>Hash Sequence</h4>
          <p className="ancestry-long-content">{props.hashSeq}</p>
          {/* <button type="button" onClick={() => alert(`Are you sure to DELETE recipe number ${_id}?`)}>DELETE</button> */}
          <button type="button" onClick={() => props.onDelete(props._id)}>DELETE</button>
        </div>
      </div>
    );  
}

function Welcome() {
  return (
    <h1>Ancestry</h1>
  )
}

export default App;
