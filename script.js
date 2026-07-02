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
let balance = document.querySelector("#balance");
let transactions =document.querySelector("#transactions")
let totalBalance = 0;
let tiger =0;
let transaction= "None"
let transactionfirst= 0
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
RemoveClasslistHidden(line1)

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
}
function Addbtn(e){
     e.preventDefault();

    let amount = Number(amountInput.value);

  

if (tiger==1){
    totalBalance += amount;

    balance.innerText = `₹${totalBalance}`;
    transactionsftn(amount)
    transaction="income"
    amountInput.value = "";
    
    AddIncomeBox.classList.add("none");
  }
  else{
    if (amount<=totalBalance) {
    totalBalance -= amount;
    transactionsftn(amount)
    transaction="expense"
  balance.innerText = `₹${totalBalance}`;
  
  amountInput.value = "";
  
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
}

function transactionsftn(amt) {
  if (transactionfirst==0) {
    
    if (transaction=="income") {
      
      
      transactions.innerHTML=`<br>₹${amt} Credited`
      transaction="income"
    }
    else{
    
      transactions.innerHTML=`<br>₹${amt} Debited`
      transaction="expense"
    }
transactionfirst=1;
  }
  else{

  
    if (transaction=="income") {
      
      transactions.innerHTML+=`<br>₹${amt} Credited`
    }
    else{
      transactions.innerHTML+=`<br>₹${amt} Debited`
      
    }
  }
  }