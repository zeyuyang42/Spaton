# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Spaton is an interactive spatial audio control system where users control spatial audio compositions using mobile phone sensors over a local network. Sensor data flows: **Mobile Browser → WebSocket (Socket.io) → Node.js Server → OSC UDP → Sound Engine (Max/MSP + IRCAM Spat)**.

## Commands

### Client (React frontend, in `client/`)
```bash
cd client && npm install    # Install dependencies
cd client && npm start      # Dev server on https://<IP>:3000 (HTTPS required for sensor APIs)
cd client && npm run build  # Production build
cd client && npm test       # Jest tests
```

### Server (Express backend, in `server/`)
```bash
cd server && npm install    # Install dependencies
cd server && npm start      # Production: node server.js on https://<IP>:8443
cd server && npm run dev    # Development: nodemon with auto-reload
```

### Documentation (MkDocs, in `docs/`)
```bash
cd docs && mkdocs serve     # Local doc server
cd docs && mkdocs build     # Build static docs
```

## Architecture

### Two-App Structure
- **`client/`** — React 18 SPA. Users pick a "route" (audio control channel), then phone sensors stream data to the server.
- **`server/`** — Express + Socket.io server. Receives sensor data via WebSocket, validates route ownership, and broadcasts as OSC messages over UDP to the sound engine.

### Key Data Flow
1. `RouteCard.js` — User selects a route and requests sensor permission (iOS requires explicit `DeviceMotionEvent.requestPermission()`)
2. `RouteManager.js` — Attaches `deviceorientation`/`devicemotion` listeners, packages sensor readings, emits via Socket.io
3. `WebEvents.js` — Defines supported sensor event types and their metadata
4. `server.js` — Receives WebSocket events, maps to OSC addresses, sends UDP packets to `127.0.0.1:7500`

### Route/Preset System
Routes are defined in JSON preset files (`server/presets/*.json`). Each route maps a sensor type to an audio parameter (e.g., ambient volume, spatial position). Routes track occupancy — only one client controls each route at a time.

## Configuration

Both apps require IP/port configuration for the local network:
- **Server**: `server/configs.js` — SSL cert paths, web port (8443), OSC target (127.0.0.1:7500), CORS origin
- **Client**: `client/src/configs.js` — Server address to connect to

HTTPS with SSL certificates is mandatory — browser sensor APIs (`DeviceMotionEvent`, `DeviceOrientationEvent`) require a secure context.

## Important Constraints
- Designed for LAN-only use; client and server IPs must be configured for the local network
- SSL certificates must exist at paths specified in `server/configs.js`
- The OSC target (Max/MSP with Spat plugin) must be running on the configured port to hear audio output
- Primarily tested on Chrome + iPhone; iOS sensor permission flow is handled in `RouteCard.js`
