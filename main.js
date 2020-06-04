const add_person = document.getElementById('add_person');
const double_amt = document.getElementById('double_amount')
const show_millionares = document.getElementById('show_millionares');
const sort_richest = document.getElementById('sort_richest');
const total = document.getElementById('calculate_wealth');
let details = document.querySelector('.details');
const main = document.getElementById('main');

let data = [];

async function createUser(){
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data['results'][0].name;

    let userDetails = {
        name: user.first + ' '+ user.last ,
        money: Math.floor(Math.random()*2000000)
    }
    storeData(userDetails)
}

function storeData(details){
    data.push(details);
    updateUI();
}


function doubleAmt(){
    data = data.map(d=>{
        return {...d,money:d.money*2};
    });
    updateUI();
}


function showMillionares(){
    data = data.filter(items=>{
      return items.money >= 1000000;
    });
    updateUI();
}


function showRichest(){
    data = data.sort((a,b)=>{
        return b.money - a.money;
    });
    updateUI();
}

function totalAmt(){
    const wealth = data.reduce((acc,user)=>(acc+=user.money),0);
    let element = document.createElement('div')
    element.classList.add('total');
    element.innerHTML = '<h3>Total</h3><strong>'+wealth+'</strong>';
    main.appendChild(element);
    
}


function updateUI(userData = data){
    main.innerHTML = ' <div id="details" class="details"><h3>Person</h3><strong>Wealth</strong></div>';
    userData.forEach(item=>{
        const div = document.createElement('div');
        div.classList.add('details');
        div.innerHTML = '<h3>'+item['name']+'</h3><strong id="wealth">RS '+item['money']+'</strong>';
        main.appendChild(div)

})
}


// event listeners on button clicks
add_person.addEventListener('click',createUser);
double_amt.addEventListener('click',doubleAmt)
show_millionares.addEventListener('click',showMillionares)
sort_richest.addEventListener('click',showRichest)
total.addEventListener('click',totalAmt)
createUser();
createUser();
createUser();
