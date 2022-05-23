
import './App.css';
import { useEffect, useState } from 'react';
import * as apiCalls from './api';
import { Button, Modal } from 'antd';


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
      <ButtonModal />


      <Welcome />


      <AncestryList ancestryArray={ancestryArray} />

    </>
  );
}

const ButtonModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    console.log("showing modal somewhere")
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Label in App
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some ButtomModal 1 ...</p>
        <p>{props.label}</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};


function AncestryList(props) {

  //try <Recipe key={recipe.id} {...recipe} /> //spread operator instead of 
  // passing one-by-one property
  //In return statement you wrap Recipe JSX component with div class 'recipe-list'
  const elementJsx = props.ancestryArray.map(item => {
    return (
      <AncestryCard
        key={item._id}
        {...item}
      />

    )
  })

  return (
    <div className="recipe-list">
      {elementJsx}
    </div>
  );
}


function AncestryCard(props) {

  let labelArray = [];
  labelArray = props.label.split(':');

  return (
    <div className="recipe-card">
      <div className="ancestry-long-content">
        <h4>Hash Sequence</h4>
        <h4>{props.hashSeq}</h4>
      </div>
      <div className="recipe-card-content">
        <p className="ancestry-long-content">Label: <span className="ancestry-short-content">{labelArray[0]}</span></p>
        <p className="ancestry-long-content"><ButtonModal label={props.label} /></p>
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
    <>
      <h1>Ancestry</h1>

    </>

  )
}

export default App;
