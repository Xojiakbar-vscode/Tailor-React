// components/CatalogModal.jsx
import React from 'react';
import { Modal } from 'react-bootstrap';
import KatalogIcon from '../../images/Katalog.png';
import CatalogImage from '../../images/Catalogmod.png';
import './CatalogModal.css'

const CatalogModal = ({ show, onHide }) => {
  const leftColumnItems = [
    "Sostavnik va razmerlar",
    "Markelar va zapaslar",
    "Dazmol machalkalar",
    "Kesadigan apparatlar",
    "Himikat va spreyles",
    "Maxsus tikuv iplari",
    "Termoprinterlar",
    "Tikuv iplari",
    "Dazmollar",
    "Qisqichlar",
    "Tugmalar",
    "Zamoklar",
    "Pistonlar",
    "Rezinka",
    "Ninalar",
    "Flizilin"
  ];

  const rightColumnItems = [
    "Qaychilar",
    "Parraklar",
    "Jensi iplar",
    "Lazerlar va chiroqlar",
    "Steplerlar",
    "Tikuv mashina zapchastlari",
    "Arqonlar",
    "Qurilma va asboblar",
    "Meto apparatlar",
    "Kantovkalar"
  ];

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      fullscreen
      aria-labelledby="catalogModalLabel"
      className="catalog-modal"
    >
      <div style={{ backgroundColor: 'white', color: 'black', padding: "2rem 0" }}>
        <Modal.Header>
          <Modal.Title id="catalogModalLabel" className="catalog-modal-title">
           
           <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> <img 
              src={KatalogIcon} 
              alt="Katalog" 
              className="catalog-title-icon"
            />
            <h1>Katalog</h1>
            </div>
          </Modal.Title>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onHide} 
            aria-label="Close"
          />
        </Modal.Header>

        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              {/* Left Column - Catalog List */}
              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-6">
                    <ul className="catalog-list">
                      {leftColumnItems.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-sm-6">
                    <ul className="catalog-list">
                      {rightColumnItems.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <img 
                  src={CatalogImage} 
                  alt="Katalog rasmi" 
                  className="img-fluid catalog-image"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default CatalogModal;