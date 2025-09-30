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

// 订单详情弹窗功能
function showOrderDetail(orderId) {
    // 模拟订单数据
    const orderData = {
        'TG202412150001': {
            orderId: 'TG202412150001',
            status: '待使用',
            statusClass: 'bg-blue-100 text-blue-600',
            orderTime: '2024-12-15 14:30',
            validTime: '2024-12-22 23:59',
            verifyTime: null,
            refundTime: null,
            cancelTime: null,
            originalAmount: '32.0',
            amount: '28.8',
            quantity: 1,
            productName: '香辣鸡腿堡套餐',
            productSpec: '中辣 + 薯条 + 可乐',
            productImage: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=50&h=50&fit=crop',
            customerName: '张三',
            customerPhone: '138****5678',
            paymentMethod: '微信支付',
            merchantName: '麦当劳(学府路店)',
            orderNote: '不要洋葱，多加生菜'
        },
        'TG202412150002': {
            orderId: 'TG202412150002',
            status: '已使用',
            statusClass: 'bg-green-100 text-green-600',
            orderTime: '2024-12-15 12:15',
            validTime: null,
            verifyTime: '2024-12-15 18:30',
            refundTime: null,
            cancelTime: null,
            originalAmount: '15.0',
            amount: '12.0',
            quantity: 2,
            productName: '珍珠奶茶',
            productSpec: '大杯 + 正常糖 + 去冰',
            productImage: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=50&h=50&fit=crop',
            customerName: '李四',
            customerPhone: '139****1234',
            paymentMethod: '支付宝',
            merchantName: '一点点(望江路店)',
            orderNote: '请打包好，谢谢'
        },
        'TG202412140003': {
            orderId: 'TG202412140003',
            status: '已退款',
            statusClass: 'bg-red-100 text-red-600',
            orderTime: '2024-12-14 16:45',
            validTime: null,
            verifyTime: null,
            refundTime: '2024-12-14 20:10',
            cancelTime: null,
            originalAmount: '18.0',
            amount: '15.5',
            quantity: 1,
            productName: '芝士蛋糕',
            productSpec: '6寸 + 草莓口味',
            productImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=50&h=50&fit=crop',
            customerName: '王五',
            customerPhone: '137****9876',
            paymentMethod: '微信支付',
            merchantName: '85度C(学府路店)',
            orderNote: '生日蛋糕，请写上"生日快乐"'
        },
        'TG202412130004': {
            orderId: 'TG202412130004',
            status: '已取消',
            statusClass: 'bg-gray-100 text-gray-600',
            orderTime: '2024-12-13 10:20',
            validTime: null,
            verifyTime: null,
            refundTime: null,
            cancelTime: '2024-12-13 10:35',
            originalAmount: '25.0',
            amount: '22.5',
            quantity: 1,
            productName: '麻辣香锅',
            productSpec: '中辣 + 土豆 + 豆腐 + 粉条',
            productImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=50&h=50&fit=crop',
            customerName: '赵六',
            customerPhone: '136****5432',
            paymentMethod: '微信支付',
            merchantName: '杨国福麻辣烫(学府路店)',
            orderNote: '不要香菜，多加辣椒'
        }
    };

    const order = orderData[orderId];
    if (!order) {
        alert('订单信息不存在');
        return;
    }

    // 填充弹窗内容
    document.getElementById('detailOrderId').textContent = order.orderId;
    document.getElementById('detailStatus').textContent = order.status;
    document.getElementById('detailStatus').className = `px-2 py-1 rounded-full text-xs ${order.statusClass}`;
    document.getElementById('detailOriginalAmount').textContent = `¥${order.originalAmount}`;
    document.getElementById('detailAmount').textContent = `¥${order.amount}`;
    document.getElementById('detailQuantity').textContent = order.quantity;
    document.getElementById('detailProductName').textContent = order.productName;
    document.getElementById('detailProductSpec').textContent = order.productSpec;
    document.getElementById('detailProductImage').src = order.productImage;
    document.getElementById('detailCustomerName').textContent = order.customerName;
    document.getElementById('detailCustomerPhone').textContent = order.customerPhone;
    document.getElementById('detailPaymentMethod').textContent = order.paymentMethod;
    document.getElementById('detailMerchantName').textContent = order.merchantName;
    document.getElementById('detailOrderNote').textContent = order.orderNote || '无';

    // 时间信息处理
    document.getElementById('detailOrderTime').textContent = order.orderTime;
    
    const timeInfoContainer = document.getElementById('detailTimeInfo');
    timeInfoContainer.innerHTML = '';
    
    if (order.validTime) {
        timeInfoContainer.innerHTML += `<div class="text-xs text-gray-500">有效期至: ${order.validTime}</div>`;
    }
    if (order.verifyTime) {
        timeInfoContainer.innerHTML += `<div class="text-xs text-gray-500">核销时间: ${order.verifyTime}</div>`;
    }
    if (order.refundTime) {
        timeInfoContainer.innerHTML += `<div class="text-xs text-gray-500">退款时间: ${order.refundTime}</div>`;
    }
    if (order.cancelTime) {
        timeInfoContainer.innerHTML += `<div class="text-xs text-gray-500">取消时间: ${order.cancelTime}</div>`;
    }

    // 显示弹窗
    document.getElementById('orderDetailModal').classList.remove('hidden');
}

// 隐藏订单详情弹窗
function hideOrderDetail() {
    document.getElementById('orderDetailModal').classList.add('hidden');
}