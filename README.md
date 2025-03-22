# Order Management System

## Description

This is a microservices-based order management system built with NestJS, using a monorepo structure. The system implements a distributed, event-driven architecture to handle e-commerce order processing through a set of specialized microservices that communicate with each other using Kafka message broker.

### Key Components:

1. **API Gateway (srv-gateway)**: 
   - Serves as the entry point for external requests
   - Provides RESTful API endpoints for order creation and management
   - Initiates event flows by publishing messages to Kafka topics

2. **Order Service (srv-orders)**:
   - Handles order processing and lifecycle management
   - Stores order information in MongoDB
   - Reacts to events from the gateway and publishes order state change events
   - Updates order status based on inventory response events

3. **Inventory Service (srv-inventory)**:
   - Manages product inventory and stock levels
   - Subscribes to order creation events and checks product availability
   - Publishes inventory status events (reserved, out of stock)
   - Updates inventory records based on order events

4. **Delivery Service (srv-delivery)**:
   - Handles shipping and delivery logistics for confirmed orders
   - Subscribes to order confirmation events to initiate delivery processes
   - Publishes delivery status events back to the system

### Technical Stack:

- **Framework**: NestJS (Node.js framework)
- **Database**: MongoDB with Mongoose ORM
- **Message Broker**: Kafka for event-driven, asynchronous communication
- **Architecture**: Distributed, event-driven microservices pattern
- **Testing**: Jest for unit and e2e testing
- **Language**: TypeScript

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# run all services in parallel (recommended for development)
$ npm run start:all

# run individual services
$ npm run start:orders      # Start order service
$ npm run start:inventory   # Start inventory service
$ npm run start:delivery    # Start delivery service
$ npm run start:gateway     # Start API gateway
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```