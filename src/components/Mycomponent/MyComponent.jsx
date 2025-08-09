import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import truckAnimation from '../../assets/obhaJb5us8.json'; // Lottie JSON fayl
import dropDown from "../../assets/oG99I91tLW.json"

const MyComponent = () => {
  return (
    <div style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "30px"
    }}>


      {/* Lottie animatsiya */}
      <Player
        autoplay
        loop
        src={truckAnimation}
        style={{ height: '300px', width: '300px' }}
      />
       <Player
        autoplay
        loop
        src={dropDown}
        style={{ height: '300px', width: '300px' }}
      />
    </div>
  );
};

export default MyComponent;
