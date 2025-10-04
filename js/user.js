let countdownTimer;
let goldBeanUsed = false; // 标记是否已使用金豆

// 倒计时功能
function startCountdown() {
  let timeLeft = 15 * 60; // 15分钟
  const countdownElement = document.getElementById("countdown");
  if (countdownElement) {
    countdownTimer = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;

      countdownElement.textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      // 最后1分钟时添加紧急样式
      if (timeLeft <= 60) {
        countdownElement.parentElement.classList.add("countdown-urgent");
      }

      if (timeLeft <= 0) {
        clearInterval(countdownTimer);
        countdownElement.textContent = "00:00";
        // 这里可以添加订单过期的处理逻辑
        alert("订单已过期，请重新下单");
      }

      timeLeft--;
    }, 1000);
  }
}

// 支付方式选择
function selectPayment(type) {
  // 移除所有选中状态
  document.querySelectorAll(".payment-option").forEach((option) => {
    option.classList.remove("payment-selected");
  });

  // 添加选中状态
  const selectedOption = document.getElementById(type + "-payment");
  if (selectedOption) {
    selectedOption.classList.add("payment-selected");
  }
}

// 显示支付弹窗
function showPaymentModal() {
  const modal = document.getElementById("payment-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

// 隐藏支付弹窗
function hidePaymentModal() {
  const modal = document.getElementById("payment-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// 显示取消订单弹窗
function showCancelModal() {
  const modal = document.getElementById("cancel-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

// 隐藏取消订单弹窗
function hideCancelModal() {
  const modal = document.getElementById("cancel-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// 显示金豆使用弹窗
function showGoldBeanModal() {
  const modal = document.getElementById("gold-bean-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

// 隐藏金豆使用弹窗
function hideGoldBeanModal() {
  const modal = document.getElementById("gold-bean-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// 确认使用金豆
function confirmUseGoldBean() {
  goldBeanUsed = true;

  // 更新费用明细显示
  const payableAmount = document.querySelector(".text-red-500.text-lg");
  if (payableAmount) {
    payableAmount.textContent = "￥0";
    payableAmount.classList.remove("text-red-500");
    payableAmount.classList.add("text-green-600");
  }

  // 更新金豆按钮状态
  const goldBeanButton = document.querySelector(
    'button[onclick="showGoldBeanModal()"]'
  );
  if (goldBeanButton) {
    goldBeanButton.innerHTML = `
            <i class="fas fa-check-circle text-green-600"></i>
            <span class="text-sm font-medium text-green-700">已使用金豆抵扣</span>
            <span class="text-xs text-green-600">(已抵扣￥64)</span>
        `;
    goldBeanButton.classList.remove(
      "bg-yellow-50",
      "border-yellow-200",
      "text-yellow-700",
      "hover:bg-yellow-100"
    );
    goldBeanButton.classList.add(
      "bg-green-50",
      "border-green-200",
      "text-green-700"
    );
    goldBeanButton.onclick = null; // 禁用点击
  }

  // 添加金豆抵扣项到费用明细
  const costDetails = document.querySelector(".space-y-2.text-caption");
  if (costDetails && !document.querySelector(".gold-bean-deduction")) {
    const goldBeanItem = document.createElement("div");
    goldBeanItem.className =
      "flex justify-between text-green-600 gold-bean-deduction";
    goldBeanItem.innerHTML = `
            <span>金豆抵扣</span>
            <span>-￥64</span>
        `;
    // 在应付金额之前插入
    const payableSection = costDetails.querySelector(".border-t");
    costDetails.insertBefore(goldBeanItem, payableSection);
  }

  hideGoldBeanModal();

  // 显示成功提示
  showToast("金豆抵扣成功！");
}

// 确认取消订单
function confirmCancel() {
  alert("订单已取消");
  hideCancelModal();
  // 这里可以添加返回上一页或跳转到订单列表的逻辑
}

// 显示提示消息
function showToast(message) {
  const toast = document.createElement("div");
  toast.className =
    "fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg z-50";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    document.body.removeChild(toast);
  }, 2000);
}

// 点击弹窗外部关闭弹窗
document.addEventListener("click", function (e) {
  const paymentModal = document.getElementById("payment-modal");
  const cancelModal = document.getElementById("cancel-modal");
  const goldBeanModal = document.getElementById("gold-bean-modal");

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
document.addEventListener("DOMContentLoaded", function () {
  console.log("待支付详情页面已加载");
  startCountdown();
  selectPayment("wechat"); // 默认选择微信支付
});

// 页面显示时重新开始倒计时
function initUnpaidDetail() {
  startCountdown();
  selectPayment("wechat");
}

// 推广明细页面相关功能
let promotionData = {
  totalCount: 0,
  todayCount: 0,
  totalEarnings: 0,
  promotionList: [],
};

// 模拟推广数据
const mockPromotionData = {
  totalCount: 15,
  todayCount: 3,
  totalEarnings: 75.0,
  promotionList: [
    {
      id: 1,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
      nickname: "小美同学",
      joinTime: "2024-01-15 14:30",
      status: "completed", // completed, pending
      reward: 5.0,
      orderCount: 3,
    },
    {
      id: 2,
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop&crop=face",
      nickname: "张小明",
      joinTime: "2024-01-15 10:20",
      status: "completed",
      reward: 5.0,
      orderCount: 1,
    },
    {
      id: 3,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      nickname: "李同学",
      joinTime: "2024-01-14 16:45",
      status: "pending",
      reward: 0,
      orderCount: 0,
    },
    {
      id: 4,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      nickname: "王小华",
      joinTime: "2024-01-14 09:15",
      status: "completed",
      reward: 5.0,
      orderCount: 2,
    },
    {
      id: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      nickname: "刘小红",
      joinTime: "2024-01-13 20:30",
      status: "completed",
      reward: 5.0,
      orderCount: 5,
    },
  ],
};

// 初始化推广明细页面
function initPromotionDetail() {
  // 加载推广数据
  loadPromotionData();

  // 绑定时间筛选事件
  const timeFilter = document.getElementById("time-filter");
  if (timeFilter) {
    timeFilter.addEventListener("change", function () {
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
  const promotionCountEl = document.getElementById("promotion-count");
  const todayPromotionEl = document.getElementById("today-promotion");
  const totalEarningsEl = document.getElementById("total-earnings");

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
  const promotionListEl = document.getElementById("promotion-list");
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

  const listHTML = list
    .map(
      (user) => `
        <div class="p-4 hover:bg-gray-50 transition-colors">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <img src="${user.avatar}" alt="${user.nickname}" 
                         class="w-12 h-12 rounded-full object-cover border-2 border-gray-100">
                    <div>
                        <div class="flex items-center space-x-2">
                            <h4 class="font-semibold text-sm text-gray-800">${
                              user.nickname
                            }</h4>
                            <span class="px-2 py-0.5 text-xs rounded-full ${
                              user.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-600"
                            }">
                                ${
                                  user.status === "completed"
                                    ? "已生效"
                                    : "待生效"
                                }
                            </span>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">加入时间：${
                          user.joinTime
                        }</p>
                        <p class="text-xs text-gray-500">已下单：${
                          user.orderCount
                        }次</p>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-lg font-bold ${
                      user.status === "completed"
                        ? "text-green-600"
                        : "text-gray-400"
                    }">
                        ${
                          user.status === "completed"
                            ? `+¥${user.reward.toFixed(2)}`
                            : "¥0.00"
                        }
                    </div>
                    <div class="text-xs text-gray-400">推广奖励</div>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  promotionListEl.innerHTML = listHTML;
}

// 筛选推广列表
function filterPromotionList(timeFilter) {
  let filteredList = [...promotionData.promotionList];
  const now = new Date();

  switch (timeFilter) {
    case "today":
      filteredList = filteredList.filter((user) => {
        const joinDate = new Date(user.joinTime);
        return joinDate.toDateString() === now.toDateString();
      });
      break;
    case "week":
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filteredList = filteredList.filter((user) => {
        const joinDate = new Date(user.joinTime);
        return joinDate >= weekAgo;
      });
      break;
    case "month":
      const monthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      filteredList = filteredList.filter((user) => {
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
document.addEventListener("pageShown", function (e) {
  if (e.detail.pageId === "promotion-detail") {
    initPromotionDetail();
  }
});

// 用户评价管理相关功能
document.addEventListener(
  "DOMContentLoaded",
  function () {
    // 模拟用户评价数据 - 统一为同一个用户
    const userComments = [
      {
        id: 1,
        // 用户信息 - 统一用户
        userAvatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
        userNickname: "小美同学",
        // 商品信息
        productName: "麻辣香锅套餐",
        productImage:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop",
        // 商家信息
        shopName: "川味小厨",
        shopImage:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=60&h=60&fit=crop",
        shopAddress: "学府路123号",
        shopCategory: "川菜",
        // 评价信息
        rating: 5,
        comment: "味道很棒，麻辣适中，配菜丰富，下次还会再点！",
        commentTime: "2024-01-15 20:30",
        orderNumber: "#2024011500123",
        hasReply: true,
        shopReply: "感谢您的好评，欢迎再次光临！",
        replyTime: "2024-01-15 21:00",
      },
      {
        id: 2,
        // 用户信息 - 统一用户
        userAvatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
        userNickname: "小美同学",
        // 商品信息
        productName: "招牌牛肉面",
        productImage:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=80&h=80&fit=crop",
        // 商家信息
        shopName: "老北京面馆",
        shopImage:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=60&h=60&fit=crop",
        shopAddress: "中关村大街456号",
        shopCategory: "面食",
        // 评价信息
        rating: 4,
        comment: "牛肉很嫩，面条劲道，汤头浓郁，就是稍微有点咸。",
        commentTime: "2024-01-14 18:45",
        orderNumber: "#2024011400089",
        hasReply: false,
      },
      {
        id: 3,
        // 用户信息 - 统一用户
        userAvatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
        userNickname: "小美同学",
        // 商品信息
        productName: "宫保鸡丁盖饭",
        productImage:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=80&h=80&fit=crop",
        // 商家信息
        shopName: "家常菜馆",
        shopImage:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=60&h=60&fit=crop",
        shopAddress: "五道口789号",
        shopCategory: "家常菜",
        // 评价信息
        rating: 3,
        comment: "味道一般，鸡丁有点老，米饭还可以，配送速度挺快的。",
        commentTime: "2024-01-13 12:20",
        orderNumber: "#2024011300056",
        hasReply: true,
        shopReply: "抱歉让您不满意，我们会改进菜品质量。",
        replyTime: "2024-01-13 14:30",
      },
      {
        id: 4,
        // 用户信息 - 统一用户
        userAvatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
        userNickname: "小美同学",
        // 商品信息
        productName: "酸菜鱼套餐",
        productImage:
          "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=80&h=80&fit=crop",
        // 商家信息
        shopName: "渝味鱼庄",
        shopImage:
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=60&h=60&fit=crop",
        shopAddress: "清华东路321号",
        shopCategory: "川菜",
        // 评价信息
        rating: 5,
        comment: "鱼肉鲜嫩，酸菜爽脆，汤头鲜美，分量足够，非常满意！",
        commentTime: "2024-01-12 19:15",
        orderNumber: "#2024011200034",
        hasReply: true,
        shopReply: "谢谢亲的支持，我们会继续保持品质！",
        replyTime: "2024-01-12 20:00",
      },
      {
        id: 5,
        // 用户信息 - 统一用户
        userAvatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
        userNickname: "小美同学",
        // 商品信息
        productName: "红烧肉套餐",
        productImage:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=80&h=80&fit=crop",
        // 商家信息
        shopName: "妈妈味道",
        shopImage:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=60&h=60&fit=crop",
        shopAddress: "北大南门888号",
        shopCategory: "家常菜",
        // 评价信息
        rating: 2,
        comment: "红烧肉太甜了，而且有点腻，米饭也不够热，整体不太满意。",
        commentTime: "2024-01-11 13:30",
        orderNumber: "#2024011100012",
        hasReply: false,
      },
    ];

    let filteredComments = [...userComments];

    // 初始化页面
    function initUserCommentManage() {
      updateStats();
      renderCommentList(filteredComments);
      bindEvents();
    }

    // 更新统计信息
    function updateStats() {
      const totalComments = userComments.length;
      const goodComments = userComments.filter(
        (comment) => comment.rating >= 4
      ).length;
      const avgRating =
        userComments.reduce((sum, comment) => sum + comment.rating, 0) /
        totalComments;

      document.getElementById("total-comments").textContent = totalComments;
      document.getElementById("good-comments").textContent = goodComments;
      document.getElementById("avg-rating").textContent = avgRating.toFixed(1);
    }

    // 渲染评价列表
    function renderCommentList(comments) {
      const commentList = document.getElementById("comment-list");
      if (!commentList) return;

      if (comments.length === 0) {
        document.getElementById("empty-state").classList.remove("hidden");
        return;
      }

      document.getElementById("empty-state").classList.add("hidden");

      commentList.innerHTML = comments
        .map(
          (comment) => `
            <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <!-- 用户信息区域 -->
                <div class="flex items-center space-x-3 mb-3 pb-3 border-b border-gray-100">
                    <img src="${comment.userAvatar}" alt="${
            comment.userNickname
          }" class="w-12 h-12 rounded-full object-cover border-2 border-gray-100">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2">
                            <h3 class="font-medium text-body-md text-gray-800">${
                              comment.userNickname
                            }</h3>
                            <span class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs">自己</span>
                        </div>
                        <div class="flex items-center space-x-1 mt-1">
                            ${generateStars(comment.rating)}
                        </div>
                    </div>
                    <div class="text-right w-[30%]">
                        <div class="text-gray-400 text-caption">${
                          comment.commentTime
                        }</div>
                    </div>
                </div>

                <!-- 评价内容区域 -->
                <div class="mb-3">
                    <p class="text-gray-700 text-body-sm mb-2">${
                      comment.comment
                    }</p>
                    <div class="text-gray-500 text-caption">订单号：${
                      comment.orderNumber
                    }</div>
                </div>

                <!-- 商品信息区域 -->
                <div class="mb-3">
                    <div class="text-gray-800 text-body-sm font-medium">${
                      comment.productName
                    }</div>
                </div>

                <!-- 商家卡片区域 -->
                <div class="flex items-center space-x-3 mb-3 p-3 bg-gray-50 rounded-lg">
                    <img src="${comment.shopImage}" alt="${
            comment.shopName
          }" class="w-10 h-10 rounded-lg object-cover">
                    <div class="flex-1">
                        <div class="font-medium text-body-sm text-gray-800">${
                          comment.shopName
                        }</div>
                        <div class="text-gray-500 text-caption">${
                          comment.shopAddress
                        }</div>
                        <div class="text-gray-500 text-caption">${
                          comment.shopCategory
                        }</div>
                    </div>
                </div>

                <!-- 商家回复区域 -->
                ${
                  comment.hasReply
                    ? `
                    <div class="mt-3 bg-white border border-gray-100 rounded-lg p-3 shadow-sm">
                        <div class="flex items-start space-x-3">
                            <img src="${comment.shopImage}" alt="商家头像" class="w-8 h-8 rounded-full">
                            <div class="flex-1">
                                <div class="flex items-center space-x-2 mb-1">
                                    <span class="text-gray-800 text-body-sm font-medium">${comment.shopName}</span>
                                    <span class="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs">商家</span>
                                </div>
                                <p class="text-gray-700 text-body-sm mb-2">${comment.shopReply}</p>
                                <div class="flex justify-between items-center">
                                    <div class="text-gray-400 text-caption">${comment.replyTime}</div>
                                    <div class="text-gray-400 text-caption">回复</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                    : ""
                }

                <!-- 操作按钮区域 -->
                <div class="flex justify-end space-x-2 mt-3">
                    <button class="text-red-500 text-body-sm hover:text-red-600" onclick="deleteComment(${
                      comment.id
                    })">
                        <i class="fas fa-trash mr-1"></i>删除评价
                    </button>
                </div>
            </div>
        `
        )
        .join("");
    }

    // 生成星级评分
    function generateStars(rating) {
      let starsHtml = "";
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          starsHtml += '<i class="fas fa-star text-yellow-400 text-sm"></i>';
        } else {
          starsHtml += '<i class="fas fa-star text-gray-300 text-sm"></i>';
        }
      }
      return starsHtml;
    }

    // 筛选评价
    function filterComments() {
      const ratingFilter = document.getElementById("rating-filter").value;

      if (ratingFilter === "all") {
        filteredComments = [...userComments];
      } else {
        const targetRating = parseInt(ratingFilter);
        filteredComments = userComments.filter(
          (comment) => comment.rating === targetRating
        );
      }

      renderCommentList(filteredComments);
    }

    // 绑定事件
    function bindEvents() {
      document
        .getElementById("rating-filter")
        .addEventListener("change", filterComments);
    }

    // 删除评价
    window.deleteComment = function (commentId) {
      if (confirm("确定要删除这条评价吗？")) {
        const index = userComments.findIndex(
          (comment) => comment.id === commentId
        );
        if (index > -1) {
          userComments.splice(index, 1);
          filteredComments = filteredComments.filter(
            (comment) => comment.id !== commentId
          );
          updateStats();
          renderCommentList(filteredComments);
          showToast("评价已删除");
        }
      }
    };

    // 显示提示信息
    function showToast(message) {
      // 创建toast元素
      const toast = document.createElement("div");
      toast.className =
        "fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg z-50 text-body-sm";
      toast.textContent = message;
      document.body.appendChild(toast);

      // 3秒后移除
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
    }

    // 页面显示时初始化
    document.addEventListener("pageShown", function (e) {
      if (e.detail.pageId === "comment-manage-user") {
        initUserCommentManage();
      }
    });

    // 如果页面已经显示，直接初始化
    // if (
    //   document
    //     .getElementById("comment-manage-user")
    //     .classList.contains("page-current")
    // ) {
    //   initUserCommentManage();
    // }
  },

  // 评论详情页功能
  function initCommentDetailPage() {
    initReplySubmit();
    initReplyList();
  },

  // 初始化回复提交功能
  function initReplySubmit() {
    const replyInput = document.getElementById("reply-input");
    const submitButton = document.querySelector(
      'button[onclick="submitReply()"]'
    );

    if (replyInput && submitButton) {
      // 监听输入框回车事件
      replyInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          submitReply();
        }
      });
    }
  },

  // 提交回复功能
  function submitReply() {
    const replyInput = document.getElementById("reply-input");
    const replyList = document.getElementById("reply-list");
    const noReplyTip = document.getElementById("no-reply-tip");

    if (!replyInput || !replyList) return;

    const replyText = replyInput.value.trim();
    if (!replyText) {
      showToast("请输入回复内容");
      return;
    }

    // 创建新回复元素
    const newReply = document.createElement("div");
    newReply.className = "flex items-start";
    newReply.innerHTML = `
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="我的头像" class="w-8 h-8 rounded-full mr-3 mt-1">
        <div class="flex-1">
            <div class="flex items-center mb-1">
                <span class="font-medium text-body-sm mr-2">张三</span>
                <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">自己</span>
                <span class="text-gray-400 text-xs ml-auto">${formatCurrentTime()}</span>
            </div>
            <p class="text-gray-700 text-body-sm">${replyText}</p>
        </div>
    `;

    // 添加到回复列表
    replyList.appendChild(newReply);

    // 隐藏无回复提示
    if (noReplyTip) {
      noReplyTip.classList.add("hidden");
    }

    // 更新回复数量
    updateReplyCount();

    // 清空输入框
    replyInput.value = "";

    // 显示成功提示
    showToast("回复发布成功");

    console.log("新回复已发布:", replyText);
  },

  // 初始化回复列表
  function initReplyList() {
    const replyList = document.getElementById("reply-list");
    const noReplyTip = document.getElementById("no-reply-tip");

    if (replyList && noReplyTip) {
      // 检查是否有回复
      const replies = replyList.children;
      if (replies.length === 0) {
        noReplyTip.classList.remove("hidden");
      }
    }
  },

  // 更新回复数量
  function updateReplyCount() {
    const replyList = document.getElementById("reply-list");
    const replyTitle = document.querySelector("h3");

    if (replyList && replyTitle) {
      const count = replyList.children.length;
      replyTitle.textContent = `全部回复 (${count})`;
    }
  },

  // 格式化当前时间
  function formatCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  },

  // 页面初始化监听器
  document.addEventListener("DOMContentLoaded", function () {
    // 检查是否在评价页面
    if (document.getElementById("evaluate")) {
      initEvaluatePage();
    }

    // 检查是否在评论详情页面
    if (document.getElementById("comment-detail")) {
      initCommentDetailPage();
    }

    // 检查是否在用户评论管理页面
    if (document.getElementById("comment-manage-user")) {
      initUserCommentManage();
    }
  }),
  function initEvaluatePage() {
    let selectedTags = []; // 存储选中的标签
    let currentRating = 4; // 当前评分，默认4星

    // 初始化星级评分点击事件
    initStarRating();

    // 初始化标签选择事件
    initTagSelection();

    // 初始化字符计数
    initCharacterCount();

    // 初始化文件上传
    initFileUpload();

    // 初始化提交按钮
    initSubmitButton();

    // 星级评分功能
    function initStarRating() {
      const stars = document.querySelectorAll(".fas.fa-star");

      stars.forEach((star, index) => {
        star.addEventListener("click", function () {
          currentRating = index + 1;
          updateStarDisplay();
        });

        star.addEventListener("mouseenter", function () {
          highlightStars(index + 1);
        });
      });

      // 鼠标离开星级区域时恢复当前评分显示
      const starContainer = document.querySelector(".flex.space-x-1.mx-4");
      if (starContainer) {
        starContainer.addEventListener("mouseleave", function () {
          updateStarDisplay();
        });
      }
    }

    // 更新星级显示
    function updateStarDisplay() {
      highlightStars(currentRating);
    }

    // 高亮星级
    function highlightStars(rating) {
      const stars = document.querySelectorAll(".fas.fa-star");
      stars.forEach((star, index) => {
        if (index < rating) {
          star.classList.remove("text-gray-300");
          star.classList.add("text-yellow-400");
        } else {
          star.classList.remove("text-yellow-400");
          star.classList.add("text-gray-300");
        }
      });
    }

    // 标签选择功能
    function initTagSelection() {
      const tagButtons = document.querySelectorAll(".tag-btn");

      tagButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const tag = this.getAttribute("data-tag");

          if (selectedTags.includes(tag)) {
            // 取消选择
            selectedTags = selectedTags.filter((t) => t !== tag);
            this.classList.remove(
              "border-orange-400",
              "bg-orange-50",
              "text-orange-600"
            );
            this.classList.add("border-gray-300", "text-gray-600");
          } else {
            // 选择标签
            selectedTags.push(tag);
            this.classList.remove("border-gray-300", "text-gray-600");
            this.classList.add(
              "border-orange-400",
              "bg-orange-50",
              "text-orange-600"
            );
          }

          console.log("已选择标签:", selectedTags);
        });
      });
    }

    // 字符计数功能
    function initCharacterCount() {
      const textarea = document.getElementById("review-text");
      const charCount = document.getElementById("char-count");

      if (textarea && charCount) {
        textarea.addEventListener("input", function () {
          const currentLength = this.value.length;
          charCount.textContent = `${currentLength}/200`;

          // 接近字符限制时改变颜色
          if (currentLength > 180) {
            charCount.classList.add("text-red-500");
          } else {
            charCount.classList.remove("text-red-500");
          }
        });
      }
    }

    // 文件上传功能
    function initFileUpload() {
      const uploadItem = document.querySelector(".upload-item");
      const fileInput = uploadItem?.querySelector('input[type="file"]');

      if (uploadItem && fileInput) {
        uploadItem.addEventListener("click", function () {
          fileInput.click();
        });

        fileInput.addEventListener("change", function () {
          const files = Array.from(this.files);
          console.log("选择的文件:", files);
          // 这里可以添加文件预览功能
        });
      }
    }

    // 提交按钮功能
    function initSubmitButton() {
      const submitButton = document.querySelector(
        'button[class*="bg-gradient-to-r"]'
      );

      if (submitButton) {
        submitButton.addEventListener("click", function () {
          const reviewText =
            document.getElementById("review-text")?.value || "";

          const evaluationData = {
            rating: currentRating,
            comment: reviewText,
            tags: selectedTags,
            timestamp: new Date().toISOString(),
          };

          console.log("提交评价数据:", evaluationData);

          // 显示提交成功提示
          showToast("评价提交成功！");

          // 这里可以添加实际的提交逻辑
          // 例如发送到服务器或保存到本地存储
        });
      }
    }
  }
);
