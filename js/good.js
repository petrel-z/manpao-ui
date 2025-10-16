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
    bindSpecItemEvents();
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
    bindSpecItemEvents(newSpecItem);
}

// 为规格项绑定事件
function bindSpecItemEvents(container = null) {
    const targetContainer = container || document.getElementById('spec-list');
    if (!targetContainer) return;
    
    // 删除按钮事件
    const deleteButtons = targetContainer.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const specItem = this.closest('.spec-item');
            const specList = document.getElementById('spec-list');
            
            // 至少保留一个规格项
            if (specList && specList.children.length > 1) {
                specItem.remove();
            } else {
                alert('至少需要保留一个规格项');
            }
        });
    });
    
    // 下移按钮事件
    const moveDownButtons = targetContainer.querySelectorAll('.move-down-btn');
    moveDownButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const specItem = this.closest('.spec-item');
            const nextSibling = specItem.nextElementSibling;
            
            if (nextSibling) {
                specItem.parentNode.insertBefore(nextSibling, specItem);
            }
        });
    });
    
    // 插入按钮事件
    const insertButtons = targetContainer.querySelectorAll('.insert-btn');
    insertButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const specItem = this.closest('.spec-item');
            addNewSpecItem();
            
            // 将新添加的规格项移动到当前项的下方
            const specList = document.getElementById('spec-list');
            const newItem = specList.lastElementChild;
            specItem.parentNode.insertBefore(newItem, specItem.nextSibling);
        });
    });
}