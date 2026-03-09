const list = document.querySelector('.list')
const total = document.getElementById('total')
const products = document.getElementById('products')

let cart = []

async function getData() {
    let response = await fetch('https://fakestoreapi.com/products?limit=10')
    let data = await response.json()

    data.forEach(product => {

        const card = document.createElement('div')
        card.className = "card"

        card.innerHTML = `
        <img src="${product.image}" width="120">
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        <p>Rating: ${product.rating.rate}</p>
        `

        const btn = document.createElement('button')
        btn.textContent = "Add"

        btn.addEventListener('click', ()=>{
            addtoCart(product.title, product.price)
        })

        card.appendChild(btn)
        list.append(card)

    })
}

getData()

function addtoCart(name,price){
    const item = cart.find(p => p.name === name)
    item ? item.quantity++ : cart.push({name,price,quantity:1})
    alert(name + "-qo'shildi")
    update()
}

function update(){
    products.innerHTML = ""
    let totalSum = 0

    cart.forEach(product=>{
        const li = document.createElement("li")
        li.textContent = `${product.name} - ${product.price} - ${product.quantity}`
        products.appendChild(li)

        totalSum += product.price * product.quantity
    })

    total.textContent = "Total: $" + totalSum
}