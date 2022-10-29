import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
//import Button from '../../../components/Button';
// import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from './PaymentForm.module.css';
// import { useToast } from '@chakra-ui/react';
import { toast } from "react-hot-toast";
import { useSelector } from 'react-redux';
export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  
 
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const fetchMeetingURL = async () => {
    // following url will change once deployed
    const { url } = await fetch('http://localhost:5500/meeting').then((res) =>
      res.json()
    );
    return url;
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    //if user is not logged in, redirect to login
    if (currentUser === null) {
      // navigate('/login');
      toast({
        title: 'Please login for payment',
        position: 'top',
        variant: 'subtle',
        isClosable: true,
        status: 'warning',
      });
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 30000 }),
    }).then((res) => res.json());

    console.log(response);

    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser.email,
        },
      },
    });

    setLoading(false);

    if (paymentResult.error) {
      toast({
        title: paymentResult.error.message,
        position: 'top',
        status: 'warning',
        isClosable: true,
      });
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        toast({
          title: 'Payment successful.',
          description: 'Check your slots.',
          position: 'top',
          status: 'success',
          isClosable: true,
        });
        const meetingUrl = await fetchMeetingURL();
        console.log(meetingUrl);
      }
    }
  };

  return (
    <>
      <div className={styles.checkoutContainer}>
        <h1 className={styles.heading}>Checkout</h1>
        <h2 style={{ fontWeight: 'var(--fw-bold)' }}>Credit Card Payment :</h2>
        <form onSubmit={paymentHandler} className={styles.form}>
          <CardElement />
          <div style={{ marginBlockEnd: '1.5em' }}></div>
          <button type='submit' disabled={loading}>
            Pay Now
          </button>
        </form>
      </div>
    </>
  );
}
