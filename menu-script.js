const items = [
    { name: 'موس كيك قهوة', image: './images/cake/موس_اوبرا.jpg' },
      { name: 'موس كيك برالين', image: './images/cake/موس_برالين.jpg' },
      { name: 'موس كيك شوكولا', image: './images/cake/موس_شوكولانه.jpg' },
      { name: 'موس كيك كراميل', image: './images/cake/موس_كرميل.jpg' },
      { name: 'موس كيك فريز', image: './images/cake/موس_فريز.jpg' },
      {name: 'تشيز كيك', image:"./images/cake/تشيز_كيك.jpg"},
      {name: 'رد فلفت شوكولا', image:"./images/cake/رد_فلفت_شوكولا.jpg"},
      {name: 'رد فلفت فريز', image:"./images/cake/رد_فلفت_فريز.jpg"},
      {name: 'رد فلفت فستق', image:"./images/cake/رد_فلفت_فستق.jpg"},
      {name: 'رد فلفت توت', image:"./images/cake/رد_فلفت_توت.jpg"},
      {name: 'كيك سنيكرز', image:"./images/cake/سنيكرز.jpg"},
      {name: 'كيك تويكس', image:"./images/cake/تويكس_كيك.jpg"},
      {name: 'كيك براون', image:"./images/cake/براونز.jpg"},
      {name: 'كيك براون موز', image:"./images/cake/براون_موز.jpg"},
      {name: 'تيراميسو', image:"./images/cake/تراميسو.jpg"},
      {name: 'تريليتشا', image:"./images/cake/تريليتشا.jpg"},
      {name: 'مافن فانيليا', image:"./images/cake/مافن_فانيليا_كبير.jpg"},
      {name: 'مافن شوكولا', image:"./images/cake/مافن_شوكولا_كبير.jpg"},
      {name: 'مافن شوكولا', image:"./images/cake/مافن_شوكولا.jpg"},
      {name: 'مافن فانيليا' , image:"./images/cake/مافن_فانيليا.jpg"},
      {name: 'سوكسيه' , image:"./images/cake/سوكسيه.jpg"},
      {name: 'كاستر سنيكرز' , image:"./images/cake/كاستر_سنيكرز.jpg"},
      {name: ' كرب موز' , image:"./images/cake/كرب.jpg"},
      {name:'كلير',image:"./images/cake/كلير.jpg"},
      {name:'كيك سادة',image:"./images/cake/كيك_سادة.jpg"},
      {name:'كيك مغطس',image:"./images/cake/كيك_مغطس.jpg"},
      {name:'رأس العبد',image:"./images/cake/رأس_العبد.jpg"},
];

const container = document.querySelector('.container');
const successMessage = document.getElementById('success-message');

items.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card-pro');

    card.innerHTML = `
        <img class="img-pro" src="${item.image}" alt="${item.name}">
        <div class="content-pro">
            <p>${item.name}</p>
            <i class="fa-solid fa-cart-shopping"></i>
        </div>
    `;

    card.querySelector('.fa-cart-shopping').addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // التحقق إذا كان المنتج موجودًا في السلة
        const existingItem = cart.find(product => product.name === item.name);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1; // زيادة الكمية
        } else {
            item.quantity = 1; // إضافة المنتج مع تعيين الكمية الافتراضية
            cart.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        showSuccessMessage();
    });

    container.appendChild(card);
});

// دالة لعرض رسالة النجاح
function showSuccessMessage() {
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000); // تختفي بعد 3 ثوانٍ
}
