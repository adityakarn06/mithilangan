import Razorpay from 'razorpay';

const createRazorpayInstance = () => {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    return new Razorpay({
        key_id: key_id,
        key_secret: key_secret,
    })
}

export { createRazorpayInstance };