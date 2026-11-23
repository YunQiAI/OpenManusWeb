// i18n.js - 国际化模块，管理中英文翻译

// 支持的语言
export const SUPPORTED_LANGUAGES = {
    'zh-CN': '中文',
    'en-US': 'English'
};

// 翻译文本
export const translations = {
    // 中文翻译
    'zh-CN': {
        // 页面标题和头部
        'page_title': 'OpenManus Web - 网页版',
        'app_title': 'OpenManus',
        'app_subtitle': 'AI智能助手 - 网页版',
        
        // 主要区域标题
        'processing_progress': '处理进度',
        'ai_thinking_process': 'AI思考过程',
        'workspace_files': '工作区文件',
        'conversation': '对话',
        
        // 按钮和控件
        'auto_scroll': '自动滚动',
        'clear': '清空',
        'refresh': '刷新',
        'send': '发送',
        'stop': '停止',
        'close': '关闭',
        
        // 状态和提示
        'records_count': '{count} 条记录',
        'refresh_countdown': '{seconds}秒后刷新',
        'processing_request': '正在处理您的请求...',
        'processing_stopped': '处理已停止',
        'file_name': '文件名',
        
        // 输入框占位符
        'input_placeholder': '输入您的问题或指令...',
        
        // 页脚
        'ui_made_by': 'Web界面制作:',
        'powered_by': 'Powered by OpenManus -',
        
        // 错误消息
        'api_error': 'API错误: {status}',
        'send_message_error': '发送消息错误: {message}',
        'stop_processing_error': '停止处理错误: {message}',
        'load_workspace_error': '加载工作区文件错误: {message}',
        'load_file_error': '加载文件内容错误: {message}',
        
        // 系统消息
        'error_occurred': '发生错误: {message}',
        'processing_in_progress': '正在处理中，请等待...',
        
        // 语言切换
        'language': '语言',
        'switch_language': '切换语言',

        // Live status, timeline, and workspace labels
        'no_details': '(无详细内容)',
        'show_details': '显示详情 ▼',
        'hide_details': '隐藏详情 ▲',
        'thinking_process': '思考过程',
        'using_tool': '使用工具: {tool}',
        'generated_files_in_workspace': '在工作区 {workspace} 中生成了 {count} 个文件:',
        'task_completed_workspace': '任务处理完成! 已在工作区 {workspace} 中生成结果。',
        'error_prefix': '发生错误: {error}',
        'system_message': '系统消息',
        'system_log': '系统日志',
        'executing_step': '执行步骤 {current}/{total}',
        'communication': '通信',
        'thinking_step': '思考步骤',
        'no_workspace_files': '没有工作区文件',
        'refreshing': '刷新中...',
        'connected_to_server': '已连接到服务器...',
        'websocket_disconnected': '连接已断开，请刷新页面重试',
        'websocket_reconnecting': '连接已断开，正在尝试重连 ({attempt}/{max})...'
    },
    
    // 英文翻译
    'en-US': {
        // 页面标题和头部
        'page_title': 'OpenManus Web - Web Version',
        'app_title': 'OpenManus',
        'app_subtitle': 'AI Assistant - Web Version',
        
        // 主要区域标题
        'processing_progress': 'Processing Progress',
        'ai_thinking_process': 'AI Thinking Process',
        'workspace_files': 'Workspace Files',
        'conversation': 'Conversation',
        
        // 按钮和控件
        'auto_scroll': 'Auto Scroll',
        'clear': 'Clear',
        'refresh': 'Refresh',
        'send': 'Send',
        'stop': 'Stop',
        'close': 'Close',
        
        // 状态和提示
        'records_count': '{count} Records',
        'refresh_countdown': 'Refresh in {seconds}s',
        'processing_request': 'Processing your request...',
        'processing_stopped': 'Processing stopped',
        'file_name': 'File Name',
        
        // 输入框占位符
        'input_placeholder': 'Enter your question or instruction...',
        
        // 页脚
        'ui_made_by': 'UI Made by:',
        'powered_by': 'Powered by OpenManus -',
        
        // 错误消息
        'api_error': 'API Error: {status}',
        'send_message_error': 'Send message error: {message}',
        'stop_processing_error': 'Stop processing error: {message}',
        'load_workspace_error': 'Load workspace files error: {message}',
        'load_file_error': 'Load file content error: {message}',
        
        // 系统消息
        'error_occurred': 'Error occurred: {message}',
        'processing_in_progress': 'Processing in progress, please wait...',
        
        // 语言切换
        'language': 'Language',
        'switch_language': 'Switch Language',

        // Live status, timeline, and workspace labels
        'no_details': '(No details)',
        'show_details': 'Show details ▼',
        'hide_details': 'Hide details ▲',
        'thinking_process': 'Thinking process',
        'using_tool': 'Using tool: {tool}',
        'generated_files_in_workspace': 'Generated {count} files in workspace {workspace}:',
        'task_completed_workspace': 'Task completed! Results saved to workspace {workspace}.',
        'error_prefix': 'Error: {error}',
        'system_message': 'System message',
        'system_log': 'System log',
        'executing_step': 'Executing step {current}/{total}',
        'communication': 'Communication',
        'thinking_step': 'Thinking step',
        'no_workspace_files': 'No workspace files',
        'refreshing': 'Refreshing...',
        'connected_to_server': 'Connected to server...',
        'websocket_disconnected': 'Connection lost. Refresh the page to try again.',
        'websocket_reconnecting': 'Connection lost. Reconnecting ({attempt}/{max})...'
    }
};

// 当前语言
let currentLanguage = 'zh-CN';

// 获取浏览器语言
export function getBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    // 如果浏览器语言以'zh'开头，返回中文，否则返回英文
    return browserLang.startsWith('zh') ? 'zh-CN' : 'en-US';
}

// 设置当前语言
export function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        // 保存语言设置到localStorage
        localStorage.setItem('openmanus_language', lang);
        return true;
    }
    return false;
}

// 获取当前语言
export function getCurrentLanguage() {
    return currentLanguage;
}

// 初始化语言设置
export function initLanguage() {
    // 首先尝试从localStorage获取语言设置
    const savedLang = localStorage.getItem('openmanus_language');
    if (savedLang && translations[savedLang]) {
        currentLanguage = savedLang;
    } else {
        // 如果没有保存的语言设置，使用浏览器语言
        currentLanguage = getBrowserLanguage();
    }
    return currentLanguage;
}

// 获取翻译文本
export function t(key, params = {}) {
    // 获取当前语言的翻译
    const translation = translations[currentLanguage];
    
    // 如果找不到翻译，尝试使用英文，如果英文也没有，返回键名
    let text = translation[key] || translations['en-US'][key] || key;
    
    // 替换参数
    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });
    
    return text;
}

// 更新页面上所有带有data-i18n属性的元素的文本
export function updatePageTexts() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        // 如果元素是输入框或文本区域，更新placeholder
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.getAttribute('placeholder')) {
                element.setAttribute('placeholder', t(key));
            }
        } else {
            // 否则更新内部文本
            element.textContent = t(key);
        }
    });
    
    // 更新页面标题
    document.title = t('page_title');
}
