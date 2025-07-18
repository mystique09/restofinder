# Resto Finder
An API that uses an LLM to query for places from Four Square's Place Search API.

# Prerequisites
You must have these installed/prepared in your system in order to run the API on your own machine.
- Git
- [NodeJS](http://nodejs.org/) (at least v18)
- [Place Search](https://docs.foursquare.com/developer/reference/place-search?example=fetch) API key
- [Gemini](https://gemini.google.com/) API key

## Installation

Clone the repository:
```nushell
git clone https://github.com/mystique09/restofinder
```

Go to the restofinder directory
```nushell
cd restofinder
```

Create a ".env" file and add your environment variables, you can view the .sample.env file for the required environment variables.
```
cp .sample.env .env
```

Run these commands to run the API server
```nushell
npm install
npm run dev
```

You can access the API via this URL
```nushell
open http://localhost:3000
```
