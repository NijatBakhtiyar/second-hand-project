import React from "react";
import { useQuery } from "react-query";
import { ToastContainer } from "react-toastify";

import SkeletonLoader from "../constants/SkeletonLoader";
import { API, Service } from "../data/service";
import NoImage from "../images/Png/NoImage.jpg";
import styles from "../pages/Account.module.scss";
import BuyProductModal from "./BuyProductModal";

function GivenOffers({ givenOffersQuery }) {
  const newOffers = givenOffersQuery.data?.filter(offer => offer.product)

  // useQuery(["deleteOfferNew"], () => Service.deleteOfferNew)
  return (
    givenOffersQuery.isLoading ?
      <SkeletonLoader style="detail" /> :
      <>
        {newOffers?.map((offer) => (
          <div className={styles.card} key={offer.id}>
            <ToastContainer
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              autoClose={2000}
            />
            <div className={styles.left}>
              <img
                src={offer.product?.image?.url ? `${API}${offer.product.image.url}` : NoImage}
                alt={offer.product?.name}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.info}>
                <p>{offer.product?.name}</p>
                <span>
                  Verilen Teklif:{" "}
                  <span className={styles.price}>{offer.offerPrice} TL</span>
                </span>
              </div>
              <div className={styles.btns}>
                {
                  offer.product?.isSold ?
                    <p className={styles.bought}>Satın Alındı</p> :
                    offer.isStatus === null ? "" :
                      offer.isStatus === true ?
                        <>
                          <BuyProductModal product={offer.product} />
                          <p className={styles.accept}>Onaylandı</p>
                        </> :
                        <p className={styles.reject}>Reddedildi</p>
                }

                {/* {offer.product?.isSold ? (
                <p className={styles.accept}>Onaylandı</p>
              ) : (
                <BuyProductModal product={offer.product} />
              )} */}
              </div>
            </div>

          </div>
        ))}
      </>
  )
}

export default GivenOffers;
