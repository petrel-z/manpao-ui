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

// 商品管理相关功能

// 搜索商品
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const productItems = document.querySelectorAll('#productList .bg-white');
    
    productItems.forEach(item => {
        const productName = item.querySelector('h3').textContent.toLowerCase();
        const productDesc = item.querySelector('p').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    updateProductStats();
}

// 筛选商品
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const stockFilter = document.getElementById('stockFilter').value;
    const productItems = document.querySelectorAll('#productList .bg-white');
    
    productItems.forEach(item => {
        let showItem = true;
        
        // 分类筛选
        if (categoryFilter !== 'all') {
            const productName = item.querySelector('h3').textContent;
            const category = getProductCategory(productName);
            if (category !== categoryFilter) {
                showItem = false;
            }
        }
        
        // 状态筛选
        if (statusFilter !== 'all') {
            const statusElement = item.querySelector('.bg-green-100, .bg-orange-100, .bg-gray-100');
            const status = getProductStatus(statusElement);
            if (status !== statusFilter) {
                showItem = false;
            }
        }
        
        // 库存筛选
        if (stockFilter !== 'all') {
            const stockText = item.querySelector('.border-t .text-xs:last-child').textContent;
            const stock = getStockStatus(stockText);
            if (stock !== stockFilter) {
                showItem = false;
            }
        }
        
        item.style.display = showItem ? 'block' : 'none';
    });
    
    updateProductStats();
}

// 重置筛选
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('stockFilter').value = 'all';
    
    const productItems = document.querySelectorAll('#productList .bg-white');
    productItems.forEach(item => {
        item.style.display = 'block';
    });
    
    updateProductStats();
}

// 获取商品分类
function getProductCategory(productName) {
    if (productName.includes('堡') || productName.includes('奶茶') || productName.includes('饮')) {
        return 'food';
    } else if (productName.includes('文具') || productName.includes('学习')) {
        return 'study';
    } else if (productName.includes('生活') || productName.includes('用品')) {
        return 'daily';
    }
    return 'other';
}

// 获取商品状态
function getProductStatus(statusElement) {
    if (!statusElement) return 'selling';
    
    if (statusElement.classList.contains('bg-green-100')) {
        return 'selling';
    } else if (statusElement.classList.contains('bg-orange-100')) {
        return 'pending';
    } else if (statusElement.classList.contains('bg-gray-100')) {
        return 'offline';
    }
    return 'selling';
}

// 获取库存状态
function getStockStatus(stockText) {
    if (stockText.includes('充足')) {
        return 'sufficient';
    } else if (stockText.includes('紧张')) {
        return 'low';
    } else if (stockText.includes('缺货')) {
        return 'out';
    }
    return 'sufficient';
}

// 更新商品统计
function updateProductStats() {
    const productItems = document.querySelectorAll('#productList .bg-white');
    const visibleItems = Array.from(productItems).filter(item => item.style.display !== 'none');
    
    let totalCount = visibleItems.length;
    let sellingCount = 0;
    let offlineCount = 0;
    let lowStockCount = 0;
    
    visibleItems.forEach(item => {
        const statusElement = item.querySelector('.bg-green-100, .bg-orange-100, .bg-gray-100');
        const status = getProductStatus(statusElement);
        const stockText = item.querySelector('.border-t .text-xs:last-child').textContent;
        const stock = getStockStatus(stockText);
        
        if (status === 'selling') sellingCount++;
        if (status === 'offline') offlineCount++;
        if (stock === 'low') lowStockCount++;
    });
    
    // 更新统计卡片
    const statCards = document.querySelectorAll('.grid.grid-cols-4 .bg-white');
    if (statCards.length >= 4) {
        statCards[0].querySelector('.text-xl').textContent = totalCount;
        statCards[1].querySelector('.text-xl').textContent = sellingCount;
        statCards[2].querySelector('.text-xl').textContent = offlineCount;
        statCards[3].querySelector('.text-xl').textContent = lowStockCount;
    }
}

// 新增分类
function addCategory() {
    const categoryName = prompt('请输入新分类名称:');
    if (categoryName && categoryName.trim()) {
        alert(`新分类 "${categoryName.trim()}" 已添加`);
        // 这里可以添加实际的分类添加逻辑
    }
}

// 批量上架
function batchOnline() {
    const selectedProducts = getSelectedProducts();
    if (selectedProducts.length === 0) {
        alert('请先选择要上架的商品');
        return;
    }
    
    if (confirm(`确定要将 ${selectedProducts.length} 个商品上架吗？`)) {
        selectedProducts.forEach(product => {
            const statusElement = product.querySelector('.bg-gray-100');
            if (statusElement) {
                statusElement.className = 'bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs';
                statusElement.textContent = '在售中';
            }
        });
        alert('批量上架成功');
        updateProductStats();
    }
}

// 批量下架
function batchOffline() {
    const selectedProducts = getSelectedProducts();
    if (selectedProducts.length === 0) {
        alert('请先选择要下架的商品');
        return;
    }
    
    if (confirm(`确定要将 ${selectedProducts.length} 个商品下架吗？`)) {
        selectedProducts.forEach(product => {
            const statusElement = product.querySelector('.bg-green-100, .bg-orange-100');
            if (statusElement) {
                statusElement.className = 'bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs';
                statusElement.textContent = '已下架';
            }
        });
        alert('批量下架成功');
        updateProductStats();
    }
}

// 获取选中的商品（这里简化处理，实际应该有复选框选择机制）
function getSelectedProducts() {
    // 简化处理：返回所有可见的商品
    const productItems = document.querySelectorAll('#productList .bg-white');
    return Array.from(productItems).filter(item => item.style.display !== 'none');
}

// 编辑商品
function editProduct(productId) {
    alert(`编辑商品 ${productId}`);
    // 这里可以跳转到编辑页面或打开编辑弹窗
}

// 管理规格
function manageSpecs(productId) {
    alert(`管理商品 ${productId} 的规格`);
    // 这里可以跳转到规格管理页面
}

// 切换商品状态
function toggleProduct(productId) {
    const productItem = document.querySelector(`#productList .bg-white:nth-child(${productId})`);
    if (productItem) {
        const statusElement = productItem.querySelector('.bg-green-100, .bg-orange-100, .bg-gray-100');
        if (statusElement) {
            if (statusElement.classList.contains('bg-gray-100')) {
                // 从下架变为在售
                statusElement.className = 'bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs';
                statusElement.textContent = '在售中';
            } else {
                // 从在售变为下架
                statusElement.className = 'bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs';
                statusElement.textContent = '已下架';
            }
            updateProductStats();
        }
    }
}

// 分类管理相关功能

// 显示分类操作菜单
function showCategoryMenu(categoryId) {
    // 隐藏所有菜单
    document.querySelectorAll('[id^="category-menu-"]').forEach(menu => {
        menu.classList.add('hidden');
    });
    
    // 显示当前菜单
    const menu = document.getElementById(`category-menu-${categoryId}`);
    menu.classList.toggle('hidden');
    
    // 点击其他地方隐藏菜单
    document.addEventListener('click', function hideMenu(e) {
        if (!e.target.closest(`#category-menu-${categoryId}`) && !e.target.closest(`button[onclick="showCategoryMenu(${categoryId})"]`)) {
            menu.classList.add('hidden');
            document.removeEventListener('click', hideMenu);
        }
    });
}

// 重命名分类
function renameCategory(categoryId) {
    // 隐藏菜单
    document.getElementById(`category-menu-${categoryId}`).classList.add('hidden');
    // 这里可以实现重命名逻辑
    console.log('重命名分类:', categoryId);
}

// 删除分类
function deleteCategory(categoryId) {
    // 隐藏菜单
    document.getElementById(`category-menu-${categoryId}`).classList.add('hidden');
    // 这里可以实现删除逻辑
    if (confirm('确定要删除这个分类吗？删除后该分类下的商品将移至未分类。')) {
        console.log('删除分类:', categoryId);
    }
}

// 排序分类
function sortCategories() {
    console.log('排序分类');
    // 这里可以实现排序逻辑
}

// 显示添加分类弹窗
function showAddCategoryModal() {
    document.getElementById('add-category-modal').classList.remove('hidden');
    document.getElementById('category-name-input').focus();
}

// 隐藏添加分类弹窗
function hideAddCategoryModal() {
    document.getElementById('add-category-modal').classList.add('hidden');
    document.getElementById('category-name-input').value = '';
    document.getElementById('category-name-count').textContent = '0';
}

// 保存分类
function saveCategory() {
    const categoryName = document.getElementById('category-name-input').value.trim();
    if (!categoryName) {
        alert('请输入分类名称');
        return;
    }
    
    // 这里可以实现保存逻辑
    console.log('保存分类:', categoryName);
    hideAddCategoryModal();
}

// 创建新分类
function createNewCategory() {
    const categoryName = document.getElementById('new-category-input').value.trim();
    if (!categoryName) {
        alert('请输入分类名称');
        return;
    }
    
    // 检查分类名称是否已存在
    const existingCategories = document.querySelectorAll('#sort .bg-white label');
    for (let label of existingCategories) {
        if (label.textContent === categoryName) {
            alert('分类名称已存在');
            return;
        }
    }
    
    // 创建新的分类项
    const categoryList = document.querySelector('#sort .px-4.space-y-2');
    const newCategoryDiv = document.createElement('div');
    newCategoryDiv.className = 'bg-white rounded-lg p-4';
    newCategoryDiv.innerHTML = `
        <div class="flex items-center space-x-3">
            <input type="checkbox" id="category-${categoryName.toLowerCase()}" class="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500">
            <label for="category-${categoryName.toLowerCase()}" class="flex-1 text-gray-800 font-medium cursor-pointer">${categoryName}</label>
            <span class="text-sm text-gray-500">(0件商品)</span>
        </div>
    `;
    
    categoryList.appendChild(newCategoryDiv);
    
    // 清空输入框
    document.getElementById('new-category-input').value = '';
    
    console.log('创建新分类:', categoryName);
}

// 确认分类选择
function confirmCategorySelection() {
    const selectedCategories = [];
    const checkboxes = document.querySelectorAll('#sort input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
            selectedCategories.push(label.textContent);
        }
    });
    
    if (selectedCategories.length === 0) {
        alert('请选择至少一个分类');
        return;
    }
    
    // 更新新增商品页面的分类显示
    const selectedCategoryElement = document.getElementById('selected-category');
    if (selectedCategoryElement) {
        if (selectedCategories.length === 1) {
            selectedCategoryElement.textContent = selectedCategories[0];
        } else {
            selectedCategoryElement.textContent = `已选择${selectedCategories.length}个分类`;
        }
    }
    
    // 返回新增商品页面
    showPage('add-goods');
    
    console.log('选择的分类:', selectedCategories);
}

// 初始化分类选择页面
function initCategorySelection() {
    // 确保只有一个分类可以被选中（单选行为）
    const checkboxes = document.querySelectorAll('#sort input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // 取消其他所有复选框的选中状态
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });
    
    console.log('分类选择页面初始化完成');
}

// 初始化订单图表
function initOrderChart() {
    const canvas = document.getElementById('orderChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // 生成近30天的模拟数据
    const chartData = generateChartData();
    
    // 设置canvas尺寸
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // 绘制图表
    drawChart(ctx, chartData, rect.width, rect.height);
    
    // 添加点击事件
    canvas.addEventListener('click', function(e) {
        handleChartClick(e, chartData, rect.width, rect.height);
    });
}

// 生成图表数据
function generateChartData() {
    const data = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // 生成模拟数据
        const orders = Math.floor(Math.random() * 50) + 10;
        const amount = (Math.random() * 2000 + 500).toFixed(2);
        
        data.push({
            date: date,
            dateStr: `${date.getMonth() + 1}/${date.getDate()}`,
            orders: orders,
            amount: parseFloat(amount)
        });
    }
    
    return data;
}

// 绘制图表
function drawChart(ctx, data, width, height) {
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 找出最大值用于缩放
    const maxOrders = Math.max(...data.map(d => d.orders));
    const maxAmount = Math.max(...data.map(d => d.amount));
    
    // 绘制网格线
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // 绘制订单数折线
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = padding + chartHeight - (point.orders / maxOrders) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // 绘制金额折线
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = padding + chartHeight - (point.amount / maxAmount) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // 绘制数据点
    data.forEach((point, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        
        // 订单数点
        const ordersY = padding + chartHeight - (point.orders / maxOrders) * chartHeight;
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(x, ordersY, 3, 0, 2 * Math.PI);
        ctx.fill();
        
        // 金额点
        const amountY = padding + chartHeight - (point.amount / maxAmount) * chartHeight;
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.arc(x, amountY, 3, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // 绘制X轴标签（每5天显示一次）
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    data.forEach((point, index) => {
        if (index % 5 === 0 || index === data.length - 1) {
            const x = padding + (chartWidth / (data.length - 1)) * index;
            ctx.fillText(point.dateStr, x, height - 10);
        }
    });
}

// 处理图表点击事件
function handleChartClick(e, data, width, height) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const padding = 40;
    const chartWidth = width - padding * 2;
    
    // 计算点击的数据点索引
    const clickIndex = Math.round(((x - padding) / chartWidth) * (data.length - 1));
    
    if (clickIndex >= 0 && clickIndex < data.length) {
        const selectedData = data[clickIndex];
        showSelectedDateInfo(selectedData);
    }
}

// 显示选中日期的信息
function showSelectedDateInfo(data) {
    const infoDiv = document.getElementById('selectedDateInfo');
    const dateSpan = document.getElementById('selectedDate');
    const ordersSpan = document.getElementById('selectedOrders');
    const amountSpan = document.getElementById('selectedAmount');
    
    if (infoDiv && dateSpan && ordersSpan && amountSpan) {
        dateSpan.textContent = `${data.date.getFullYear()}年${data.date.getMonth() + 1}月${data.date.getDate()}日`;
        ordersSpan.textContent = data.orders;
        amountSpan.textContent = data.amount.toFixed(2);
        
        infoDiv.classList.remove('hidden');
        
        // 3秒后自动隐藏
        setTimeout(() => {
            infoDiv.classList.add('hidden');
        }, 3000);
    }
}

// 管理未分类商品
function manageUncategorizedGoods() {
    console.log('管理未分类商品');
    // 这里可以跳转到商品管理页面并筛选未分类商品
    showPage('goods-manage');
    // 可以在商品管理页面中添加筛选未分类商品的逻辑
}

// 初始化分类管理页面事件监听器
function initCategoryManagement() {
    // 输入框字符计数
    const categoryNameInput = document.getElementById('category-name-input');
    if (categoryNameInput) {
        categoryNameInput.addEventListener('input', function() {
            const count = this.value.length;
            document.getElementById('category-name-count').textContent = count;
        });
    }

    // ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideAddCategoryModal();
        }
    });
}
