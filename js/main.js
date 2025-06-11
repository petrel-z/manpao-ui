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
    if (bottomNav) {
        // 只在这五个页面显示底部导航
        if (pageId === 'home' || pageId === 'grab-orders' || pageId === 'community' || 
            pageId === 'orders' || pageId === 'profile') {
            bottomNav.style.display = 'flex';
        } else {
            bottomNav.style.display = 'none';
        }
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
    
    // 保存当前页面为首页
    localStorage.setItem('currentPage', 'home');
    
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
    
    // 保存当前页面为首页
    localStorage.setItem('currentPage', 'home');
    
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
        if (pageId === 'home' || pageId === 'grab-orders' || pageId === 'community' || 
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