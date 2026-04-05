# Real-Time Robot Telemetry Dashboard

A real-time web-based telemetry dashboard designed for monitoring and interacting with robotic systems. The interface provides live visualization of robot metrics, a terminal-style command console for operator input, and responsive layouts suitable for field technicians using tablets.

The system supports both **simulated telemetry streams** and **ROS-integrated robotics systems** via WebSockets.

---

# Features

### Real-Time Telemetry Streaming

Receives telemetry updates at **10Hz** via WebSockets using Socket.io.

Metrics displayed include:

* Motor Current
* Battery Level
* Temperature
* Robot Speed
* Motor Current
* Robot State

---

### Live Data Visualization

Telemetry data is visualized using **Chart.js**, showing a continuously updating graph of:

```
Motor Current vs Time
```

The graph uses a rolling buffer to ensure efficient real-time rendering.

---

### Terminal-Style Operator Console

Includes a command-line interface where operators can issue commands such as:

```
/move_forward 50
/reset_system
/check_motor
```

Commands are instantly logged and can be routed to the backend or ROS system.

---

### Dual Telemetry Modes

The dashboard supports two telemetry sources:

```
SIMULATOR
ROS BRIDGE
```

Switching between modes resets telemetry buffers and loads the appropriate data source.

---

### System Monitoring

A system status footer provides real-time monitoring indicators:

```
SYSTEM_STATUS: CONNECTED
DATA_SOURCE: SIMULATOR
STREAM_RATE: 9 Hz
```

These indicators allow operators to quickly determine the health of the telemetry stream.

---

### Responsive Operator Interface

The UI is fully responsive and optimized for:

* Field tablets
* Laptops
* Desktop monitoring stations

Mobile layout stacks the interface vertically for readability:

```
Graph
Status Panel
Command Console
System Status Footer
```

---

# System Architecture

```
Robot / Simulator
        ↓
ROS Bridge / Telemetry Server
        ↓
Socket.io WebSocket Server
        ↓
React Dashboard Interface
```

Telemetry flows from the robot or simulator into the dashboard in real time.

---

# Tech Stack

Frontend

* React
* TailwindCSS
* Chart.js
* Socket.io-client

Backend

* Node.js
* Socket.io
* ROS Bridge (rosbridge_suite)

---

# Installation

Clone the repository:

```
git clone https://github.com/yourusername/robot-telemetry-dashboard.git
cd robot-telemetry-dashboard
```

Install dependencies:

```
npm install
```

Start the frontend:

```
npm run dev
```

Start the telemetry server (if included):

```
node server.js
```

---

# Telemetry Simulation

The simulator generates mock telemetry data including:

```
motorCurrent
batteryLevel
temperature
speed
robotState
```

at a frequency of approximately **10 updates per second**.

---

# ROS Integration

The dashboard is designed to integrate with **ROS via rosbridge_suite**.

Example ROS topics:

```
/motor_current
/battery_state
/robot_speed
/robot_state
```

Telemetry messages from ROS are forwarded to the dashboard via WebSockets.

---

# Project Structure

```
src/
│
├── components/
│   ├── DashboardLayout.jsx
│   ├── TelemetryGraph.jsx
│   ├── StatusPanel.jsx
│   └── console.jsx
│
├── socket.js
├── App.jsx
└── main.jsx
```

---

# Example Dashboard Layout

Desktop Layout

```
Graph                  Status Panel
------------------------------------
Command Console
```

Mobile Layout

```
Graph
Status Panel
Command Console
System Status Footer
```

---

# Future Improvements

Planned enhancements include:

* ROS command execution via the console
* Telemetry session recording and playback
* System alert indicators for critical telemetry thresholds
* Map visualization for robot navigation
* Command autocomplete and history

---

# Use Cases

This dashboard can be used for:

* Robotics telemetry monitoring
* Field technician diagnostics
* Autonomous system testing
* Robotics simulation environments
* Control station interfaces

---

# License

MIT License

---

# Author

Built as a robotics telemetry interface demonstrating real-time data streaming, operator control systems, and responsive dashboard design.

---
