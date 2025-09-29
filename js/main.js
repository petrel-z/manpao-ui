/**
 * 页面切换功能
 * @param {string} pageId - 要显示的页面ID
 */
function showPage(pageId) {
  // 隐藏所有页面
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.remove("active");
  });

  // 显示指定页面
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add("active");
    // 移除动画效果
  }

  // 更新导航按钮状态
  const navButtons = document.querySelectorAll(".prototype-btn");
  navButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.page === pageId) {
      btn.classList.add("active");
    }
  });

  // 延迟执行底部导航控制，确保页面内容已加载
  setTimeout(() => {
    // 控制底部导航的显示与隐藏
    const bottomNav = document.querySelector(".bottom-nav");
    const circleBottomNav = document.querySelector(".circle-bottom-nav");

    console.log("查找底部导航元素:", {
      bottomNav: !!bottomNav,
      circleBottomNav: !!circleBottomNav,
      pageId: pageId,
    });

    // 隐藏所有底部导航
    if (bottomNav) bottomNav.style.display = "none";
    if (circleBottomNav) circleBottomNav.style.display = "none";

    // 根据页面ID显示相应的底部导航
    if (pageId === "circle" || pageId === "community") {
      // 显示圈子专用底部导航
      if (circleBottomNav) {
        circleBottomNav.style.display = "flex";
        console.log("显示圈子底部导航");
      } else {
        console.log("未找到圈子底部导航元素");
      }
    } else if (
      pageId === "home" ||
      pageId === "grab-orders" ||
      pageId === "orders" ||
      pageId === "profile"
    ) {
      // 显示主底部导航
      if (bottomNav) {
        bottomNav.style.display = "flex";
        console.log("显示主底部导航");
      }
    }
  }, 100);

  // 更新底部导航栏状态
  if (typeof updateNavActiveState === "function") {
    console.log("调用updateNavActiveState函数，页面ID：", pageId);
    updateNavActiveState(pageId);
  } else {
    console.error("updateNavActiveState函数未定义");
  }

  // 保存当前页面到本地存储
  localStorage.setItem("currentPage", pageId);
}

/**
 * 初始化页面
 */
function initializeApp() {
  // 检查用户是否已登录
  const userInfo = localStorage.getItem("userInfo");

  // 从本地存储中获取上次访问的页面
  let lastPage = localStorage.getItem("currentPage") || "login";

  // 如果用户已登录但当前页面是登录页，则跳转到首页
  if (userInfo && lastPage === "login") {
    lastPage = "home";
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
  const timeString = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

  const timeElements = document.querySelectorAll(
    ".status-bar span:first-child"
  );
  timeElements.forEach((el) => {
    el.textContent = timeString;
  });
}

function updateNavActiveState(pageId) {
  console.log("更新导航状态，当前页面：", pageId);

  // 移除所有导航项的活跃状态
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.classList.remove("active");
    item.classList.add("text-gray-500");
    // 确保所有图标和文本都是灰色
    item.style.color = "";
  });

  // 根据页面ID设置对应导航项的活跃状态
  let activeNavId = null;
  if (pageId === "home") {
    activeNavId = "b-nav-home";
  } else if (pageId === "community") {
    activeNavId = "b-nav-community";
  } else if (pageId === "orders") {
    activeNavId = "b-nav-orders-list";
  } else if (pageId === "grab-orders") {
    activeNavId = "b-nav-orders";
  } else if (
    pageId === "profile" ||
    pageId === "profile-edit" ||
    pageId === "merchant" ||
    pageId === "captain" ||
    pageId === "balance"
  ) {
    activeNavId = "b-nav-profile";
  }

  console.log("活跃导航ID：", activeNavId);

  if (activeNavId) {
    const activeNav = document.getElementById(activeNavId);
    if (activeNav) {
      activeNav.classList.add("active");
      activeNav.classList.remove("text-gray-500");
      // 直接设置颜色样式，确保覆盖Tailwind类
      activeNav.style.color = "#ff6b6b";
      console.log("已设置活跃状态");
    }
  }
}

/**
 * 用户登录功能
 */
function login() {
  // 检查是否同意用户协议和隐私政策
  const agreementCheckbox = document.querySelector("#account-agreement");
  if (!agreementCheckbox.checked) {
    alert("请阅读并同意用户协议和隐私政策");
    return;
  }

  const username = document.querySelector('#login input[type="text"]').value;
  const password = document.querySelector(
    '#login input[type="password"]'
  ).value;
  const role = document.querySelector("#role-select").value;

  // 简单验证
  if (!username || !password) {
    alert("请输入账号和密码");
    return;
  }

  // 模拟验证成功
  // 在实际应用中，这里应该是向后端发送请求验证账号密码

  // 保存用户信息到本地存储
  const userInfo = {
    username: username,
    role: role,
    roleName: getRoleName(role),
    id: "123456789", // 模拟用户ID
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));

  // 登录成功，跳转到首页
  showPage("home");
}

/**
 * 微信登录功能
 */
function wechatLogin() {
  // 检查是否同意用户协议和隐私政策
  const agreementCheckbox = document.querySelector("#wechat-agreement");
  if (!agreementCheckbox.checked) {
    alert("请阅读并同意用户协议和隐私政策");
    return;
  }

  // 模拟微信登录成功
  // 在实际应用中，这里应该是调用微信登录API

  // 保存用户信息到本地存储（默认为学生角色）
  const userInfo = {
    username: "微信用户" + Math.floor(Math.random() * 10000), // 随机用户名
    role: "student",
    roleName: getRoleName("student"),
    id: "wx_" + Math.floor(Math.random() * 1000000), // 模拟微信用户ID
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));

  // 登录成功，跳转到首页
  showPage("home");
}

/**
 * 获取角色名称
 * @param {string} role - 角色代码
 * @returns {string} 角色名称
 */
function getRoleName(role) {
  switch (role) {
    case "student":
      return "学生";
    case "merchant-normal":
      return "普通商家";
    case "merchant-student":
      return "学生商家";
    case "captain":
      return "团长";
    case "rider":
      return "骑手";
    default:
      return "学生";
  }
}

/**
 * 获取角色标签颜色
 * @param {string} role - 角色代码
 * @returns {string} 颜色类名
 */
function getRoleColor(role) {
  switch (role) {
    case "student":
      return "bg-yellow-400 text-red-800";
    case "merchant-normal":
    case "merchant-student":
      return "bg-blue-400 text-white";
    case "captain":
      return "bg-purple-400 text-white";
    case "rider":
      return "bg-green-400 text-white";
    default:
      return "bg-yellow-400 text-red-800";
  }
}

// 当DOM加载完成后初始化应用
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();

  // 监听个人中心页面显示事件
  document.addEventListener("pageShown", function (e) {
    if (e.detail.pageId === "profile") {
      updateUserProfile();
    }
  });
});

/**
 * 更新个人中心页面的用户信息
 */
function updateUserProfile() {
  const userInfoStr = localStorage.getItem("userInfo");
  if (!userInfoStr) return;

  const userInfo = JSON.parse(userInfoStr);

  // 更新用户名
  const nameElement = document.querySelector("#profile h3");
  if (nameElement) {
    nameElement.textContent = userInfo.username;
  }

  // 更新用户ID
  const idElement = document.querySelector(
    "#profile .flex.items-center.mt-1 p"
  );
  if (idElement) {
    idElement.textContent = "ID: " + userInfo.id;
  }

  // 更新角色标签
  const roleElement = document.querySelector(
    "#profile .flex.items-center.mt-1 .rounded-full span"
  );
  const roleBgElement = document.querySelector(
    "#profile .flex.items-center.mt-1 .rounded-full"
  );

  if (roleElement && roleBgElement) {
    roleElement.textContent = userInfo.roleName;

    // 移除所有背景色和文字色类
    roleBgElement.className = roleBgElement.className
      .replace(/bg-\w+-\d+/g, "")
      .replace(/text-\w+-\d+/g, "");

    // 添加新的颜色类
    const colorClasses = getRoleColor(userInfo.role).split(" ");
    colorClasses.forEach((cls) => {
      roleBgElement.classList.add(cls);
    });

    // 保持其他类
    roleBgElement.classList.add("ml-2", "px-2", "py-0.5", "rounded-full");
  }
}

// 自定义事件，用于通知页面显示
function showPage(pageId) {
  // 原有的showPage代码
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add("active");
  }

  const navButtons = document.querySelectorAll(".prototype-btn");
  navButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.page === pageId) {
      btn.classList.add("active");
    }
  });

  // 延迟执行底部导航控制，确保页面内容已加载
  setTimeout(() => {
    // 控制底部导航的显示与隐藏
    const bottomNav = document.querySelector(".bottom-nav");
    const circleBottomNav = document.querySelector(".circle-bottom-nav");

    console.log("第二个showPage - 查找底部导航元素:", {
      bottomNav: !!bottomNav,
      circleBottomNav: !!circleBottomNav,
      pageId: pageId,
    });

    // 隐藏所有底部导航
    if (bottomNav) bottomNav.style.display = "none";
    if (circleBottomNav) circleBottomNav.style.display = "none";

    // 根据页面ID显示相应的底部导航
    if (pageId === "circle" || pageId === "community") {
      // 显示圈子专用底部导航
      if (circleBottomNav) {
        circleBottomNav.style.display = "flex";
        console.log("第二个showPage - 显示圈子底部导航");
      } else {
        console.log("第二个showPage - 未找到圈子底部导航元素");
      }
    } else if (
      pageId === "home" ||
      pageId === "grab-orders" ||
      pageId === "orders" ||
      pageId === "profile"
    ) {
      // 显示主底部导航
      if (bottomNav) {
        bottomNav.style.display = "flex";
        console.log("第二个showPage - 显示主底部导航");
      }
    }
  }, 100);

  if (typeof updateNavActiveState === "function") {
    updateNavActiveState(pageId);
  }

  localStorage.setItem("currentPage", pageId);

  // 触发自定义事件
  document.dispatchEvent(
    new CustomEvent("pageShown", {
      detail: { pageId: pageId },
    })
  );
}

/**
 * 切换登录方式
 */
function toggleLoginMethod() {
  const wechatLogin = document.getElementById("wechat-login");
  const accountLogin = document.getElementById("account-login");

  if (wechatLogin.classList.contains("hidden")) {
    // 切换到微信登录
    wechatLogin.classList.remove("hidden");
    accountLogin.classList.add("hidden");
  } else {
    // 切换到账号密码登录
    wechatLogin.classList.add("hidden");
    accountLogin.classList.remove("hidden");
  }
}

// 显示支付弹窗
function showPaymentModal() {
  document.getElementById("payment-modal").classList.remove("hidden");
}

// 隐藏支付弹窗
function hidePaymentModal() {
  document.getElementById("payment-modal").classList.add("hidden");
}

function showPaymentModal() {
  document.getElementById("payment-modal").classList.remove("hidden");
}

function hidePaymentModal() {
  document.getElementById("payment-modal").classList.add("hidden");
}

function switchIdentity(identity) {
  // 获取所有商家特有的表单项
  const merchantOnlyFields = document.querySelectorAll(".merchant-only");
  // 获取所有学生特有的表单项
  const studentOnlyFields = document.querySelectorAll(".student-only");
  // 获取商家和学生共有的表单项
  const commonFields = document.querySelectorAll(".common-field");

  // 获取身份选择按钮
  const merchantBtn = document.getElementById("merchant-btn");
  const studentBtn = document.getElementById("student-btn");

  // 更新页面标题
  const pageTitle = document.getElementById("page-title");

  if (identity === "merchant") {
    // 显示商家特有的表单项
    merchantOnlyFields.forEach((field) => field.classList.remove("hidden"));
    // 隐藏学生特有的表单项
    studentOnlyFields.forEach((field) => field.classList.add("hidden"));
    // 更新按钮样式
    merchantBtn.classList.add("bg-red-500", "text-white");
    merchantBtn.classList.remove("bg-gray-200", "text-gray-700");
    studentBtn.classList.add("bg-gray-200", "text-gray-700");
    studentBtn.classList.remove("bg-red-500", "text-white");
    // 更新页面标题
    pageTitle.textContent = "商家入驻";
  } else if (identity === "student") {
    // 隐藏商家特有的表单项
    merchantOnlyFields.forEach((field) => field.classList.add("hidden"));
    // 显示学生特有的表单项
    studentOnlyFields.forEach((field) => field.classList.remove("hidden"));
    // 更新按钮样式
    studentBtn.classList.add("bg-red-500", "text-white");
    studentBtn.classList.remove("bg-gray-200", "text-gray-700");
    merchantBtn.classList.add("bg-gray-200", "text-gray-700");
    merchantBtn.classList.remove("bg-red-500", "text-white");
    // 更新页面标题
    pageTitle.textContent = "学生入驻";
  }
}
// 创建推广名片弹窗
function createPromotionCardModal() {
  // 检查是否已存在弹窗
  if (document.getElementById("promotion-card-modal")) {
    return;
  }

  // 创建弹窗元素
  const modal = document.createElement("div");
  modal.id = "promotion-card-modal";
  modal.className = "hidden absolute z-50";
  modal.style.cssText =
    "top: 0; left: 0; right: 0; bottom: 0; margin: 0 auto; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);";

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
  const profilePage = document.getElementById("profile");
  if (profilePage) {
    profilePage.appendChild(modal);
  }
}

// 页面加载时创建弹窗
document.addEventListener("DOMContentLoaded", function () {
  createPromotionCardModal();
});

// 显示推广名片弹窗
function showPromotionCard() {
  // 确保弹窗已创建
  createPromotionCardModal();

  const modal = document.getElementById("promotion-card-modal");
  const profilePage = document.getElementById("profile");

  if (modal && profilePage) {
    // 确保弹窗在profile页面内部
    if (!profilePage.contains(modal)) {
      profilePage.appendChild(modal);
    }
    modal.classList.remove("hidden");
    // 防止背景滚动，但只针对profile页面
    const scrollContainer = profilePage.querySelector(".overflow-y-auto");
    if (scrollContainer) {
      scrollContainer.style.overflow = "hidden";
    }
  } else {
    console.error("找不到推广名片弹窗元素或profile页面元素");
  }
}

// 隐藏推广名片弹窗
function hidePromotionCard() {
  const modal = document.getElementById("promotion-card-modal");
  const profilePage = document.getElementById("profile");

  if (modal) {
    modal.classList.add("hidden");
    // 恢复背景滚动，但只针对profile页面
    if (profilePage) {
      const scrollContainer = profilePage.querySelector(".overflow-y-auto");
      if (scrollContainer) {
        scrollContainer.style.overflow = "auto";
      }
    }
  }
}

// Tab切换功能
function switchTab(tabName) {
  // 重置所有tab和内容
  document
    .getElementById("tab-menu")
    .classList.remove("text-red-500", "border-b-2", "border-red-500");
  document.getElementById("tab-menu").classList.add("text-gray-500");
  document
    .getElementById("tab-info")
    .classList.remove("text-red-500", "border-b-2", "border-red-500");
  document.getElementById("tab-info").classList.add("text-gray-500");

  document.getElementById("content-menu").classList.add("hidden");
  document.getElementById("content-info").classList.add("hidden");

  // 激活选中的tab和内容
  document.getElementById("tab-" + tabName).classList.remove("text-gray-500");
  document
    .getElementById("tab-" + tabName)
    .classList.add("text-red-500", "border-b-2", "border-red-500");
  document.getElementById("content-" + tabName).classList.remove("hidden");
}

function categoryClick(category) {
  const categoryItems = document.querySelectorAll(".category-item");
  // 移除所有分类的激活状态
  categoryItems.forEach((i) => {
    i.classList.remove(
      "active",
      "border-l-4",
      "border-red-500",
      "bg-white",
      "font-medium"
    );
    i.classList.add("text-gray-500");
  });

  // 添加当前分类的激活状态
  category.classList.add(
    "active",
    "border-l-4",
    "border-red-500",
    "bg-white",
    "font-medium"
  );
  category.classList.remove("text-gray-500");
}
function productItemsClick(product) {
  // 如果点击的是加号按钮，不显示详情弹窗
  // if (product.target.closest('button')) {
  //     return;
  // }

  // 获取商品信息
  const img = product.querySelector("img").src;
  const name = product.querySelector("h4").textContent;
  const desc = product.querySelector("p").textContent;
  const price = product
    .querySelector(".text-red-500")
    .textContent.replace("¥", "");

  // 显示商品详情弹窗
  showProductDetail(img, name, desc, price);
}

// 食品安全档案弹窗
function showFoodSafetyInfo() {
  document.getElementById("food-safety-popup").classList.remove("hidden");
  document.body.style.overflow = "hidden"; // 禁止背景滚动
}

function closeFoodSafetyInfo() {
  document.getElementById("food-safety-popup").classList.add("hidden");
  document.body.style.overflow = ""; // 恢复背景滚动
}

// 商品详情弹窗
function showProductDetail(img, name, desc, price) {
  // 设置商品详情
  document.getElementById("product-detail-img").src = img;
  document.getElementById("product-detail-name").textContent = name;
  document.getElementById("product-detail-desc").textContent = desc;
  document.getElementById("product-detail-price").textContent = price;

  // 重置数量
  document.querySelector(".quantity-value").textContent = "0";
  updateQuantityButtonState();

  // 重置规格选择
  resetSpecSelection();

  // 显示弹窗
  document.getElementById("product-detail-popup").classList.remove("hidden");
  document.body.style.overflow = "hidden"; // 禁止背景滚动
}

function closeProductDetail() {
  document.getElementById("product-detail-popup").classList.add("hidden");
  document.body.style.overflow = ""; // 恢复背景滚动
}

// 重置规格选择
function resetSpecSelection() {
  const specOptions = document.querySelectorAll(".spec-option");
  specOptions.forEach((option, index) => {
    if (index === 0) {
      // 默认选中第一个规格
      option.classList.add("bg-red-50", "border-red-500", "text-red-500");
      option.classList.remove("text-gray-600");
    } else {
      option.classList.remove("bg-red-50", "border-red-500", "text-red-500");
      option.classList.add("text-gray-600");
    }
  });
}

// 规格选择事件处理
function handleSpecSelection(event) {
  if (event.target.classList.contains("spec-option")) {
    // 移除所有规格的选中状态
    document.querySelectorAll(".spec-option").forEach((option) => {
      option.classList.remove("bg-red-50", "border-red-500", "text-red-500");
      option.classList.add("text-gray-600");
    });

    // 设置当前选中的规格
    event.target.classList.add("bg-red-50", "border-red-500", "text-red-500");
    event.target.classList.remove("text-gray-600");

    // 更新价格
    const newPrice = event.target.dataset.price;
    document.getElementById("product-detail-price").textContent = newPrice;
  }
}

// 初始化数量按钮事件
document.addEventListener("DOMContentLoaded", function () {
  // 为数量按钮添加点击事件
  const quantityBtns = document.querySelectorAll(".quantity-btn");
  quantityBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const action = this.dataset.action;
      const quantityElement = document.querySelector(".quantity-value");
      let quantity = parseInt(quantityElement.textContent);

      if (action === "increase") {
        quantity++;
      } else if (action === "decrease" && quantity > 0) {
        quantity--;
      }

      quantityElement.textContent = quantity;
      updateQuantityButtonState();
    });
  });

  // 为规格选择按钮添加点击事件
  document.addEventListener("click", handleSpecSelection);
});

// 更新数量按钮状态
function updateQuantityButtonState() {
  const quantity = parseInt(
    document.querySelector(".quantity-value").textContent
  );
  const decreaseBtn = document.querySelector(
    '.quantity-btn[data-action="decrease"]'
  );

  if (quantity <= 0) {
    decreaseBtn.classList.add("opacity-50");
    decreaseBtn.disabled = true;
  } else {
    decreaseBtn.classList.remove("opacity-50");
    decreaseBtn.disabled = false;
  }
}

// 加入购物车
function addToCart() {
  const name = document.getElementById("product-detail-name").textContent;
  const price = document.getElementById("product-detail-price").textContent;
  const quantity = parseInt(
    document.querySelector(".quantity-value").textContent
  );
  const selectedSpec = document.querySelector(
    ".spec-option.selected"
  ).textContent;

  if (quantity <= 0) {
    alert("请选择商品数量");
    return;
  }

  // 这里可以添加实际的购物车逻辑
  console.log(
    `添加到购物车: ${name} (${selectedSpec}) x${quantity}, 单价: ¥${price}`
  );

  // 显示成功提示
  const toast = document.createElement("div");
  toast.className =
    "fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm";
  toast.textContent = "已加入购物车";
  document.body.appendChild(toast);

  // 3秒后移除提示
  setTimeout(() => {
    toast.remove();
  }, 3000);

  // 关闭弹窗
  closeProductDetail();
}

// 搜索历史记录
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// 初始化搜索页面
document.addEventListener("DOMContentLoaded", function () {
  // 只在搜索页面执行搜索相关初始化
  if (document.getElementById("search-history-list")) {
    // 显示历史搜索记录
    renderSearchHistory();

    // 监听搜索输入框变化
    const searchInput = document.getElementById("search-input");
    const clearBtn = document.getElementById("clear-search-btn");

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        if (clearBtn) {
          if (this.value.length > 0) {
            clearBtn.classList.remove("hidden");
          } else {
            clearBtn.classList.add("hidden");
          }
        }
      });

      // 监听回车键搜索
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          performSearch();
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        clearSearchInput();
      });
    }
  }
});

// 渲染搜索历史
function renderSearchHistory() {
  const historyList = document.getElementById("search-history-list");
  if (!historyList) {
    return; // 如果元素不存在，直接返回
  }

  historyList.innerHTML = "";

  searchHistory.forEach((term) => {
    const tag = document.createElement("div");
    tag.className =
      "bg-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700 flex items-center";
    tag.innerHTML = `
                <span class="cursor-pointer" onclick="searchWithHistoryTerm('${term}')">${term}</span>
                <i class="fas fa-times-circle ml-2 text-gray-500 cursor-pointer" onclick="removeHistoryTerm('${term}')"></i>
            `;
    historyList.appendChild(tag);
  });

  // 如果没有历史记录，显示提示
  if (searchHistory.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "text-gray-500 text-sm w-full text-center py-4";
    emptyMessage.textContent = "暂无搜索历史";
    historyList.appendChild(emptyMessage);
  }
}

// 执行搜索
function performSearch() {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.trim();

  if (searchTerm.length === 0) return;

  // 添加到搜索历史
  addToSearchHistory(searchTerm);

  // 显示搜索结果区域
  document.getElementById("search-results").classList.remove("hidden");

  // 模拟搜索结果（实际应用中应该调用API）
  const resultsContainer = document.getElementById("search-results-list");
  const noResultsMessage = document.getElementById("no-results-message");

  // 清空之前的结果
  resultsContainer.innerHTML = "";
  resultsContainer.appendChild(noResultsMessage);

  // 模拟搜索结果
  if (
    searchTerm.includes("食") ||
    searchTerm.includes("餐") ||
    searchTerm.includes("吃")
  ) {
    noResultsMessage.classList.add("hidden");

    // 添加模拟的搜索结果
    const results = [
      {
        name: "麦当劳（北大店）",
        category: "快餐",
        distance: "200m",
        rating: "4.8",
        minOrder: "￥15起送",
        image:
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=80&h=80&fit=crop",
      },
      {
        name: "蜀香川菜馆",
        category: "川菜",
        distance: "300m",
        rating: "4.7",
        minOrder: "￥25起送",
        image:
          "http://images.unsplash.com/photo-1739193878147-c3c4aada8756?q=80&w=2070&auto=format&fit=crop",
      },
    ];

    results.forEach((item) => {
      const resultItem = document.createElement("div");
      resultItem.className =
        "bg-white rounded-lg p-3 card-hover cursor-pointer mb-2";
      resultItem.setAttribute("onclick", "showPage('merchant-detail')");
      resultItem.innerHTML = `
                    <div class="flex space-x-3">
                        <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-lg object-cover">
                        <div class="flex-1">
                            <h4 class="font-semibold text-body-md">${item.name}</h4>
                            <p class="text-gray-600 text-caption">${item.category} | 距离${item.distance}</p>
                            <div class="flex items-center justify-between mt-1">
                                <span class="text-orange-500 font-bold text-caption">★ ${item.rating}</span>
                                <span class="text-red-500 font-bold text-caption">${item.minOrder}</span>
                            </div>
                        </div>
                    </div>
                `;
      resultsContainer.appendChild(resultItem);
    });
  } else {
    noResultsMessage.classList.remove("hidden");
  }
}

// 添加到搜索历史
function addToSearchHistory(term) {
  // 如果已存在，先移除
  const index = searchHistory.indexOf(term);
  if (index !== -1) {
    searchHistory.splice(index, 1);
  }

  // 添加到历史记录开头
  searchHistory.unshift(term);

  // 限制历史记录数量
  if (searchHistory.length > 10) {
    searchHistory = searchHistory.slice(0, 10);
  }

  // 保存到本地存储
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

  // 更新显示
  renderSearchHistory();
}

// 从历史记录中移除
function removeHistoryTerm(term) {
  const index = searchHistory.indexOf(term);
  if (index !== -1) {
    searchHistory.splice(index, 1);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    renderSearchHistory();
  }
}

// 清空搜索历史
function clearSearchHistory() {
  searchHistory = [];
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  renderSearchHistory();
}

// 使用历史搜索词进行搜索
function searchWithHistoryTerm(term) {
  document.getElementById("search-input").value = term;
  performSearch();
}

// 清空搜索输入框
function clearSearchInput() {
  const searchInput = document.getElementById("search-input");
  searchInput.value = "";
  document.getElementById("clear-search-btn").classList.add("hidden");
}

// 学校选择页面相关功能
const provinceData = {
  A: {
    安徽省: [
      "合肥市",
      "芜湖市",
      "蚌埠市",
      "淮南市",
      "马鞍山市",
      "淮北市",
      "铜陵市",
      "安庆市",
    ],
  },
  B: {
    北京市: ["北京市"],
    北京: ["北京市"],
  },
  C: {
    重庆市: ["重庆市"],
  },
  F: {
    福建省: [
      "福州市",
      "厦门市",
      "莆田市",
      "三明市",
      "泉州市",
      "漳州市",
      "南平市",
      "龙岩市",
      "宁德市",
    ],
  },
  G: {
    广东省: [
      "广州市",
      "韶关市",
      "深圳市",
      "珠海市",
      "汕头市",
      "佛山市",
      "江门市",
      "湛江市",
      "茂名市",
      "肇庆市",
      "惠州市",
      "梅州市",
      "汕尾市",
      "河源市",
      "阳江市",
      "清远市",
      "东莞市",
      "中山市",
      "潮州市",
      "揭阳市",
      "云浮市",
    ],
    广西壮族自治区: [
      "南宁市",
      "柳州市",
      "桂林市",
      "梧州市",
      "北海市",
      "防城港市",
      "钦州市",
      "贵港市",
      "玉林市",
      "百色市",
      "贺州市",
      "河池市",
      "来宾市",
      "崇左市",
    ],
    贵州省: ["贵阳市", "六盘水市", "遵义市", "安顺市", "毕节市", "铜仁市"],
  },
  H: {
    河北省: [
      "石家庄市",
      "唐山市",
      "秦皇岛市",
      "邯郸市",
      "邢台市",
      "保定市",
      "张家口市",
      "承德市",
      "沧州市",
      "廊坊市",
      "衡水市",
    ],
    河南省: [
      "郑州市",
      "开封市",
      "洛阳市",
      "平顶山市",
      "安阳市",
      "鹤壁市",
      "新乡市",
      "焦作市",
      "濮阳市",
      "许昌市",
      "漯河市",
      "三门峡市",
      "南阳市",
      "商丘市",
      "信阳市",
      "周口市",
      "驻马店市",
    ],
    黑龙江省: [
      "哈尔滨市",
      "齐齐哈尔市",
      "鸡西市",
      "鹤岗市",
      "双鸭山市",
      "大庆市",
      "伊春市",
      "佳木斯市",
      "七台河市",
      "牡丹江市",
      "黑河市",
      "绥化市",
    ],
    湖北省: [
      "武汉市",
      "黄石市",
      "十堰市",
      "宜昌市",
      "襄阳市",
      "鄂州市",
      "荆门市",
      "孝感市",
      "荆州市",
      "黄冈市",
      "咸宁市",
      "随州市",
    ],
    湖南省: [
      "长沙市",
      "株洲市",
      "湘潭市",
      "衡阳市",
      "邵阳市",
      "岳阳市",
      "常德市",
      "张家界市",
      "益阳市",
      "郴州市",
      "永州市",
      "怀化市",
      "娄底市",
    ],
    海南省: ["海口市", "三亚市", "三沙市", "儋州市"],
  },
  J: {
    江苏省: [
      "南京市",
      "无锡市",
      "徐州市",
      "常州市",
      "苏州市",
      "南通市",
      "连云港市",
      "淮安市",
      "盐城市",
      "扬州市",
      "镇江市",
      "泰州市",
      "宿迁市",
    ],
    江西省: [
      "南昌市",
      "景德镇市",
      "萍乡市",
      "九江市",
      "新余市",
      "鹰潭市",
      "赣州市",
      "吉安市",
      "宜春市",
      "抚州市",
      "上饶市",
    ],
    吉林省: [
      "长春市",
      "吉林市",
      "四平市",
      "辽源市",
      "通化市",
      "白山市",
      "松原市",
      "白城市",
    ],
  },
  L: {
    辽宁省: [
      "沈阳市",
      "大连市",
      "鞍山市",
      "抚顺市",
      "本溪市",
      "丹东市",
      "锦州市",
      "营口市",
      "阜新市",
      "辽阳市",
      "盘锦市",
      "铁岭市",
      "朝阳市",
      "葫芦岛市",
    ],
  },
  S: {
    上海市: ["上海市"],
    山东省: [
      "济南市",
      "青岛市",
      "淄博市",
      "枣庄市",
      "东营市",
      "烟台市",
      "潍坊市",
      "济宁市",
      "泰安市",
      "威海市",
      "日照市",
      "临沂市",
      "德州市",
      "聊城市",
      "滨州市",
      "菏泽市",
    ],
    山西省: [
      "太原市",
      "大同市",
      "阳泉市",
      "长治市",
      "晋城市",
      "朔州市",
      "晋中市",
      "运城市",
      "忻州市",
      "临汾市",
      "吕梁市",
    ],
    陕西省: [
      "西安市",
      "铜川市",
      "宝鸡市",
      "咸阳市",
      "渭南市",
      "延安市",
      "汉中市",
      "榆林市",
      "安康市",
      "商洛市",
    ],
    四川省: [
      "成都市",
      "自贡市",
      "攀枝花市",
      "泸州市",
      "德阳市",
      "绵阳市",
      "广元市",
      "遂宁市",
      "内江市",
      "乐山市",
      "南充市",
      "眉山市",
      "宜宾市",
      "广安市",
      "达州市",
      "雅安市",
      "巴中市",
      "资阳市",
    ],
  },
  T: {
    天津市: ["天津市"],
  },
  X: {
    新疆维吾尔自治区: ["乌鲁木齐市", "克拉玛依市", "吐鲁番市", "哈密市"],
  },
  Y: {
    云南省: [
      "昆明市",
      "曲靖市",
      "玉溪市",
      "保山市",
      "昭通市",
      "丽江市",
      "普洱市",
      "临沧市",
    ],
  },
  Z: {
    浙江省: [
      "杭州市",
      "宁波市",
      "温州市",
      "嘉兴市",
      "湖州市",
      "绍兴市",
      "金华市",
      "衢州市",
      "舟山市",
      "台州市",
      "丽水市",
    ],
  },
};

const schoolData = {
  北京市: [
    { name: "北京大学", address: "海淀区颐和园路5号" },
    { name: "清华大学", address: "海淀区清华园1号" },
    { name: "中国人民大学", address: "海淀区中关村大街59号" },
    { name: "北京师范大学", address: "海淀区新街口外大街19号" },
    { name: "北京理工大学", address: "海淀区中关村南大街5号" },
  ],
  上海市: [
    { name: "复旦大学", address: "杨浦区邯郸路220号" },
    { name: "上海交通大学", address: "闵行区东川路800号" },
    { name: "同济大学", address: "杨浦区四平路1239号" },
    { name: "华东师范大学", address: "闵行区东川路500号" },
  ],
  广州市: [
    { name: "中山大学", address: "新港西路135号" },
    { name: "华南理工大学", address: "天河区五山路381号" },
    { name: "暨南大学", address: "天河区黄埔大道西601号" },
  ],
  深圳市: [
    { name: "深圳大学", address: "南山区南海大道3688号" },
    { name: "南方科技大学", address: "南山区学苑大道1088号" },
  ],
  杭州市: [
    { name: "浙江大学", address: "西湖区余杭塘路866号" },
    { name: "浙江工业大学", address: "拱墅区朝晖六区潮王路18号" },
  ],
  南京市: [
    { name: "南京大学", address: "鼓楼区汉口路22号" },
    { name: "东南大学", address: "玄武区四牌楼2号" },
  ],
};

// 当前选中的城市和学校
let currentCity = "北京市";
let currentSelectedSchool = {
  name: "北京大学",
  address: "海淀区颐和园路5号",
};

// 显示城市选择弹窗
function showCitySelector() {
  const modal = document.getElementById("city-selector-modal");
  modal.style.display = "block";

  // 生成省份列表
  generateProvinceList();
}

// 隐藏城市选择弹窗
function hideCitySelector() {
  const modal = document.getElementById("city-selector-modal");
  modal.style.display = "none";
}

// 生成省份列表
function generateProvinceList() {
  const provinceList = document.getElementById("province-list");
  let html = "";

  Object.keys(provinceData)
    .sort()
    .forEach((letter) => {
      html += `<div class="px-3 py-1 text-xs text-gray-400 font-medium">${letter}</div>`;

      Object.keys(provinceData[letter]).forEach((province) => {
        html += `
                <div onclick="selectProvince('${province}')" 
                     class="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 border-b border-gray-50">
                    ${province}
                </div>
            `;
      });
    });

  provinceList.innerHTML = html;
}

// 选择省份
function selectProvince(province) {
  // 移除之前的选中状态
  document.querySelectorAll("#province-list > div").forEach((div) => {
    div.classList.remove("bg-blue-50", "text-blue-600");
  });

  // 添加选中状态
  event.target.classList.add("bg-blue-50", "text-blue-600");

  // 生成城市列表
  generateCityList(province);
}

// 生成城市列表
// 汉字转拼音首字母的映射表
const chineseToPinyinFirstLetter = {
  中: "Z",
  重: "C",
  珠: "Z",
  株: "Z",
  湘: "X",
  西: "X",
  武: "W",
  温: "W",
  威: "W",
  潍: "W",
  渭: "W",
  乌: "W",
  无: "W",
  芜: "W",
  吴: "W",
  梧: "W",
  五: "W",
  舞: "W",
  务: "W",
  雾: "W",
  物: "W",
  勿: "W",
  太: "T",
  泰: "T",
  台: "T",
  唐: "T",
  天: "T",
  铁: "T",
  通: "T",
  铜: "T",
  图: "T",
  土: "T",
  吐: "T",
  三: "S",
  沈: "S",
  深: "S",
  石: "S",
  苏: "S",
  宿: "S",
  随: "S",
  遂: "S",
  绥: "S",
  松: "S",
  四: "S",
  南: "N",
  宁: "N",
  牛: "N",
  内: "N",
  宁: "N",
  怒: "N",
  那: "N",
  纳: "N",
  乃: "N",
  奶: "N",
  男: "N",
  马: "M",
  茂: "M",
  梅: "M",
  蒙: "M",
  绵: "M",
  牡: "M",
  木: "M",
  目: "M",
  母: "M",
  墓: "M",
  慕: "M",
  拉: "L",
  来: "L",
  兰: "L",
  廊: "L",
  乐: "L",
  雷: "L",
  类: "L",
  冷: "L",
  离: "L",
  里: "L",
  理: "L",
  克: "K",
  昆: "K",
  库: "K",
  快: "K",
  宽: "K",
  矿: "K",
  框: "K",
  况: "K",
  亏: "K",
  葵: "K",
  魁: "K",
  济: "J",
  佳: "J",
  嘉: "J",
  江: "J",
  焦: "J",
  揭: "J",
  金: "J",
  锦: "J",
  晋: "J",
  京: "J",
  荆: "J",
  哈: "H",
  海: "H",
  汉: "H",
  杭: "H",
  合: "H",
  河: "H",
  鹤: "H",
  黑: "H",
  衡: "H",
  红: "H",
  呼: "H",
  广: "G",
  贵: "G",
  桂: "G",
  赣: "G",
  甘: "G",
  高: "G",
  格: "G",
  个: "G",
  根: "G",
  更: "G",
  工: "G",
  福: "F",
  抚: "F",
  阜: "F",
  富: "F",
  复: "F",
  府: "F",
  父: "F",
  付: "F",
  妇: "F",
  负: "F",
  附: "F",
  鄂: "E",
  恩: "E",
  额: "E",
  儿: "E",
  而: "E",
  尔: "E",
  耳: "E",
  二: "E",
  发: "F",
  法: "F",
  反: "F",
  大: "D",
  丹: "D",
  德: "D",
  定: "D",
  东: "D",
  都: "D",
  端: "D",
  对: "D",
  多: "D",
  达: "D",
  打: "D",
  成: "C",
  承: "C",
  城: "C",
  池: "C",
  赤: "C",
  崇: "C",
  川: "C",
  春: "C",
  慈: "C",
  从: "C",
  村: "C",
  北: "B",
  本: "B",
  蚌: "B",
  保: "B",
  包: "B",
  宝: "B",
  白: "B",
  百: "B",
  班: "B",
  板: "B",
  半: "B",
  安: "A",
  鞍: "A",
  澳: "A",
  奥: "A",
  阿: "A",
  爱: "A",
  艾: "A",
  按: "A",
  岸: "A",
  案: "A",
  暗: "A",
};

// 获取汉字或英文字符的首字母
function getFirstLetter(char) {
  if (chineseToPinyinFirstLetter[char]) {
    return chineseToPinyinFirstLetter[char];
  }
  return char.toUpperCase();
}

function generateCityList(province) {
  const cityList = document.getElementById("city-list");
  let html = "";

  // 找到对应省份的城市
  let cities = [];
  Object.keys(provinceData).forEach((letter) => {
    if (provinceData[letter][province]) {
      cities = provinceData[letter][province];
    }
  });

  if (cities.length > 0) {
    // 按首字母分组
    const cityGroups = {};
    cities.forEach((city) => {
      const firstLetter = getFirstLetter(city.charAt(0));
      if (!cityGroups[firstLetter]) {
        cityGroups[firstLetter] = [];
      }
      cityGroups[firstLetter].push(city);
    });

    // 生成HTML
    Object.keys(cityGroups)
      .sort()
      .forEach((letter) => {
        // html += `<div class="px-3 py-1 text-xs text-gray-400 font-medium">${letter}</div>`;

        cityGroups[letter].forEach((city) => {
          html += `
                    <div onclick="selectCity('${city}')" 
                         class="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 border-b border-gray-50">
                        ${city}
                    </div>
                `;
        });
      });
  } else {
    html =
      '<div class="p-4 text-gray-400 text-sm text-center">该省份暂无城市数据</div>';
  }

  cityList.innerHTML = html;
}

// 选择城市
function selectCity(city) {
  currentCity = city;

  // 更新当前城市显示
  document.getElementById("current-city").textContent = city;

  // 更新学校列表
  updateSchoolList();

  // 关闭弹窗
  hideCitySelector();
}

// 更新学校列表
function updateSchoolList() {
  const schoolsContainer = document.getElementById("schools-container");
  const schools = schoolData[currentCity] || [];

  if (schools.length > 0) {
    // 按首字母分组
    const schoolGroups = {};
    schools.forEach((school) => {
      const firstLetter = getFirstLetter(school.name.charAt(0));
      if (!schoolGroups[firstLetter]) {
        schoolGroups[firstLetter] = [];
      }
      schoolGroups[firstLetter].push(school);
    });

    // 生成HTML
    let html = "";
    Object.keys(schoolGroups)
      .sort()
      .forEach((letter) => {
        html += `<div class="px-3 py-1 text-xs text-gray-400 font-medium">${letter}</div>`;

        schoolGroups[letter].forEach((school) => {
          html += `
                    <div onclick="selectSchool('${school.name}', '${school.address}')" 
                         class="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 mb-2">
                        <div>
                            <h5 class="text-sm font-medium">${school.name}</h5>
                            <p class="text-xs text-gray-500">${school.address}</p>
                        </div>
                    </div>
                `;
        });
      });

    schoolsContainer.innerHTML = html;
  } else {
    schoolsContainer.innerHTML =
      '<div class="p-4 text-gray-400 text-sm text-center">该城市暂无学校数据</div>';
  }
}

// 搜索学校
function searchSchools() {
  const query = document
    .getElementById("school-search")
    .value.toLowerCase()
    .trim();
  const searchResults = document.getElementById("search-results");
  const clearBtn = document.getElementById("clear-search");
  const schoolList = document.getElementById("school-list");

  // 显示/隐藏清除按钮
  if (query) {
    clearBtn.style.display = "block";
  } else {
    clearBtn.style.display = "none";
    searchResults.style.display = "none";
    schoolList.style.display = "block";
    return;
  }

  const results = [];

  // 搜索当前城市的学校
  const schools = schoolData[currentCity] || [];
  schools.forEach((school) => {
    if (school.name.toLowerCase().includes(query)) {
      results.push(school);
    }
  });

  // 显示搜索结果
  if (results.length > 0) {
    // 按首字母分组
    const schoolGroups = {};
    results.forEach((school) => {
      const firstLetter = getFirstLetter(school.name.charAt(0));
      if (!schoolGroups[firstLetter]) {
        schoolGroups[firstLetter] = [];
      }
      schoolGroups[firstLetter].push(school);
    });

    // 生成HTML
    let html =
      '<div class="text-gray-500 text-sm mb-2">搜索结果</div><div id="search-list" class="space-y-2">';
    Object.keys(schoolGroups)
      .sort()
      .forEach((letter) => {
        html += `<div class="px-3 py-1 text-xs text-gray-400 font-medium">${letter}</div>`;

        schoolGroups[letter].forEach((school) => {
          html += `
                    <div onclick="selectSchool('${school.name}', '${school.address}')" 
                         class="flex items-center justify-between p-3 bg-white border rounded-lg cursor-pointer hover:bg-gray-50 mb-2">
                        <div>
                            <h5 class="text-sm font-medium">${school.name}</h5>
                            <p class="text-xs text-gray-500">${school.address}</p>
                        </div>
                    </div>
                `;
        });
      });
    html += "</div>";

    searchResults.innerHTML = html;
    searchResults.style.display = "block";
    schoolList.style.display = "none";
  } else {
    searchResults.innerHTML =
      '<div class="text-gray-500 text-sm mb-2">搜索结果</div><div class="p-3 text-gray-500 text-sm text-center">未找到相关学校</div>';
    searchResults.style.display = "block";
    schoolList.style.display = "none";
  }
}

// 清空搜索
function clearSchoolSearch() {
  document.getElementById("school-search").value = "";
  document.getElementById("search-results").style.display = "none";
  document.getElementById("clear-search").style.display = "none";
  document.getElementById("school-list").style.display = "block";
}

// 选择学校
function selectSchool(name, address) {
  currentSelectedSchool = { name, address };
  updateSelectedSchoolDisplay();

  // 隐藏搜索结果
  const searchResults = document.getElementById("search-results");
  if (searchResults) {
    searchResults.style.display = "none";
  }
  const searchInput = document.getElementById("school-search");
  if (searchInput) {
    searchInput.value = "";
  }
}

// 更新选中学校的显示
function updateSelectedSchoolDisplay() {
  const selectedSchoolElement = document.querySelector(
    "#school-list .bg-red-50"
  );
  if (selectedSchoolElement) {
    selectedSchoolElement.innerHTML = `
            <div>
                <h4 class="font-semibold text-sm text-red-600">${currentSelectedSchool.name}</h4>
                <p class="text-gray-600 text-xs">${currentSelectedSchool.address}</p>
            </div>
            <i class="fas fa-check-circle text-red-500"></i>
        `;
  }
}

// 页面加载时初始化
if (typeof initializeSchoolSelect === "undefined") {
  window.initializeSchoolSelect = function () {
    updateSelectedSchoolDisplay();
    updateSchoolList();
  };

  // 如果当前页面是学校选择页面，则初始化
  if (document.getElementById("school-list")) {
    initializeSchoolSelect();
  }
}

// 金豆使用规则弹窗功能
function showGoldBeanRules() {
  const modal = document.getElementById("goldBeanRulesModal");
  console.log("show gold bean rules", modal);
  if (modal) {
    modal.style.display = "block";
  }
}

function hideGoldBeanRules() {
  const modal = document.getElementById("goldBeanRulesModal");
  if (modal) {
    modal.style.display = "none";
  }
}

function toggleSortOptions() {
  const sortOptions = document.getElementById("sort-options");
  sortOptions.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
  const sortOptions = document.querySelectorAll(".sort-option");
  sortOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // 只能有一个排序选项处于激活状态
      const siblings = Array.from(this.parentNode.children);
      siblings.forEach((sibling) => {
        sibling.classList.remove("active");
      });

      // 激活当前点击的选项
      this.classList.add("active");

      // 隐藏排序选项面板
      document.getElementById("sort-options").classList.add("hidden");

      // 模拟排序效果（实际应用中应该根据排序条件对数据进行排序）
      console.log("排序条件：", this.textContent);
    });
  });
});


