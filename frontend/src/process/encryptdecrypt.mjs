import CryptoJS from 'crypto-js';
import { docSnap } from '../firebase/firebase';

// redefine to whatever key you want, follow AES key encryption rules. these are stock and are not safe
var key = "6268890F-9B58-484C-8CDC-34F9C6A9";
var iv = "6268890F-9B58-48";


function decryptAES(ciphertext, key, iv){
    var ciphertextWA = CryptoJS.enc.Hex.parse(ciphertext);
    var keyWA = CryptoJS.enc.Utf8.parse(key);
    var ivWA = CryptoJS.enc.Utf8.parse(iv);
    var ciphertextCP = { ciphertext: ciphertextWA };
    var decrypted = CryptoJS.AES.decrypt(
        ciphertextCP,
        keyWA, 
        { iv: ivWA }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
}


function encryptAES(plaintext, key, iv){
    var keyWA = CryptoJS.enc.Utf8.parse(key);
    var ivWA = CryptoJS.enc.Utf8.parse(iv);
    var encrypted = CryptoJS.AES.encrypt(
        plaintext,
        keyWA, 
        { iv: ivWA }
    );
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

console.log(docSnap);

// const encryptedData = encryptAES(stringtoencrypt,key,iv);
// console.log(encryptedData);
// const decryptedData = decryptAES(encryptedData,key,iv);
// console.log(decryptedData);
