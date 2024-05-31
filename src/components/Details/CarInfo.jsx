import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from './CarInfo.module.css';

function CarInfo({ carData, carPictures }) {
  console.log('CarData:', carData, 'CarPictures:', carPictures);



  
  return (
    <div className="bg-white">
      <div className={`container ${styles.container}`}>
        <div className="row">
          {/* Image gallery */}
          <div className="col-lg-8">
            <Carousel>
              {carPictures.map((image) => (
                <Carousel.Item key={image.picture_id}>
                  <img
                    src={image.url}
                    alt={image.picture_id}
                    className={`d-block w-100 ${styles.imageGallery}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          {/* Product info */}
          <div className={`col-lg-4 ${styles.productInfo}`}>
            <h1 className="display-4">{carData.brand}</h1>
            <p className="display-5">{carData.daily_price} TL / day</p>

            <div className={styles.mt4}>
              <h3 className="sr-only">Description</h3>

              <div className={styles.textMuted}>
                <div className={styles.dFlex}>
                  <strong className={styles.me2}>Brand:</strong>
                  <span>{carData.model}</span>
                </div>
                <div className={styles.dFlex}>
                  <strong className={styles.me2}>Year:</strong>
                  <span>{carData.year}</span>
                </div>
                <div className={styles.dFlex}>
                  <strong className={styles.me2}>Availability:</strong>
                  <span>{carData.availability ? 'Available' : 'Not Available'}</span>
                </div>
              </div>
            </div>

            {/* <form className={styles.mt4}>
              <button
                type="submit"
                className={`btn btn-primary btn-lg w-100 ${styles.btnPrimary}`}
              >
                BOOK NOW
              </button>
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarInfo;
