let totalBalance = Number(localStorage.getItem("balance")) || 0;

let balance = document.querySelector("#balance");
balance.innerText = `₹${totalBalance}`;
let landing = document.querySelector(".page1");

let main = document.querySelector(".page2");
let about = document.querySelector(".about");
let features = document.querySelector(".features");
let line1 = document.querySelector(".line1");
let line2 = document.querySelector(".line2");
let line3 = document.querySelector(".line3");
let home = document.querySelector("#home");
let AddIncomeBox = document.querySelector(".AddIncomeBox")
let amountInput = document.querySelector("#AmountIp");
let transactions =document.querySelector("#transactions")
let allTransactions =
    JSON.parse(localStorage.getItem("transactions")) || [];
let tiger =0;
let transaction= "None"
let transactionfirst= 0
transactions.innerHTML = "";

allTransactions.forEach((item) => {
    if (item.type === "income") {
        transactions.innerHTML +=
            `<br> - ₹${item.amount} Credited`;
    } else {
        transactions.innerHTML +=
            `<br> - ₹${item.amount} Debited`;
    }
});
function hideAllPages() {
    landing.classList.add("hidden");
    main.classList.add("hidden");
    about.classList.add("hidden");
    features.classList.add("hidden");
}
function HomePage() {
        hideAllPages();
AddClasslist(home);
AddClasslistHidden(line3);

AddClasslistHidden(line2);
RemoeClasslistHidden(line1)

}
function landingPage() {
    hideAllPages();
    landing.classList.remove("hidden");
}
function featuresPage() {
hideAllPages();
features.classList.remove("hidden")
AddClasslist(features);
AddClasslistHidden(line1);

AddClasslistHidden(line3);
RemoveClasslistHidden(line2)

  
}
function aboutPage() {
AddClasslist(about);
AddClasslistHidden(line1);

AddClasslistHidden(line2);
RemoveClasslistHidden(line3)
RemoveClasslistClicked(home)
RemoveClasslistClicked(features)
}
function AddClasslist(name) {
  name.classList.add("clicked");
}
function AddClasslistHidden(name) {
  name.classList.add("hidden");
}
function RemoveClasslistHidden(name) {
  name.classList.remove("hidden");
}
function RemoveClasslistClicked(name) {
  name.classList.remove("clicked");
}
document.getElementById("getsrt").addEventListener("click", (e) => {
  landing.classList.add("hidden");
  main.classList.remove("hidden");
});
document.getElementById("getsrt1").addEventListener("click", (e) => {
  landing.classList.add("hidden");
  main.classList.remove("hidden");
});

document.querySelector("#home").addEventListener("click", (e) => {
  HomePage();
});
document.querySelector("#features").addEventListener("click", (e) => {
  featuresPage();
});
document.querySelector("#about").addEventListener("click", (e) => {
  aboutPage();
});
function AddIncome() {

  AddIncomeBox.classList.remove("none")
tiger=1;

    amountInput.value = "";
 amountInput.focus();
}
function Addbtn(e){
     e.preventDefault();

    let amount = Number(amountInput.value);

  

if (tiger==1){
    totalBalance += amount;

    balance.innerText = `₹${totalBalance}`;
    localStorage.setItem("balance", totalBalance);
 allTransactions.push({
    type: "income",
    amount: amount
});

localStorage.setItem(
    "transactions",
    JSON.stringify(allTransactions)
);

transactionsftn("income", amount);
    amountInput.value = "";
    
    AddIncomeBox.classList.add("none");
  }
  else{
    if (amount<=totalBalance) {
    totalBalance -= amount;
allTransactions.push({
    type: "expense",
    amount: amount
});

localStorage.setItem(
    "transactions",
    JSON.stringify(allTransactions)
);

transactionsftn("expense", amount);
  balance.innerText = `₹${totalBalance}`;
  amountInput.value = "";
  localStorage.setItem("balance", totalBalance);
  
  AddIncomeBox.classList.add("none");
}
else{
  alert("expense is greater than ur wallet money")
}
}}

function CancelBtn(){
  AddIncomeBox.classList.add("none")
  
}
function Expensededuct() {
  AddIncomeBox.classList.remove("none")
  tiger=0;

    amountInput.value = "";
   amountInput.focus();
}

function transactionsftn(type, amt) {

    if (type === "income") {
        transactions.innerHTML +=
            `<br> + ₹${amt} Credited`;
    }
    else {
        transactions.innerHTML +=
            `<br> - ₹${amt} Debited`;
    }

}