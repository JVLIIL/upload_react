import React from 'react';
import { useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { ImageConfig } from '../../config/ImageConfig';
import uploadImg from '../../assets/upload.png';
import Point from '../../assets/point.png'
import './DropFileInput.css';


const DropFileInput = props => {
  

      const [FileList, setFileListe] = useState([]);  

      const wrapperRef = useRef(null);

      const onDragEnter = () => wrapperRef.current.classList.add('dragover');

      const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

      const onDrop = () => wrapperRef.current.classList.remove('dragover');

      const [seconds, setSeconds] = useState(0);

      const [milli, setMilli] = useState({});

  //const [time, settime] = useState([]);


          var dropTime = [];
  //const [min, setmin]= useState(0)

            const onFileDrop = (e) => {
                const newFile = e.target.files[0];
                      if (newFile) {
                        var fileTime = {
                              file: newFile,
                              dropTime: Date.now(),
                        }
                          var updatedList = [...FileList, fileTime];
                          setFileListe(updatedList);
                         // props.onfileChange(updatedList);
                         // dropTime = Date.now();
                         var temp= {}
                         if (!milli){
                          temp={...milli}
                         }
                         temp[FileList.length] = Date.now()-fileTime.dropTime
                          setMilli(temp)
                          console.log(milli);
                      }
            }
/*
            useEffect(()=>{
               setInterval(()=>{
                  console.log( milli )
                   if (FileList) {
                  //convertir en minute ou en second et affecter aux 
                      for(const item of FileList ) {
                        const copy = FileList.indexOf(dropTime);
                        milli  = Date.now()-copy
                      }    
                      
                    //setMilli(milli)
                  } 
               }, 5000)
            }, []);*/


           /* function tronquer(chaine, longueur) {
                if (chaine.length > longueur) 
                  return chaine.substring(0, longueur);
                else 
                  return chaine;
            };*/
  
            function conversion(valeur){
             
                  if(valeur >= 1073741824){
                    valeur= (valeur/1073741824).toFixed(2) + "Go"
                  }
                  else if(valeur >= 1048576){
                    valeur = (valeur/1048576).toFixed(2) + "Mo"
                  }
                  else if(valeur>=1024){
                    valeur = (valeur/1024).toFixed(2) + "ko"
                  }
                  else if(valeur == 1){
                    valeur = valeur + "byte"
                  }
                  else{
                    valeur = 0 + "byte"
                  }
                  return valeur;
            }

            const fileRemove = (fileTime) => {

              const updatedList = [...FileList];
                updatedList.splice(FileList.indexOf(fileTime), 1);
                  setFileListe(updatedList);
                 // props.onfileChange(updatedList);
                 //const milli = 1000;
                 milli.splice(milli.indexOf(fileTime), 1);
                   setMilli(milli)
            }


    return (
            <>
              <div  
                  ref={wrapperRef}
                  className='input'
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop} >

                        <div  className='label'>
                            <img src={uploadImg} alt="" />
                              <p>Click to browse or</p>
                              <p>drag and drop [expected files short description]</p>
                       </div>

                            <input type="file" value="" onChange={onFileDrop} />
              </div>
                <div className='ligne'></div>

          {
            FileList.length > 0 ? (
              <div className='preview'>
           
              {
                FileList.map((item, index) => (
                  <div key={index} className='item'>
                  
                    <img 
                      src={ImageConfig[item.file.type.split('/') [1]] 
                      || ImageConfig['default'] } alt="" className='img' />   
  
                        <div className='info' >
                                             
                            <div className='name'>  
                                  {item.file.name}
                            </div>
                            <div className='taille'>
                                {conversion(item.file.size)}
                                  </div>
                            </div>
                          
                          <span className='del' onClick={() =>fileRemove(item) } >
                                <img src={Point} className='point' />
                          </span>

                          <span className='time'>
                              
                          </span> <br></br>
                          
                        <span className='ligne2'></span> <br></br>
                      </div>
                    ))
             
                    }
              </div>
            ): null
      
          }

        <div className='foot'>
            <button className='button' onClick={()=>{
              alert(FileList + " have been transferred to the server")
            }}  > <h4>Upload</h4> </button>
            <p ></p>
        </div>
        
    </>
  )
  
}



export default DropFileInput;