# Bargain

Bargain is a website designed to help you save money when buying products on Amazon. Users can add a product of their choice and set a target price. When the product's current price drops below the target price, the user receives a notification via email or Telegram with the Amazon link.

In addition, users can view what other users are tracking and how many are watching the same product. If a user wants to add that product to their watchlist, they can do so easily. Users can also see details about a single product and access their profile to manage their watchlist.

Bargain's backend is split into two parts: one for handling website requests and the other for scanning and Telegram notifications. This separation improves the efficiency of the system.

## Features

- **Add a product and set a target price:** Users can search for a product they want to buy on Amazon and add it to their watchlist on Bargain. They can then set a target price for the product, which is the price they are willing to pay for it.

- **Get notified when the price drops:** Bargain will monitor the product's price on Amazon and send the user a notification via email or Telegram when the product's price drops below their target price.

- **View what others are tracking:** Users can view a list of products that other users are tracking, along with the number of people who are watching each product.

- **View single product details:** Users can view detailed information about a specific product, including its current price and historical price trends.

- **Manage your watchlist:** Users can manage their watchlist by editing or removing products, or viewing their past notifications.

- **Telegram bot integration:** Users can access a Telegram bot that allows them to add, remove, and view products on their watchlist directly from the Telegram app.

## Technologies Used

Bargain is built using the following technologies:

- React
- Tailwind
- Node.js
- Cheerio
- Telegram Bot
- MongoDB
- Express
- TypeScript

## How to Use

To use Bargain, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies by running npm install in the project directory, as well as in each of the subdirectories: frontend, backend, and intervalBackend.
3. Start the frontend by navigating to the frontend directory and running npm run dev in the terminal.
4. Start the backend by navigating to the backend directory and running npm run dev in the terminal.
5. Start the intervalBackend (Telegram bot) by navigating to the intervalBackend directory and running npm run dev in the terminal.
6. open `http://localhost:5173` in the browser.

## Contributing

If you would like to contribute to Bargain, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.
6. Please ensure that your code adheres to the project's coding standards and that you have thoroughly tested your changes before submitting a pull request.

## License

Bargain is licensed under the MIT license.
