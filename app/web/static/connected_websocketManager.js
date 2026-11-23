import { t } from '/static/i18n.js';

// connected_websocketManager.js - 处理WebSocket连接和消息

export class WebSocketManager {
    constructor(messageHandler) {
        this.socket = null;
        this.messageHandler = messageHandler;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000; // 初始重连延迟1秒
        this.sessionId = null;
    }

    // Keep the status translation key available for language changes.
    setStatus(key, params = {}) {
        const status = document.getElementById('status-indicator');
        status.dataset.statusKey = key;
        status.dataset.reconnectAttempt = params.attempt ?? '';
        status.dataset.reconnectMax = params.max ?? '';
        status.textContent = t(key, params);
    }

    // 连接WebSocket
    connect(sessionId) {
        // 保存会话ID
        this.sessionId = sessionId;

        // 如果已经有连接，先关闭
        if (this.socket) {
            this.socket.close();
        }

        // 重置重连尝试次数
        this.reconnectAttempts = 0;

        // 创建WebSocket连接
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws/${sessionId}`;

        console.log(`连接WebSocket: ${wsUrl}`);

        this.socket = new WebSocket(wsUrl);

        // 设置事件处理器
        this.socket.onopen = this.handleOpen.bind(this);
        this.socket.onmessage = this.handleMessage.bind(this);
        this.socket.onclose = this.handleClose.bind(this);
        this.socket.onerror = this.handleError.bind(this);
    }

    // 处理连接打开
    handleOpen(event) {
        console.log('WebSocket连接已建立');
        this.setStatus('connected_to_server');
        // 重置重连尝试次数
        this.reconnectAttempts = 0;
    }

    // 处理接收到的消息
    handleMessage(event) {
        try {
            const data = JSON.parse(event.data);
            console.log('收到WebSocket消息:', data);

            // 调用消息处理回调
            if (this.messageHandler) {
                this.messageHandler(data);
            }
        } catch (error) {
            console.error('解析WebSocket消息错误:', error);
        }
    }

    // 处理连接关闭
    handleClose(event) {
        console.log(`WebSocket连接已关闭: ${event.code} ${event.reason}`);

        // 尝试重新连接
        this.attemptReconnect();
    }

    // 处理连接错误
    handleError(error) {
        console.error('WebSocket错误:', error);
    }

    // 尝试重新连接
    attemptReconnect() {
        if (!this.sessionId) {
            console.log('没有会话ID，无法重连');
            return;
        }

        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.log('达到最大重连尝试次数，停止重连');
            this.setStatus('websocket_disconnected');
            return;
        }

        this.reconnectAttempts++;
        const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1); // 指数退避

        console.log(`尝试重连 (${this.reconnectAttempts}/${this.maxReconnectAttempts})，延迟 ${delay}ms`);
        this.setStatus('websocket_reconnecting', { attempt: this.reconnectAttempts, max: this.maxReconnectAttempts });

        setTimeout(() => {
            if (this.sessionId) {
                this.connect(this.sessionId);
            }
        }, delay);
    }

    // 发送消息
    send(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket未连接，无法发送消息');
        }
    }

    // 关闭连接
    close() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}
