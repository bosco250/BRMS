// Kitchen WebSocket Service for Real-time Updates
type Listener = (data?: unknown) => void;

export class KitchenWebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private listeners: Map<string, Listener[]> = new Map();
  private url: string;

  constructor(url: string = "ws://localhost:8080/kitchen") {
    this.url = url;
  }

  connect(): void {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log("Kitchen WebSocket connected");
        this.reconnectAttempts = 0;
        this.emit("connected");
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.emit("message", data);

          // Handle specific message types
          switch (data.type) {
            case "new_order":
              this.emit("newOrder", data);
              break;
            case "order_update":
              this.emit("orderUpdate", data);
              break;
            case "station_update":
              this.emit("stationUpdate", data);
              break;
            case "staff_update":
              this.emit("staffUpdate", data);
              break;
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      this.ws.onclose = () => {
        console.log("Kitchen WebSocket disconnected");
        this.emit("disconnected");
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.emit("error", error);
      };
    } catch (error) {
      console.error("Failed to connect WebSocket:", error);
      this.emit("error", error);
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      );

      setTimeout(() => {
        this.connect();
      }, this.reconnectDelay);
    } else {
      console.error("Max reconnection attempts reached");
      this.emit("maxReconnectAttemptsReached");
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(data: unknown): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket is not connected");
    }
  }

  // Event listener methods
  on(event: string, callback: Listener): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback: Listener): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data?: unknown): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((callback) => callback(data));
    }
  }

  // Kitchen-specific methods
  requestOrderUpdate(orderId: string): void {
    this.send({
      type: "request_order_update",
      orderId,
    });
  }

  updateOrderStatus(orderId: string, status: string): void {
    this.send({
      type: "update_order_status",
      orderId,
      status,
    });
  }

  requestStationStatus(): void {
    this.send({
      type: "request_station_status",
    });
  }

  // Mock data generator for testing
  startMockData(): void {
    setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        // Simulate new order
        if (Math.random() < 0.3) {
          this.send({
            type: "new_order",
            orderNumber: `ORD-${Math.floor(Math.random() * 1000)}`,
            customerName: `Customer ${Math.floor(Math.random() * 100)}`,
            priority: ["normal", "rush", "urgent"][
              Math.floor(Math.random() * 3)
            ],
            estimatedPrepTime: Math.floor(Math.random() * 20) + 5,
            timestamp: new Date().toISOString(),
          });
        }
      }
    }, 10000); // Every 10 seconds
  }
}

// Singleton instance
export const kitchenWebSocket = new KitchenWebSocketService();
