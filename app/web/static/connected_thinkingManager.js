import { t } from '/static/i18n.js';

// connected_thinkingManager.js - 处理AI思考过程显示

export class ThinkingManager {
    constructor() {
        this.thinkingContainer = document.getElementById('thinking-timeline');
        this.recordCountElement = document.getElementById('record-count');
        this.autoScrollCheckbox = document.getElementById('auto-scroll');
        this.thinkingSteps = [];
    }

    // 初始化思考管理器
    init() {
        // 初始化记录计数
        this.updateRecordCount();
    }

    // 添加思考步骤
    addThinkingStep(step) {
        this.thinkingSteps.push(step);

        // 创建并添加步骤元素
        const stepElement = this.createStepElement(step);
        this.thinkingContainer.appendChild(stepElement);

        // 更新记录计数
        this.updateRecordCount();

        // 如果启用了自动滚动，滚动到底部
        if (this.autoScrollCheckbox.checked) {
            this.scrollToBottom();
        }

        // 淡入效果
        setTimeout(() => {
            stepElement.style.opacity = 1;
        }, 10);
    }

    // 添加多个思考步骤
    addThinkingSteps(steps) {
        if (!Array.isArray(steps)) return;

        steps.forEach(step => {
            this.addThinkingStep(step);
        });
    }

    // 创建步骤元素
    createStepElement(step) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'timeline-item';
        itemDiv.style.opacity = 0; // 初始透明，用于淡入效果

        // 如果是完成步骤，添加completed类
        if (step.type === 'conclusion' || step.type === 'completed') {
            itemDiv.classList.add('completed');
        }

        // 创建标记点
        const markerDiv = document.createElement('div');
        markerDiv.className = 'timeline-marker';
        itemDiv.appendChild(markerDiv);

        // 创建内容容器
        const contentDiv = document.createElement('div');
        contentDiv.className = 'timeline-content';

        // 创建标题
        const headerDiv = document.createElement('div');
        headerDiv.className = 'timeline-header';
        headerDiv.textContent = this.getStepHeader(step);
        contentDiv.appendChild(headerDiv);

        // 如果是通信类型的步骤
        if (step.type === 'communication') {
            const headerDiv = document.createElement('div');
            headerDiv.className = 'communication-header';
            headerDiv.innerHTML = `<span class="communication-direction">${step.message}</span> <span class="toggle-icon">▶</span>`;
            headerDiv.onclick = function() {
                const detailsElement = this.nextElementSibling;
                const toggleIcon = this.querySelector('.toggle-icon');

                if (detailsElement.style.display === 'none' || !detailsElement.style.display) {
                    detailsElement.style.display = 'block';
                    toggleIcon.textContent = '▼';
                } else {
                    detailsElement.style.display = 'none';
                    toggleIcon.textContent = '▶';
                }
            };

            const detailsElement = document.createElement('div');
            detailsElement.className = 'timeline-details';
            detailsElement.style.display = 'none';

            if (step.details) {
                detailsElement.textContent = step.details;
            } else {
                detailsElement.textContent = t('no_details');
            }

            contentDiv.appendChild(headerDiv);
            contentDiv.appendChild(detailsElement);
        }
        // 如果有详细内容，添加详情按钮和内容
        else if (step.details) {
            // 创建详情按钮
            const detailsButton = document.createElement('button');
            detailsButton.className = 'btn-details';
            detailsButton.textContent = t('show_details');
            contentDiv.appendChild(detailsButton);

            // 创建详情内容（初始隐藏）
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'timeline-details';
            detailsDiv.style.display = 'none';
            detailsDiv.textContent = step.details;
            contentDiv.appendChild(detailsDiv);

            // 绑定详情按钮点击事件
            detailsButton.addEventListener('click', () => {
                if (detailsDiv.style.display === 'none') {
                    detailsDiv.style.display = 'block';
                    detailsButton.textContent = t('hide_details');
                } else {
                    detailsDiv.style.display = 'none';
                    detailsButton.textContent = t('show_details');
                }
            });
        }

        // 如果是文件生成步骤，添加文件列表
        if (step.files && step.files.length > 0) {
            const fileListDiv = document.createElement('div');
            fileListDiv.className = 'file-list';
            fileListDiv.textContent = step.files.join(', ');
            contentDiv.appendChild(fileListDiv);
        }

        itemDiv.appendChild(contentDiv);
        return itemDiv;
    }

    // 获取步骤标题
    getStepHeader(step) {
        if (step.message) {
            return step.message;
        }

        switch (step.type) {
            case 'thinking':
                return step.content || t('thinking_process');
            case 'tool':
                return t('using_tool', { tool: step.tool || '' });
            case 'file':
                return t('generated_files_in_workspace', { workspace: step.workspace || '', count: step.files ? step.files.length : 0 });
            case 'conclusion':
            case 'completed':
                return t('task_completed_workspace', { workspace: step.workspace || '' });
            case 'error':
                return t('error_prefix', { error: step.error || '' });
            case 'system':
                return step.content || t('system_message');
            case 'system_log':
                return step.message || t('system_log');
            case 'progress':
                return t('executing_step', { current: step.current, total: step.total });
            case 'communication':
                return step.message || t('communication');
            default:
                return step.content ? step.content.substring(0, 50) + (step.content.length > 50 ? '...' : '') : t('thinking_step');
        }
    }

    // 更新记录计数
    updateRecordCount() {
        if (this.recordCountElement) {
            this.recordCountElement.textContent = t('records_count', { count: this.thinkingSteps.length });
        }
    }

    // Refresh previously rendered labels when the user changes language.
    refreshLanguage() {
        this.thinkingContainer.replaceChildren(...this.thinkingSteps.map(step => {
            const element = this.createStepElement(step);
            element.style.opacity = 1;
            return element;
        }));
        this.updateRecordCount();
    }

    // 清除所有思考记录
    clearThinking() {
        this.thinkingSteps = [];
        this.thinkingContainer.innerHTML = '';
        this.updateRecordCount();
    }

    // 滚动到底部
    scrollToBottom() {
        this.thinkingContainer.scrollTop = this.thinkingContainer.scrollHeight;
    }
}
