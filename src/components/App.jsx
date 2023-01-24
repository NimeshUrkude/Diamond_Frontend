import React, { useState } from "react";
import * as tf from '@tensorflow/tfjs';

import errors from "./errors.png";
import loss_epochs from "./loss_epochs.png";
import model_layers from "../components/model_layers.png";
import predict_real from "./predict_real.png";


import "./appstyle.css"

function App() {

  //ans
  const[ans,setans]=useState("");

  //model
  const [fmodel,setfmodel]=useState(null);

  //final
   const[alldata,setalldata]=useState([])

   //carat
   const[carat,setcarat]=useState(0.1);

  //quality
  const[clarity,setclarity]=useState("1");
  const[clarityshow,setclarityshow]=useState("Fair");
  function clarityfun(e){
    setclarityshow(e.target.value);
    switch(e.target.value){
      case "Fair":
        setclarity(1);
        break;
      case "Good" :
        setclarity(2);
        break;
      case "Ideal" :
        setclarity(3);
        break;
      case "Premium" :
        setclarity(4);
        break;
      case "Very Good" :
        setclarity(5); 
        break;  
      default:
        //            
    }
  }


  //color
  const[color,setcolor]=useState("1");
  const[colorshow,setcolorshow]=useState("D");
  function colorfun(e){
    setcolorshow(e.target.value);
    switch(e.target.value){
      case "D":
        setcolor(1);
        break;
      case "E" :
        setcolor(2);
        break;
      case "F" :
        setcolor(3);
        break;
      case "G" :
        setcolor(4);
        break;
      case "H" :
        setcolor(5); 
        break;
      case "I" :
        setcolor(6);
        break;
      case "J" :
        setcolor(7); 
        break;
      default:
        //    
    }
  }

  //QUALITY
  const[quality,setquality]=useState("1");
  const[qualityshow,setqualityshow]=useState("I1");
  function qualityfun(e){
    setqualityshow(e.target.value);
     switch(e.target.value){
       case "I1":
        setquality(1);
        break;
       case "IF" :
        setquality(2);
        break;
       case "SI1" :
        setquality(3);
        break;
       case "SI2" :
        setquality(4);
        break;
       case "VS1" :
        setquality(5); 
        break;
      case "VS2" :
        setquality(6);
        break;
      case "VVS1" :
        setquality(7); 
       break;
      case "VVS2" :
        setquality(8); 
        break;
      default:
        //  
  
    }
  } 

  const btnn = async()=>{
    setalldata([]);

    setalldata(olddata=>[...olddata,parseFloat(carat)]);

    var i =clarity;
    for(i=clarity;i>1;i--){setalldata(olddata=>[...olddata,0.0]);}
    setalldata(olddata=>[...olddata,1.0]);
    for(i=5-clarity;i>=1;i--){setalldata(olddata=>[...olddata,0.0]);}

    i =color;
    for(i=color;i>1;i--){setalldata(olddata=>[...olddata,0.0]);}
    setalldata(olddata=>[...olddata,1.0]);
    for(i=7-color;i>=1;i--){setalldata(olddata=>[...olddata,0.0]);}

    i =quality;
    for(i=quality;i>1;i--){setalldata(olddata=>[...olddata,0.0]);}
    setalldata(olddata=>[...olddata,1.0]);
    for(i=8-quality;i>=1;i--){setalldata(olddata=>[...olddata,0.0]);}

    const modell = await tf.loadLayersModel("https://raw.githubusercontent.com/NimeshUrkude/Diamond_Regression_Model/main/model.json");
   setfmodel(modell);
  }
            
  const pree = async()=>{
    console.log(alldata);
    const tensor = tf.tensor([alldata]);
    const prediction = await fmodel.predict(tensor);
    setans(prediction.dataSync());
    setalldata([]);
  }




  return(
    <div className="app_div">
      <p className="app_heading">Diamond Value Finder</p>
      <div className="flexcenter">
        <div className="form">
          <input className="form__input" id="carat" value={carat} onChange={e => setcarat(e.target.value)} type="number" min="0.1"/>
          <label className="form__label" htmlFor="carat">Carat</label>
        </div>
      </div>
      <div className="flexcenter">
        <div className="form">
          <select className="form__input form__select" id="clarity" value={clarityshow} onChange={clarityfun}>
            <option value="Fair">Fair</option>
            <option value="Good">Good</option>
            <option value="Ideal">Ideal</option>
            <option value="Premium">Premium</option>
            <option value="Very Good">Very Good</option>
          </select>
          <label className="form__label" htmlFor="clarity">Cut</label>
        </div>
        <div className="form">
          <select className="form__input form__select" id="color" value={colorshow} onChange={colorfun}>
            <option className="hh" value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="H">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
          </select>
          <label className="form__label" htmlFor="color">color</label>
        </div>
        <div className="form">
          <select className="form__input form__select" id="quality" value={qualityshow} onChange={qualityfun}>
            <option value="I1">I1</option>
            <option value="IF">IF</option>
            <option value="SI1">SI1</option>
            <option value="SI2">SI2</option>
            <option value="VS1">VS1</option>
            <option value="VS2">VS2</option>
            <option value="VVS1">VVS1</option>
            <option value="VVS2">VVS2</option>
          </select>
          <label className="form__label" htmlFor="quality">Clarity</label>
        </div>
      </div>
      <div className="flexcenter">
        <button className="btn btn-outline-light app_btn" onClick={btnn}>Load Data</button>
        <button className="btn btn-outline-light app_btn" onClick={pree}>Prediction</button>
      </div>
      <p className="app_prediction">{Math.floor(ans)} $</p>
      <div className="app_details">
        <p className="details_heading">This is a Regression Model on Basic on Tensorflow The <a className="details_a" href="https://www.kaggle.com/datasets/shubhankitsirvaiya06/diamond-price-prediction">DataSet</a> is from Kagel by SHUBHANKIT SIRVAIYA</p>
        <div className="row">
          <div className="col-md-6 col-sm-12 inner_row">
            <img alt="Model Layers" src={model_layers} className="details_img"/>
            <p className="details_p">Model Layers</p>
          </div>
          <div className="col-md-6 col-sm-12 inner_row">
            <img alt="Loss Vs Epochs Graph" src={loss_epochs} className="details_img"/>
            <p className="details_p">Loss Vs Epochs Graph</p>
          </div>
          <div className="col-md-6 col-sm-12 inner_row">
            <img alt="Errors" src={errors} className="details_img"/>
            <p className="details_p">Errors</p>
          </div>
          <div className="col-md-6 col-sm-12 inner_row">
            <img alt="Predict VS Real Graph" src={predict_real} className="details_img"/>
            <p className="details_p">Predict VS Real Graph</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
