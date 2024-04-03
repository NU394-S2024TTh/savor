// call processImage from extract.mjs
import processImage from "./extract.mjs";

processImage("receipt.jpg").then((res) => {
    console.log(res);
    console.log("Done");
})

console.log("Processing image...");