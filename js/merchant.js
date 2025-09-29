// 商家相关功能

// 商品数量管理
let productQuantities = {};

// 添加商品到购物车
function addProduct(event, productName) {
    event.stopPropagation(); // 阻止事件冒泡
    
    // 初始化商品数量
    if (!productQuantities[productName]) {
        productQuantities[productName] = 0;
    }
    
    // 增加数量
    productQuantities[productName]++;
    
    // 切换到数量选择器界面
    showQuantitySelector(productName);
    
    // 更新数量显示
    updateQuantityDisplay(productName);
}

// 增加商品数量
function increaseQuantity(event, productName) {
    event.stopPropagation(); // 阻止事件冒泡
    
    productQuantities[productName]++;
    updateQuantityDisplay(productName);
}

// 减少商品数量
function decreaseQuantity(event, productName) {
    event.stopPropagation(); // 阻止事件冒泡
    
    if (productQuantities[productName] > 0) {
        productQuantities[productName]--;
        
        // 如果数量为0，恢复到加号按钮
        if (productQuantities[productName] === 0) {
            showAddButton(productName);
        } else {
            updateQuantityDisplay(productName);
        }
    }
}

// 显示数量选择器
function showQuantitySelector(productName) {
    const quantityControl = document.querySelector(`[data-product="${productName}"]`);
    if (quantityControl) {
        const addBtn = quantityControl.querySelector('.add-btn');
        const quantitySelector = quantityControl.querySelector('.quantity-selector');
        
        addBtn.classList.add('hidden');
        quantitySelector.classList.remove('hidden');
    }
}

// 显示加号按钮
function showAddButton(productName) {
    const quantityControl = document.querySelector(`[data-product="${productName}"]`);
    if (quantityControl) {
        const addBtn = quantityControl.querySelector('.add-btn');
        const quantitySelector = quantityControl.querySelector('.quantity-selector');
        
        addBtn.classList.remove('hidden');
        quantitySelector.classList.add('hidden');
    }
}

// 更新数量显示
function updateQuantityDisplay(productName) {
    const quantityControl = document.querySelector(`[data-product="${productName}"]`);
    if (quantityControl) {
        const quantityDisplay = quantityControl.querySelector('.quantity-display');
        if (quantityDisplay) {
            quantityDisplay.textContent = productQuantities[productName];
        }
    }
}

// 获取商品总数量
function getTotalQuantity() {
    return Object.values(productQuantities).reduce((total, quantity) => total + quantity, 0);
}

// 获取购物车商品列表
function getCartItems() {
    const cartItems = [];
    for (const [productName, quantity] of Object.entries(productQuantities)) {
        if (quantity > 0) {
            cartItems.push({
                name: productName,
                quantity: quantity
            });
        }
    }
    return cartItems;
}

// 清空购物车
function clearCart() {
    productQuantities = {};
    
    // 重置所有商品的显示状态
    document.querySelectorAll('.quantity-control').forEach(control => {
        const productName = control.getAttribute('data-product');
        showAddButton(productName);
    });
}