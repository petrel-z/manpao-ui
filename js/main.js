/**
 * 页面切换功能
 * @param {string} pageId - 要显示的页面ID
 */
function showPage(pageId) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示指定页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        // 移除动画效果
    }
    
    // 更新导航按钮状态
    const navButtons = document.querySelectorAll('.prototype-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === pageId) {
            btn.classList.add('active');
        }
    });
    
    // 控制底部导航的显示与隐藏
    const bottomNav = document.querySelector('.bottom-nav');
    const circleBottomNav = document.querySelector('.circle-bottom-nav');
    
    // 隐藏所有底部导航
    if (bottomNav) bottomNav.style.display = 'none';
    if (circleBottomNav) circleBottomNav.style.display = 'none';
    
    // 根据页面ID显示相应的底部导航
    if (pageId === 'circle') {
        // 显示圈子专用底部导航
        if (circleBottomNav) circleBottomNav.style.display = 'flex';
    } else if (pageId === 'home' || pageId === 'grab-orders' ||  
               pageId === 'orders' || pageId === 'profile') {
        // 显示主底部导航
        if (bottomNav) bottomNav.style.display = 'flex';
    }
    
    // 更新底部导航栏状态
    if (typeof updateNavActiveState === 'function') {
        console.log('调用updateNavActiveState函数，页面ID：', pageId);
        updateNavActiveState(pageId);
    } else {
        console.error('updateNavActiveState函数未定义');
    }
    
    // 保存当前页面到本地存储
    localStorage.setItem('currentPage', pageId);
}

/**
 * 初始化页面
 */
function initializeApp() {
    // 检查用户是否已登录
    const userInfo = localStorage.getItem('userInfo');
    
    // 从本地存储中获取上次访问的页面
    let lastPage = localStorage.getItem('currentPage') || 'login';
    
    // 如果用户已登录但当前页面是登录页，则跳转到首页
    if (userInfo && lastPage === 'login') {
        lastPage = 'home';
    }
    
    showPage(lastPage);
    
    // 更新时间显示
    updateTime();
    setInterval(updateTime, 60000); // 每分钟更新一次
}

/**
 * 更新状态栏时间
 */
function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    
    const timeElements = document.querySelectorAll('.status-bar span:first-child');
    timeElements.forEach(el => {
        el.textContent = timeString;
    });
}

function updateNavActiveState(pageId) {
    console.log('更新导航状态，当前页面：', pageId);
    
    // 移除所有导航项的活跃状态
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        item.classList.add('text-gray-500');
        // 确保所有图标和文本都是灰色
        item.style.color = '';
    });
    
    // 根据页面ID设置对应导航项的活跃状态
    let activeNavId = null;
    if (pageId === 'home') {
        activeNavId = 'b-nav-home';
    } else if (pageId === 'community') {
        activeNavId = 'b-nav-community';
    } else if (pageId === 'orders') {
        activeNavId = 'b-nav-orders-list';
    } else if (pageId === 'grab-orders') {
        activeNavId = 'b-nav-orders';
    } else if (pageId === 'profile' || pageId === 'profile-edit' || pageId === 'merchant' || pageId === 'captain' || pageId === 'balance') {
        activeNavId = 'b-nav-profile';
    }
    
    console.log('活跃导航ID：', activeNavId);
    
    if (activeNavId) {
        const activeNav = document.getElementById(activeNavId);
        if (activeNav) {
            activeNav.classList.add('active');
            activeNav.classList.remove('text-gray-500');
            // 直接设置颜色样式，确保覆盖Tailwind类
            activeNav.style.color = '#ff6b6b';
            console.log('已设置活跃状态');
        }
    }
}

/**
 * 用户登录功能
 */
function login() {
    // 检查是否同意用户协议和隐私政策
    const agreementCheckbox = document.querySelector('#account-agreement');
    if (!agreementCheckbox.checked) {
        alert('请阅读并同意用户协议和隐私政策');
        return;
    }
    
    const username = document.querySelector('#login input[type="text"]').value;
    const password = document.querySelector('#login input[type="password"]').value;
    const role = document.querySelector('#role-select').value;
    
    // 简单验证
    if (!username || !password) {
        alert('请输入账号和密码');
        return;
    }
    
    // 模拟验证成功
    // 在实际应用中，这里应该是向后端发送请求验证账号密码
    
    // 保存用户信息到本地存储
    const userInfo = {
        username: username,
        role: role,
        roleName: getRoleName(role),
        id: '123456789' // 模拟用户ID
    };
    
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    // 登录成功，跳转到首页
    showPage('home');
}

/**
 * 微信登录功能
 */
function wechatLogin() {
    // 检查是否同意用户协议和隐私政策
    const agreementCheckbox = document.querySelector('#wechat-agreement');
    if (!agreementCheckbox.checked) {
        alert('请阅读并同意用户协议和隐私政策');
        return;
    }
    
    // 模拟微信登录成功
    // 在实际应用中，这里应该是调用微信登录API
    
    // 保存用户信息到本地存储（默认为学生角色）
    const userInfo = {
        username: '微信用户' + Math.floor(Math.random() * 10000), // 随机用户名
        role: 'student',
        roleName: getRoleName('student'),
        id: 'wx_' + Math.floor(Math.random() * 1000000) // 模拟微信用户ID
    };
    
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    // 登录成功，跳转到首页
    showPage('home');
}

/**
 * 获取角色名称
 * @param {string} role - 角色代码
 * @returns {string} 角色名称
 */
function getRoleName(role) {
    switch(role) {
        case 'student':
            return '学生';
        case 'merchant-normal':
            return '普通商家';
        case 'merchant-student':
            return '学生商家';
        case 'captain':
            return '团长';
        case 'rider':
            return '骑手';
        default:
            return '学生';
    }
}

/**
 * 获取角色标签颜色
 * @param {string} role - 角色代码
 * @returns {string} 颜色类名
 */
function getRoleColor(role) {
    switch(role) {
        case 'student':
            return 'bg-yellow-400 text-red-800';
        case 'merchant-normal':
        case 'merchant-student':
            return 'bg-blue-400 text-white';
        case 'captain':
            return 'bg-purple-400 text-white';
        case 'rider':
            return 'bg-green-400 text-white';
        default:
            return 'bg-yellow-400 text-red-800';
    }
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    
    // 监听个人中心页面显示事件
    document.addEventListener('pageShown', function(e) {
        if (e.detail.pageId === 'profile') {
            updateUserProfile();
        }
    });
});

/**
 * 更新个人中心页面的用户信息
 */
function updateUserProfile() {
    const userInfoStr = localStorage.getItem('userInfo');
    if (!userInfoStr) return;
    
    const userInfo = JSON.parse(userInfoStr);
    
    // 更新用户名
    const nameElement = document.querySelector('#profile h3');
    if (nameElement) {
        nameElement.textContent = userInfo.username;
    }
    
    // 更新用户ID
    const idElement = document.querySelector('#profile .flex.items-center.mt-1 p');
    if (idElement) {
        idElement.textContent = 'ID: ' + userInfo.id;
    }
    
    // 更新角色标签
    const roleElement = document.querySelector('#profile .flex.items-center.mt-1 .rounded-full span');
    const roleBgElement = document.querySelector('#profile .flex.items-center.mt-1 .rounded-full');
    
    if (roleElement && roleBgElement) {
        roleElement.textContent = userInfo.roleName;
        
        // 移除所有背景色和文字色类
        roleBgElement.className = roleBgElement.className
            .replace(/bg-\w+-\d+/g, '')
            .replace(/text-\w+-\d+/g, '');
        
        // 添加新的颜色类
        const colorClasses = getRoleColor(userInfo.role).split(' ');
        colorClasses.forEach(cls => {
            roleBgElement.classList.add(cls);
        });
        
        // 保持其他类
        roleBgElement.classList.add('ml-2', 'px-2', 'py-0.5', 'rounded-full');
    }
}

// 自定义事件，用于通知页面显示
function showPage(pageId) {
    // 原有的showPage代码
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    const navButtons = document.querySelectorAll('.prototype-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === pageId) {
            btn.classList.add('active');
        }
    });
    
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        if (pageId === 'home' || pageId === 'grab-orders'  || 
            pageId === 'orders' || pageId === 'profile') {
            bottomNav.style.display = 'flex';
        } else {
            bottomNav.style.display = 'none';
        }
    }
    
    if (typeof updateNavActiveState === 'function') {
        updateNavActiveState(pageId);
    }
    
    localStorage.setItem('currentPage', pageId);
    
    // 触发自定义事件
    document.dispatchEvent(new CustomEvent('pageShown', {
        detail: { pageId: pageId }
    }));
}

/**
 * 切换登录方式
 */
function toggleLoginMethod() {
    const wechatLogin = document.getElementById('wechat-login');
    const accountLogin = document.getElementById('account-login');
    
    if (wechatLogin.classList.contains('hidden')) {
        // 切换到微信登录
        wechatLogin.classList.remove('hidden');
        accountLogin.classList.add('hidden');
    } else {
        // 切换到账号密码登录
        wechatLogin.classList.add('hidden');
        accountLogin.classList.remove('hidden');
    }
}

  // 显示支付弹窗
  function showPaymentModal() {
    document.getElementById('payment-modal').classList.remove('hidden');
}

// 隐藏支付弹窗
function hidePaymentModal() {
    document.getElementById('payment-modal').classList.add('hidden');
}


function showPaymentModal() {
    document.getElementById('payment-modal').classList.remove('hidden');
}

function hidePaymentModal() {
    document.getElementById('payment-modal').classList.add('hidden');
}

function switchIdentity(identity) {
    // 获取所有商家特有的表单项
    const merchantOnlyFields = document.querySelectorAll('.merchant-only');
    // 获取所有学生特有的表单项
    const studentOnlyFields = document.querySelectorAll('.student-only');
    // 获取商家和学生共有的表单项
    const commonFields = document.querySelectorAll('.common-field');
    
    // 获取身份选择按钮
    const merchantBtn = document.getElementById('merchant-btn');
    const studentBtn = document.getElementById('student-btn');
    
    // 更新页面标题
    const pageTitle = document.getElementById('page-title');
    
    if (identity === 'merchant') {
        // 显示商家特有的表单项
        merchantOnlyFields.forEach(field => field.classList.remove('hidden'));
        // 隐藏学生特有的表单项
        studentOnlyFields.forEach(field => field.classList.add('hidden'));
        // 更新按钮样式
        merchantBtn.classList.add('bg-red-500', 'text-white');
        merchantBtn.classList.remove('bg-gray-200', 'text-gray-700');
        studentBtn.classList.add('bg-gray-200', 'text-gray-700');
        studentBtn.classList.remove('bg-red-500', 'text-white');
        // 更新页面标题
        pageTitle.textContent = '商家入驻';
    } else if (identity === 'student') {
        // 隐藏商家特有的表单项
        merchantOnlyFields.forEach(field => field.classList.add('hidden'));
        // 显示学生特有的表单项
        studentOnlyFields.forEach(field => field.classList.remove('hidden'));
        // 更新按钮样式
        studentBtn.classList.add('bg-red-500', 'text-white');
        studentBtn.classList.remove('bg-gray-200', 'text-gray-700');
        merchantBtn.classList.add('bg-gray-200', 'text-gray-700');
        merchantBtn.classList.remove('bg-red-500', 'text-white');
        // 更新页面标题
        pageTitle.textContent = '学生入驻';
    }
}
// 创建推广名片弹窗
function createPromotionCardModal() {
    // 检查是否已存在弹窗
    if (document.getElementById('promotion-card-modal')) {
        return;
    }
    
    // 创建弹窗元素
    const modal = document.createElement('div');
    modal.id = 'promotion-card-modal';
    modal.className = 'hidden absolute z-50';
    modal.style.cssText = 'top: 0; left: 0; right: 0; bottom: 0; margin: 0 auto; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);';
    
    // 弹窗内容
    modal.innerHTML = `
    <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[80%] max-w-xs overflow-hidden relative">
        <!-- 关闭按钮 -->
        <div onclick="hidePromotionCard()" class="absolute top-2 right-2 w-7 h-7 bg-black bg-opacity-30 rounded-full flex items-center justify-center cursor-pointer z-10">
            <i class="fas fa-times text-white text-sm"></i>
        </div>
        
        <!-- 海报内容 -->
        <div class="p-3 text-center">
            <h3 class="font-bold text-base mb-1">我的推广海报</h3>
            <p class="text-gray-500 text-xs mb-3">扫描二维码或保存图片分享给好友</p>
            
            <!-- 海报图片 -->
            <div class="bg-red-50 rounded-lg p-3 mb-3">
                <div class="bg-white rounded-lg p-2 shadow-md">
                    <div class="flex items-center mb-2">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" 
                             alt="用户头像" class="w-8 h-8 rounded-full object-cover mr-2">
                        <div class="text-left">
                            <h4 class="font-bold text-xs">张同学</h4>
                            <p class="text-gray-500 text-[10px]">邀请您加入满跑</p>
                        </div>
                    </div>
                    <div class="bg-gradient-to-r from-red-500 to-orange-400 text-white p-3 rounded-lg mb-2">
                        <div class="flex items-center">
                            <div class="flex-1">
                                <p class="font-bold text-sm">慢跑App</p>
                                <p class="text-xs mt-1">能吃能玩能赚钱</p>
                            </div>
                            <div class="ml-2">
                                <i class="fas fa-utensils text-yellow-200 text-sm mr-1"></i>
                                <i class="fas fa-gamepad text-yellow-200 text-sm mr-1"></i>
                                <i class="fas fa-coins text-yellow-200 text-sm"></i>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <!-- 二维码 -->
                        <div class="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                            <i class="fas fa-qrcode text-gray-400 text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 操作按钮 -->
            <div class="flex space-x-2">
                <button class="flex-1 bg-gray-100 py-1.5 rounded-lg text-gray-700 text-sm font-medium">
                    <i class="fas fa-download mr-1"></i> 保存图片
                </button>
                <button class="flex-1 bg-red-500 py-1.5 rounded-lg text-white text-sm font-medium">
                    <i class="fas fa-share-alt mr-1"></i> 立即分享
                </button>
            </div>
        </div>
    </div>
    `;
    
    // 将弹窗添加到profile页面
    const profilePage = document.getElementById('profile');
    if (profilePage) {
        profilePage.appendChild(modal);
    }
}

// 页面加载时创建弹窗
document.addEventListener('DOMContentLoaded', function() {
    createPromotionCardModal();
});

// 显示推广名片弹窗
function showPromotionCard() {
    // 确保弹窗已创建
    createPromotionCardModal();
    
    const modal = document.getElementById('promotion-card-modal');
    const profilePage = document.getElementById('profile');
    
    if (modal && profilePage) {
        // 确保弹窗在profile页面内部
        if (!profilePage.contains(modal)) {
            profilePage.appendChild(modal);
        }
        modal.classList.remove('hidden');
        // 防止背景滚动，但只针对profile页面
        const scrollContainer = profilePage.querySelector('.overflow-y-auto');
        if (scrollContainer) {
            scrollContainer.style.overflow = 'hidden';
        }
    } else {
        console.error('找不到推广名片弹窗元素或profile页面元素');
    }
}

// 隐藏推广名片弹窗
function hidePromotionCard() {
    const modal = document.getElementById('promotion-card-modal');
    const profilePage = document.getElementById('profile');
    
    if (modal) {
        modal.classList.add('hidden');
        // 恢复背景滚动，但只针对profile页面
        if (profilePage) {
            const scrollContainer = profilePage.querySelector('.overflow-y-auto');
            if (scrollContainer) {
                scrollContainer.style.overflow = 'auto';
            }
        }
    }
}

// Tab切换功能
function switchTab(tabName) {
    // 重置所有tab和内容
    document.getElementById('tab-menu').classList.remove('text-red-500', 'border-b-2', 'border-red-500');
    document.getElementById('tab-menu').classList.add('text-gray-500');
    document.getElementById('tab-info').classList.remove('text-red-500', 'border-b-2', 'border-red-500');
    document.getElementById('tab-info').classList.add('text-gray-500');
    
    document.getElementById('content-menu').classList.add('hidden');
    document.getElementById('content-info').classList.add('hidden');
    
    // 激活选中的tab和内容
    document.getElementById('tab-' + tabName).classList.remove('text-gray-500');
    document.getElementById('tab-' + tabName).classList.add('text-red-500', 'border-b-2', 'border-red-500');
    document.getElementById('content-' + tabName).classList.remove('hidden');
}

function categoryClick(category) {
    const categoryItems = document.querySelectorAll('.category-item');
    // 移除所有分类的激活状态
    categoryItems.forEach(i => {
        i.classList.remove('active', 'border-l-4', 'border-red-500', 'bg-white', 'font-medium');
        i.classList.add('text-gray-500');
    });

    // 添加当前分类的激活状态
    category.classList.add('active', 'border-l-4', 'border-red-500', 'bg-white', 'font-medium');
    category.classList.remove('text-gray-500');
}
function productItemsClick(product) {
    // 如果点击的是加号按钮，不显示详情弹窗
    // if (product.target.closest('button')) {
    //     return;
    // }
    
    // 获取商品信息
    const img = product.querySelector('img').src;
    const name = product.querySelector('h4').textContent;
    const desc = product.querySelector('p').textContent;
    const price = product.querySelector('.text-red-500').textContent.replace('¥', '');
    
    // 显示商品详情弹窗
    showProductDetail(img, name, desc, price);
}

// 食品安全档案弹窗
function showFoodSafetyInfo() {
    document.getElementById('food-safety-popup').classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
}

function closeFoodSafetyInfo() {
    document.getElementById('food-safety-popup').classList.add('hidden');
    document.body.style.overflow = ''; // 恢复背景滚动
}

// 商品详情弹窗
function showProductDetail(img, name, desc, price) {
    // 设置商品详情
    document.getElementById('product-detail-img').src = img;
    document.getElementById('product-detail-name').textContent = name;
    document.getElementById('product-detail-desc').textContent = desc;
    document.getElementById('product-detail-price').textContent = price;
    
    // 重置数量
    document.querySelector('.quantity-value').textContent = '0';
    updateQuantityButtonState();
    
    // 显示弹窗
    document.getElementById('product-detail-popup').classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
}

function closeProductDetail() {
    document.getElementById('product-detail-popup').classList.add('hidden');
    document.body.style.overflow = ''; // 恢复背景滚动
}

// 初始化数量按钮事件
document.addEventListener('DOMContentLoaded', function() {
    // 为数量按钮添加点击事件
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            const quantityElement = document.querySelector('.quantity-value');
            let quantity = parseInt(quantityElement.textContent);
            
            if (action === 'increase') {
                quantity++;
            } else if (action === 'decrease' && quantity > 0) {
                quantity--;
            }
            
            quantityElement.textContent = quantity;
            updateQuantityButtonState();
        });
    });
});

// 更新数量按钮状态
function updateQuantityButtonState() {
    const quantity = parseInt(document.querySelector('.quantity-value').textContent);
    const decreaseBtn = document.querySelector('.quantity-btn[data-action="decrease"]');
    
    if (quantity <= 0) {
        decreaseBtn.classList.add('opacity-50');
        decreaseBtn.disabled = true;
    } else {
        decreaseBtn.classList.remove('opacity-50');
        decreaseBtn.disabled = false;
    }
}

// 加入购物车
function addToCart() {
    const name = document.getElementById('product-detail-name').textContent;
    const price = document.getElementById('product-detail-price').textContent;
    const quantity = parseInt(document.querySelector('.quantity-value').textContent);
    const selectedSpec = document.querySelector('.spec-option.selected').textContent;
    
    if (quantity <= 0) {
        alert('请选择商品数量');
        return;
    }
    
    // 这里可以添加实际的购物车逻辑
    console.log(`添加到购物车: ${name} (${selectedSpec}) x${quantity}, 单价: ¥${price}`);
    
    // 显示成功提示
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm';
    toast.textContent = '已加入购物车';
    document.body.appendChild(toast);
    
    // 3秒后移除提示
    setTimeout(() => {
        toast.remove();
    }, 3000);
    
    // 关闭弹窗
    closeProductDetail();
}