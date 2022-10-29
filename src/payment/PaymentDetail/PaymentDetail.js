import React, { useState } from 'react';
import styles from './PaymentDetail.module.css';

export default function PaymentDetail() {
  return (
    <>
      <div className={styles.expertList}>
        <div className={styles.expertCard}>
          <div className={styles.description}>
            <h3>Varun Agrawal</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>
          <div className={styles.slot}>
            <p className={styles.time}>6:00pm - 6:30pm</p>
            <p className={styles.date}>30 Jul 2022 (Saturday)</p>
          </div>
        </div>
      </div>
    </>
  );
}
