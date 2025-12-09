# Copilot Instructions for Espark

## Big Picture Architecture
- **Monorepo Structure**: Contains `espark-core`, `espark-node`, and `espark-react` folders. `espark-core` defines shared types, data repositories, and FastAPI routes. `espark-node` implements the common logic, including device provisioning, parameters updating, and action messages for ESP32 devices. `espark-react` is the frontend application framework built with React, TypeScript, Refine.dev, and Vite.
- **espark-core**:
  - Handles device management, including provisioning and parameter updates.
  - Data layer: `data/` (models, repositories)
  - API layer: `routers/`
  - Outbox logic: `schedules/`
  - MQTT communication: `services/`
- **espark-node**:
  - Implements the core logic for ESP32 devices.
  - `actions/`: Defines actions that can be performed on devices.
  - `data/`: Device-specific data storage and retrieval.
  - `libraries/`: Internal libraries for device operations.
  - `networks/`: Network communication protocols (Bluetooth, Wi-Fi, MQTT).
  - `sensors/`: Sensor data handling.
  - `triggers`: Event triggers.
  - `base_node.py`: Main entry point for device logic.
- **espark-react**:
  - Frontend application framework for managing devices.
  - Data layer: `src/data/` (data models, data providers)
  - UI screens: `src/pages/`
  - Routes: `src/routes/`

## Developer Workflows:
- **Setting up the backend**:
  1. Add espark-core as a dependency in your FastAPI project.
  2. Configure database connections and MQTT settings as environment variables.
  3. Implement additional data models, repositories, routers, and business logic if needed.
  4. Add the `DeviceRouter`, `TelemetryRouter`, and other additional routers to your FastAPI app.
- **Setting up the ESP32 device**:
  1. Clone the espark-node repository to your local machine.
  2. Copy `espark-core/Makefile.template` to `Makefile` and customize it for your device.
  3. Run `make upgrade` to copy the espark-core library to your device project.
  4. Implement device-specific actions, sensors, and triggers as needed.
  5. Run `make flash` to upload the firmware to your ESP32 device.
  6. Run `make deploy` to upload the application to the device.
- **Setting up the frontend**:
  1. Add espark-react as a dependency in your React project.
  2. Render `<EsparkApp />` in your main application file.

## Project-Specific Conventions
- **Configurations**:
  - **espark-core**: Use environment variables, or `.env` file, for database and MQTT configurations.
  - **espark-node**: Use `esparknode.configs` for device-specific configurations.
  - **espark-react**: Customise `EsparkApp` props for application settings.

## Integration Points
- **MQTT Communication**: espark-core and espark-node communicate via MQTT for device management and telemetry data.
- **Database**: espark-core uses a database (e.g., SQLite, PostgreSQL) for storing device information and telemetry data.
- **Frontend-Backend Interaction**: espark-react interacts with espark-core's FastAPI routes for device management and telemetry visualization.

## Patterns & Examples
- **Router Example**: `device_router.py` in `espark-core/esparkcore/routers/` demonstrates how to create API endpoints for device management.
- **Respository Example**: `device_repository.py` in `espark-core/esparkcore/data/repositories/` shows how to implement data access logic for devices.
- **Action Example**: `esp32_relay.py` in `espark-node/esparknode/actions/` illustrates how to define actions for ESP32 devices.
- **Sensor Example**: `sht20_sensor.py` in `espark-node/esparknode/sensors/` demonstrates how to read data from a SHT20 sensor.
- **Trigger Example**: `gpio_trigger.py` in `espark-node/esparknode/triggers/` shows how to create GPIO-based triggers for device actions.
- **List, Show, Edit Screens Example**: `DeviceList`, `DeviceShow`, and `DeviceEdit` components in `espark-react/src/pages/devices/` demonstrate how to create CRUD screens for device management.

## Tips for AI Agents
- Respect the separation between core logic, device-specific implementations, and frontend UI.
- Follow the established folder structures and naming conventions for consistency.
- Leverage existing repositories, routers, actions, sensors, and triggers as templates for new implementations
- Ensure proper configuration management using environment variables and configuration files.
- Test interactions between the backend, device firmware, and frontend to ensure seamless integration.
