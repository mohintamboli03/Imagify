# Imagify

Imagify is an innovative web application that empowers users to unleash their creativity by generating AI-driven images from custom text prompts. With its seamless user interface and robust backend, Imagify bridges the gap between imagination and visual representation. Additionally, Imagify integrates the **Razorpay Payment Gateway** to enable users to make payments for premium features and services.

## Features

- **AI-Powered Image Generation**: Generate unique, AI-driven images from custom text prompts using the **Clipdrop API**.
- **User-Friendly Interface**: A simple, intuitive design for easy prompt entry and image generation.
- **Fast Processing**: Images are generated in seconds using a powerful backend.
- **Downloadable Images**: Download AI-generated images for personal or professional use.
- **Payment Integration**: Users can make payments for premium features through the **Razorpay Payment Gateway**.
- **Save and Share**: Save your generated images and share them with friends or on social media.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **AI Model**: [Clipdrop API](https://clipdrop.co/api) for generating images
- **Payment Gateway**: Razorpay for processing payments

## Live Demo

Check out the live application here: [Imagify Live](https://imagify-1-zxax.onrender.com)

## Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing.

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v12 or higher)
- **MongoDB** (Cloud or Local Database, if used)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mohintamboli03/Imagify.git
    cd Imagify
    ```

2. Install dependencies for both frontend and backend:

    **Frontend**:
    ```bash
    cd frontend
    npm install
    ```

    **Backend**:
    ```bash
    cd ../backend
    npm install
    ```

3. Create a `.env` file in the backend folder and add the following variables:

    ```env
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-secret-key
    PORT=5000
    CLIPDROP_API_KEY=your-clipdrop-api-key
    RAZORPAY_KEY_ID=your-razorpay-key-id
    RAZORPAY_KEY_SECRET=your-razorpay-key-secret
    ```

4. Run the development servers:

    **Backend**:
    ```bash
    cd backend
    npm run dev
    ```

    **Frontend**:
    ```bash
    cd ../frontend
    npm run dev
    ```

## Usage

1. **Sign Up / Log In**: Access the app by registering or logging in.
2. **Generate a Text Prompt**: Enter a custom prompt and generate an image using the Clipdrop API.
3. **Payment**: Users can pay for premium image generation using the Razorpay payment gateway.
4. **View and Download Images**: View and download the AI-generated images to your device.
5. **Save or Share**: Optionally, save or share your generated images.

## Payment Integration

- **Razorpay** is used to process payments for premium features in Imagify.
- Users can make payments for accessing higher quality images or additional generation credits.

## Contact

For any issues or inquiries, feel free to contact me at:

- **Email**: mohintamboli3@gmail.com
- **Twitter**: [@MoinTamboli_3](https://twitter.com/MoinTamboli_3)

Happy coding! 🚀
