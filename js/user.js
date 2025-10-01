    
let countdownTimer;
let goldBeanUsed = false; // 标记是否已使用金豆

// 倒计时功能
function startCountdown() {
    let timeLeft = 15 * 60; // 15分钟
    const countdownElement = document.getElementById('countdown');
    
    countdownTimer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // 最后1分钟时添加紧急样式
        if (timeLeft <= 60) {
            countdownElement.parentElement.classList.add('countdown-urgent');
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            countdownElement.textContent = '00:00';
            // 这里可以添加订单过期的处理逻辑
            alert('订单已过期，请重新下单');
        }
        
        timeLeft--;
    }, 1000);
}

// 支付方式选择
function selectPayment(type) {
    // 移除所有选中状态
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('payment-selected');
    });
    
    // 添加选中状态
    const selectedOption = document.getElementById(type + '-payment');
    if (selectedOption) {
        selectedOption.classList.add('payment-selected');
    }
}

// 显示支付弹窗
function showPaymentModal() {
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

// 隐藏支付弹窗
function hidePaymentModal() {
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// 显示取消订单弹窗
function showCancelModal() {
    const modal = document.getElementById('cancel-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

// 隐藏取消订单弹窗
function hideCancelModal() {
    const modal = document.getElementById('cancel-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// 显示金豆使用弹窗
function showGoldBeanModal() {
    const modal = document.getElementById('gold-bean-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

// 隐藏金豆使用弹窗
function hideGoldBeanModal() {
    const modal = document.getElementById('gold-bean-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// 确认使用金豆
function confirmUseGoldBean() {
    goldBeanUsed = true;
    
    // 更新费用明细显示
    const payableAmount = document.querySelector('.text-red-500.text-lg');
    if (payableAmount) {
        payableAmount.textContent = '￥0';
        payableAmount.classList.remove('text-red-500');
        payableAmount.classList.add('text-green-600');
    }
    
    // 更新金豆按钮状态
    const goldBeanButton = document.querySelector('button[onclick="showGoldBeanModal()"]');
    if (goldBeanButton) {
        goldBeanButton.innerHTML = `
            <i class="fas fa-check-circle text-green-600"></i>
            <span class="text-sm font-medium text-green-700">已使用金豆抵扣</span>
            <span class="text-xs text-green-600">(已抵扣￥64)</span>
        `;
        goldBeanButton.classList.remove('bg-yellow-50', 'border-yellow-200', 'text-yellow-700', 'hover:bg-yellow-100');
        goldBeanButton.classList.add('bg-green-50', 'border-green-200', 'text-green-700');
        goldBeanButton.onclick = null; // 禁用点击
    }
    
    // 添加金豆抵扣项到费用明细
    const costDetails = document.querySelector('.space-y-2.text-caption');
    if (costDetails && !document.querySelector('.gold-bean-deduction')) {
        const goldBeanItem = document.createElement('div');
        goldBeanItem.className = 'flex justify-between text-green-600 gold-bean-deduction';
        goldBeanItem.innerHTML = `
            <span>金豆抵扣</span>
            <span>-￥64</span>
        `;
        // 在应付金额之前插入
        const payableSection = costDetails.querySelector('.border-t');
        costDetails.insertBefore(goldBeanItem, payableSection);
    }
    
    hideGoldBeanModal();
    
    // 显示成功提示
    showToast('金豆抵扣成功！');
}

// 确认取消订单
function confirmCancel() {
    alert('订单已取消');
    hideCancelModal();
    // 这里可以添加返回上一页或跳转到订单列表的逻辑
}

// 显示提示消息
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 2000);
}

// 点击弹窗外部关闭弹窗
document.addEventListener('click', function(e) {
    const paymentModal = document.getElementById('payment-modal');
    const cancelModal = document.getElementById('cancel-modal');
    const goldBeanModal = document.getElementById('gold-bean-modal');
    
    if (e.target === paymentModal) {
        hidePaymentModal();
    }
    if (e.target === cancelModal) {
        hideCancelModal();
    }
    if (e.target === goldBeanModal) {
        hideGoldBeanModal();
    }
});

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('待支付详情页面已加载');
    startCountdown();
    selectPayment('wechat'); // 默认选择微信支付
});

// 页面显示时重新开始倒计时
function initUnpaidDetail() {
    startCountdown();
    selectPayment('wechat');
}

// 推广明细页面相关功能
let promotionData = {
    totalCount: 0,
    todayCount: 0,
    totalEarnings: 0,
    promotionList: []
};

// 模拟推广数据
const mockPromotionData = {
    totalCount: 15,
    todayCount: 3,
    totalEarnings: 75.00,
    promotionList: [
        {
            id: 1,
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face',
            nickname: '小美同学',
            joinTime: '2024-01-15 14:30',
            status: 'completed', // completed, pending
            reward: 5.00,
            orderCount: 3
        },
        {
            id: 2,
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop&crop=face',
            nickname: '张小明',
            joinTime: '2024-01-15 10:20',
            status: 'completed',
            reward: 5.00,
            orderCount: 1
        },
        {
            id: 3,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
            nickname: '李同学',
            joinTime: '2024-01-14 16:45',
            status: 'pending',
            reward: 0,
            orderCount: 0
        },
        {
            id: 4,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
            nickname: '王小华',
            joinTime: '2024-01-14 09:15',
            status: 'completed',
            reward: 5.00,
            orderCount: 2
        },
        {
            id: 5,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
            nickname: '刘小红',
            joinTime: '2024-01-13 20:30',
            status: 'completed',
            reward: 5.00,
            orderCount: 5
        }
    ]
};

// 初始化推广明细页面
function initPromotionDetail() {
    // 加载推广数据
    loadPromotionData();
    
    // 绑定时间筛选事件
    const timeFilter = document.getElementById('time-filter');
    if (timeFilter) {
        timeFilter.addEventListener('change', function() {
            filterPromotionList(this.value);
        });
    }
}

// 加载推广数据
function loadPromotionData() {
    // 模拟从服务器获取数据
    promotionData = { ...mockPromotionData };
    
    // 更新统计信息
    updatePromotionStats();
    
    // 渲染推广列表
    renderPromotionList(promotionData.promotionList);
}

// 更新推广统计信息
function updatePromotionStats() {
    const promotionCountEl = document.getElementById('promotion-count');
    const todayPromotionEl = document.getElementById('today-promotion');
    const totalEarningsEl = document.getElementById('total-earnings');
    
    if (promotionCountEl) {
        promotionCountEl.textContent = promotionData.totalCount;
    }
    
    if (todayPromotionEl) {
        todayPromotionEl.textContent = promotionData.todayCount;
    }
    
    if (totalEarningsEl) {
        totalEarningsEl.textContent = `¥${promotionData.totalEarnings.toFixed(2)}`;
    }
}

// 渲染推广列表
function renderPromotionList(list) {
    const promotionListEl = document.getElementById('promotion-list');
    if (!promotionListEl) return;
    
    if (list.length === 0) {
        promotionListEl.innerHTML = `
            <div class="flex items-center justify-center py-12 text-gray-400">
                <div class="text-center">
                    <i class="fas fa-user-plus text-4xl mb-3"></i>
                    <p class="text-sm">暂无推广记录</p>
                    <p class="text-xs mt-1">快去邀请好友加入吧！</p>
                </div>
            </div>
        `;
        return;
    }
    
    const listHTML = list.map(user => `
        <div class="p-4 hover:bg-gray-50 transition-colors">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <img src="${user.avatar}" alt="${user.nickname}" 
                         class="w-12 h-12 rounded-full object-cover border-2 border-gray-100">
                    <div>
                        <div class="flex items-center space-x-2">
                            <h4 class="font-semibold text-sm text-gray-800">${user.nickname}</h4>
                            <span class="px-2 py-0.5 text-xs rounded-full ${
                                user.status === 'completed' 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'bg-yellow-100 text-yellow-600'
                            }">
                                ${user.status === 'completed' ? '已生效' : '待生效'}
                            </span>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">加入时间：${user.joinTime}</p>
                        <p class="text-xs text-gray-500">已下单：${user.orderCount}次</p>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-lg font-bold ${
                        user.status === 'completed' ? 'text-green-600' : 'text-gray-400'
                    }">
                        ${user.status === 'completed' ? `+¥${user.reward.toFixed(2)}` : '¥0.00'}
                    </div>
                    <div class="text-xs text-gray-400">推广奖励</div>
                </div>
            </div>
        </div>
    `).join('');
    
    promotionListEl.innerHTML = listHTML;
}

// 筛选推广列表
function filterPromotionList(timeFilter) {
    let filteredList = [...promotionData.promotionList];
    const now = new Date();
    
    switch (timeFilter) {
        case 'today':
            filteredList = filteredList.filter(user => {
                const joinDate = new Date(user.joinTime);
                return joinDate.toDateString() === now.toDateString();
            });
            break;
        case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            filteredList = filteredList.filter(user => {
                const joinDate = new Date(user.joinTime);
                return joinDate >= weekAgo;
            });
            break;
        case 'month':
            const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            filteredList = filteredList.filter(user => {
                const joinDate = new Date(user.joinTime);
                return joinDate >= monthAgo;
            });
            break;
        default:
            // 'all' - 显示全部
            break;
    }
    
    renderPromotionList(filteredList);
}

// 页面显示时初始化
document.addEventListener('pageShown', function(e) {
    if (e.detail.pageId === 'promotion-detail') {
        initPromotionDetail();
    }
});