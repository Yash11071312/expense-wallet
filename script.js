let totalBalance = Number(localStorage.getItem("balance")) || 0;

let balance = document.querySelector("#balance");
balance.innerText = `₹${totalBalance}`;
let landing = document.querySelector(".page1");
let reasonInput = document.querySelector("#reason");
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
    transactions.innerHTML += createTransactionCard(item);
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
    reasonInput.value = "";
 amountInput.focus();
}
function Addbtn(e){
     e.preventDefault();

    let amount = Number(amountInput.value);
    if (amount <= 0 || isNaN(amount)) {
    alert("Please enter a valid amount.");
    return;
}
    let reason = reasonInput.value.trim();

  

if (tiger==1){
    totalBalance += amount;

    balance.innerText = `₹${totalBalance}`;
    localStorage.setItem("balance", totalBalance);
    if (reason === "") {
    reason = "Income";
}
 allTransactions.push({
    type: "income",
    amount: amount,
    reason: reason,
    date: new Date().toLocaleDateString()
});

localStorage.setItem(
    "transactions",
    JSON.stringify(allTransactions)
);

transactionsftn("income", amount,reason);
    amountInput.value = "";
     reasonInput.value = "";
    AddIncomeBox.classList.add("none");
  }
  else{
    if (amount<=totalBalance) {
    totalBalance -= amount;
    if (reason === "") {
    reason = "Expense";
}
allTransactions.push({
    type: "expense",
    amount: amount,
    reason: reason,
    date: new Date().toLocaleDateString()
});

localStorage.setItem(
    "transactions",
    JSON.stringify(allTransactions)
);

transactionsftn("expense", amount,reason);
  balance.innerText = `₹${totalBalance}`;
  amountInput.value = "";
   reasonInput.value = "";
  localStorage.setItem("balance", totalBalance);
  
  AddIncomeBox.classList.add("none");
}
else{
  alert("expense is greater than ur wallet money")
}
}}

function CancelBtn() {
    AddIncomeBox.classList.add("none");
    amountInput.value = "";
    reasonInput.value = "";
}
function Expensededuct() {
  AddIncomeBox.classList.remove("none")
  tiger=0;

    amountInput.value = "";
     reasonInput.value = "";
   amountInput.focus();
}

function transactionsftn(type, amt,reason) {
    let today = new Date().toLocaleDateString();
    if (type === "income") {
         transactions.innerHTML += createTransactionCard({
        type: type,
        amount: amt,
          reason: reason,
        date: today
    });

    }
    else {
        transactions.innerHTML += createTransactionCard({
        type: type,
    
        amount: amt,
          reason: reason,
        date: today
    });
    }

}
function ResetWallet() {
 
 if(confirm("Are you sure you want to reset your wallet?")) {
    localStorage.removeItem("balance");
    localStorage.removeItem("transactions");
    totalBalance = 0;
allTransactions = [];
balance.innerText = "₹0";
transactions.innerHTML =
`
<p>No transactions yet.</p>
`;
return;
  } 
  return;
}
function createTransactionCard(item) {

    if(item.type === "income"){

        return `
        <div class="transaction">
            <div>
           <h4>💰 ${item.reason}</h4>
                <small>${item.date}</small>
            </div>

            <span>+ ₹${item.amount}</span>
        </div>`;
    }

    return `
    <div class="transaction">
        <div>
         <h4>🛒 ${item.reason}</h4>
            <small>${item.date}</small>
        </div>

        <span>- ₹${item.amount}</span>
    </div>`;
}