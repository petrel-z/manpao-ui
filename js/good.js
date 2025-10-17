/**
 * 商品相关功能模块
 */

// 初始化商品规格选择功能
function initGoodsSpecSelector() {
    const specTypeRadios = document.querySelectorAll('input[name="spec-type"]');
    const unifiedModule = document.getElementById('unified-spec-module');
    const singleModule = document.getElementById('single-spec-module');
    const multipleModule = document.getElementById('multiple-spec-module');

    // 检查必要元素是否存在
    if (!specTypeRadios.length || !unifiedModule || !singleModule || !multipleModule) {
        return;
    }

// 多级规格分类页面相关功能
let currentCategoryId = 2;
let currentSpecId = 0;
let currentCommonCategory = '';
let selectedCommonOptions = [];

// 常用规格分类数据
const commonCategoriesData = {
    'fengliang': ['大', '中', '小', '超大', '迷你'],
    'kouwei': ['原味', '甜味', '咸味', '辣味', '酸味'],
    'wendu': ['热饮', '温饮', '冰饮', '常温']
};

// 初始化多级规格分类页面
function initMultiCategoryPage() {
    // 获取页面元素
    const backBtn = document.getElementById('back-btn');
    const addCategoryBtn = document.getElementById('add-category-btn');
    const commonCategoryButtons = document.querySelectorAll('[id^="common-category-btn-"]');
    const commonCategoryCancelBtn = document.getElementById('common-category-cancel-btn');
    const commonCategoryConfirmBtn = document.getElementById('common-category-confirm-btn');
    const addCategoryCancelBtn = document.getElementById('add-category-cancel-btn');
    const addCategorySaveBtn = document.getElementById('add-category-save-btn');
    const addSpecCancelBtn = document.getElementById('add-spec-cancel-btn');
    const addSpecSaveBtn = document.getElementById('add-spec-save-btn');
    const categoryList = document.getElementById('category-list');
    
    // 绑定返回按钮事件
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.history.back();
        });
    }
    
    // 绑定添加分类按钮事件
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', function() {
            showAddCategoryModals();
        });
    }
    
    // 绑定常用规格分类按钮事件
    commonCategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categoryType = this.id.replace('common-category-btn-', '');
            showCommonCategoryModal(categoryType);
        });
    });
    
    // 绑定常用规格分类弹窗按钮事件
    if (commonCategoryCancelBtn) {
        commonCategoryCancelBtn.addEventListener('click', function() {
            hideCommonCategoryModal();
        });
    }
    
    if (commonCategoryConfirmBtn) {
        commonCategoryConfirmBtn.addEventListener('click', function() {
            confirmCommonCategory();
        });
    }
    
    // 绑定添加规格分类弹窗按钮事件
    if (addCategoryCancelBtn) {
        addCategoryCancelBtn.addEventListener('click', function() {
            hideAddCategoryModal();
        });
    }
    
    if (addCategorySaveBtn) {
        addCategorySaveBtn.addEventListener('click', function() {
            saveNewCategory();
        });
    }
    
    // 绑定添加规格弹窗按钮事件
    if (addSpecCancelBtn) {
        addSpecCancelBtn.addEventListener('click', function() {
            hideAddSpecModal();
        });
    }
    
    if (addSpecSaveBtn) {
        addSpecSaveBtn.addEventListener('click', function() {
            saveNewSpec();
        });
    }
    
    // 使用事件委托绑定动态生成的按钮事件
    if (categoryList) {
        categoryList.addEventListener('click', function(e) {
            const target = e.target;
            const categoryId = target.getAttribute('data-category-id');
            
            if (target.classList.contains('add-spec-btn')) {
                showAddSpecModal(categoryId);
            } else if (target.classList.contains('move-up-btn')) {
                moveCategoryUp(categoryId);
            } else if (target.classList.contains('move-down-btn')) {
                moveCategoryDown(categoryId);
            } else if (target.classList.contains('delete-category-btn')) {

            } else if (target.classList.contains('save-common-btn')) {
                saveAsCommon(categoryId);
            }
        });
    }
}
initMultiCategoryPage();

// 显示常用规格分类弹窗
function showCommonCategoryModal(categoryName) {
    currentCommonCategory = categoryName;
    selectedCommonOptions = [];
    const modal = document.getElementById('common-category-modal');
    const title = document.getElementById('common-category-title');
    const optionsContainer = document.getElementById('common-category-options');
    
    title.textContent = `选择${categoryName}`;
    
    // 清空选项容器
    optionsContainer.innerHTML = '';
    
    // 添加选项
    const options = commonCategoriesData[categoryName] || [];
    options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'flex items-center space-x-2';
        optionDiv.innerHTML = `
            <input type="checkbox" id="option-${option}" value="${option}" 
                class="text-red-500" onchange="toggleCommonOption('${option}')">
            <label for="option-${option}" class="text-sm text-gray-700 cursor-pointer">${option}</label>
        `;
        optionsContainer.appendChild(optionDiv);
    });
    
    modal.classList.remove('hidden');
}

// 隐藏常用规格分类弹窗
function hideCommonCategoryModal() {
    const modal = document.getElementById('common-category-modal');
    modal.classList.add('hidden');
    selectedCommonOptions = [];
}

// 切换常用选项选择状态
function toggleCommonOption(option) {
    const index = selectedCommonOptions.indexOf(option);
    if (index > -1) {
        selectedCommonOptions.splice(index, 1);
    } else {
        selectedCommonOptions.push(option);
    }
}

// 确认常用规格分类选择
function confirmCommonCategory() {
    if (selectedCommonOptions.length === 0) {
        alert('请至少选择一个选项');
        return;
    }
    
    // 创建新的规格分类项
    createCategoryItem(currentCommonCategory, selectedCommonOptions);
    
    hideCommonCategoryModal();
}

// 显示添加规格分类弹窗
function showAddCategoryModals() {
    const modal = document.getElementById('add-category-modal-multi');
    const input = document.getElementById('category-name-input-multi');
    
    if (!modal) {
        console.error('找不到add-category-modal-multi元素');
        return;
    }
    
    if (!input) {
        console.error('找不到category-name-input-multi元素');
        return;
    }
    
    input.value = '';
    modal.classList.remove('hidden');
}

// 隐藏添加规格分类弹窗
function hideAddCategoryModal() {
    const modal = document.getElementById('add-category-modal-multi');
    modal.classList.add('hidden');
}

// 保存新规格分类
function saveNewCategory() {
    const input = document.getElementById('category-name-input-multi');
    const categoryName = input.value.trim();
    
    if (!categoryName) {
        alert('请输入分类名称');
        return;
    }
    
    // 创建新的规格分类项
    createCategoryItem(categoryName, []);
    
    hideAddCategoryModal();
}

// 创建规格分类项
function createCategoryItem(categoryName, specs = []) {
    currentCategoryId++;
    const categoryList = document.getElementById('category-list');
    
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'bg-white rounded-lg p-4 mb-3';
    categoryDiv.id = `category-${currentCategoryId}`;
    
    let specsHtml = '';
    specs.forEach(spec => {
        specsHtml += `
            <span class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded mr-2 mb-2">${spec}</span>
        `;
    });
    
    categoryDiv.innerHTML = `
        <div class="flex flex-col justify-between mb-3">
            <div class="text-sm font-medium text-gray-800 mb-3">${categoryName}</div>
            <div class="">
                <div id="specs-${currentCategoryId}" class="min-h-[20px]">
                    ${specsHtml}
                </div>
            </div>
            <div class="flex items-center justify-end space-x-2 mt-3">
                <button data-category-id="${currentCategoryId}" class="move-up-btn px-2 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                    上移
                </button>
                <button data-category-id="${currentCategoryId}" class="move-down-btn px-2 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                    下移
                </button>
                <button data-category-id="${currentCategoryId}" class="delete-category-btn px-2 py-1 text-xs text-red-500 border border-red-300 rounded hover:bg-red-50">
                    删除
                </button>
                <button data-category-id="${currentCategoryId}" class="save-common-btn px-2 py-1 text-xs text-blue-500 border border-blue-300 rounded hover:bg-blue-50">
                    保存为常用
                </button>
            </div>
        </div>
        <button data-category-id="${currentCategoryId}" class="add-spec-btn w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-red-300 hover:text-red-500 transition-colors text-sm">
            + 添加规格
        </button>
    `;
    
    categoryList.appendChild(categoryDiv);
}

// 显示添加规格弹窗
function showAddSpecModal(categoryId) {
    const modal = document.getElementById('add-spec-modal');
    const input = document.getElementById('spec-name-input');
    input.value = '';
    input.setAttribute('data-category-id', categoryId);
    modal.classList.remove('hidden');
}

// 隐藏添加规格弹窗
function hideAddSpecModal() {
    const modal = document.getElementById('add-spec-modal');
    modal.classList.add('hidden');
}

// 保存新规格
function saveNewSpec() {
    const input = document.getElementById('spec-name-input');
    const specName = input.value.trim();
    const categoryId = input.getAttribute('data-category-id');
    
    if (!specName) {
        alert('请输入规格名称');
        return;
    }
    
    // 添加规格到对应分类
    const specsContainer = document.getElementById(`specs-${categoryId}`);
    const specSpan = document.createElement('span');
    specSpan.className = 'inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded mr-2 mb-2';
    specSpan.textContent = specName;
    specsContainer.appendChild(specSpan);
    
    hideAddSpecModal();
}


    // 切换规格模块显示
    function switchSpecModule(specType) {
        // 隐藏所有模块
        unifiedModule.classList.add('hidden');
        singleModule.classList.add('hidden');
        multipleModule.classList.add('hidden');

        // 根据选择的规格类型显示对应模块
        switch (specType) {
            case 'unified':
                unifiedModule.classList.remove('hidden');
                break;
            case 'single':
                singleModule.classList.remove('hidden');
                break;
            case 'multiple':
                multipleModule.classList.remove('hidden');
                break;
        }
    }

    // 为每个单选按钮添加事件监听
    specTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                switchSpecModule(this.value);
            }
        });
    });

    // 初始化时显示默认选中的模块
    const checkedRadio = document.querySelector('input[name="spec-type"]:checked');
    if (checkedRadio) {
        switchSpecModule(checkedRadio.value);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initGoodsSpecSelector();
});

// 监听页面显示事件（用于单页应用场景）
document.addEventListener('pageShown', function(event) {
    if (event.detail && event.detail.pageId === 'add-goods') {
        // 延迟初始化，确保DOM已完全渲染
        setTimeout(() => {
            initGoodsSpecSelector();
        }, 100);
    } else if (event.detail && event.detail.pageId === 'single-size') {
        // 初始化单规格页面
        setTimeout(() => {
            initSingleSizePage();
        }, 100);
    } else if (event.detail && event.detail.pageId === 'multi-category') {
    } else if (event.detail && event.detail.pageId === 'multi-price') {
        // 初始化多规格价格页面
        setTimeout(() => {
            initMultiPricePage();
        }, 100);
    }
});

// 初始化单规格页面功能
function initSingleSizePage() {
    const addSpecBtn = document.getElementById('add-spec-btn');
    const specList = document.getElementById('spec-list');
    
    if (!addSpecBtn || !specList) {
        return;
    }
    
    // 添加规格按钮点击事件
    addSpecBtn.addEventListener('click', function() {
        addNewSpecItem();
    });
    
    // 为现有规格项绑定事件
    // bindSpecItemEvents();
}

// 添加新的规格项
function addNewSpecItem() {
    const specList = document.getElementById('spec-list');
    if (!specList) return;
    
    const specItemHTML = `
        <div class="spec-item bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div class="space-y-3">
                <!-- 规格名称 -->
                <div class="flex items-center space-x-3">
                    <label class="text-sm text-gray-700 w-12">规格：</label>
                    <div class="flex-1">
                        <input type="text" placeholder="请输入规格名称，如：大杯" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-500">
                    </div>
                </div>
                
                <!-- 价格和库存 -->
                <div class="grid grid-cols-2 gap-3">
                    <div class="flex items-center space-x-2">
                        <label class="text-sm text-gray-700 w-10">价格：</label>
                        <div class="flex-1">
                            <input type="number" placeholder="0.00" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-500" 
                                   step="0.01" min="0">
                        </div>
                        <span class="text-xs text-gray-500">元</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <label class="text-sm text-gray-700 w-10">库存：</label>
                        <div class="flex-1">
                            <input type="number" placeholder="0" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-500" 
                                   min="0">
                        </div>
                        <span class="text-xs text-gray-500">件</span>
                    </div>
                </div>
                
                <!-- 可售卖状态和操作按钮 -->
                <div class="flex items-center justify-between">
                    <label class="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" class="text-red-500" checked>
                        <span class="text-sm text-gray-700">可售卖</span>
                    </label>
                    <div class="flex items-center space-x-2">
                        <button class="move-down-btn px-2 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                            下移
                        </button>
                        <button class="insert-btn px-2 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                            插入
                        </button>
                        <button class="delete-btn px-2 py-1 text-xs text-red-500 border border-red-300 rounded hover:bg-red-50">
                            删除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 创建新元素并添加到列表中
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = specItemHTML;
    const newSpecItem = tempDiv.firstElementChild;
    
    specList.appendChild(newSpecItem);
    
    // 为新添加的规格项绑定事件
    // bindSpecItemEvents(newSpecItem);
}

// 初始化多规格价格页面
function initMultiPricePage() {
    const filterBtn = document.getElementById('filter-btn');
    const filterDropdown = document.getElementById('filter-dropdown');
    const resetBtn = document.getElementById('filter-reset-btn');
    const confirmBtn = document.getElementById('filter-confirm-btn');
    
    if (!filterBtn || !filterDropdown) {
        return;
    }
    
    // 筛选按钮点击事件
    filterBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        filterDropdown.classList.remove('hidden');
    });
    
    // 点击页面其他地方关闭下拉框
    document.addEventListener('click', function(e) {
        if (!filterDropdown.contains(e.target) && !filterBtn.contains(e.target)) {
        filterDropdown.classList.add('hidden');
        }
    });
    
    // 重置按钮事件
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            const checkboxes = filterDropdown.querySelectorAll('.filter-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                filterDropdown.classList.add('hidden');
            });
        });
    }
    
    // 确认按钮事件
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            filterSpecCombinations();
            filterDropdown.classList.add('hidden');
        });
    }
}

// 筛选规格组合
function filterSpecCombinations() {
    const filterDropdown = document.getElementById('filter-dropdown');
    const specList = document.getElementById('spec-combination-list');
    
    if (!filterDropdown || !specList) {
        return;
    }
    
    // 获取选中的筛选条件
    const selectedFilters = {
        '口味': [],
        '分量': []
    };
    
    const checkboxes = filterDropdown.querySelectorAll('.filter-checkbox:checked');
    checkboxes.forEach(checkbox => {
        const category = checkbox.dataset.category;
        const value = checkbox.dataset.value;
        if (selectedFilters[category]) {
            selectedFilters[category].push(value);
        }
    });
    
    // 获取所有规格组合项
    const specItems = specList.querySelectorAll('.spec-combination-item');
    
    specItems.forEach(item => {
        const specName = item.querySelector('.spec-name').textContent;
        let shouldShow = true;
        
        // 检查是否符合筛选条件
        for (const [category, values] of Object.entries(selectedFilters)) {
            if (values.length > 0) {
                const hasMatch = values.some(value => specName.includes(value));
                if (!hasMatch) {
                    shouldShow = false;
                    break;
                }
            }
        }
        
        // 显示或隐藏规格项
        if (shouldShow) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    // 更新统计信息
    updateSpecStats();
}

// 更新规格统计信息
function updateSpecStats() {
    const specList = document.getElementById('spec-combination-list');
    const totalCountElement = document.querySelector('.spec-stats .text-gray-600');
    
    if (!specList || !totalCountElement) {
        return;
    }
    
    const visibleItems = specList.querySelectorAll('.spec-combination-item:not([style*="display: none"])');
    const totalItems = specList.querySelectorAll('.spec-combination-item');
    
    totalCountElement.textContent = `共${visibleItems.length}个规格组合（总计${totalItems.length}个）`;
}
