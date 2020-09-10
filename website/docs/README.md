# Introduction to **PASHA Bank** API

## Prerequisites
1. You need to onboard to PASHA Bank as a customer (https://onboarding.pashabank.digital/)
2. You will need to have at least one Bank Account.

## Connect
Connecting to PASHA Bank API can be done 2 ways.
1. Through Online Bank. (Currently in development phase)
2. By contacting a representative of the PASHA Bank.  

## Overview of API
PASHA Bank using API Key authorization mechanism to authorize each request.
API Key can be send as url param or through the header.

For development purposes API can be accessible through `https://openbankingdev.pashabank.digital` URL.

```bash
curl -X GET \
-H 'Content-Type: application/json' \
-H 'apikey: {{YOUR_API_KEY}}' \
'https://openbankingdev.pashabank.digital/v1/api/accounts'
```
