# Painting storage platform - toy project

This project was created for a company challenge. The aim is to create a complete web app that hosts images inside albums and allows users to browse and manage their albums and images.

A deploy of the repo can be accessed here: [https://painting-storage.fly.dev](https://painting-storage.fly.dev/home)

# Remarks

- I chose a simple monorepo structure for simplicity, and an SPA approach given that virtually all of the app functionality will happen while in a logged-in state, also it's what I'm most proficient with.
- Some behavior is mocked, like the picture upload functionality.

## Client

- The project was initialized using `npm create vite@latest .`

## Server

- Project initialized with `npm init` and `npx tsc --init`, then manually bootstrapped.

## Project scope

Given the scope and nature of the project, many practices that would be present in larger apps are not present, like:

- extensive testing with vitest and/or node:test
- prototyping tools like StoryBook
- system design decisions, like usage of clean architecture, SQL
- Eager upload of images to a CDN on picture form submission
