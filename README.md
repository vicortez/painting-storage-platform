# Painting storage platform - toy project

This project was created for a company challenge. The aim is to create a complete web app that hosts images inside albums and allows users to browse and manage their albums and images.

# Remarks

- I chose a simple monorepo structure for simplicity, and an SPA approach given that virtually all of the app functionality will happen while in a logged-in state, also it's what I'm most proficient with.

## Client

- The project was initialized using `npm create vite@latest .`

## Server

- Project initialized with `npm init` and `npx tsc --init`, then manually bootstrapped.

## Project scope

Given the scope and nature of the project, many practices that would be present in larger apps are not present, like extensive testing protocols with vitest and node:test, prototyping tools like StoryBook, as well as system design decisions, like usage of clean architecture.
