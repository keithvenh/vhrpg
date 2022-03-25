import { getFirebaseConfig } from '../../../config/firebase-config';
import { initializeApp } from 'firebase/app';

const app = initializeApp(getFirebaseConfig());

export default function Login() {
    console.log("INSIDE LOGIN FUNCTION");
}