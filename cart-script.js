document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-container");
    const emptyMessage = document.getElementById("empty-message");
    const clearCartBtn = document.getElementById("clear-cart-btn");
    const checkoutBtn = document.getElementById("checkout-btn");

    // السلة الافتراضية
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // عرض السلة
    function renderCart() {
        cartContainer.innerHTML = ""; // إفراغ الحاوية
        if (cart.length === 0) {
            emptyMessage.classList.add("visible"); // عرض الرسالة
        } else {
            emptyMessage.classList.remove("visible"); // إخفاء الرسالة
            cart.forEach((product, index) => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product-item");

                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-details">
                        <h3>${product.name}</h3>
                    </div>
                    <div class="quantity-control">
                        <button class="decrease-btn" data-index="${index}">-</button>
                        <span>${product.quantity}</span>
                        <button class="increase-btn" data-index="${index}">+</button>
                    </div>
                    <button class="delete-btn" data-index="${index}">حذف</button>
                `;

                cartContainer.appendChild(productDiv);
            });
        }
    }

    // تحديث السلة
    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    // التفاعلات داخل السلة
    cartContainer.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains("increase-btn")) {
            cart[index].quantity += 1; // زيادة الكمية
        } else if (e.target.classList.contains("decrease-btn")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1; // تقليل الكمية
            } else {
                cart.splice(index, 1); // حذف العنصر إذا وصلت الكمية إلى الصفر
            }
        } else if (e.target.classList.contains("delete-btn")) {
            cart.splice(index, 1); // حذف العنصر بالكامل
        }
        updateCart();
    });

    // تفريغ السلة
    clearCartBtn.addEventListener("click", () => {
        cart = [];
        updateCart();
    });

    // إتمام الشراء
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("سلتك فارغة. أضف منتجات قبل إتمام الشراء.");
            return;
        }

        // إنشاء نص الرسالة
        let message = "طلب جديد من محل لوتس كيك:\n\n";
        cart.forEach(product => {
            message += `- ${product.name} (الكمية: ${product.quantity})\n`;
        });
        message += "\nشكراً لتسوقكم معنا!";

        // رقم الهاتف (يمكن تغييره لرقم المتجر)
        const phoneNumber = "1234567890";

        // إنشاء رابط WhatsApp
        const whatsappLink = `https://wa.me/${905366200279}?text=${encodeURIComponent(message)}`;

        // توجيه المستخدم إلى رابط WhatsApp
        window.open(whatsappLink, "_blank");

        // تفريغ السلة بعد الإرسال
        cart = [];
        updateCart();
    });

    // استدعاء العرض الأولي
    renderCart();
});
