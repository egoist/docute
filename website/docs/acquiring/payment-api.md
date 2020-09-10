# Payments API

<Note label>

Version: v1.0.0-alpha   
Author: Fuad Musayev   
Date: 2 Sep 2020   
<br/>
This is Draft version of API and may change during development.
</Note>

The Payments API provides several endpoints to take online payments.   
This topic explores taking and refunding payments using the API and provides related examples.  

On this page  
1. [Request Payment](#request-payment)   
2. [Refund Payment](#refund-payment)   
3. [Payment Status](#payment-status)   

### Connecting to Payments API
Connecting to PASHA Bank API can be done in 2 ways.   
1. Through Online Bank. (Currently in development phase)   
2. By contacting a representative of the PASHA Bank.  

### Overview of API
PASHA Bank uses API Key authorization mechanism to authorize each request.
API Key can be send as url param or through the header.

For development purposes API can be accessible through   
`https://openbankingdev.pashabank.digital` URL (currently blocked by VPN).

```bash
curl -X GET \
-H 'Content-Type: application/json' \
-H 'apikey: {{YOUR_API_KEY}}' \
'https://openbankingdev.pashabank.digital/v1/api/health'
```

Before using Payments API you will need to provide the information below:
1. `Merchant Account` - Bank Account where the funds will be transferred.  
2. `MCC` - Merchant Category Code.   

<Note type="warning">

Process of merchant registration in bank may take 1-3 business days.
</Note>

## Request Payment

For some payment methods, the payment is completed in two steps:

- Authorization – The payment details are verified, and amount blocked.
- Capture – The blocked amount are transferred from card to your account.   
By default, payments are captured immediately after authorisation (it is called "Automatic capture").

<Note type="note">

Currently PASHA Bank API (version v1.0.0-alpha) only supports Automatic capturing.
</Note>

### Request
Make a POST request to the `/e-comm/payment` endpoint, specifying: 

- `card`: `Object` containing Card details.   
    - `pan`: Card Number   
    - `expiryMonth`: `string` - Expiration month. Format: `MM` (`ISO 8601` standard)    
    - `expiryYear`: `string` - Expiration Year. Format: `YYYY` (`ISO 8601` standard)    
    - `cvv`: `string` - CVV data. 
    - `holderName` <Badge type="tip">optional</Badge>: `string` - Name of the card holder.    
- `amount`: Amount value and currency code. Currently supported only `AZN` payments.  
    - `value`: `float` with 2 decimal places.    
    - `currency`: value should be `AZN` - Version v1.0.0-alpha supports only AZN payments)   
- `paymentDescription`: <Badge type="tip">optional</Badge> Specifies description of payment (could be orderId).

<Note type="danger">

Be sure to clarify your transaction limits. Request will fail if `amount` value will exceed your limits. 
</Note>

Sample Request Body:   
```json
    {
        "card": {
            "number":"4111111111111111",
            "cvc":"737",
            "expiryMonth":"10",
            "expiryYear":"2020",
            "holderName":"John Smith"
        },
        "amount":{
            "currency":"AZN",
            "value":15.00
        },
        "paymentDescription": "Test Payment"
    }
```

You will receive a response containing: 

- `paymentID`: paymentID assigned by Payment System.   
- `paymentRef`: payment reference that uniquely identifies a payment within Payment Server.    
- `status`: status of payment request. Possible values:   
    - `ok`   
    - `error`    
- `error`: some error code, may be numeric or string
- `errorDescription` – error description

```json
{
   "paymentID":"11111111111",
   "paymentRef":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   "status": "ok",
   "error": null,
   "errorDescription": null,
}
```

HTTP Codes:   
- `200`: OK    
- `403`: Forbidden (Access denied for provided `apikey`)   
- `500`: Internal Error   

## Refund Payment

Current version of Refund API supports only full refund. You can easily refund completed payments by using `paymentRef` or `paymentID` parameters returned from payment request.  

### Refund API Call

In your `POST` request to the `/e-comm/refund` endpoint, specify: 

`paymentId`: payment identification. Response received from payment request.  
*or*   
`paymentRef`: payment reference that uniquely identifies a payment within Payment Server. Response received from payment request     

```json
{
    "paymentRef":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

It will return `200 OK` http code, indicating that payment fully refunded.
HTTP Codes:   
- `200`: OK   
- `404`: Not Found (Payment for provided paymentRef not found)   
- `500`: Internal Error   



## Payment Status

Additionally you can request payment status by using `paymentRef` or `paymentID` parameters returned from payment request.   
In your `POST` request to the `/e-comm/payment/status` endpoint, specify:   

`paymentId`: payment identification. Response received from payment request.  
*or*   
`paymentRef`: payment reference that uniquely identifies a payment within Payment Server. Response received from payment request     

```json
{
    "paymentRef":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

You will receive a response containing: 

- `paymentID`: paymentID assigned by Payment System.   
- `paymentRef`: payment reference that uniquely identifies a payment within Payment Server.    
- `status`: status of payment request. Possible values:   
    - `finished` – payment has been finished   
    - `cancelled` – payment has been cancelled   
    - `returned` – payment has been returned (refunded)   
    - `active` – is currently in progress and has not been finished, cancelled or returned.  

```json
{
   "paymentID":"11111111111",
   "paymentRef":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   "status": "finished",
   "details": {} /* key-value map */
}
```

HTTP Codes:   
- `200`: OK   
- `403`: Forbidden (Access denied for provided `apikey`)   
- `404`: Not Found (Payment for provided paymentRef not found)   
- `500`: Internal Error   


