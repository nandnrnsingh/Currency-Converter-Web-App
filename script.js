// API Link to currency value for USD to INR-->:  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json"
const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");  // dropdown class k selects ko select kr lo

const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

// for(Currcode in countryList){
//     console.log("country currency code , country code --->",  Currcode , countryList[Currcode])
// }

for(select of dropdowns)
{
    for(Currcode in countryList){
        let newoption = document.createElement('option');
        newoption.innerText = Currcode;
        newoption.value = Currcode;

        if(select.name === "from" && Currcode === "USD"){
            newoption.selected = "selected";
        }
        else if(select.name === "to" && Currcode === "INR"){
            newoption.selected = "selected";
        }

        select.append(newoption);
    }

    select.addEventListener("change" , (e) =>{
        updateFlag(e.target);
    })
}

const updateFlag = (element)=>{
    // console.log(element);
    let Currcode = element.value;
    // console.log(Currcode)
    let countryCode = countryList[Currcode];

    // change flag 
    let newSRC = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let image = element.parentElement.querySelector("img");
    image.src = newSRC;
}

btn.addEventListener("click" , async (event)=>{
    event.preventDefault();

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // console.log(amtVal);

    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    // console.log(fromCurr.value,toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let responce = await fetch(URL);
    // console.log(responce);

    let data = await responce.json();
    // console.log(data);

    let exchangeRate = data[toCurr.value.toLowerCase()];
    // console.log(exchangeRate)

    let finalAmount = amtVal * exchangeRate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})